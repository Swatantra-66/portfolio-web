package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

type Project struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	TechStack   string `json:"tech_stack"`
	ImageURL    string `json:"image_url"`
	GithubLink  string `json:"github_link"`
	DemoLink    string `json:"demo_link"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
}

type Skill struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Category    string `json:"category"`
	IconURL     string `json:"icon_url"`
	Proficiency int    `json:"proficiency"`
}

type ChatRequest struct {
	Message string `json:"message"`
}

type ChatResponse struct {
	Reply string `json:"reply"`
}

var db *sql.DB

func InitDB() error {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		host := getEnv("DB_HOST", "localhost")
		port := getEnv("DB_PORT", "5432")
		user := getEnv("DB_USER", "postgres")
		password := getEnv("DB_PASSWORD", "postgres")
		dbname := getEnv("DB_NAME", "portfolio")
		sslmode := getEnv("DB_SSLMODE", "disable")

		dbURL = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
			host, port, user, password, dbname, sslmode)
	}

	var err error
	db, err = sql.Open("postgres", dbURL)
	if err != nil {
		return fmt.Errorf("error opening database: %w", err)
	}

	if err = db.Ping(); err != nil {
		return fmt.Errorf("error connecting to database: %w", err)
	}

	log.Println("Successfully connected to database")

	createTableQuery := `
    CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        tech_stack TEXT NOT NULL,
        image_url TEXT,
        github_link TEXT,
        demo_link TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
	if _, err := db.Exec(createTableQuery); err != nil {
		log.Println("Warning: Could not create table (it might already exist with wrong schema).")
	}

	return nil
}

func GetAllProjects() ([]Project, error) {
	query := `
		SELECT id, title, description, tech_stack, 
			   COALESCE(image_url, ''), COALESCE(github_link, ''), 
			   COALESCE(demo_link, ''), 
			   to_char(created_at, 'YYYY-MM-DD HH24:MI:SS'), 
			   to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS')
		FROM projects
		ORDER BY created_at DESC
	`

	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var projects []Project
	for rows.Next() {
		var p Project
		err := rows.Scan(&p.ID, &p.Title, &p.Description, &p.TechStack,
			&p.ImageURL, &p.GithubLink, &p.DemoLink, &p.CreatedAt, &p.UpdatedAt)
		if err != nil {
			return nil, err
		}
		projects = append(projects, p)
	}
	return projects, nil
}

func GetProjectByID(id int) (*Project, error) {
	query := `
		SELECT id, title, description, tech_stack, 
			   COALESCE(image_url, ''), COALESCE(github_link, ''), 
			   COALESCE(demo_link, ''), 
			   to_char(created_at, 'YYYY-MM-DD HH24:MI:SS'), 
			   to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS')
		FROM projects
		WHERE id = $1
	`
	var p Project
	err := db.QueryRow(query, id).Scan(
		&p.ID, &p.Title, &p.Description, &p.TechStack,
		&p.ImageURL, &p.GithubLink, &p.DemoLink, &p.CreatedAt, &p.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func CreateProject(p *Project) error {
	query := `
		INSERT INTO projects (title, description, tech_stack, image_url, github_link, demo_link)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id
	`
	err := db.QueryRow(query, p.Title, p.Description, p.TechStack,
		p.ImageURL, p.GithubLink, p.DemoLink).Scan(&p.ID)
	return err
}

func UpdateProject(id int, p *Project) error {
	query := `
		UPDATE projects
		SET title = $1, description = $2, tech_stack = $3, 
			image_url = $4, github_link = $5, demo_link = $6, 
			updated_at = CURRENT_TIMESTAMP
		WHERE id = $7
	`
	_, err := db.Exec(query, p.Title, p.Description, p.TechStack,
		p.ImageURL, p.GithubLink, p.DemoLink, id)
	return err
}

func DeleteProject(id int) error {
	_, err := db.Exec("DELETE FROM projects WHERE id = $1", id)
	return err
}

func GetAllSkills() ([]Skill, error) {
	_, err := db.Query("SELECT 1 FROM skills LIMIT 1")
	if err != nil {
		return []Skill{}, nil
	}

	query := `SELECT id, name, category, COALESCE(icon_url, ''), proficiency FROM skills ORDER BY id`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var skills []Skill
	for rows.Next() {
		var s Skill
		if err := rows.Scan(&s.ID, &s.Name, &s.Category, &s.IconURL, &s.Proficiency); err != nil {
			return nil, err
		}
		skills = append(skills, s)
	}
	return skills, nil
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
