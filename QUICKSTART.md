# ⚡ Quick Start Guide

Get your portfolio running in 5 minutes!

## 📋 Prerequisites Checklist

- [ ] Go 1.21+ installed (`go version`)
- [ ] Node.js 18+ installed (`node --version`)
- [ ] PostgreSQL 13+ installed (`psql --version`)
- [ ] Git installed

## 🚀 Quick Setup (Copy & Paste)

### 1. Database Setup (30 seconds)

```bash
psql postgres -c "CREATE DATABASE portfolio;"

# Load schema (from the portfolio-app directory)
psql -d portfolio -f backend/schema.sql
```

### 2. Backend Setup (30 seconds)

```bash
cd backend

# Create environment file
cp .env.example .env

# Edit .env (update if needed, defaults work for local PostgreSQL)
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=postgres
# DB_PASSWORD=postgres
# DB_NAME=portfolio
# ADMIN_SECRET=your-super-secret-key-change-this

# Install dependencies and run
go mod download
go run .
```

✅ Backend should now be running on `http://localhost:8080`

### 3. Frontend Setup (1 minute)

Open a NEW terminal:

```bash
cd frontend

# Create environment file
cp .env.example .env

npm install

# Start development server
npm run dev
```

✅ Frontend should now be running on `http://localhost:5173`

## 🎉 You're Done!

Open your browser:

- **Portfolio**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin

## 🔑 Default Credentials

The admin panel is protected by the **admin secret** defined in your `.env` files.

**Important**: Make sure `ADMIN_SECRET` in backend/.env matches `VITE_ADMIN_SECRET` in frontend/.env

Default: `your-super-secret-key-change-this` (change this in production!)

## 🎨 First Steps

1. **Customize Your Info**: Edit these files with your personal information:
   - `frontend/src/components/Hero.jsx` - Your name and bio
   - `frontend/src/components/Skills.jsx` - Your tech skills
   - `frontend/src/components/Contact.jsx` - Your contact info

2. **Add Your First Project**:
   - Go to http://localhost:5173/admin
   - Click "New Project"
   - Fill in the form
   - Click "Create"
   - Your project appears immediately on the home page!

3. **Change Colors** (optional):
   - Edit `frontend/tailwind.config.js`
   - Modify the `colors` section

## 🐛 Troubleshooting

### "Connection refused" error

- Make sure PostgreSQL is running: `pg_isready`
- Check if database exists: `psql -l | grep portfolio`

### Backend won't start

- Verify Go version: `go version` (need 1.21+)
- Check .env file exists and has correct values
- Run `go mod download` again

### Frontend won't start

- Verify Node version: `node --version` (need 18+)
- Delete `node_modules` and run `npm install` again
- Check .env file exists

### Admin panel returns "Unauthorized"

- Ensure `ADMIN_SECRET` matches in both .env files
- Clear browser cache and reload
- Check browser console for errors

### No projects showing

- Make sure backend is running
- Check browser console Network tab
- Verify database has data: `psql -d portfolio -c "SELECT * FROM projects;"`

## 📚 Next Steps

After you have everything running:

1. Read the full [README.md](README.md) for detailed documentation
2. See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for architecture details
3. Customize the design and content to match your style
4. When ready to deploy, check the "Deployment" section in README.md

## 💡 Pro Tips

- Use the sample data in `schema.sql` to test the UI before adding your own projects
- The admin panel works offline - changes are saved to the database
- Press `Ctrl+C` in terminal to stop servers
- Use `npm run build` in frontend to create production build
- Backend API is documented in README.md under "API Endpoints"

## 🎯 Common Tasks

**Add a new project via Admin Panel:**

1. Navigate to /admin
2. Click "New Project"
3. Fill in details
4. Save

**Update project:**

1. Click edit icon on project card in admin
2. Modify fields
3. Save

**Delete project:**

1. Click delete icon
2. Confirm deletion

**View API directly:**

- GET http://localhost:8080/api/projects
- GET http://localhost:8080/api/skills

---

Need help? Check the full README.md or open an issue on GitHub!
