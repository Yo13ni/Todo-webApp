   cd todo-api
   npm installTodos
GET /todos**Response:**
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
#### Get Single Todo
GET /todos/:id**Parameters:**
- `id` (string) - MongoDB ObjectId of the todo

**Response:**
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}#### Create Todo
POST /todos
Content-Type: application/json**Request Body:**on
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false
}**Response:** `201 Created`
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}#### Update Todo
PATCH /todos/:id
Content-Type: application/json**Request Body (all fields optional):**
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}**Response:**son
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Updated title",
  "description": "Updated description",
  "completed": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}#### Delete Todo
DELETE /todos/:id**Response:** `204 No Content`

### Error Responses

**400 Bad Request:**
{
  "statusCode": 400,
  "message": ["title should not be empty", "title must be a string"],
  "error": "Bad Request"
}
**404 Not Found:**on
{
  "statusCode": 404,
  "message": "Todo with ID 507f1f77bcf86cd799439011 not found",
  "error": "Not Found"
}## 🌐 Deployment

### Deploy to Vercel

This application is configured for deployment on Vercel. Follow these steps:

#### Prerequisites
- GitHub account
- Vercel account ([Sign up](https://vercel.com))

#### Steps

1. **Push to GitHub**
  
   git add .
   git commit -m "Initial commit"
   git push origin main
   2. **Deploy Backend**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Project Name:** `todo-api`
     - **Root Directory:** `todo-api`
     - **Framework Preset:** Other
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Add Environment Variable:
     - **Key:** `MONGODB_URI`
     - **Value:** Your MongoDB connection string
   - Click "Deploy"

3. **Deploy Frontend**
   - Click "Add New Project" again
   - Import the same repository
   - Configure:
     - **Project Name:** `todo-frontend`
     - **Root Directory:** `todo-frontend`
     - **Framework Preset:** Create React App
     - **Build Command:** `npm run build`
     - **Output Directory:** `build`
   - Add Environment Variable:
     - **Key:** `REACT_APP_API_URL`
     - **Value:** `https://your-backend-url.vercel.app/todos`
     - Replace `your-backend-url` with your actual backend URL
   - Click "Deploy"

4. **Access Your App**
   - Frontend: `https://your-frontend-url.vercel.app`
   - Backend API: `https://your-backend-url.vercel.app/todos`

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🧪 Testing

### Backend Tests

**Run unit tests:**
cd todo-api
npm run test**Run e2e tests:**
cd todo-api
npm run test:e2e**Run test coverage:**
cd todo-api
npm run test:cov### Frontend Tests

cd todo-frontend
npm test## 📜 Available Scripts

### Backend (`todo-api`)

| Command | Description |
|---------|-------------|
| `npm run start` | Start the application |
| `npm run start:dev` | Start in development mode (watch mode) |
| `npm run start:debug` | Start in debug mode |
| `npm run start:prod` | Start in production mode |
| `npm run build` | Build the application |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:cov` | Run tests with coverage |
| `npm run lint` | Run ESLint |

### Frontend (`todo-frontend`)

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run eject` | Eject from Create React App (irreversible) |

## 📸 Screenshots

> **Note:** Add screenshots of your application here

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) team for the amazing framework
- [React](https://reactjs.org/) team for the UI library
- [MongoDB](https://www.mongodb.com/) for the database solution
- [Vercel](https://vercel.com/) for the deployment platform
- All contributors and the open-source community

## 📚 Learning Resources

This project was built as a learning exercise for:
- RESTful API development with NestJS
- Full-stack application architecture
- MongoDB integration and data modeling
- React state management and hooks
- Modern UI/UX design principles
- Serverless function deployment

## 📞 Support

If you have any questions or run into issues, please:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact the author

---

⭐ If you found this project helpful, please give it a star on GitHub!

Made with ❤️ using NestJS and React
