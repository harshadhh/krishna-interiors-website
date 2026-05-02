import { Award } from "lucide-react";
import { useSiteData } from "../contexts/SiteDataContext";

export function InteractiveBoard() {
  const { data } = useSiteData();

  const premiumPartners = [
    { name: 'Hettich', image: data.interactiveBoard.hettich },
    { name: 'Blum', image: data.interactiveBoard.blum },
    { name: 'Häfele', image: data.interactiveBoard.hafele },
    { name: 'Godrej', image: data.interactiveBoard.godrej },
    { name: 'Ozone', image: data.interactiveBoard.ozone },
    { name: 'Onyx', image: data.interactiveBoard.onyx },
  ];

  const rotations = ["-rotate-6", "rotate-3", "-rotate-2", "rotate-6", "-rotate-4", "rotate-2"];
  const translates = ["translate-y-4", "-translate-y-6", "translate-y-2", "-translate-y-2", "translate-y-8", "-translate-y-4"];

  return (
    <section className="relative min-h-screen w-full bg-[#EFECE6] py-32 overflow-hidden pb-48">
      <div className="container mx-auto px-6 relative z-10">
        <span className="font-display uppercase tracking-[0.2em] text-xs text-terracotta font-semibold mb-4 block text-center">
          ✦ Premium Partners
        </span>
        <h2 className="font-display text-5xl md:text-7xl font-semibold text-center text-forest mb-6">
          The Material Board
        </h2>
        <p className="font-serif text-center text-xl text-forest/70 max-w-2xl mx-auto italic mb-20">
          We exclusively use premium hardware from Hettich, Blum, Godrej, and Häfele — brands trusted across the world.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-14 lg:gap-20 max-w-6xl mx-auto px-4 md:px-10">
          {premiumPartners.map((partner, index) => (
            <div 
              key={partner.name} 
              className={`bg-white p-3 md:p-5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] flex flex-col hover:shadow-2xl hover:scale-105 transition-all duration-300 ${rotations[index]} ${translates[index]} hover:z-20 hover:rotate-0`}
            >
              <img 
                src={partner.image} 
                alt={partner.name}
                className="w-full aspect-[4/3] md:aspect-square object-cover pointer-events-none bg-forest/5" 
              />
              <div className="mt-4 md:mt-6 pb-2 md:pb-4 font-display font-bold text-[10px] md:text-sm text-forest/80 uppercase tracking-widest flex justify-center items-center gap-2">
                <Award size={14} className="text-terracotta/70" /> {partner.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
