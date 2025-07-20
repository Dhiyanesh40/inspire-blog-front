# Blog App Backend

## Setup Instructions

1. Install dependencies:
```bash
cd server
npm install
```

2. Make sure MongoDB is running on localhost:27017

3. Create a `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/blogapp
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Blogs
- GET `/api/blogs` - Get all published blogs
- GET `/api/blogs/:id` - Get single blog
- POST `/api/blogs` - Create new blog (auth required)
- PUT `/api/blogs/:id` - Update blog (auth required)
- DELETE `/api/blogs/:id` - Delete blog (auth required)
- GET `/api/blogs/user/my-blogs` - Get user's blogs (auth required)
- POST `/api/blogs/:id/like` - Like/unlike blog (auth required)
- GET `/api/blogs/admin/all` - Get all blogs (admin only)

## Default Admin User
Create an admin user by registering normally, then update the user in MongoDB Compass:
```javascript
db.users.updateOne(
  { email: "dhiyanesh@admin.com" },
  { $set: { role: "admin" } }
)
```