import { Upload, Image, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { ScreenshotAnnotator } from "./ScreenshotAnnotator";

interface UploadZoneProps {
  groupName?: string;
  onUploadComplete?: (file: File, comments: any[]) => void;
}

export const UploadZone = ({ groupName = "this group", onUploadComplete }: UploadZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showAnnotator, setShowAnnotator] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      setSelectedFile(imageFile);
      setShowAnnotator(true);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setShowAnnotator(true);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleSaveAnnotation = (comments: any[]) => {
    if (selectedFile && onUploadComplete) {
      onUploadComplete(selectedFile, comments);
    }
    setShowAnnotator(false);
    setSelectedFile(null);
  };

  const handleCancelAnnotation = () => {
    setShowAnnotator(false);
    setSelectedFile(null);
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

        <Button className="font-medium" onClick={handleChooseFile}>
          <Image className="h-4 w-4 mr-2" />
          Choose File
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Screenshot Annotator Modal */}
      {showAnnotator && selectedFile && (
        <ScreenshotAnnotator
          file={selectedFile}
          groupName={groupName}
          onSave={handleSaveAnnotation}
          onCancel={handleCancelAnnotation}
        />
      )}
    </div>
  );
};