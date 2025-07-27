import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Shield, Phone, MessageSquare } from "lucide-react";

interface ContactAdminScreenProps {
  email: string;
  onBack: () => void;
}

export const ContactAdminScreen = ({ email, onBack }: ContactAdminScreenProps) => {
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
          Back to Sign Up
        </Button>

        {/* Main Content */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 mb-4">
            <Shield className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Restricted</h1>
          <p className="text-muted-foreground">
            Your email address is not approved for registration
          </p>
        </div>

        {/* Email Display */}
        <Card className="mb-6 border-destructive/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-destructive" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Attempted Email</p>
                <p className="font-medium text-foreground">{email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-xl border-border">
          <CardHeader className="text-center">
            <CardTitle>Contact Your Administrator</CardTitle>
            <CardDescription>
              Please reach out to your system administrator to request access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Mail className="h-4 w-4 text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium">Email Administrator</p>
                  <p className="text-xs text-muted-foreground">admin@snapflow.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Phone className="h-4 w-4 text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium">Call Support</p>
                  <p className="text-xs text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <MessageSquare className="h-4 w-4 text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium">Live Chat</p>
                  <p className="text-xs text-muted-foreground">Available 24/7</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-primary/5 border border-primary/20 rounded-md">
              <p className="text-xs text-primary">
                <strong>What to include in your request:</strong>
              </p>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>• Your full name and role</li>
                <li>• Email address you want to register</li>
                <li>• Reason for needing access</li>
                <li>• Preferred permission level</li>
              </ul>
            </div>

            <Button onClick={onBack} className="w-full">
              Try Different Email
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 