import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { useSiteData } from "../contexts/SiteDataContext";

const ImageSlider = ({ beforeUrl, afterUrl, title }: { beforeUrl: string; afterUrl: string; title: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(50);
  const springX = useSpring(50, { stiffness: 100, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setMouseX((relativeX / rect.width) * 100);
  };

  useEffect(() => {
    springX.set(mouseX);
  }, [mouseX, springX]);

  const clipPathBase = useTransform(springX, (val) => `inset(0 ${100 - val}% 0 0)`);
  const lineLeft = useTransform(springX, (val) => `${val}%`);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-display text-xl uppercase tracking-wider text-forest/90 font-bold">{title}</h3>
      <div 
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerMove}
        style={{ touchAction: 'none' }}
        className="w-full aspect-[4/3] relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/10 select-none cursor-ew-resize"
      >
        <img src={beforeUrl || undefined} alt="Before" className="absolute inset-0 w-full h-full object-cover grayscale opacity-80" />
        <motion.div className="absolute inset-0 z-10" style={{ clipPath: clipPathBase }}>
          <img src={afterUrl || undefined} alt="After" className="absolute inset-0 w-full h-full object-cover" />
        </motion.div>
        <motion.div style={{ left: lineLeft }} className="absolute top-0 bottom-0 w-1 bg-terracotta z-20 shadow-[0_0_15px_rgba(215,90,74,0.8)] -ml-0.5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-terracotta rounded-full shadow-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18 6-6-6-6"/><path d="m9 18-6-6 6-6"/></svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export function BeforeAfterGallery() {
  const { data } = useSiteData();
  const gallery = data.beforeAfterGallery || [];
  
  if (gallery.length === 0) return null;

  return (
    <section className="bg-white text-forest py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl uppercase tracking-widest text-terracotta mb-6 font-bold">
            From Blueprint to Reality
          </h2>
          <p className="font-sans text-forest/70 leading-relaxed font-medium">
            Slide through our featured transformations and see the level of perfection we deliver from raw spaces to finished homes.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {gallery.map((item) => (
            <div key={item.id}>
              <ImageSlider beforeUrl={item.before} afterUrl={item.after} title={item.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
