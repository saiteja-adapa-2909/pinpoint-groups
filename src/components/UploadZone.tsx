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
        relative rounded-lg border-2 border-dashed p-12 text-center transition-all duration-smooth
        ${isDragOver 
          ? 'border-primary bg-primary/5' 
          : 'border-border hover:border-primary/50'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-5">
        <div className={`
          rounded-lg p-4 transition-colors
          ${isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
        `}>
          {isDragOver ? (
            <Plus className="h-8 w-8" />
          ) : (
            <Upload className="h-8 w-8" />
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-card-foreground">
            {isDragOver ? 'Drop your image here' : 'Upload a snapshot'}
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Drag and drop your screenshot here, or click to browse. 
            Supports PNG, JPG, and GIF files up to 10MB.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button className="font-medium">
            <Image className="h-4 w-4 mr-2" />
            Choose File
          </Button>
          <span className="text-sm text-muted-foreground">or</span>
          <Button variant="outline" className="font-medium">
            Take Screenshot
          </Button>
        </div>
      </div>
    </div>
  );
};