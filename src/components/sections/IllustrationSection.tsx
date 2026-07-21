"use client";

import React, { useState } from "react";
import content from "@/data/content.json";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export default function IllustrationSection() {
  const [selectedItem, setSelectedItem] = useState<typeof content.illustrations[0] | null>(null);

  // Masonry-like height variation
  const heights = ["h-48", "h-64", "h-56", "h-72", "h-52", "h-60", "h-68", "h-44", "h-56"];

  return (
    <section className="container mx-auto px-6 py-24" id="illustration">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="font-display text-4xl text-textMain tracking-wide">Illustration Gallery</h2>
        <div className="h-1 w-20 bg-primary"></div>
        <p className="text-textMuted text-sm max-w-xl">Pixel art, custom illustrations, icons, and digital artwork.</p>
      </div>

      {/* Masonry Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {content.illustrations.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "break-inside-avoid rounded-lg overflow-hidden border border-borderDark cursor-pointer group relative",
              "hover:border-primary/40 hover:shadow-[0_0_25px_rgba(246,142,95,0.1)] transition-all duration-300"
            )}
            onClick={() => setSelectedItem(item)}
          >
            {/* Placeholder visual (colored block with pattern) */}
            <div
              className={cn("w-full flex items-center justify-center relative", heights[index % heights.length])}
              style={{ backgroundColor: item.color + "20" }}
            >
              {/* Decorative grid pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `repeating-linear-gradient(0deg, ${item.color}33 0px, ${item.color}33 1px, transparent 1px, transparent 16px), repeating-linear-gradient(90deg, ${item.color}33 0px, ${item.color}33 1px, transparent 1px, transparent 16px)`,
              }} />

              <div className="font-pixel text-xs text-center px-4" style={{ color: item.color }}>
                {item.title}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn size={24} className="text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="bg-card p-3">
              <div className="text-xs text-textMain font-medium">{item.title}</div>
              <div className="text-[10px] text-textDim mt-1">{item.category}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-card border border-borderDark rounded-xl max-w-lg w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-borderDark">
                <span className="font-pixel text-xs text-primary">{selectedItem.title}</span>
                <button onClick={() => setSelectedItem(null)} className="text-textDim hover:text-textMain transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Lightbox content */}
              <div
                className="w-full h-72 flex items-center justify-center relative"
                style={{ backgroundColor: selectedItem.color + "15" }}
              >
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `repeating-linear-gradient(0deg, ${selectedItem.color}33 0px, ${selectedItem.color}33 1px, transparent 1px, transparent 12px), repeating-linear-gradient(90deg, ${selectedItem.color}33 0px, ${selectedItem.color}33 1px, transparent 1px, transparent 12px)`,
                }} />
                <div className="font-pixel text-lg" style={{ color: selectedItem.color }}>
                  {selectedItem.title}
                </div>
              </div>

              <div className="p-5">
                <div className="text-textMuted text-sm">{selectedItem.category}</div>
                <p className="text-textDim text-xs mt-2">Replace this placeholder with your actual artwork. Upload your images to the /public folder.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
