#!/bin/bash

# Portfolio App Setup Script
# This script helps set up the development environment quickly

set -e

echo "Portfolio App Setup Script"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if PostgreSQL is installed
check_postgres() {
    echo -e "${BLUE}Checking PostgreSQL installation...${NC}"
    if command -v psql &> /dev/null; then
        echo -e "${GREEN}✓ PostgreSQL is installed${NC}"
        return 0
    else
        echo -e "${RED}✗ PostgreSQL is not installed${NC}"
        echo "Please install PostgreSQL before continuing."
        echo "Visit: https://www.postgresql.org/download/"
        exit 1
    fi
}

# Check if Go is installed
check_go() {
    echo -e "${BLUE}Checking Go installation...${NC}"
    if command -v go &> /dev/null; then
        echo -e "${GREEN}✓ Go is installed ($(go version))${NC}"
        return 0
    else
        echo -e "${RED}✗ Go is not installed${NC}"
        echo "Please install Go 1.21+ before continuing."
        echo "Visit: https://golang.org/doc/install"
        exit 1
    fi
}

check_node() {
    echo -e "${BLUE}Checking Node.js installation...${NC}"
    if command -v node &> /dev/null; then
        echo -e "${GREEN}✓ Node.js is installed ($(node --version))${NC}"
        return 0
    else
        echo -e "${RED}✗ Node.js is not installed${NC}"
        echo "Please install Node.js 18+ before continuing."
        echo "Visit: https://nodejs.org/"
        exit 1
    fi
}

# Setup backend
setup_backend() {
    echo ""
    echo -e "${BLUE}Setting up Backend...${NC}"
    cd backend
    
    if [ ! -f .env ]; then
        echo "Creating .env file from template..."
        cp .env.example .env
        echo -e "${GREEN}✓ Created .env file${NC}"
        echo -e "${RED}⚠ Please edit backend/.env with your database credentials${NC}"
    fi
    
    echo "Installing Go dependencies..."
    go mod download
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
    
    cd ..
}

# Setup frontend
setup_frontend() {
    echo ""
    echo -e "${BLUE}Setting up Frontend...${NC}"
    cd frontend
    
    if [ ! -f .env ]; then
        echo "Creating .env file from template..."
        cp .env.example .env
        echo -e "${GREEN}✓ Created .env file${NC}"
    fi
    
    echo "Installing npm dependencies..."
    npm install
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
    
    cd ..
}

# Database setup instructions
database_setup() {
    echo ""
    echo -e "${BLUE}Database Setup Instructions:${NC}"
    echo "1. Create a PostgreSQL database:"
    echo "   psql postgres -c \"CREATE DATABASE portfolio;\""
    echo ""
    echo "2. Create a user (optional):"
    echo "   psql postgres -c \"CREATE USER portfoliouser WITH PASSWORD 'yourpassword';\""
    echo "   psql postgres -c \"GRANT ALL PRIVILEGES ON DATABASE portfolio TO portfoliouser;\""
    echo ""
    echo "3. Run the schema:"
    echo "   psql -d portfolio -f backend/schema.sql"
    echo ""
    echo -e "${GREEN}Or run the automated setup:${NC}"
    read -p "Do you want to create the database now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        create_database
    fi
}

# Automated database creation
create_database() {
    echo -e "${BLUE}Creating database...${NC}"
    
    # Check if database exists
    if psql postgres -tAc "SELECT 1 FROM pg_database WHERE datname='portfolio'" | grep -q 1; then
        echo -e "${GREEN}✓ Database 'portfolio' already exists${NC}"
    else
        psql postgres -c "CREATE DATABASE portfolio;"
        echo -e "${GREEN}✓ Created database 'portfolio'${NC}"
    fi
    
    # Run schema
    echo "Running schema..."
    psql -d portfolio -f backend/schema.sql
    echo -e "${GREEN}✓ Schema loaded successfully${NC}"
}

# Main setup
main() {
    check_postgres
    check_go
    check_node
    setup_backend
    setup_frontend
    database_setup
    
    echo ""
    echo -e "${GREEN}=============================="
    echo "✓ Setup Complete!"
    echo "==============================${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Edit backend/.env with your database credentials"
    echo "2. Start the backend:"
    echo "   cd backend && go run ."
    echo ""
    echo "3. In a new terminal, start the frontend:"
    echo "   cd frontend && npm run dev"
    echo ""
    echo "4. Open http://localhost:5173 in your browser"
    echo ""
    echo "Admin panel: http://localhost:5173/admin"
    echo ""
}

main
