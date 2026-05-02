import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useSiteData } from "../contexts/SiteDataContext";

export function PortfolioPreview() {
  const { data } = useSiteData();
  return (
    <section className="bg-forest py-24 md:pt-32 md:pb-40 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display uppercase tracking-[0.25em] text-xs text-brass font-semibold mb-3 block"
            >
              ✦ Our Work
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-6xl uppercase text-ivory leading-none tracking-tight"
            >
              Spaces We've<br />
              <span className="text-brass">Transformed</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/portfolio"
              className="inline-flex items-center gap-3 group border-2 border-ivory/30 text-ivory px-6 py-3.5 rounded-full font-display uppercase tracking-widest text-xs font-semibold hover:bg-ivory hover:text-forest transition-all duration-400"
            >
              View Full Portfolio
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5 min-h-[50vh] md:min-h-[650px]">
          {/* Main Large Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-3 relative rounded-2xl overflow-hidden group cursor-pointer"
          >
            <img 
              alt="The Lohegaon Sanctuary" 
              className="w-full h-72 md:h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src={data.portfolioPreview.img1 || undefined} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <span className="font-display text-xs uppercase tracking-widest text-brass/80 block mb-2">01 · Lohegaon, Pune</span>
              <h3 className="font-serif text-3xl md:text-4xl italic text-ivory font-light">The Lohegaon Sanctuary</h3>
            </div>
            <Link 
              to="/portfolio" 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-ivory/10 backdrop-blur-sm border border-ivory/20 flex items-center justify-center text-ivory opacity-0 group-hover:opacity-100 transition-opacity hover:bg-terracotta hover:border-terracotta"
            >
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>

          <div className="md:col-span-2 flex flex-col gap-4 md:gap-5">
            {/* Top Right Image */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="flex-1 relative rounded-2xl overflow-hidden group cursor-pointer min-h-[200px] md:min-h-0"
            >
              <img 
                alt="Golden Hour Kitchen" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={data.portfolioPreview.img2 || undefined} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-5">
                <span className="font-display text-[10px] uppercase tracking-widest text-brass/70 block mb-1">02 · Viman Nagar</span>
                <h3 className="font-serif text-xl italic text-ivory font-light">Golden Hour Kitchen</h3>
              </div>
              <Link 
                to="/portfolio" 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-ivory/10 backdrop-blur-sm border border-ivory/20 flex items-center justify-center text-ivory opacity-0 group-hover:opacity-100 transition-opacity hover:bg-terracotta hover:border-terracotta"
              >
                <ArrowUpRight size={15} />
              </Link>
            </motion.div>

            {/* Bottom Right Image */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="flex-1 relative rounded-2xl overflow-hidden group cursor-pointer min-h-[200px] md:min-h-0"
            >
              <img 
                alt="Terracotta Warmth" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={data.portfolioPreview.img3 || undefined} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-5">
                <span className="font-display text-[10px] uppercase tracking-widest text-brass/70 block mb-1">03 · Kharadi</span>
                <h3 className="font-serif text-xl italic text-ivory font-light">Terracotta Warmth</h3>
              </div>
              <Link 
                to="/portfolio" 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-ivory/10 backdrop-blur-sm border border-ivory/20 flex items-center justify-center text-ivory opacity-0 group-hover:opacity-100 transition-opacity hover:bg-terracotta hover:border-terracotta"
              >
                <ArrowUpRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
