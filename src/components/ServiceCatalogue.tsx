import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight, ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { useSiteData, CatalogueSubItem } from "../contexts/SiteDataContext";

export function ServiceCatalogue() {
  const location = useLocation();
  const { data } = useSiteData();
  const catalogue = data.catalogue;
  const [activeItem, setActiveItem] = useState<typeof catalogue[0] | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<CatalogueSubItem | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  useEffect(() => {
    const handleHash = () => {
      const hash = location.hash.replace('#', '');
      if (hash) {
        const item = catalogue.find(c => c.id === hash || c.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === hash);
        if (item) {
          setActiveItem(item);
        }
      }
    };
    
    handleHash();
  }, [catalogue, location.hash]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeItem]);

  const handleNextImage = () => {
    if (!selectedSpec || !selectedSpec.images.length) return;
    setCarouselIndex((prev) => (prev + 1) % selectedSpec.images.length);
  };

  const handlePrevImage = () => {
    if (!selectedSpec || !selectedSpec.images.length) return;
    setCarouselIndex((prev) => (prev - 1 + selectedSpec.images.length) % selectedSpec.images.length);
  };

  return (
    <section className="bg-ivory py-32 px-4 md:px-8 relative min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 text-center">
          <h2 className="font-display text-5xl md:text-8xl uppercase font-bold tracking-tight mb-6 text-forest">
            The Blueprint
          </h2>
          <p className="font-serif italic text-xl text-forest/70 max-w-2xl mx-auto">
            Explore our curated catalog of mastercrafted services. End-to-end furniture solutions backed by a 10-year warranty. Click to unveil.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
          {catalogue.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-container-${item.id}`}
              className={`${item.span} relative rounded-2xl overflow-hidden cursor-pointer group bg-forest`}
              onClick={() => {
                setActiveItem(item);
                setSelectedSpec(null);
                setCarouselIndex(0);
              }}
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Background Image */}
              <motion.img
                layoutId={`card-image-${item.id}`}
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-transparent pointer-events-none"></div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex items-end justify-between">
                <div>
                  <motion.span 
                    layoutId={`card-id-${item.id}`}
                    className="font-display font-medium text-brass/80 text-sm tracking-widest block mb-2"
                  >
                    {item.id}
                  </motion.span>
                  <motion.h3 
                    layoutId={`card-title-${item.id}`}
                    className="font-display text-2xl md:text-4xl text-ivory uppercase tracking-wide leading-none"
                  >
                    {item.title}
                  </motion.h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-ivory/30 flex items-center justify-center text-ivory group-hover:bg-terracotta group-hover:border-terracotta transition-colors backdrop-blur-sm">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-forest/80 backdrop-blur-md"
            onClick={() => {
              setActiveItem(null);
              setSelectedSpec(null);
            }}
          >
            <motion.div
              layoutId={`card-container-${activeItem.id}`}
              className="bg-forest w-full max-w-7xl h-[85vh] md:h-[90vh] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl origin-center relative cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 z-50 w-12 h-12 bg-ivory/10 hover:bg-terracotta text-ivory rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
                onClick={() => {
                  setActiveItem(null);
                  setSelectedSpec(null);
                  window.history.pushState("", document.title, window.location.pathname + window.location.search);
                }}
              >
                <X size={24} />
              </button>

              {/* Image / Gallery Half */}
              <div className="w-full md:w-1/2 h-1/3 md:h-full relative overflow-hidden shrink-0 bg-black flex flex-col">
                <AnimatePresence mode="popLayout">
                  {!selectedSpec ? (
                    <motion.img
                      key="main-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 0.9, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      layoutId={`card-image-${activeItem.id}`}
                      src={activeItem.image}
                      alt={activeItem.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <motion.div
                      key="gallery"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full flex flex-col bg-forest/90"
                    >
                      {/* Active Spec Title Overlay */}
                      <div className="absolute top-0 inset-x-0 p-6 z-20 bg-gradient-to-b from-black/80 to-transparent">
                        <span className="font-display font-medium text-brass/80 text-xs tracking-widest uppercase block mb-1">Specification Gallery</span>
                        <h4 className="font-display text-2xl text-ivory uppercase tracking-wide">{selectedSpec.name}</h4>
                      </div>

                      {/* Image Carousel */}
                      <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                        {selectedSpec.images && selectedSpec.images.length > 0 ? (
                          <>
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={carouselIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                src={selectedSpec.images[carouselIndex]}
                                alt={`${selectedSpec.name} ${carouselIndex + 1}`}
                                className="absolute inset-0 w-full h-full object-contain"
                              />
                            </AnimatePresence>
                            
                            {/* Controls */}
                            {selectedSpec.images.length > 1 && (
                              <div className="absolute inset-0 flex items-center justify-between p-4 z-10 pointer-events-none">
                                <button onClick={(e) => { e.stopPropagation(); handlePrevImage(); }} className="w-10 h-10 rounded-full bg-black/50 text-ivory flex items-center justify-center pointer-events-auto hover:bg-terracotta transition-colors backdrop-blur-sm">
                                  <ChevronLeft size={20} />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); handleNextImage(); }} className="w-10 h-10 rounded-full bg-black/50 text-ivory flex items-center justify-center pointer-events-auto hover:bg-terracotta transition-colors backdrop-blur-sm">
                                  <ChevronRight size={20} />
                                </button>
                              </div>
                            )}
                            
                            {/* Indicators */}
                            {selectedSpec.images.length > 1 && (
                              <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-10">
                                {selectedSpec.images.map((_, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setCarouselIndex(idx); }}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === carouselIndex ? 'bg-ivory w-6' : 'bg-ivory/30'}`}
                                  />
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-ivory/50 flex flex-col items-center gap-4">
                            <Grid size={32} className="opacity-50" />
                            <p className="font-sans text-sm">No images in this gallery.</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content Half */}
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col overflow-y-auto bg-forest bg-opacity-95 text-ivory pb-24 md:pb-16 relative">
                <motion.span 
                  layoutId={`card-id-${activeItem.id}`}
                  className="font-display font-medium text-terracotta text-lg tracking-widest block mb-4"
                >
                  SERVICE // {activeItem.id}
                </motion.span>
                <motion.h3 
                  layoutId={`card-title-${activeItem.id}`}
                  className="font-display text-4xl md:text-7xl uppercase tracking-tighter leading-none mb-10"
                >
                  {activeItem.title}
                </motion.h3>

                <div className="space-y-6 flex-1">
                  <h4 className="font-serif italic text-xl text-ivory/70 border-b border-ivory/20 pb-4">
                    Complete Specifications 
                    <span className="block text-sm font-sans not-italic font-light text-brass mt-2 uppercase tracking-widest">
                      Click property below to view gallery
                    </span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {activeItem.items.map((subItem, idx) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + idx * 0.05 }}
                        key={idx}
                        onClick={() => {
                          setSelectedSpec(subItem);
                          setCarouselIndex(0);
                        }}
                        className={`p-4 rounded-xl border flex flex-col gap-3 cursor-pointer transition-all duration-300 ${
                          selectedSpec?.name === subItem.name 
                            ? 'bg-terracotta/20 border-terracotta text-ivory' 
                            : 'bg-ivory/5 border-ivory/10 text-ivory/80 hover:bg-ivory/10 hover:border-ivory/30'
                        }`}
                      >
                        <span className="font-display uppercase tracking-widest text-xs font-semibold">
                          Spec {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <span className="font-serif text-lg leading-snug">
                          {subItem.name}
                        </span>
                        
                        <div className="mt-auto pt-2 flex items-center justify-between text-xs font-sans opacity-70">
                          <span className="flex items-center gap-1.5"><Grid size={14} /> {subItem.images?.length || 0} Images</span>
                          <span className={`font-display uppercase tracking-widest transition-opacity ${selectedSpec?.name === subItem.name ? 'opacity-100 text-terracotta' : 'opacity-0'}`}>Viewing</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-ivory/10">
                  <button 
                    onClick={() => {
                      if (selectedSpec) {
                        setSelectedSpec(null); // Back to category view
                      } else {
                        setActiveItem(null);
                        window.history.pushState("", document.title, window.location.pathname + window.location.search);
                      }
                    }}
                    className="group flex items-center gap-4 bg-transparent border-2 border-brass text-brass px-8 py-4 rounded-full font-display uppercase tracking-widest text-xs font-semibold hover:bg-brass hover:text-forest transition-colors w-max"
                  >
                    {selectedSpec ? "Back to Overview" : "Close Blueprint"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
