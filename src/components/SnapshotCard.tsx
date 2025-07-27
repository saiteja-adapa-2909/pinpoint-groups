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
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-all duration-smooth">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img 
          src={imageUrl} 
          alt={title}
          className="h-full w-full object-cover"
        />
        
        {/* Pin indicator overlay */}
        {pinCount > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-md px-2 py-1">
            <Pin className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium">{pinCount}</span>
          </div>
        )}
        
        {/* Priority badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className={`${getPriorityColor(priority)} text-xs`}>
            <AlertCircle className="h-3 w-3 mr-1" />
            {priority}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-card-foreground mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{deviceInfo}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">By {uploader}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">{uploadDate}</span>
          </div>
          {assignedTo && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Assigned to {assignedTo}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{commentCount} comments</span>
          </div>
          <Button variant="secondary" size="sm" className="font-medium text-xs px-3 py-1.5">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};