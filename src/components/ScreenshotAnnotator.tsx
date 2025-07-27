import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Save, 
  MessageSquare, 
  MapPin, 
  RotateCcw,
  Download,
  Share2,
  Plus
} from "lucide-react";

interface Comment {
  id: string;
  x: number;
  y: number;
  text: string;
  author: string;
  timestamp: Date;
  assignedTo: string;
  priority: "High" | "Medium" | "Low";
}

interface ScreenshotAnnotatorProps {
  file: File;
  onSave: (comments: Comment[]) => void;
  onCancel: () => void;
  groupName: string;
}

export const ScreenshotAnnotator = ({ file, onSave, onCancel, groupName }: ScreenshotAnnotatorProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [newCommentPosition, setNewCommentPosition] = useState({ x: 0, y: 0 });
  const [newCommentAssignedTo, setNewCommentAssignedTo] = useState("Unassigned");
  const [newCommentPriority, setNewCommentPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load image when component mounts
  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isAddingComment) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setNewCommentPosition({ x, y });
    setSelectedComment(null);
  };

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      x: newCommentPosition.x,
      y: newCommentPosition.y,
      text: newCommentText,
      author: "You", // In real app, get from auth context
      timestamp: new Date(),
      assignedTo: newCommentAssignedTo,
      priority: newCommentPriority
    };

    setComments([...comments, newComment]);
    setNewCommentText("");
    setNewCommentAssignedTo("Unassigned");
    setNewCommentPriority("Medium");
    setIsAddingComment(false);
    setSelectedComment(newComment);
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter(c => c.id !== commentId));
    if (selectedComment?.id === commentId) {
      setSelectedComment(null);
    }
  };

  const handleSave = () => {
    onSave(comments);
  };

  const getCommentStyle = (comment: Comment) => ({
    left: `${comment.x}%`,
    top: `${comment.y}%`,
    transform: 'translate(-50%, -50%)'
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-destructive text-destructive-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Low": return "bg-success text-success-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl max-h-[95vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div>
            <CardTitle className="text-xl">Annotate Screenshot</CardTitle>
            <CardDescription>
              Add comments to your screenshot for {groupName}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {comments.length} comments
            </Badge>
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="flex h-[calc(95vh-120px)]">
            {/* Image Section */}
            <div className="flex-1 relative overflow-auto bg-muted/20">
              <div 
                ref={containerRef}
                className="relative inline-block min-w-full min-h-full flex items-center justify-center p-4"
              >
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="Screenshot to annotate"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg cursor-crosshair"
                  onClick={handleImageClick}
                  style={{ cursor: isAddingComment ? 'crosshair' : 'default' }}
                />

                {/* Comment Markers */}
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`absolute w-6 h-6 rounded-full border-2 cursor-pointer transition-all hover:scale-110 ${
                      selectedComment?.id === comment.id
                        ? 'bg-primary border-primary shadow-lg'
                        : 'bg-destructive border-destructive'
                    }`}
                    style={getCommentStyle(comment)}
                    onClick={() => setSelectedComment(comment)}
                  >
                    <MessageSquare className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                ))}

                {/* New Comment Position Indicator */}
                {isAddingComment && (
                  <div
                    className="absolute w-6 h-6 rounded-full border-2 border-primary bg-primary/20 animate-pulse"
                    style={getCommentStyle({ x: newCommentPosition.x, y: newCommentPosition.y } as Comment)}
                  >
                    <MapPin className="w-4 h-4 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-80 border-l bg-muted/20 flex flex-col">
              {/* Toolbar */}
              <div className="p-4 border-b bg-background">
                <div className="flex items-center gap-2 mb-4">
                  <Button
                    variant={isAddingComment ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsAddingComment(!isAddingComment)}
                    className="flex-1"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Comment
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                {isAddingComment && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-foreground">Assigned To</label>
                      <select
                        value={newCommentAssignedTo}
                        onChange={(e) => setNewCommentAssignedTo(e.target.value)}
                        className="w-full px-3 py-1.5 text-sm border border-border rounded-md bg-background"
                      >
                        <option value="Unassigned">Unassigned</option>
                        <option value="John Doe">John Doe</option>
                        <option value="Sarah Chen">Sarah Chen</option>
                        <option value="Mike Johnson">Mike Johnson</option>
                        <option value="Emily Davis">Emily Davis</option>
                        <option value="Alex Smith">Alex Smith</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-foreground">Priority</label>
                      <select
                        value={newCommentPriority}
                        onChange={(e) => setNewCommentPriority(e.target.value as "High" | "Medium" | "Low")}
                        className="w-full px-3 py-1.5 text-sm border border-border rounded-md bg-background"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-foreground">Comment *</label>
                      <Textarea
                        placeholder="Add your comment..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        rows={3}
                        className="text-sm"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={handleAddComment}
                        disabled={!newCommentText.trim()}
                        className="flex-1"
                      >
                        Add Comment
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setIsAddingComment(false);
                          setNewCommentText("");
                          setNewCommentAssignedTo("Unassigned");
                          setNewCommentPriority("Medium");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {comments.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No comments yet</p>
                    <p className="text-xs">Click "Add Comment" to get started</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        selectedComment?.id === comment.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-background hover:border-border-hover'
                      }`}
                      onClick={() => setSelectedComment(comment)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-destructive" />
                          <span className="text-xs font-medium text-muted-foreground">
                            {comment.author}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteComment(comment.id);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="space-y-1 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Assigned to:</span>
                          <span className="text-xs font-medium">{comment.assignedTo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Priority:</span>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getPriorityColor(comment.priority)}`}
                          >
                            {comment.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-foreground mb-1">{comment.text}</p>
                      <p className="text-xs text-muted-foreground">
                        {comment.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t bg-background">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    className="flex-1"
                    onClick={handleSave}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 