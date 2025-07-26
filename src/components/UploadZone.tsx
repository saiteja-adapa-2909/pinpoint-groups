import { Upload, Image, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const UploadZone = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop logic here
  };

  return (
    <div 
      className={`
        relative rounded-lg border-2 border-dashed p-8 text-center transition-all duration-smooth
        ${isDragOver 
          ? 'border-primary bg-primary-soft' 
          : 'border-border hover:border-border-hover hover:bg-muted/30'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-4">
        <div className={`
          rounded-full p-3 transition-colors
          ${isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
        `}>
          {isDragOver ? (
            <Plus className="h-8 w-8" />
          ) : (
            <Upload className="h-8 w-8" />
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-card-foreground">
            {isDragOver ? 'Drop your image here' : 'Upload a snapshot'}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Drag and drop your screenshot here, or click to browse. 
            Supports PNG, JPG, and GIF files up to 10MB.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="default" className="interactive-scale">
            <Image className="h-4 w-4 mr-2" />
            Choose File
          </Button>
          <span className="text-xs text-muted-foreground">or</span>
          <Button variant="outline" className="interactive-scale">
            Take Screenshot
          </Button>
        </div>
      </div>
    </div>
  );
};