import { motion } from "motion/react";
import { Star, Shield, Clock, Wrench, Award, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteData } from "../contexts/SiteDataContext";

export function WhyChooseUs() {
  const { data } = useSiteData();

  return (
    <section className="bg-[#F5F1EB] py-24 md:py-28 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display uppercase tracking-[0.25em] text-xs text-terracotta font-semibold mb-3 block text-center"
        >
          ✦ Why Krishna Interiors
        </motion.span>

        <div className="flex flex-col md:flex-row gap-6 md:gap-4 mt-10 mb-20">
          {[
            {
              icon: <Star size={18} className="text-terracotta group-hover:text-ivory transition-colors duration-300" />,
              title: `${data.general.reviewsScore} ★ on Google`,
              desc: `${data.general.reviewsCount} verified reviews from homeowners in Pune.`
            },
            {
              icon: <Shield size={18} className="text-terracotta group-hover:text-ivory transition-colors duration-300" />,
              title: "10-Year Warranty",
              desc: "Full furniture warranty — not just a promise."
            },
            {
              icon: <Clock size={18} className="text-terracotta group-hover:text-ivory transition-colors duration-300" />,
              title: "45-60-Day Handover",
              desc: "Strict timelines. No delays. No excuses."
            },
            {
              icon: <Wrench size={18} className="text-terracotta group-hover:text-ivory transition-colors duration-300" />,
              title: "Premium Hardware",
              desc: "Hettich, Blum, Häfele, Godrej — always."
            },
            {
              icon: <Award size={18} className="text-terracotta group-hover:text-ivory transition-colors duration-300" />,
              title: "Material Transparency",
              desc: "We explain every option so you choose wisely."
            }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              className="flex-1 flex flex-col gap-3 bg-white rounded-2xl p-6 border border-forest/5 hover:border-terracotta/20 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center group-hover:bg-terracotta transition-colors duration-300">
                {feature.icon}
              </div>
              <h4 className="font-display font-bold text-base uppercase tracking-wide text-forest">{feature.title}</h4>
              <p className="font-serif italic text-forest/55 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-forest rounded-2xl p-8 flex flex-col gap-4"
          >
            <div className="flex gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-brass text-brass" />
              ))}
            </div>
            <p className="font-serif italic text-ivory/80 text-lg leading-relaxed flex-1">
              "The kitchen trolley is very sturdy and perfect for Indian kitchens. Locking system works perfectly."
            </p>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <p className="font-display font-bold text-ivory text-sm uppercase tracking-wide">Rajesh K.</p>
              <span className="font-display text-[10px] uppercase tracking-widest text-brass">Modular Kitchen</span>
            </div>
          </motion.blockquote>

          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-forest rounded-2xl p-8 flex flex-col gap-4"
          >
            <div className="flex gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-brass text-brass" />
              ))}
            </div>
            <p className="font-serif italic text-ivory/80 text-lg leading-relaxed flex-1">
              "Truly professional, skilled, and very cooperative. The entire team was transparent throughout."
            </p>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <p className="font-display font-bold text-ivory text-sm uppercase tracking-wide">Priya M.</p>
              <span className="font-display text-[10px] uppercase tracking-widest text-brass">Full Home Renovation</span>
            </div>
          </motion.blockquote>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 bg-terracotta rounded-3xl px-10 py-10"
        >
          <div>
            <h3 className="font-display font-bold text-3xl md:text-4xl uppercase text-ivory leading-tight">Get a Free Consultation</h3>
            <p className="font-serif italic text-ivory/70 mt-2">No obligation. Just a conversation about your space.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a 
              href="https://wa.me/918793093953?text=Hi,%20I%20want%20a%20free%20consultation%20for%20my%20home%20interior." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 bg-ivory text-terracotta px-7 py-4 rounded-full font-display uppercase tracking-widest text-xs font-semibold hover:bg-forest hover:text-ivory transition-all duration-400 shadow-lg"
            >
              <MessageCircle size={14} />
              WhatsApp Us
            </a>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-3 bg-transparent border-2 border-ivory/40 text-ivory px-7 py-4 rounded-full font-display uppercase tracking-widest text-xs font-semibold hover:border-ivory hover:bg-ivory/10 transition-all duration-400"
            >
              Contact Form
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
