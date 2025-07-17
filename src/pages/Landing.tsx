import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BlogCard from '@/components/BlogCard';
import { getRandomBlogs } from '@/data/blogs';
import { ArrowRight, Edit3, Users, TrendingUp, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const Landing: React.FC = () => {
  const featuredBlogs = getRandomBlogs(3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-[80vh] flex items-center">
        <div className="absolute inset-0 opacity-10">
          <img
            src={heroImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Write. Share.{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Inspire.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join thousands of writers sharing their stories, insights, and expertise 
              on the modern blogging platform built for creators.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 transition-spring hover-lift text-lg px-8 py-6"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/blogs">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 transition-spring hover-lift text-lg px-8 py-6"
                >
                  Browse Blogs
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-bounce-gentle opacity-20">
          <Edit3 className="h-12 w-12 text-white" />
        </div>
        <div className="absolute top-40 right-16 animate-bounce-gentle opacity-20" style={{ animationDelay: '1s' }}>
          <Sparkles className="h-8 w-8 text-white" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose BlogCraft?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, share, and grow your audience in one beautiful platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-scale-in">
              <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-6 shadow-glow">
                <Edit3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Beautiful Editor</h3>
              <p className="text-muted-foreground">
                Write with our intuitive, distraction-free editor that makes formatting 
                and publishing a breeze.
              </p>
            </div>

            <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-6 shadow-glow">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Growing Community</h3>
              <p className="text-muted-foreground">
                Connect with like-minded writers and readers. Build your audience 
                and discover amazing content.
              </p>
            </div>

            <div className="text-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-6 shadow-glow">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Analytics & Insights</h3>
              <p className="text-muted-foreground">
                Track your content performance and understand your audience 
                with detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Featured Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the latest insights and stories from our community of writers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog, index) => (
              <div 
                key={blog.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in">
            <Link to="/blogs">
              <Button 
                variant="outline" 
                size="lg"
                className="hover-lift transition-spring"
              >
                View All Blogs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl text-white/90 mb-8 animate-fade-in">
            Join thousands of writers who trust BlogCraft to share their ideas with the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 transition-spring hover-lift text-lg px-8 py-6"
              >
                Start Writing Today
                <Edit3 className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 transition-spring hover-lift text-lg px-8 py-6"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;