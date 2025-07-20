const API_BASE_URL = 'http://localhost:5000/api';

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  author_id: string;
  cover_image?: string;
  tags: string[];
  read_time: number;
  likes: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    display_name: string;
    username?: string;
    avatar_url?: string;
    role?: string;
  } | null;
}

class ApiService {
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: this.getHeaders(),
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Auth methods
  async register(userData: {
    username: string;
    email: string;
    password: string;
    displayName: string;
  }): Promise<AuthResponse> {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    localStorage.setItem('token', response.token);
    return response;
  }

  async login(emailOrUsername: string, password: string): Promise<AuthResponse> {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ emailOrUsername, password }),
    });
    localStorage.setItem('token', response.token);
    return response;
  }

  async getCurrentUser(): Promise<{ user: User }> {
    return this.request('/auth/me');
  }

  logout() {
    localStorage.removeItem('token');
  }

  // Blog methods
  async getBlogs(): Promise<Blog[]> {
    return this.request('/blogs');
  }

  async getBlogById(id: string): Promise<Blog> {
    return this.request(`/blogs/${id}`);
  }

  async createBlog(blogData: {
    title: string;
    summary: string;
    content: string;
    coverImage?: string;
    tags: string[];
    readTime: number;
    published: boolean;
  }): Promise<Blog> {
    return this.request('/blogs', {
      method: 'POST',
      body: JSON.stringify(blogData),
    });
  }

  async updateBlog(id: string, updates: Partial<Blog>): Promise<Blog> {
    return this.request(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteBlog(id: string): Promise<void> {
    return this.request(`/blogs/${id}`, {
      method: 'DELETE',
    });
  }

  async getUserBlogs(): Promise<Blog[]> {
    return this.request('/blogs/user/my-blogs');
  }

  async likeBlog(id: string): Promise<{ likes: number; isLiked: boolean }> {
    return this.request(`/blogs/${id}/like`, {
      method: 'POST',
    });
  }

  async getAdminBlogs(): Promise<Blog[]> {
    return this.request('/blogs/admin/all');
  }
}

export const apiService = new ApiService();