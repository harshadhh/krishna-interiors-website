import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useSiteData } from "../contexts/SiteDataContext";

export function Hero() {
  const { data } = useSiteData();

  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden bg-ivory">
      
      {/* Visuals (Background) */}
      <div className="absolute inset-0 md:top-0 md:right-0 md:bottom-auto md:left-auto w-full md:w-[75%] h-full z-0 overflow-hidden mask-hero-image">
        {/* Dark overlay specifically for mobile to make text readable */}
        <div className="absolute inset-0 bg-ivory/80 md:bg-transparent z-10 pointer-events-none md:hidden"></div>
        {/* Overlay gradient from bottom for the owner card */}
        <div className="absolute bottom-0 inset-x-0 h-[50%] md:h-[30%] bg-gradient-to-t from-ivory via-ivory/80 md:from-forest/40 to-transparent z-10 pointer-events-none"></div>
        
        <motion.div
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="w-full h-full"
        >
          {data.hero.video && data.hero.video.trim() !== "" ? (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover"
              src={data.hero.video || undefined}
              poster={data.hero.poster || undefined}
            />
          ) : (
            <img
              src={data.hero.poster || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"}
              alt="Modern House Exterior"
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>

        {/* Owner Card on bottom right - push it higher on mobile or re-align it */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-6 right-6 left-6 max-w-sm md:left-auto md:bottom-12 md:right-12 bg-[#EDEAE3] rounded-[1.5rem] p-5 md:p-6 z-20 md:w-80 shadow-2xl mx-auto md:mx-0"
        >
          <div className="flex flex-col">
            <span className="text-terracotta text-[10px] md:text-xs font-display font-bold tracking-widest uppercase mb-1">Owner</span>
            <span className="text-forest font-bold text-lg md:text-2xl font-display">Mr. Suresh Bishnoi</span>
          </div>
          <div className="w-full h-px bg-forest/10 my-3 md:my-4"></div>
          <div className="flex flex-col text-[9px] md:text-xs text-forest/60 font-display">
            <span className="uppercase tracking-widest font-semibold flex flex-col gap-1">
              <span>EST. PUNE</span> 
              <span className="text-forest/80 font-bold leading-relaxed">
                Sr. No. 282, Porwal Road,<br/>
                Near Kamlai Dairy, Kand Nagar,<br/>
                Lohegaon, Pune - 411047
              </span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Left side: Typography */}
      <div className="w-full md:w-[60%] pt-36 pb-48 md:pt-40 md:pb-32 lg:py-32 px-6 md:pl-20 lg:pl-32 flex flex-col justify-center z-10 relative bg-transparent pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto"
        >
          <h1 className="font-display font-bold text-[13vw] md:text-[5.5vw] leading-[0.88] tracking-tight uppercase text-forest">
            Your Vision.<br />
            <span className="text-terracotta">Our Bare</span><br />
            Hands.
          </h1>
          
          <p className="mt-8 max-w-md text-lg text-forest/70 font-serif italic leading-relaxed">
            Lohegaon's most trusted interior contractor. We transform raw spaces into stunning, durable homes — built for real Indian living.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
             <span className="flex items-center gap-2 text-[10px] md:text-xs font-display uppercase tracking-widest font-semibold text-forest/60 bg-forest/5 border border-forest/10 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0"></span>
                End-To-End Furniture
              </span>
              <span className="flex items-center gap-2 text-[10px] md:text-xs font-display uppercase tracking-widest font-semibold text-forest/60 bg-forest/5 border border-forest/10 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0"></span>
                10-Year Warranty
              </span>
              <span className="flex items-center gap-2 text-[10px] md:text-xs font-display uppercase tracking-widest font-semibold text-forest/60 bg-forest/5 border border-forest/10 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0"></span>
                45-60-Day Handover
              </span>
              <span className="flex items-center gap-2 text-[10px] md:text-xs font-display uppercase tracking-widest font-semibold text-forest/60 bg-forest/5 border border-forest/10 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0"></span>
                Hettich · Blum · Hafele
              </span>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href="#contact" className="flex items-center gap-4 bg-terracotta text-ivory px-8 py-5 rounded-full font-display uppercase tracking-widest text-sm font-semibold relative overflow-hidden group shadow-xl shadow-terracotta/25">
              <span className="relative z-10">Start the Transformation</span>
              <div className="bg-brass w-9 h-9 rounded-full flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0">
                <ArrowRight className="w-4 h-4 text-forest" />
              </div>
              <div className="absolute inset-0 bg-forest opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2 text-forest/40 font-display uppercase tracking-widest text-[10px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>Lohegaon, Pune, Maharashtra</span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
