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
        relative rounded-2xl border-2 border-dashed p-16 text-center transition-all duration-smooth
        ${isDragOver 
          ? 'border-primary bg-primary-soft/50' 
          : 'border-border/60 hover:border-border-hover hover:bg-muted/20'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-6">
        <div className={`
          rounded-2xl p-6 transition-colors
          ${isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
        `}>
          {isDragOver ? (
            <Plus className="h-12 w-12" />
          ) : (
            <Upload className="h-12 w-12" />
          )}
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-card-foreground">
            {isDragOver ? 'Drop your image here' : 'Upload a snapshot'}
          </h3>
          <p className="text-muted-foreground max-w-md leading-relaxed">
            Drag and drop your screenshot here, or click to browse. 
            Supports PNG, JPG, and GIF files up to 10MB.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button size="lg" className="interactive-scale">
            <Image className="h-5 w-5 mr-2" />
            Choose File
          </Button>
          <span className="text-sm text-muted-foreground">or</span>
          <Button variant="outline" size="lg" className="interactive-scale">
            Take Screenshot
          </Button>
        </div>
      </div>
    </div>
  );
};