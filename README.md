# 🚀 Full-Stack Portfolio Website

A high-performance personal portfolio website built with Go (Gin framework) backend and modern React frontend. Features a private admin panel for dynamic project management without redeploying code.

## ✨ Features

### Public Portfolio

- **Hero Section**: Modern introduction with animated gradients
- **Skills Section**: Visually appealing tech skills grid
- **Projects Section**: Dynamic project cards fetched from PostgreSQL database
- **Contact Section**: Professional contact information and social links
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for delightful user experience

### Admin Panel

- **Secure Access**: Protected by admin secret header
- **CRUD Operations**: Create, Read, Update, Delete projects
- **Real-time Updates**: Changes reflect immediately on the portfolio
- **Image Support**: Add project images via URLs
- **Tech Stack Tags**: Manage project technologies dynamically

## 🛠️ Tech Stack

### Backend

- **Go 1.21+**: High-performance server
- **Gin Framework**: Fast HTTP web framework
- **PostgreSQL**: Robust relational database
- **lib/pq**: Pure Go Postgres driver

### Frontend

- **React 18**: Modern UI library
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Production-ready animations
- **React Router**: Client-side routing
- **Axios**: HTTP client

## 📁 Project Structure

```
portfolio-app/
├── backend/
│   ├── main.go              # Main server file with API routes
│   ├── db.go                # Database connection and queries
│   ├── schema.sql           # PostgreSQL schema
│   ├── go.mod               # Go dependencies
│   ├── Dockerfile           # Docker configuration
│   └── .env.example         # Environment variables template
│
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   │   ├── Hero.jsx
    │   │   ├── Skills.jsx
    │   │   ├── Projects.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Navbar.jsx
    │   │   └── Footer.jsx
    │   ├── pages/           # Page components
    │   │   ├── Home.jsx
    │   │   └── AdminPanel.jsx
    │   ├── utils/           # Utilities
    │   │   └── api.js       # API communication
    │   ├── App.jsx          # Main app component
    │   ├── main.jsx         # Entry point
    │   └── index.css        # Global styles
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── .env.example
```

## 🚦 Getting Started

### Prerequisites

- Go 1.21 or higher
- Node.js 18+ and npm
- PostgreSQL 13+
- Git

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd portfolio-app
```

### 2️⃣ Backend Setup

#### Install PostgreSQL

Make sure PostgreSQL is installed and running on your machine.

**macOS (Homebrew):**

```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

#### Create Database

```bash
# Login to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE portfolio;
CREATE USER portfoliouser WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE portfolio TO portfoliouser;
\q
```

#### Initialize Schema

```bash
cd backend
psql -U portfoliouser -d portfolio -f schema.sql
```

#### Configure Environment

```bash
cp .env.example .env
# Edit .env with your database credentials
```

Example `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=portfoliouser
DB_PASSWORD=yourpassword
DB_NAME=portfolio
DB_SSLMODE=disable
PORT=8080
ADMIN_SECRET=change-this-to-a-strong-secret
FRONTEND_URL=http://localhost:5173
```

#### Install Dependencies & Run

```bash
go mod download
go run .
```

Backend will start on `http://localhost:8080`

### 3️⃣ Frontend Setup

```bash
cd frontend
cp .env.example .env
# Edit .env if needed
```

Example `.env`:

```env
VITE_API_URL=http://localhost:8080/api
VITE_ADMIN_SECRET=change-this-to-a-strong-secret
```

**⚠️ Important**: The `VITE_ADMIN_SECRET` must match the `ADMIN_SECRET` in your backend `.env` file!

#### Install Dependencies & Run

```bash
npm install
npm run dev
```

Frontend will start on `http://localhost:5173`

## 🎨 Customization

### Update Personal Information

1. **Hero Section** (`frontend/src/components/Hero.jsx`):
   - Update your name, bio, and social links

2. **Skills** (`frontend/src/components/Skills.jsx`):
   - Modify the `skillsData` array with your skills

3. **Contact** (`frontend/src/components/Contact.jsx`):
   - Update contact methods and location

4. **Navbar/Footer** (`frontend/src/components/`):
   - Change branding and links

### Color Scheme

Edit `frontend/tailwind.config.js` to customize colors:

