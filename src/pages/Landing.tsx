import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Users, MessageSquare, Shield, ArrowRight, Zap, Star, CheckCircle } from "lucide-react";

interface LandingProps {
  onGetStarted: () => void;
  onAdminAccess: () => void;
}

export const Landing = ({ onGetStarted, onAdminAccess }: LandingProps) => {
  const features = [
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Visual Collaboration",
      description: "Upload screenshots and annotate with precision"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Management",
      description: "Role-based access control for seamless collaboration"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Smart Comments",
      description: "Contextual feedback with threaded discussions"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Private",
      description: "Enterprise-grade security for your projects"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      company: "TechCorp",
      content: "SnapFlow revolutionized our design review process. The visual feedback is incredibly intuitive.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Dev Team Lead",
      company: "StartupXYZ",
      content: "Finally, a tool that bridges the gap between designers and developers seamlessly.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Camera className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">SnapFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={onGetStarted} className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={onAdminAccess} className="gap-2">
              <Shield className="h-4 w-4" />
              Admin Access
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted mb-8">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Visual collaboration made simple</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
            Design Feedback
            <span className="text-primary block">Reimagined</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Streamline your design review process with interactive commenting, 
            role-based access, and seamless team collaboration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={onGetStarted} className="h-12 px-8 text-lg">
              Start Free Trial
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need for visual collaboration
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make design feedback faster, clearer, and more actionable.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-border hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by teams worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our users have to say about SnapFlow
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <Card className="border-border bg-muted/50">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to transform your workflow?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams who are already using SnapFlow to streamline their design processes.
            </p>
            <Button size="lg" onClick={onGetStarted} className="h-12 px-8 text-lg">
              Get Started for Free
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <Camera className="h-3 w-3 text-primary-foreground" />
              </div>
              <span className="font-semibold">SnapFlow</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 SnapFlow. All rights reserved.</span>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}; 