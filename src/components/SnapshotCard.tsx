import { Calendar, User, MessageSquare, AlertCircle, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SnapshotCardProps {
  id: string;
  title: string;
  imageUrl: string;
  uploader: string;
  uploadDate: string;
  deviceInfo: string;
  commentCount: number;
  priority: "Low" | "Medium" | "High";
  assignedTo?: string;
  pinCount: number;
}

export const SnapshotCard = ({
  title,
  imageUrl,
  uploader,
  uploadDate,
  deviceInfo,
  commentCount,
  priority,
  assignedTo,
  pinCount
}: SnapshotCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-destructive text-destructive-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Low": return "bg-success text-success-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm hover-lift hover:border-border-hover transition-all duration-smooth animate-in">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img 
          src={imageUrl} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-smooth" />
        
        {/* Pin indicator overlay */}
        {pinCount > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 glass rounded-full px-2 py-1">
            <Pin className="h-3 w-3 text-accent" />
            <span className="text-xs font-medium text-foreground">{pinCount}</span>
          </div>
        )}
        
        {/* Priority badge */}
        <div className="absolute top-3 left-3">
          <Badge className={getPriorityColor(priority)}>
            <AlertCircle className="h-3 w-3 mr-1" />
            {priority}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-card-foreground mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground">{deviceInfo}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">By</span>
            <span className="font-medium text-card-foreground">{uploader}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">{uploadDate}</span>
          </div>
        </div>

        {assignedTo && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Assigned to:</span>
            <span className="font-medium text-card-foreground">{assignedTo}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{commentCount} comments</span>
          </div>
          <Button variant="soft" size="sm" className="interactive-scale">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};