"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import content from "@/data/content.json";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

const ManualSlideThumbnail = ({ images, title, globalRefreshCount }: { images: string[], title: string, globalRefreshCount: number }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (globalRefreshCount > 0 && images && images.length > 1) {
      setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  }, [globalRefreshCount]);

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!images || images.length <= 1) return;
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className="font-semibold text-[14px] text-center px-4 text-text-muted group-hover:text-text-main transition-colors w-full h-full flex items-center justify-center">
        {title}
      </div>
    );
  }

  return (
    <div className="w-full relative group/thumbnail overflow-hidden">
      <div 
        className="flex items-stretch transition-transform duration-500 ease-in-out w-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="w-full flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={src} 
              alt={`${title} slide ${i + 1}`} 
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
      </div>
      
      {images.length > 1 && (
        <button 
          onClick={handleRefresh}
          className="absolute top-3 right-3 bg-surface-card/80 backdrop-blur-md p-2 rounded-full border border-hairline/50 text-text-main shadow-lg hover:bg-primary hover:text-text-onPrimary hover:scale-110 transition-all opacity-0 group-hover/thumbnail:opacity-100 z-20"
          title="See another image"
        >
          <RefreshCw size={16} />
        </button>
      )}
    </div>
  );
};
import { cn } from "@/lib/utils";

export default function IllustrationSection() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [globalRefreshCount, setGlobalRefreshCount] = useState(0);

  const nextSlide = () => {
    if (!selectedItem || !selectedItem.images) return;
    setCurrentIndex((prev) => (prev === selectedItem.images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (!selectedItem || !selectedItem.images) return;
    setCurrentIndex((prev) => (prev === 0 ? selectedItem.images.length - 1 : prev - 1));
  };

  const openLightbox = (item: any) => {
    setSelectedItem(item);
    setCurrentIndex(0);
  };

  // Masonry-like height variation for thumbnails
  const heights = ["h-48", "h-64", "h-56", "h-72", "h-52", "h-60", "h-68", "h-44", "h-56"];

  return (
    <section className="container mx-auto px-6 py-section" id="illustration">
      <div className="flex flex-col sm:flex-row gap-6 mb-12 justify-between items-start sm:items-end">
        <div className="flex flex-col gap-4">
          <h2 className="display-lg text-text-main max-w-2xl">Creative assets.</h2>
          <p className="text-text-muted text-lg max-w-xl">
            A showcase of design assets, branding, and digital artwork.
          </p>
        </div>
        
        <button 
          onClick={() => setGlobalRefreshCount(prev => prev + 1)}
          className="flex items-center gap-2 bg-surface-card border border-hairline hover:border-primary hover:text-primary px-4 py-2.5 rounded-lg text-[14px] font-bold text-text-main transition-colors shadow-sm shrink-0"
        >
          <RefreshCw size={16} />
          Refresh All
        </button>
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
              "break-inside-avoid rounded-lg overflow-hidden border border-hairline cursor-pointer group relative",
              "hover:border-hairline-strong transition-all duration-300 bg-surface-card"
            )}
            onClick={() => openLightbox(item)}
          >
            {/* Thumbnail visual */}
            <div
              className="w-full flex items-center justify-center relative bg-canvas overflow-hidden"
            >
              <ManualSlideThumbnail images={(item as any).images} title={item.title} globalRefreshCount={globalRefreshCount} />

              {/* Hover overlay for opening lightbox */}
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-10">
                <ZoomIn size={32} className="text-primary-light drop-shadow-md" />
              </div>
            </div>

            {/* Info */}
            <div className="bg-surface-card p-4 border-t border-hairline relative z-10">
              <div className="text-[14px] text-text-main font-semibold">{item.title}</div>
              <div className="text-[12px] text-text-muted mt-1 uppercase tracking-wider">{item.category}</div>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/90 backdrop-blur-sm p-6"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-surface-card border border-hairline rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-hairline bg-surface-card/95">
                <span className="font-semibold text-[14px] text-text-main">{selectedItem.title}</span>
                <button onClick={() => setSelectedItem(null)} className="text-text-muted hover:text-text-main transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Lightbox content */}
              <div className="w-full relative bg-canvas border-b border-hairline flex flex-col items-center">
                {selectedItem.images && selectedItem.images.length > 0 ? (
                  <div className="relative w-full aspect-video flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                      >
                        <Image 
                          src={selectedItem.images[currentIndex]} 
                          alt={`${selectedItem.title} ${currentIndex + 1}`} 
                          fill 
                          className="object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    {selectedItem.images.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-surface-card/90 p-2 rounded-full border border-hairline hover:bg-surface-elevated hover:text-primary transition-colors text-text-main backdrop-blur-sm shadow-xl z-10"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-surface-card/90 p-2 rounded-full border border-hairline hover:bg-surface-elevated hover:text-primary transition-colors text-text-main backdrop-blur-sm shadow-xl z-10"
                        >
                          <ChevronRight size={20} />
                        </button>
                        
                        {/* Indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-surface-card/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-hairline/50 z-10">
                          {selectedItem.images.map((_: any, i: number) => (
                            <div 
                              key={i} 
                              className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300", 
                                i === currentIndex ? "bg-primary w-4" : "bg-text-muted/50 hover:bg-text-muted"
                              )} 
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-96 flex items-center justify-center">
                    <div className="display-sm text-text-muted">{selectedItem.title}</div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-surface-card">
                <div className="text-text-main font-semibold text-[14px] mb-2 uppercase tracking-wider">{selectedItem.category}</div>
                <p className="text-text-muted text-[14px]">
                  {selectedItem.images ? `${selectedItem.images.length} creative assets in this collection.` : "No images available."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
