package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/generative-ai-go/genai"
	_ "github.com/joho/godotenv/autoload"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		adminSecret := os.Getenv("ADMIN_SECRET")
		if adminSecret == "" {
			adminSecret = "AR1SEE"
		}

		providedSecret := c.GetHeader("X-Admin-Secret")

		log.Printf("DEBUG: Server Expects: '%s'", adminSecret)
		log.Printf("DEBUG: Client Sent:    '%s'", providedSecret)

		if providedSecret != adminSecret {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}
		c.Next()
	}
}

func main() {
	if err := InitDB(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	if os.Getenv("GIN_MODE") == "" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{
		"https://swatantra-portfolio.vercel.app",
		"http://localhost:5173",
		"http://localhost:3000",
	}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "X-Admin-Secret"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowCredentials = true

	router.Use(cors.New(config))

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "healthy"})
	})

	router.HEAD("/health", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	api := router.Group("/api")
	{
		api.GET("/projects", getProjects)
		api.GET("/projects/:id", getProject)
		api.GET("/skills", getSkills)
		api.POST("/chat", chatHandler)
	}

	admin := router.Group("/api")
	admin.Use(AuthMiddleware())
	{
		admin.POST("/projects", createProject)
		admin.PUT("/projects/:id", updateProject)
		admin.DELETE("/projects/:id", deleteProject)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

func chatHandler(c *gin.Context) {
	c.Writer.Header().Set("Content-Type", "text/event-stream")
	c.Writer.Header().Set("Cache-Control", "no-cache")
	c.Writer.Header().Set("Connection", "keep-alive")

	var req ChatRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.SSEvent("error", "Invalid request body")
		return
	}

	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv("GEMINI_API_KEY")))
	if err != nil {
		c.SSEvent("error", "Failed to connect to AI")
		return
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-2.5-flash")

	model.SystemInstruction = &genai.Content{
		Parts: []genai.Part{
			genai.Text(`
            IDENTITY:
            You are "AR1SEE", a high-tech system assistant for Swatantra.

			PROFILE BIO:
            "Swatantra is a Backend Developer and Cloud Architect passionate about engineering high-performance backend systems and scalable cloud architectures. 
            He specializes in Go (Golang) microservices, designing cloud-native solutions on AWS (Certified), and bridging the gap between Web2 APIs and Web3 protocols."

            KNOWLEDGE BASE (CONTEXT):
            - Name: Swatantra (21-year-old Backend Developer).
            - Core Stack: Go (Golang), C++, PostgreSQL, AWS, Solidity (Web3).
            - Key Projects: 
              * "BookUniverse" (Go + AI + Barcode Scanning).
              * "Course CRUD Rest API" (Go Gorilla Mux).
              * "Portfolio" (Go Gin + React).
            - Certifications: AWS Certified Cloud Practitioner, AWS Certified AI Practitioner.

			CONTACT LINKS:
            - Portfolio: swatantra-portfolio.vercel.app
            - LinkedIn: linkedin.com/in/swatantraar1see
            - Email: maverickswatantra@gmail.com

            CRITICAL FORMATTING RULES:
            1. **Lists:** ALWAYS put a DOUBLE NEWLINE (\n\n) before starting a list.
            2. **Spacing:** ALWAYS put a DOUBLE NEWLINE (\n\n) between bullet points.
            3. **Emphasis:** Use **Bold** for skills and tools.
            4. **Brevity:** Keep answers sharp and concise.

            CORRECT OUTPUT EXAMPLE:
            "Swatantra is a backend developer.
            
            Here are his core skills:

            - **Go (Golang):** High-performance Rest APIs.

            - **C++:** Algorithmic problems.

            - **Git:** Version Control System.

            - **PostgreSQL:** powerful, open-source ORDBMS.

            - **AWS:** Cloud architecture.

            - **Solidity:** Web3 integration."
            `),
		},
	}

	iter := model.GenerateContentStream(ctx, genai.Text(req.Message))

	for {
		resp, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Printf("Error generating stream: %v", err)
			c.SSEvent("error", "AI generation failed mid-stream")
			break
		}

		for _, part := range resp.Candidates[0].Content.Parts {
			if text, ok := part.(genai.Text); ok {
				c.SSEvent("message", string(text))
				c.Writer.Flush()
			}
		}
	}
	c.SSEvent("end", "STREAM_END")
}

func getProjects(c *gin.Context) {
	projects, err := GetAllProjects()
	if err != nil {
		log.Printf("Error fetching projects: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
		return
	}
	if projects == nil {
		projects = []Project{}
	}
	c.JSON(http.StatusOK, projects)
}

func getProject(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project ID"})
		return
	}

	project, err := GetProjectByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}
	c.JSON(http.StatusOK, project)
}

func createProject(c *gin.Context) {
	var project Project
	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := CreateProject(&project); err != nil {
		log.Printf("Error creating project: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create project"})
		return
	}
	c.JSON(http.StatusCreated, project)
}

func updateProject(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project ID"})
		return
	}

	var project Project
	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	project.ID = id
	if err := UpdateProject(id, &project); err != nil {
		log.Printf("Error updating project: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update project"})
		return
	}
	c.JSON(http.StatusOK, project)
}

func deleteProject(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project ID"})
		return
	}

	if err := DeleteProject(id); err != nil {
		log.Printf("Error deleting project: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete project"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Project deleted successfully"})
}

func getSkills(c *gin.Context) {
	skills, err := GetAllSkills()
	if err != nil {
		log.Printf("Error fetching skills: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch skills"})
		return
	}
	if skills == nil {
		skills = []Skill{}
	}
	c.JSON(http.StatusOK, skills)
}
