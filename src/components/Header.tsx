import { Camera, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "./DarkModeToggle";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Camera className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">SnapFlow</h1>
              <p className="text-xs text-muted-foreground">Visual Collaboration</p>
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Groups
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Activity
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <Button variant="ghost" size="icon-sm">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};