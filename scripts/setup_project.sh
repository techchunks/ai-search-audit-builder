#!/bin/bash

# AI Search Audit Builder - Project Setup Script
# This script initializes a new AI Search Audit project with all necessary dependencies

set -e

PROJECT_NAME="${1:-ai-search-audit}"
PROJECT_PATH="./$PROJECT_NAME"

echo "🚀 Setting up AI Search Audit project: $PROJECT_NAME"

# Create project directory
mkdir -p "$PROJECT_PATH"
cd "$PROJECT_PATH"

# Initialize Vite project
echo "📦 Creating Vite React TypeScript project..."
npm create vite@latest . -- --template react-ts --yes

# Install dependencies
echo "📥 Installing dependencies..."
npm install

# Install additional packages
echo "📥 Installing Stripe, Framer Motion, and other packages..."
npm install @stripe/react-stripe-js @stripe/stripe-js framer-motion lucide-react react-router-dom

# Create directory structure
echo "📁 Creating project structure..."
mkdir -p src/components
mkdir -p src/pages
mkdir -p src/services
mkdir -p server

# Install Tailwind CSS
echo "🎨 Setting up Tailwind CSS..."
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Create .env.example
echo "📝 Creating environment configuration..."
cat > .env.example << 'EOF'
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key_here
VITE_STRIPE_PRICE_ID_PRO=your_stripe_pro_price_id_here
VITE_STRIPE_PRICE_ID_MANAGED=your_stripe_managed_price_id_here
EOF

# Create .gitignore
echo "📝 Creating .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
/.pnp
.pnp.js

# Environment
.env
.env.local
.env.*.local

# Build
/dist
/build

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
EOF

# Initialize git
echo "🔧 Initializing Git repository..."
git init
git config user.email "dev@aiaudit.com"
git config user.name "AI Audit Dev"
git add .
git commit -m "Initial commit: AI Search Audit project setup"

echo ""
echo "✅ Project setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy environment variables: cp .env.example .env.local"
echo "2. Add your API keys to .env.local"
echo "3. Run: npm run dev"
echo ""
echo "📚 Project structure:"
echo "  src/components/  - Reusable UI components"
echo "  src/pages/       - Page components"
echo "  src/services/    - API integrations"
echo "  server/          - Backend routes"
echo ""
