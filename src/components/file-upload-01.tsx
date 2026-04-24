"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ImagesType } from "./products/columns";
import { Badge } from "./ui/badge";
import { Spinner } from "./ui/spinner";

interface FileUpload01Props {
  onUploadComplete: (file: File[]) => void;
  previewUrls?: ImagesType[];
  onDeleteImage: (imageId: number) => void;
  loadingDeleteImage: boolean;
}

export default function FileUpload01({ onUploadComplete, previewUrls, onDeleteImage, loadingDeleteImage }: FileUpload01Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (filename: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== filename));
  };

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      onUploadComplete(uploadedFiles);
    }
  }, [uploadedFiles]);

  return (
    <div className="">
      <div className="">
        <div
          className="border-2 border-dashed border-border rounded-md p-4 flex flex-col items-center justify-center text-center cursor-pointer"
          onClick={handleBoxClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="mb-2 bg-muted rounded-full p-3">
            <Upload className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-pretty text-sm font-medium text-foreground">
            Upload a project image
          </p>
          <p className="text-pretty text-sm text-muted-foreground mt-1">
            or,{" "}
            <label
              htmlFor="fileUpload"
              className="text-primary hover:text-primary/90 font-medium cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              click to browse
            </label>{" "}
            (4MB max)
          </p>
          <input
            type="file"
            id="fileUpload"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </div>
      </div>

      <div
        className={cn(
          "pb-5 space-y-3 h-25 overflow-y-auto",
          uploadedFiles.length > 0 || (previewUrls && previewUrls?.length > 0) ? "mt-4" : ""
        )}
      >
        {uploadedFiles.map((file, index) => {
          const imageUrl = URL.createObjectURL(file);

          return (
            <div
              className="border border-border rounded-lg p-2 flex flex-col"
              key={file.name + index}
              onLoad={() => {
                return () => URL.revokeObjectURL(imageUrl);
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-18 h-14 bg-muted rounded-sm flex items-center justify-center self-start row-span-2 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 pr-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground truncate max-w-62.5">
                        {file.name}
                      </span>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {Math.round(file.size / 1024)} KB
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="bg-transparent! hover:text-red-500"
                      onClick={() => removeFile(file.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {previewUrls && previewUrls.length > 0 && (
          previewUrls.map((preview) => (
            <div
              className="border border-border rounded-lg p-2 flex flex-col"
              key={preview.image_id}
            >
              <div className="flex items-center gap-2">
                <div className="w-18 h-14 bg-muted rounded-sm flex items-center justify-center self-start row-span-2 overflow-hidden">
                  <img
                    src={preview.image_url}
                    alt={preview.image_id.toString()}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 pr-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground truncate max-w-62.5">
                        {preview.image_url.split("/").pop() || "image.jpg"}
                      </span>
                    
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="destructive"
                        onClick={() => removeFile(preview.image_url)}
                      >
                        Old Image
                      </Badge>

                      {loadingDeleteImage ?
                      <Spinner/>
                      : <Button
                        variant="ghost"
                        size="icon-sm"
                        className="bg-transparent! hover:text-red-500"
                        onClick={() => onDeleteImage(preview.image_id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
