import { Users, Image, MessageSquare, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface GroupCardProps {
  id: string;
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
  id,
  name, 
  description, 
  memberCount, 
  snapshotCount, 
  commentCount, 
  role, 
  lastActivity,
  color 
}: GroupCardProps) => {
  const navigate = useNavigate();
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
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-smooth">
      {/* Colored accent bar */}
      <div 
        className="absolute top-0 left-0 h-0.5 w-full"
        style={{ backgroundColor: color }}
      />
      
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1 pr-3">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            {name}
          </h3>
          <Badge variant="outline" className={`${getRoleColor(role)} mb-3 text-xs`}>
            {role}
          </Badge>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-lg font-semibold text-card-foreground">{memberCount}</div>
          <div className="text-xs text-muted-foreground">members</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Image className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-lg font-semibold text-card-foreground">{snapshotCount}</div>
          <div className="text-xs text-muted-foreground">snapshots</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-lg font-semibold text-card-foreground">{commentCount}</div>
          <div className="text-xs text-muted-foreground">comments</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          {lastActivity}
        </p>
        <Button 
          variant="secondary" 
          size="sm" 
          className="font-medium text-xs px-3 py-1.5"
          onClick={() => navigate(`/group/${id}`)}
        >
          Open Group
        </Button>
      </div>
    </div>
  );
};