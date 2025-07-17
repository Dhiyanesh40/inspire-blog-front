import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun, Edit3 } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 transition-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-glow">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Edit3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Blogify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-smooth hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className={`text-sm font-medium transition-smooth hover:text-primary ${
                isActive('/blogs') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Blogs
            </Link>
            <Link
              to="/write"
              className={`text-sm font-medium transition-smooth hover:text-primary ${
                isActive('/write') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Write
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="transition-smooth hover-glow"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Link to="/login">
              <Button variant="outline" size="sm" className="transition-smooth hover-lift">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-gradient-primary hover:opacity-90 transition-smooth hover-lift">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="transition-smooth"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="transition-smooth"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 shadow-card">
              <Link
                to="/"
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
                  isActive('/') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/blogs"
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
                  isActive('/blogs') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link
                to="/write"
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
                  isActive('/write') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Write
              </Link>
              <div className="border-t border-border pt-3 mt-3">
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mb-2 transition-smooth"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;