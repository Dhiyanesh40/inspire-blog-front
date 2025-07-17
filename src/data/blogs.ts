import { Blog } from '../types/blog';

export const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    summary: 'Explore the latest trends and technologies that are reshaping the web development landscape this year.',
    content: `
# The Future of Web Development: Trends to Watch in 2024

The web development landscape is constantly evolving, and 2024 has brought some exciting new trends and technologies that are reshaping how we build digital experiences.

## AI-Powered Development Tools

Artificial Intelligence is revolutionizing how developers write code. From GitHub Copilot to ChatGPT, AI assistants are becoming integral parts of the development workflow. These tools not only speed up coding but also help with debugging, code reviews, and even architectural decisions.

> "AI is not replacing developers; it's empowering them to focus on higher-level problem solving." - Tech Industry Expert

## WebAssembly (WASM) Goes Mainstream

WebAssembly is finally hitting its stride in 2024. With improved tooling and broader browser support, we're seeing more applications leverage WASM for performance-critical tasks. Games, image processing, and even entire applications are now running at near-native speeds in the browser.

## The Rise of Edge Computing

Edge computing is changing how we think about application architecture. By processing data closer to users, we can dramatically reduce latency and improve user experiences. Platforms like Vercel Edge Functions and Cloudflare Workers are making edge deployment more accessible than ever.

### Key Benefits of Edge Computing:

- Reduced latency
- Improved performance
- Better user experience
- Enhanced security

## Progressive Web Apps (PWAs) Evolution

PWAs continue to bridge the gap between web and native applications. With new capabilities being added regularly, PWAs are becoming more powerful and app-like. Features like background sync, push notifications, and offline functionality are now standard.

## Conclusion

The future of web development is bright, with AI, WebAssembly, edge computing, and PWAs leading the charge. As developers, staying updated with these trends will be crucial for building the next generation of web applications.

What trend are you most excited about? Share your thoughts in the comments below!
    `,
    author: 'Sarah Chen',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b27c?w=150&h=150&fit=crop&crop=face',
    date: '2024-01-15',
    tags: ['Web Development', 'AI', 'WebAssembly', 'Edge Computing'],
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    readTime: 8,
    likes: 142,
    comments: 23
  },
  {
    id: '2',
    title: 'Mastering React Hooks: A Comprehensive Guide',
    summary: 'Deep dive into React Hooks and learn how to use them effectively in your applications.',
    content: `
# Mastering React Hooks: A Comprehensive Guide

React Hooks have transformed how we write React components. Since their introduction, they've become the standard way to manage state and side effects in functional components.

## Understanding useState

The useState hook is the foundation of state management in functional components:

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

This simple hook replaces the need for class components in most cases, making our code more concise and easier to understand.

## useEffect for Side Effects

The useEffect hook handles side effects like API calls, subscriptions, and DOM manipulation:

\`\`\`javascript
useEffect(() => {
  fetchData();
}, [dependency]);
\`\`\`

## Custom Hooks: The Real Power

Custom hooks allow you to extract component logic into reusable functions. They're the secret sauce that makes React so powerful for building scalable applications.

### Example: useLocalStorage Hook

\`\`\`javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setStoredValue = (value) => {
    setValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, setStoredValue];
}
\`\`\`

## Best Practices

1. **Follow the Rules of Hooks**: Only call hooks at the top level of components
2. **Use the exhaustive-deps ESLint rule**: It will help you avoid bugs
3. **Separate concerns**: Create custom hooks for different pieces of functionality
4. **Optimize with useMemo and useCallback**: But don't overuse them

## Conclusion

React Hooks have made React development more enjoyable and productive. By mastering these patterns, you'll be able to build more maintainable and efficient applications.

Happy coding!
    `,
    author: 'Mike Johnson',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    date: '2024-01-12',
    tags: ['React', 'JavaScript', 'Hooks', 'Frontend'],
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    readTime: 12,
    likes: 89,
    comments: 15
  },
  {
    id: '3',
    title: 'Building Scalable APIs with Node.js and Express',
    summary: 'Learn best practices for creating robust and scalable backend APIs using Node.js and Express.',
    content: `
# Building Scalable APIs with Node.js and Express

Building scalable APIs is crucial for modern web applications. With Node.js and Express, you can create robust backend services that handle millions of requests efficiently.

## Setting Up Your Express Server

Start with a clean, organized structure:

\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Implementing Middleware

Middleware is the backbone of Express applications. Use it for authentication, logging, error handling, and more:

\`\`\`javascript
// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401);
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
\`\`\`

## Database Design and ORM

Choose the right database for your needs. MongoDB with Mongoose or PostgreSQL with Prisma are excellent choices:

\`\`\`javascript
// Mongoose example
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
\`\`\`

## Error Handling

Implement comprehensive error handling to make debugging easier:

\`\`\`javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});
\`\`\`

## Performance Optimization

- Use compression middleware
- Implement caching strategies
- Optimize database queries
- Use connection pooling

## Security Best Practices

1. **Use HTTPS everywhere**
2. **Validate and sanitize input**
3. **Implement rate limiting**
4. **Use security headers with Helmet**
5. **Keep dependencies updated**

## Testing Your API

Write comprehensive tests using Jest and Supertest:

\`\`\`javascript
describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.email).toBe('test@example.com');
  });
});
\`\`\`

## Conclusion

Building scalable APIs requires careful planning, good architecture, and attention to best practices. By following these guidelines, you'll create APIs that can grow with your application and handle real-world traffic.

Remember: start simple, test everything, and optimize when you have real performance data.
    `,
    author: 'Emily Rodriguez',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    date: '2024-01-10',
    tags: ['Node.js', 'Express', 'API', 'Backend'],
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    readTime: 15,
    likes: 234,
    comments: 31
  },
  {
    id: '4',
    title: 'CSS Grid vs Flexbox: When to Use Each',
    summary: 'Understanding the differences between CSS Grid and Flexbox and when to use each layout method.',
    content: `
# CSS Grid vs Flexbox: When to Use Each

CSS Grid and Flexbox are two powerful layout systems that have revolutionized web design. While they might seem similar, each has its strengths and ideal use cases.

## Understanding Flexbox

Flexbox excels at one-dimensional layouts. It's perfect for distributing space along a single axis:

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

### When to Use Flexbox:
- Navigation bars
- Centering content
- Distributing space between items
- Creating responsive button groups

## Understanding CSS Grid

CSS Grid is designed for two-dimensional layouts. It gives you precise control over both rows and columns:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
\`\`\`

### When to Use CSS Grid:
- Complex page layouts
- Card layouts
- Magazine-style designs
- Any layout requiring precise positioning

## Real-World Examples

### Example 1: Navigation Bar (Flexbox)
\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}
\`\`\`

### Example 2: Article Layout (Grid)
\`\`\`css
.article-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content ads"
    "footer footer footer";
  grid-template-columns: 200px 1fr 150px;
  grid-gap: 20px;
}
\`\`\`

## Combining Both

The real power comes from using both together:

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
\`\`\`

## Browser Support

Both Flexbox and CSS Grid have excellent browser support in modern browsers. However, if you need to support very old browsers, Flexbox has slightly better compatibility.

## Performance Considerations

- **Grid**: Slightly more complex calculations but optimized by browsers
- **Flexbox**: Simpler calculations, very fast for one-dimensional layouts

## Conclusion

Don't think of Grid vs Flexbox as an either/or choice. They complement each other perfectly:

- Use **Flexbox** for component-level layouts and one-dimensional arrangements
- Use **CSS Grid** for page-level layouts and two-dimensional designs

Master both, and you'll have all the tools you need to create any layout imaginable!
    `,
    author: 'Alex Thompson',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    date: '2024-01-08',
    tags: ['CSS', 'Layout', 'Grid', 'Flexbox'],
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    readTime: 10,
    likes: 156,
    comments: 19
  },
  {
    id: '5',
    title: 'Introduction to TypeScript: Why Every JavaScript Developer Should Learn It',
    summary: 'Discover the benefits of TypeScript and how it can improve your JavaScript development experience.',
    content: `
# Introduction to TypeScript: Why Every JavaScript Developer Should Learn It

TypeScript has become an essential tool for modern JavaScript development. If you're still writing plain JavaScript, you're missing out on incredible productivity gains and better code quality.

## What is TypeScript?

TypeScript is a superset of JavaScript that adds static type definitions. It compiles to plain JavaScript and runs anywhere JavaScript runs.

\`\`\`typescript
// JavaScript
function greet(name) {
  return "Hello, " + name;
}

// TypeScript
function greet(name: string): string {
  return "Hello, " + name;
}
\`\`\`

## Key Benefits

### 1. Catch Errors Early

TypeScript catches errors at compile time, not runtime:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function processUser(user: User) {
  console.log(user.name.toUpperCase()); // Safe!
  // console.log(user.age); // Error: Property 'age' doesn't exist
}
\`\`\`

### 2. Better IDE Support

Enhanced autocomplete, refactoring, and navigation:

\`\`\`typescript
class ApiService {
  async fetchUser(id: number): Promise<User> {
    // Your IDE knows the return type!
    const response = await fetch(\`/api/users/\${id}\`);
    return response.json();
  }
}
\`\`\`

### 3. Self-Documenting Code

Types serve as documentation:

\`\`\`typescript
interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  isPublished: boolean;
}
\`\`\`

## Advanced Features

### Generics

Create reusable components with type safety:

\`\`\`typescript
function createArray<T>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

const numbers = createArray(3, 42); // number[]
const strings = createArray(3, "hello"); // string[]
\`\`\`

### Union Types

Handle multiple types elegantly:

\`\`\`typescript
type Status = "loading" | "success" | "error";

interface ApiResponse<T> {
  status: Status;
  data?: T;
  error?: string;
}
\`\`\`

### Utility Types

TypeScript provides powerful utility types:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Pick only certain properties
type UserProfile = Pick<User, "id" | "name" | "email">;

// Make all properties optional
type PartialUser = Partial<User>;

// Omit certain properties
type UserWithoutPassword = Omit<User, "password">;
\`\`\`

## Getting Started

1. **Install TypeScript**: \`npm install -g typescript\`
2. **Create tsconfig.json**: \`tsc --init\`
3. **Start small**: Add types gradually to existing projects
4. **Use strict mode**: Enable all strict type checks

## Common Mistakes to Avoid

1. **Using \`any\` everywhere**: Defeats the purpose of TypeScript
2. **Not using strict mode**: Missing out on the best type checking
3. **Over-typing**: Sometimes inference is better than explicit types
4. **Ignoring compiler errors**: Always fix TypeScript errors

## Real-World Example

\`\`\`typescript
interface BlogService {
  getPosts(): Promise<BlogPost[]>;
  getPost(id: string): Promise<BlogPost | null>;
  createPost(post: Omit<BlogPost, "id">): Promise<BlogPost>;
  updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost>;
  deletePost(id: string): Promise<void>;
}

class ApiBlogService implements BlogService {
  private baseUrl = "/api/posts";

  async getPosts(): Promise<BlogPost[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return response.json();
  }

  // ... other methods
}
\`\`\`

## Migration Strategy

1. **Rename files**: \`.js\` → \`.ts\`, \`.jsx\` → \`.tsx\`
2. **Add basic types**: Start with function parameters and return types
3. **Define interfaces**: Create types for your data structures
4. **Enable strict mode**: Gradually increase type strictness
5. **Refactor iteratively**: Improve types over time

## Conclusion

TypeScript isn't just about adding types to JavaScript—it's about building more reliable, maintainable, and scalable applications. The initial learning curve pays dividends in reduced bugs, improved developer experience, and better code documentation.

Start your TypeScript journey today. Your future self (and your team) will thank you!

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
    `,
    author: 'David Kim',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    date: '2024-01-05',
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Development'],
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    readTime: 18,
    likes: 298,
    comments: 42
  }
];

export const featuredBlog = mockBlogs[0];
export const getRandomBlogs = (count: number = 3) => {
  const shuffled = [...mockBlogs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
