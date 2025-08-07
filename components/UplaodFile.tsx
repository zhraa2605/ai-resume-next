import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "@/lib/utils";
import Image from "next/image";
import { CloudUpload, X } from "lucide-react";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    onFileSelect?.(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: 20 * 1024 * 1024,
    });

  const file = acceptedFiles[0] || null;

  const handleFileSelect = () => {
    onFileSelect?.(null);
  };

  return (
    <div className="w-full">
      <div 
        {...getRootProps()}
        className={`
          relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
          ${isDragActive 
            ? 'border-peach-dark-200 scale-[1.02]' 
            : 'border-peach-dark-200/50 hover:border-peach-dark-200'
          }
        `}
      >
        <input {...getInputProps()} />
        


        <div className="relative p-8 space-y-4">
          {file ? (
            <div
              className="flex items-center space-x-4 p-4 backdrop-blur-sm rounded-xl border border-soft-gray/50 shadow-sm"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* File details */}
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-slate-blue truncate max-w-xs">
                  {file.name}
                </p>
                <p className="text-sm text-slate-blue/70">
                  {formatSize(file.size)}
                </p>
              </div>
              
              {/* Remove button */}
              <button 
                className="p-2 rounded-full hover:text-peach-dark-300 transition-colors duration-200 group" 
                onClick={handleFileSelect}
                type="button"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div className="text-center">
              {/* Upload icon with animated gradient */} 
               <div className="mx-auto w-20 h-20 flex items-center justify-center mb-6 relative">
                  <Image src="/icons/pdf.svg" alt="pdf" width={60} height={60} />
                  </div>
              
              {/* Upload text with gradient */}
              <div className="space-y-2">
                <p className="text-lg text-dark-200">
                  <span className="font-semibold">
                    Click to upload
                  </span>
                  <span className="text-slate-blue/70"> or drag and drop</span>
                </p>
                <p className="text-base text-slate-blue/60">PDF (max 20 MB)</p>
              </div>
              
              {/* Progress indicators */}
              {isDragActive && (
                <div className="mt-4">
                  <div className="w-full bg-soft-gray rounded-full h-1 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-peach-dark-300 to-origin rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-sm text-peach-dark-300 mt-2 font-medium">Drop your file here</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Drag overlay */}
        {isDragActive && (
          <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center rounded-2xl">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
               <CloudUpload size={24} />
              </div>
              <p className="text-white font-semibold text-lg">Drop to upload</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;