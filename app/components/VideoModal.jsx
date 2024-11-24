"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function VideoModal({ isOpen, onClose, videoUrl }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle></DialogTitle>
        <video src={videoUrl} controls autoPlay loop playsInline />
      </DialogContent>
    </Dialog>
  );
}
