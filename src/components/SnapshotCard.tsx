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
      case "High": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Medium": return "bg-warning/10 text-warning border-warning/20";
      case "Low": return "bg-success/10 text-success border-success/20";
      default: return "bg-secondary text-secondary-foreground border-border";
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card shadow-sm hover:border-border-hover hover:shadow-lg transition-all duration-smooth">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img 
          src={imageUrl} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-smooth" />
        
        {/* Pin indicator overlay */}
        {pinCount > 0 && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 glass rounded-full px-3 py-1.5">
            <Pin className="h-3 w-3 text-accent" />
            <span className="text-xs font-medium text-foreground">{pinCount}</span>
          </div>
        )}
        
        {/* Priority badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="outline" className={getPriorityColor(priority)}>
            <AlertCircle className="h-3 w-3 mr-1.5" />
            {priority}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{deviceInfo}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">By</span>
            <span className="font-medium text-card-foreground">{uploader}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{uploadDate}</span>
          </div>
          {assignedTo && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">Assigned to:</span>
              <span className="font-medium text-card-foreground">{assignedTo}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/30">
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