```js
colors: {
  primary: { /* your colors */ },
  accent: { /* your accent colors */ }
}
```

## 🔐 Admin Panel Access

1. Navigate to `http://localhost:5173/admin`
2. The admin panel is protected by the `X-Admin-Secret` header
3. This is automatically sent from the frontend using the `VITE_ADMIN_SECRET` environment variable
4. Make sure both frontend and backend have matching secrets

### Managing Projects

- **Create**: Click "New Project" button
- **Edit**: Click edit icon on any project card
- **Delete**: Click delete icon (with confirmation)
- All changes are saved to PostgreSQL immediately

## 📦 API Endpoints

### Public Routes

```
GET    /api/projects       # Get all projects
GET    /api/projects/:id   # Get single project
GET    /api/skills         # Get all skills
```

### Protected Routes (require X-Admin-Secret header)

```
POST   /api/projects       # Create new project
PUT    /api/projects/:id   # Update project
DELETE /api/projects/:id   # Delete project
```

### Example API Call

```javascript
const response = await fetch("http://localhost:8080/api/projects", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Admin-Secret": "your-secret-key",
  },
  body: JSON.stringify({
    title: "My Project",
    description: "Project description",
    tech_stack: ["Go", "React"],
    image_url: "https://example.com/image.jpg",
    github_link: "https://github.com/...",
    demo_link: "https://demo.example.com",
  }),
});
```

## 🚀 Deployment to Render.com

### Backend Deployment

1. **Create PostgreSQL Database** on Render:
   - Go to [render.com](https://render.com) → New → PostgreSQL
   - Copy the **Internal Database URL**

2. **Create Web Service**:
   - New → Web Service
   - Connect your Git repository
   - Settings:
     - **Build Command**: `go build -o main .`
     - **Start Command**: `./main`
     - **Environment**: Go

3. **Add Environment Variables**:

   ```
   DATABASE_URL=<your-render-postgres-url>
   ADMIN_SECRET=<strong-random-secret>
   FRONTEND_URL=<your-frontend-url>
   PORT=8080
   GIN_MODE=release
   ```

4. Deploy and copy your backend URL (e.g., `https://your-app.onrender.com`)

### Frontend Deployment

1. **Update API URL**:
   - Set `VITE_API_URL` to your backend URL: `https://your-app.onrender.com/api`

2. **Build Locally**:

   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy on Render**:
   - New → Static Site
   - Connect repository
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

## 🐳 Docker Deployment

### Backend

```bash
cd backend
docker build -t portfolio-backend .
docker run -p 8080:8080 \
  -e DATABASE_URL="postgres://..." \
  -e ADMIN_SECRET="your-secret" \
  portfolio-backend
```

### Using Docker Compose

Create `docker-compose.yml` at the root:

```yaml
version: "3.8"
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: portfolio
      POSTGRES_USER: portfoliouser
      POSTGRES_PASSWORD: yourpassword
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: "postgres://portfoliouser:yourpassword@postgres:5432/portfolio?sslmode=disable"
      ADMIN_SECRET: "your-secret-key"
      FRONTEND_URL: "http://localhost:5173"
    depends_on:
      - postgres

volumes:
  postgres_data:
```

Run:

```bash
docker-compose up -d
```

## 🧪 Testing

### Backend

```bash
cd backend
go test ./...
```

### Frontend

```bash
cd frontend
npm run lint
npm run build
```

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 💡 Tips

1. **Keep your admin secret secure** - Never commit it to version control
2. **Use environment variables** for all sensitive data
3. **Optimize images** - Use compressed images and CDNs for better performance
4. **Regular backups** - Back up your PostgreSQL database regularly
5. **Monitor API calls** - Use rate limiting in production

## 🐛 Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running: `pg_isready`
- Check credentials in `.env`
- Ensure database exists: `psql -l`

### CORS Errors

- Verify `FRONTEND_URL` in backend `.env`
- Check frontend is running on allowed origin

### Admin Panel Not Working

- Ensure `VITE_ADMIN_SECRET` matches backend `ADMIN_SECRET`
- Check browser console for errors
- Verify API URL in frontend `.env`

## 📧 Support

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ using Go(Gin) and React
