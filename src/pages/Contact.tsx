import { FinaleForm } from "../components/FinaleForm";
import { PageTransition } from "../components/PageTransition";
import { Phone, MapPin, Mail, ArrowRight, MessageCircle } from "lucide-react";
import { useSiteData } from "../contexts/SiteDataContext";
import { motion } from "motion/react";

export function Contact() {
  const { data } = useSiteData();

  return (
    <PageTransition>
      {/* Contact Details Section */}
      <section className="bg-ivory py-32 px-6 md:px-12 lg:px-24 w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="flex-1 flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h1 className="font-display font-bold uppercase tracking-tight text-forest text-4xl sm:text-5xl md:text-6xl mb-6 break-words sm:break-normal">
                Start the <br/>Conversation.
              </h1>
              <p className="font-serif text-lg md:text-xl text-forest/70 max-w-md">
                Whether you have a fully formed vision or just the seed of an idea, we're here to help you build it.
              </p>
            </motion.div>

            <div className="flex flex-col gap-12 mt-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group flex items-start gap-6"
              >
                <div className="pt-1">
                  <Phone size={24} className="text-terracotta group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-display uppercase tracking-widest text-xs font-semibold text-forest/50 mb-3">Call or Whatsapp</h4>
                  <div className="flex flex-col gap-1">
                    <p className="font-serif text-2xl font-medium text-forest hover:text-terracotta transition-colors">
                      <a href="tel:+918793093953">+91 87930 93953</a>
                    </p>
                    <p className="font-serif text-2xl font-medium text-forest hover:text-terracotta transition-colors">
                      <a href="tel:+919549234994">+91 95492 34994</a>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group flex items-start gap-6"
              >
                <div className="pt-1">
                  <Mail size={24} className="text-terracotta group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-display uppercase tracking-widest text-xs font-semibold text-forest/50 mb-3">Email Us</h4>
                  <p className="font-serif text-xl sm:text-2xl font-medium text-forest hover:text-terracotta transition-colors break-all sm:break-normal">
                    <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
                  </p>
                  <p className="font-sans text-sm text-forest/60 mt-2">We reply within 2 hours on all working days.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group flex items-start gap-6"
              >
                <div className="pt-1">
                  <MapPin size={24} className="text-terracotta group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-display uppercase tracking-widest text-xs font-semibold text-forest/50 mb-3">Showroom & Headquarters</h4>
                  <address className="font-serif not-italic text-xl text-forest leading-relaxed max-w-sm">
                    {data.contact.address.split(',').map((line, i) => (
                      <span key={i}>{line.trim()}{i < data.contact.address.split(',').length - 1 && ','}<br/></span>
                    ))}
                  </address>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-10 mt-8 lg:mt-0 relative">
            {/* Elegant Hours Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-forest text-ivory p-10 md:p-14 rounded-[2rem] shadow-2xl relative overflow-hidden"
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

              <h4 className="font-display uppercase tracking-widest text-xs font-semibold text-terracotta mb-8 relative z-10">Operating Hours</h4>
              
              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex flex-col">
                  <span className="font-display text-[6.5vw] min-[400px]:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-2 whitespace-nowrap">9:00 AM — 9:30 PM</span>
                  <span className="font-serif italic text-ivory/80 text-lg">Monday to Sunday</span>
                </div>
                
                <div className="w-full h-px bg-ivory/10 my-2"></div>
                
                <p className="font-sans text-sm md:text-base text-ivory/70 leading-relaxed font-light">
                  We work every day with <strong className="font-medium text-terracotta">no holidays</strong>. Building your dream space doesn't stop, and neither do we. Drop by our showroom whenever inspiration strikes.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#EDEAE3] p-8 rounded-[2rem] flex flex-col items-start gap-4 border border-forest/5"
            >
              <h5 className="font-display text-lg font-bold text-forest uppercase tracking-tight flex items-center gap-2">
                <Mail size={20} className="text-terracotta" />
                Direct Email
              </h5>
              <p className="font-sans text-sm text-forest/70 leading-relaxed">
                Send us your floor plan or references directly to our inbox for an immediate consultation.
              </p>
              <a 
                href={`mailto:${data.contact.email}`}
                className="mt-2 inline-flex items-center gap-3 bg-forest text-ivory px-8 py-4 rounded-full font-display uppercase tracking-widest font-bold text-xs hover:bg-terracotta hover:text-white transition-colors shadow-lg"
              >
                Send an Email
                <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Finale Form Section */}
      <FinaleForm />

      {/* Map location section with creative design */}
      <section className="bg-ivory py-32 px-6 md:px-12 lg:px-24 w-full">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 md:px-0"
            >
              <div>
                <h2 className="font-display font-bold uppercase tracking-tight text-forest text-3xl md:text-4xl mb-3">Find Our Showroom</h2>
                <p className="font-serif italic text-lg text-forest/70">Visit us at Lohegaon, Pune to touch and feel our materials.</p>
              </div>
              
              <a 
                href="https://www.google.com/maps/place/Krishna+interiors/@18.6020001,73.9044344,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c7c299ecab11:0x7993cc5e03431411!8m2!3d18.6019951!4d73.9093!16s%2Fg%2F11xp6sn46k?entry=ttu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden md:inline-flex bg-terracotta hover:bg-forest text-white px-8 py-4 rounded-full font-display uppercase tracking-widest text-xs font-bold transition-all items-center gap-2"
              >
                <MapPin size={14} />
                Get Directions
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-full h-[50vh] md:h-[60vh] mt-4 shadow-2xl relative overflow-hidden rounded-[2rem] border border-forest/10 group"
            >
               {/* Embed Google Maps */}
               <iframe 
                src="https://maps.google.com/maps?q=18.6019951,73.9093&hl=en&z=17&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[40%] sepia-[15%] transition-transform duration-1000 group-hover:scale-105"
              ></iframe>

              {/* Floating mobile button */}
              <a 
                href="https://www.google.com/maps/place/Krishna+interiors/@18.6020001,73.9044344,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c7c299ecab11:0x7993cc5e03431411!8m2!3d18.6019951!4d73.9093!16s%2Fg%2F11xp6sn46k?entry=ttu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden inline-flex bg-terracotta hover:bg-forest text-white px-8 py-4 rounded-full font-display uppercase tracking-widest text-xs font-bold transition-all shadow-xl items-center gap-2 whitespace-nowrap"
              >
                <MapPin size={14} />
                Get Directions
              </a>
            </motion.div>
        </div>
      </section>

    </PageTransition>
  );
}


