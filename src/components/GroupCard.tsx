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
      case "Admin": return "bg-primary/10 text-primary border-primary/20";
      case "Read/Write": return "bg-accent/10 text-accent border-accent/20";
      case "Write-only": return "bg-warning/10 text-warning border-warning/20";
      case "Read-only": return "bg-muted text-muted-foreground border-border";
      default: return "bg-secondary text-secondary-foreground border-border";
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card p-8 shadow-sm hover:border-border-hover hover:shadow-lg transition-all duration-smooth">
      {/* Colored accent bar */}
      <div 
        className="absolute top-0 left-0 h-0.5 w-full"
        style={{ backgroundColor: color }}
      />
      
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1 pr-4">
          <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <Badge variant="outline" className={`${getRoleColor(role)} mb-4`}>
            {role}
          </Badge>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-semibold text-card-foreground">{memberCount}</div>
          <div className="text-xs text-muted-foreground">members</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Image className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-semibold text-card-foreground">{snapshotCount}</div>
          <div className="text-xs text-muted-foreground">snapshots</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-semibold text-card-foreground">{commentCount}</div>
          <div className="text-xs text-muted-foreground">comments</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-border/30">
        <p className="text-xs text-muted-foreground">
          {lastActivity}
        </p>
        <Button variant="soft" size="sm" className="interactive-scale">
          Open Group
        </Button>
      </div>
    </div>
  );
};