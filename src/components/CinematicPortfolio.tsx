import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useSiteData } from "../contexts/SiteDataContext";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function CinematicPortfolio() {
  const { data } = useSiteData();
  const portfolioItems = data.portfolio;
  
  // Wrap the actual implementation in a component keyed by the items length
  // This forces useTransform and useScroll to remount completely when the array length changes,
  // preventing interpolation errors from mismatched array sizes.
  return <CinematicPortfolioInner key={portfolioItems.length} items={portfolioItems} />;
}

const CinematicPortfolioInner: React.FC<{ items: any[] }> = ({ items }) => {
  const portfolioItems = items;
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const endProgress = portfolioItems.length > 1 ? (portfolioItems.length - 1) / portfolioItems.length : 1;
  const xMovementVw = portfolioItems.length > 1 ? -((portfolioItems.length - 1) * 100) : 0;
  const x = useTransform(scrollYProgress, [0, endProgress], ["0vw", `${xMovementVw}vw`]);

  // Map the scroll progress to the respective colors of the images
  const colorProgressArray = portfolioItems.length > 1 
    ? [...portfolioItems.map((_, i) => (i / (portfolioItems.length - 1)) * endProgress), 1]
    : [0, 1];
  const colorValues = portfolioItems.length > 1 
    ? [...portfolioItems.map(item => item.color), portfolioItems[portfolioItems.length - 1].color]
    : [portfolioItems[0]?.color || '#2a322c', portfolioItems[0]?.color || '#2a322c'];

  const backgroundColor = useTransform(
    scrollYProgress,
    colorProgressArray,
    colorValues
  );
  
  const [activeGallery, setActiveGallery] = useState<typeof portfolioItems[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (item: typeof portfolioItems[0]) => {
    if (item.images && item.images.length > 0) {
      setActiveGallery(item);
      setCurrentImageIndex(0);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeGallery && activeGallery.images) {
      setCurrentImageIndex((prev) => (prev + 1) % activeGallery.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeGallery && activeGallery.images) {
      setCurrentImageIndex((prev) => (prev === 0 ? activeGallery.images.length - 1 : prev - 1));
    }
  };

  return (
    <>
      <section 
        className="pt-32 pb-16 px-6 md:px-12 text-ivory"
        style={{ backgroundColor: portfolioItems[0]?.color || '#2a322c' }}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-6">
            <h2 className="font-display text-2xl md:text-4xl uppercase tracking-[0.2em] font-bold text-ivory">
              Hall Of Fame
            </h2>
            <div className="hidden md:block w-12 md:w-32 h-[1px] bg-ivory/50"></div>
            <p className="font-serif italic text-lg md:text-2xl opacity-80 text-ivory/90">our masterpieces</p>
          </div>
          <p className="font-serif text-lg md:text-xl text-ivory/70 max-w-3xl leading-relaxed">
            Step into our gallery of completed projects. Each space is a testament to our dedication to craftsmanship, seamless functionality, and timeless aesthetics. Explore the details that make every Krishna Interior design truly unique.
          </p>
        </div>
      </section>

      {/* MOBILE VERSION: VERTICAL STACK */}
      {isMobile ? (
        <section className="flex flex-col w-full">
          {portfolioItems.map((item, index) => (
            <div 
              key={item.id} 
              className="w-full flex-shrink-0 flex flex-col items-center justify-center p-6 py-12 group cursor-pointer"
              style={{ backgroundColor: item.color || '#2a322c' }}
              onClick={() => openGallery(item)}
            >
              <div 
                className="w-full aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative"
              >
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-[1.5s]"
                  style={{ backgroundImage: `url(${item.images?.[0] || ''})` }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-display uppercase tracking-widest text-white text-sm border border-white/50 px-6 py-3 rounded-full backdrop-blur-md bg-black/20 transform group-hover:scale-110 transition-transform">
                    View Gallery ({item.images?.length || 0})
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-start justify-end text-white pointer-events-none">
                  <span className="font-display uppercase tracking-widest text-[10px] opacity-80 mb-2">
                    0{index + 1} // {item.location}
                  </span>
                  <h3 className="font-serif text-3xl italic font-light group-hover:translate-x-2 group-hover:text-ivory transition-all duration-500">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section ref={targetRef} className="relative hidden md:block" style={{ height: `${(portfolioItems.length + 1) * 100}vh` }}>
          <motion.div 
            className="sticky top-0 h-screen flex items-center pt-32 overflow-hidden cursor-e-resize"
            style={{ backgroundColor }}
          >
            {/* The horizontal track */}
            <motion.div 
              style={{ x, width: `${portfolioItems.length * 100}vw` }}
              className="flex items-center h-full shrink-0"
            >
              {portfolioItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="shrink-0 w-screen h-full flex flex-col items-center justify-center px-[5vw] group cursor-pointer"
                  onClick={() => openGallery(item)}
                >
                  <div 
                    className="w-full xl:w-[90vw] mx-auto aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative"
                  >
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      src={item.images?.[0] || undefined} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Dark gradient for text readability at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

                    {/* View Gallery Overlay Action (Centered) */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center pointer-events-none">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-display uppercase tracking-widest text-white text-sm border border-white/50 px-8 py-4 rounded-full backdrop-blur-md bg-black/20 drop-shadow-xl transform group-hover:scale-110 transition-transform">
                        View Gallery ({item.images?.length || 0})
                      </span>
                    </div>

                    {/* Project Title and Details */}
                    <div className="absolute bottom-0 left-0 w-full p-12 flex flex-col items-start justify-end text-white pointer-events-none">
                      <span className="font-display uppercase tracking-widest text-xs opacity-80 mb-2">
                        0{index + 1} // {item.location}
                      </span>
                      <h3 className="font-serif text-5xl xl:text-6xl italic font-light group-hover:translate-x-2 group-hover:text-ivory transition-all duration-500">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* Lightbox / Gallery Modal */}
      <AnimatePresence>
        {activeGallery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-forest/95 backdrop-blur-xl flex flex-col pt-24 pb-8 px-8"
            onClick={() => setActiveGallery(null)}
          >
            <button 
              className="absolute top-8 right-8 text-ivory/50 hover:text-ivory transition-colors z-50"
              onClick={() => setActiveGallery(null)}
            >
              <X size={32} />
            </button>

            <div className="text-center mb-8 pointer-events-none text-ivory">
              <h3 className="font-serif text-3xl italic">{activeGallery.title}</h3>
              <p className="font-display uppercase tracking-widest text-xs mt-2 text-ivory/60">{activeGallery.location}</p>
            </div>

            <div className="flex-1 relative flex items-center justify-center max-w-7xl mx-auto w-full group">
              {activeGallery.images && activeGallery.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 z-50 w-12 h-12 bg-ivory/10 hover:bg-ivory/20 rounded-full flex items-center justify-center text-ivory backdrop-blur-sm transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 z-50 w-12 h-12 bg-ivory/10 hover:bg-ivory/20 rounded-full flex items-center justify-center text-ivory backdrop-blur-sm transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={activeGallery.images?.[currentImageIndex] || undefined} 
                  alt={`${activeGallery.title} - ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>
            </div>

            {activeGallery.images && activeGallery.images.length > 1 && (
              <div className="flex justify-center gap-4 mt-8 pointer-events-none">
                {activeGallery.images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1 transition-all rounded-full ${idx === currentImageIndex ? 'w-8 bg-terracotta' : 'w-2 bg-ivory/20'}`} 
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
