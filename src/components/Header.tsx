import { Camera, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "./DarkModeToggle";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 glass">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Camera className="h-8 w-8 text-primary" />
            <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-accent rounded-full" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">SnapFlow</h1>
            <p className="text-xs text-muted-foreground">Visual Collaboration</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-medium">
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-medium">
            Groups
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-medium">
            Activity
          </Button>
        </nav>

        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};