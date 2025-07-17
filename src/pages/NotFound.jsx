import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <Button className="bg-gradient-primary hover:opacity-90 transition-spring hover-lift">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Link to="/blogs">
            <Button variant="outline" className="hover-lift transition-smooth">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Browse Blogs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;