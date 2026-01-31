CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tech_stack TEXT[] NOT NULL,
    image_url VARCHAR(500),
    github_link VARCHAR(500),
    demo_link VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_created_at ON projects (created_at DESC);

CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    icon_url VARCHAR(500),
    proficiency INTEGER CHECK (
        proficiency >= 1
        AND proficiency <= 5
    ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (title, description, tech_stack, image_url, github_link, demo_link) 
VALUES 
    (
        'E-Commerce Platform',
        'A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
        ARRAY['Go', 'React', 'PostgreSQL', 'Stripe', 'Redis'],
        'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
        'https://github.com/yourusername/ecommerce',
        'https://ecommerce-demo.example.com'
    ),
    (
        'Real-Time Chat Application',
        'WebSocket-based chat with room management, file sharing, and end-to-end encryption.',
        ARRAY['Node.js', 'React', 'WebSocket', 'MongoDB', 'Docker'],
        'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800',
        'https://github.com/yourusername/chat-app',
        'https://chat-demo.example.com'
    ),
    (
        'Analytics Dashboard',
        'Interactive data visualization dashboard with custom reporting and export features.',
        ARRAY['Python', 'Vue.js', 'D3.js', 'PostgreSQL', 'FastAPI'],
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        'https://github.com/yourusername/analytics',
        'https://analytics-demo.example.com'
    );

INSERT INTO
    skills (name, category, proficiency)
VALUES ('Go', 'Backend', 5),
    ('JavaScript', 'Frontend', 5),
    ('React', 'Frontend', 5),
    ('PostgreSQL', 'Database', 4),
    ('Docker', 'DevOps', 4),
    ('AWS', 'Cloud', 4);