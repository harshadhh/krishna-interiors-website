import { motion } from "motion/react";
import { Home, Building2, PaintBucket, Sofa, Map, Wrench, Ruler, ArrowUpRight } from "lucide-react";

export function CoreServices() {
  const services = [
    { title: "Residential Interior Design", icon: Home },
    { title: "Commercial Space Styling", icon: Building2 },
    { title: "Furniture & Decor Sourcing", icon: Sofa },
    { title: "Space Planning & Layout", icon: Map },
    { title: "Color Consultation", icon: PaintBucket },
    { title: "Renovation & Makeover", icon: Wrench },
    { title: "We Undertake Orders By Customized Design & Size", icon: Ruler }
  ];

  return (
    <section className="bg-ivory py-24 md:py-32 px-6 md:px-12 lg:px-24 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Header Section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-2xl">
                <motion.span 
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display uppercase tracking-[0.2em] text-xs text-terracotta font-bold mb-6 block flex items-center gap-4"
                >
                    <span className="w-8 h-px bg-terracotta hidden md:block"></span>
                    Our Mastercraft
                </motion.span>
                <motion.h2 
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-display font-bold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-forest leading-[0.9] break-words sm:break-normal"
                >
                    Comprehensive <br /><span className="text-terracotta italic font-light font-serif capitalize tracking-normal">Solutions.</span>
                </motion.h2>
            </div>
            <motion.p
                 initial={{ opacity: 0, y: 24 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="font-serif text-forest/70 leading-relaxed text-lg max-w-sm pb-2"
            >
                From conceptualization to the final styling touch, our end-to-end services ensure a seamless and cohesive design execution.
            </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, idx) => {
            // Define span and theme for each card to create the bento effect
            let spanClass = "col-span-1";
            let themeClass = "bg-white text-forest border-forest/10 hover:border-terracotta/50";
            let isDark = false;
            let isAccent = false;

            if (idx === 0) {
                spanClass = "md:col-span-2 lg:col-span-2";
                themeClass = "bg-forest text-ivory border-forest";
                isDark = true;
            } else if (idx === 1) {
                spanClass = "md:col-span-2 lg:col-span-2";
                themeClass = "bg-terracotta text-ivory border-terracotta";
                isDark = true;
                isAccent = true;
            } else if (idx === 2 || idx === 3) {
                spanClass = "col-span-1";
                themeClass = "bg-terracotta text-ivory border-terracotta";
                isDark = true;
                isAccent = true;
            } else if (idx === 4 || idx === 5) {
                spanClass = "col-span-1";
                themeClass = "bg-forest text-ivory border-forest";
                isDark = true;
            } else if (idx === 6) {
                spanClass = "md:col-span-2 lg:col-span-4";
                themeClass = "bg-[#EDEAE3] text-forest border-forest/5 hover:border-forest/30";
            }

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.6 }}
                className={`flex flex-col justify-between p-8 md:p-10 rounded-[2rem] border transition-colors duration-500 group relative overflow-hidden ${spanClass} ${themeClass} min-h-[260px] cursor-default shadow-xl shadow-forest/5 hover:shadow-2xl hover:shadow-forest/10`}
              >
                  {/* Decorative Background Glow for Dark Cards */}
                  {isDark && (
                      <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150 ${isAccent ? 'bg-ivory/20' : 'bg-terracotta/20'}`}></div>
                  )}

                  <div className="relative z-10 flex justify-between items-start">
                     <div className={`p-4 rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${isDark ? 'bg-white/10 text-ivory' : 'bg-forest/5 text-terracotta'}`}>
                        <service.icon size={28} strokeWidth={1.5} />
                     </div>
                     <div className="flex flex-col items-end gap-2">
                         <span className={`font-display font-medium text-4xl transition-opacity duration-300 ${isDark ? 'text-ivory opacity-20 group-hover:opacity-40' : 'text-forest opacity-10 group-hover:opacity-20'}`}>
                            {String(idx + 1).padStart(2, '0')}
                         </span>
                         <ArrowUpRight size={20} className={`opacity-0 -translate-x-4 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 ${isDark ? 'text-ivory' : 'text-terracotta'}`} />
                     </div>
                  </div>

                  <div className="relative z-10 mt-16 md:mt-24">
                     <h3 className={`font-display text-2xl md:text-3xl leading-[1.1] font-bold uppercase tracking-tight ${idx === 6 ? 'max-w-3xl md:text-4xl' : ''}`}>
                        {service.title}
                     </h3>
                  </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
