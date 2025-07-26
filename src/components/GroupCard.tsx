import { Users, Image, MessageSquare, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GroupCardProps {
  name: string;
  description: string;
  memberCount: number;
  snapshotCount: number;
  commentCount: number;
  role: "Admin" | "Read-only" | "Write-only" | "Read/Write";
  lastActivity: string;
  color: string;
}

export const GroupCard = ({ 
  name, 
  description, 
  memberCount, 
  snapshotCount, 
  commentCount, 
  role, 
  lastActivity,
  color 
}: GroupCardProps) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "bg-accent text-accent-foreground";
      case "Read/Write": return "bg-primary-soft text-primary";
      case "Write-only": return "bg-warning/10 text-warning-foreground";
      case "Read-only": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm hover-lift hover:border-border-hover transition-all duration-smooth animate-in">
      {/* Colored accent bar */}
      <div 
        className="absolute top-0 left-0 h-1 w-full"
        style={{ backgroundColor: color }}
      />
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <Badge variant="secondary" className={getRoleColor(role)}>
              {role}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
        </div>
        <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-card-foreground">{memberCount}</span>
          <span className="text-muted-foreground">members</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Image className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-card-foreground">{snapshotCount}</span>
          <span className="text-muted-foreground">snapshots</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-card-foreground">{commentCount}</span>
          <span className="text-muted-foreground">comments</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Last activity {lastActivity}
        </p>
        <Button variant="soft" size="sm" className="interactive-scale">
          View Group
        </Button>
      </div>
    </div>
  );
};