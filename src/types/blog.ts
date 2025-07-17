export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  authorImage: string;
  date: string;
  tags: string[];
  coverImage: string;
  readTime: number;
  likes: number;
  comments: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  date: string;
  likes: number;
}