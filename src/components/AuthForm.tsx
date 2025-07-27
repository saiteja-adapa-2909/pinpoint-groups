import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock, User, Mail, Camera, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ContactAdminScreen } from "./ContactAdminScreen";

interface AuthFormProps {
  onAuthSuccess: () => void;
  onBack: () => void;
}

export const AuthForm = ({ onAuthSuccess, onBack }: AuthFormProps) => {
  const { login, isEmailApproved } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [signupStep, setSignupStep] = useState<"email" | "password" | "contact">("email");
  const [attemptedEmail, setAttemptedEmail] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      // Simple login validation
      if (formData.username === "admin" && formData.password === "admin123") {
        login(formData.username);
        onAuthSuccess();
      } else {
        setError("Invalid username or password");
      }
    } else {
      // Signup flow
      if (signupStep === "email") {
        if (formData.email) {
          if (isEmailApproved(formData.email)) {
            setSignupStep("password");
            setAttemptedEmail(formData.email);
          } else {
            setAttemptedEmail(formData.email);
            setSignupStep("contact");
          }
        } else {
          setError("Please enter your email address");
        }
      } else if (signupStep === "password") {
        if (formData.username && formData.password) {
          login(formData.username);
          onAuthSuccess();
        } else {
          setError("Please fill in all fields");
        }
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleBackToEmail = () => {
    setSignupStep("email");
    setFormData({ ...formData, email: "" });
    setError("");
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setSignupStep("email");
    setError("");
    setFormData({ username: "", email: "", password: "" });
  };

  // Show contact admin screen if email is not approved
  if (signupStep === "contact") {
    return <ContactAdminScreen email={attemptedEmail} onBack={handleBackToEmail} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="absolute top-6 left-6 gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <Camera className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">SnapFlow</h1>
          <p className="text-muted-foreground">
            {isLogin ? "Welcome back" : signupStep === "email" ? "Create your account" : "Complete your registration"}
          </p>
        </div>

        {/* Auth Form */}
        <Card className="shadow-xl border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isLogin ? "Sign In" : signupStep === "email" ? "Sign Up" : "Set Password"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin 
                ? "Enter your credentials to access your account"
                : signupStep === "email"
                ? "Enter your email to check if you're approved"
                : `Setting up account for ${attemptedEmail}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && signupStep === "email" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              {(isLogin || signupStep === "password") && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={isLogin ? "admin" : "Choose a username"}
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              {(isLogin || signupStep === "password") && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={isLogin ? "admin123" : "Create a password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full h-11">
                {isLogin ? "Sign In" : signupStep === "email" ? "Check Email" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold text-primary"
                  onClick={handleToggleMode}
                >
                  {isLogin ? " Sign up" : " Sign in"}
                </Button>
              </p>
            </div>

            {isLogin && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground text-center">
                  Demo credentials: <br />
                  <span className="font-mono">username: admin</span> <br />
                  <span className="font-mono">password: admin123</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 