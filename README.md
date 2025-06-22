# Social Media App - React + Node.js

A full-stack social media application with React.js frontend and Node.js/Express.js backend.

## 🚀 Quick Start

### 1. Backend Setup
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
\`\`\`

### 2. Frontend Setup
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

## 📋 Environment Variables

Create `backend/.env`:
\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/social_media
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
\`\`\`

## ✨ Features

- 🔐 JWT Authentication
- 👤 User Profiles
- 📝 Create Posts
- ❤️ Like Posts
- 📱 Responsive Design

## 🛠️ Tech Stack

**Frontend:** React.js, Tailwind CSS, Axios
**Backend:** Node.js, Express.js, MongoDB, JWT

## 📁 Project Structure

\`\`\`
├── backend/          # Express.js API
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── middleware/   # Auth middleware
│   └── server.js     # Main server file
└── frontend/         # React.js app
    └── src/
        ├── components/
        ├── contexts/
        └── services/
\`\`\`

That's it! This is My social media app is ready to use.
