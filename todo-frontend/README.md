# Todo Frontend - React App

A beautiful React application to manage your todos, connected to the NestJS backend API.

## Features

- ✨ Beautiful, modern UI with gradient design
- 📝 Create new todos with title and description
- ✅ Mark todos as complete/incomplete
- 🗑️ Delete todos
- 📊 View all todos from MongoDB
- 💫 Real-time updates

## How to Run

### 1. Make sure your NestJS backend is running

```bash
cd C:\Users\yoni\nestjs\todo-api
npm run start:dev
```

The backend should be running on `http://localhost:3000`

### 2. Start the React app

```bash
cd C:\Users\yoni\nestjs\todo-frontend
npm start
```

The React app will open automatically in your browser at `http://localhost:3001`

## What You'll See

- **Header**: "My Todo List" with a description
- **Create Todo Form**: Add new todos with title and description
- **Todos Grid**: All your todos displayed in beautiful cards
- **Actions**: Complete/Undo and Delete buttons for each todo
- **Status**: Visual badges showing if a todo is completed or pending

## API Connection

The app connects to your NestJS API at `http://localhost:3000/todos`

Make sure CORS is enabled in your NestJS backend (already configured in `main.ts`)

## Tech Stack

- React 18
- CSS3 (Gradient design, responsive layout)
- Fetch API for HTTP requests

Enjoy managing your todos! 🎉
