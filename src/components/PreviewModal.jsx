import React from "react";
import { Button } from "@/components/ui/button";

export default function PreviewModal({ isOpen, onClose, htmlContent, onDownload }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center overflow-y-auto p-4">
      <div className="flex flex-col w-full items-center max-w-[794px]">
        {/* Controls - Sticky Header */}
        <div className="sticky top-0 z-10 w-full flex justify-end gap-3 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-md border border-gray-200 mt-2 mb-6">
          <Button variant="outline" onClick={onClose} className="bg-white">
            Close Preview
          </Button>
          <Button onClick={onDownload} className="bg-blue-600 hover:bg-blue-700 text-white">
            ⬇️ Download PDF
          </Button>
        </div>

        {/* Paper Container */}
        <div 
          className="bg-white w-[794px] max-w-full min-h-[1123px] shadow-2xl relative shrink-0 p-[20mm] ProseMirror mb-10"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
