import React from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Edit3 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Blogify
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              A modern blogging platform where writers can share their thoughts, 
              ideas, and stories with the world. Write. Share. Inspire.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth hover-glow">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth hover-glow">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth hover-glow">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth hover-glow">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-smooth">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-muted-foreground hover:text-primary transition-smooth">
                  Browse Blogs
                </Link>
              </li>
              <li>
                <Link to="/write" className="text-muted-foreground hover:text-primary transition-smooth">
                  Write a Blog
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-smooth">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                  Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Blogify. All rights reserved. Built with React & Tailwind CSS.
          </p>
          <p className="text-muted-foreground text-sm mt-2 md:mt-0">
            Made with ❤️ for writers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;