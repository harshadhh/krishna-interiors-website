import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useSiteData } from "../contexts/SiteDataContext";

export function ServicesList() {
  const { data } = useSiteData();

  const services = [
    {
      id: "01",
      title: "Modular Kitchen",
      description: "European hardware. Quartz tops. Built for the way Indian families actually cook.",
      image: data.servicesList.kitchen
    },
    {
      id: "02",
      title: "Bedroom & Wardrobes",
      description: "Floor-to-ceiling storage, hydraulic beds, and custom wall panels — all made to last.",
      image: data.servicesList.bedroom
    },
    {
      id: "03",
      title: "Living Room",
      description: "TV units, false ceilings, mandir designs and premium sofa sets. The room your guests remember.",
      image: data.servicesList.living
    },
    {
      id: "04",
      title: "Full Home & Civil",
      description: "End-to-end renovation. Tiles, plumbing, painting, lighting — one team, one timeline.",
      image: data.servicesList.civil
    }
  ];

  return (
    <section className="bg-ivory py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display uppercase tracking-[0.25em] text-xs text-terracotta font-semibold mb-3 block"
            >
              ✦ What We Do
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-6xl uppercase text-forest leading-none tracking-tight"
            >
              Every Corner.<br />
              <span className="text-terracotta">Every Detail.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/services"
              className="inline-flex items-center gap-3 group border-2 border-forest text-forest px-6 py-3.5 rounded-full font-display uppercase tracking-widest text-xs font-semibold hover:bg-forest hover:text-ivory transition-all duration-400"
            >
              View All Services
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="divide-y divide-forest/10">
          {services.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-0 py-8 md:py-10 cursor-default hover:bg-forest/[0.02] -mx-4 px-4 rounded-xl transition-colors duration-300"
            >
              <span className="font-display font-bold text-5xl md:text-6xl text-forest/10 group-hover:text-terracotta/20 transition-colors duration-500 md:w-28 shrink-0 leading-none">
                {service.id}
              </span>
              <div className="hidden md:block w-20 h-14 rounded-lg overflow-hidden shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0 mr-8">
                <img 
                  alt={service.title} 
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                  src={service.image} 
                />
              </div>
              <h3 className="font-display font-bold text-2xl md:text-4xl uppercase tracking-tight text-forest group-hover:text-terracotta transition-colors duration-300 md:flex-1">
                {service.title}
              </h3>
              <p className="font-serif italic text-forest/60 text-base max-w-xs leading-relaxed md:text-right md:ml-8">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
