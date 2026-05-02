import { motion } from "motion/react";

const partners = ['Hettich', 'Blum', 'Häfele', 'Godrej', 'Ozone', 'Onyx', 'Havells', 'Polycab'];
// Duplicate for the infinite scroll effect
const repeatedPartners = [...partners, ...partners];

export function PremiumPartners() {
  return (
    <section className="bg-ivory border-y border-forest/10 py-7 px-6 overflow-hidden flex items-center relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-ivory to-transparent z-10 hidden md:block"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-ivory to-transparent z-10 hidden md:block"></div>
      
      <div className="flex items-center gap-6 md:gap-10 mx-auto max-w-[1400px]">
        <span className="font-display uppercase tracking-[0.2em] text-xs text-forest/35 font-semibold shrink-0 whitespace-nowrap z-20 bg-ivory pr-6 hidden md:block">
          Premium Partners
        </span>
        
        <div className="overflow-hidden flex-1 relative w-full flex items-center justify-center">
            {/* Mobile Header */}
            <span className="font-display uppercase tracking-[0.2em] text-xs text-forest/35 font-semibold shrink-0 whitespace-nowrap z-20 absolute top-[-30px] md:hidden">
              Premium Partners
            </span>
          <div className="animate-marquee flex gap-12 items-center w-max opacity-60 hover:opacity-100 transition-opacity duration-500">
            {repeatedPartners.map((partner, index) => (
              <span key={`${partner}-${index}`} className="font-display font-black text-sm md:text-base uppercase tracking-widest text-forest/40 hover:text-forest/80 transition-colors duration-300 cursor-default px-4 whitespace-nowrap">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
