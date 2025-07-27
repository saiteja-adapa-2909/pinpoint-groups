import { Camera, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "./DarkModeToggle";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const { username, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Camera className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-lg font-semibold">SnapFlow</h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-sm">
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-sm">
            Groups
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-sm">
            Activity
          </Button>
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden md:block">
            Welcome, {username}
          </span>
          <DarkModeToggle />
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={logout}
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};