import { PageTransition } from "../components/PageTransition";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useSiteData } from "../contexts/SiteDataContext";

function Counter({ target, suffix = "" }: { target: number, suffix?: string }) {
  // If we want a counter, maybe react-countup or just display it statically since the prompt just says "HTML template replica"
  // Let's just use the target directly for now with motion
  return (
    <motion.span 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-display font-black text-6xl md:text-7xl text-ivory mb-4 tracking-tighter"
    >
      {target}{suffix}
    </motion.span>
  );
}

export function About() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data } = useSiteData();

  const services = [
    { id: "01", catalogueId: "01", title: "Modular Kitchen", desc: "European hardware. Quartz tops. Built for the way Indian families actually cook.", img: data.about.services.kitchen },
    { id: "02", catalogueId: "03", title: "Bedroom & Wardrobes", desc: "Floor-to-ceiling storage, hydraulic beds, and custom wall panels.", img: data.about.services.bedroom },
    { id: "03", catalogueId: "04", title: "Living Room", desc: "TV units, false ceilings, mandir designs.", img: data.about.services.living },
    { id: "04", catalogueId: "10", title: "Full Home & Civil", desc: "End-to-end renovation.", img: data.about.services.civil },
    { id: "05", catalogueId: "08", title: "Tiles & Flooring", desc: "Premium tile work, marble flooring, anti-skid solutions — built for Indian climates.", img: data.about.services.tiles },
    { id: "06", catalogueId: "11", title: "Commercial Spaces", desc: "Offices, showrooms, and retail fit-outs. Professional interiors that make a lasting impression.", img: data.about.services.commercial },
  ];
  
  return (
    <PageTransition>
      <div className="w-full bg-ivory text-forest" ref={scrollRef}>
        
        {/* HERO SECTION */}
        <section className="relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-ivory">
          <div className="w-full md:w-[55%] min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10 pt-32 pb-16 md:pt-0 md:pb-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <span className="font-display uppercase tracking-[0.25em] text-xs text-terracotta font-semibold mb-6 block">✦ The Formation</span>
              <h1 className="font-display font-bold text-[13vw] md:text-[6.5vw] leading-[0.85] tracking-tight uppercase text-forest">
                We Build <br/><span className="text-terracotta">Legacies.</span>
              </h1>
              <p className="mt-10 max-w-lg text-lg md:text-xl text-forest/70 font-serif italic leading-relaxed">
                What started in 2018 as a humble workshop has evolved into Lohegaon's premier interior contracting firm. We don't just furnish spaces; we craft environments where life happens.
              </p>
              <div className="mt-12 flex items-center gap-4">
                <div className="w-16 h-px bg-forest/20"></div>
                <span className="font-display text-xs uppercase tracking-widest font-semibold text-forest">Crafting since Day One</span>
              </div>
            </motion.div>
          </div>
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1 }}
             className="w-full md:w-[45%] h-[50vh] md:h-screen relative"
          >
            <div className="w-full h-full">
              <img src={data.about.architectureBg || undefined} alt="Architecture" className="w-full h-full object-cover absolute inset-0 filter brightness-[0.85] saturate-[0.8]" />
              <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/10 to-transparent pointer-events-none md:block hidden"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-ivory/60 via-transparent to-transparent pointer-events-none md:hidden"></div>
            </div>
          </motion.div>
        </section>

        {/* STATS SECTION */}
        <section className="bg-forest py-32 px-8 md:px-16 lg:px-24 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <motion.span 
                 initial={{ opacity: 0, y: 16 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="font-display uppercase tracking-[0.25em] text-xs text-brass font-semibold mb-3 block"
              >
                ✦ Impact
              </motion.span>
              <motion.h2 
                 initial={{ opacity: 0, y: 24 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="font-display font-bold text-4xl md:text-6xl uppercase text-ivory leading-none tracking-tight"
              >
                By The <span className="text-brass">Numbers</span>
              </motion.h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-ivory/10">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col py-6 md:py-0 md:px-8 group">
                <span className="font-display font-black text-6xl md:text-7xl text-ivory group-hover:text-brass transition-colors duration-500 mb-4 tracking-tighter">238+</span>
                <h3 className="font-display uppercase tracking-widest text-sm font-semibold text-brass mb-2">Projects Delivered</h3>
                <p className="font-serif italic text-ivory/50 text-sm">Residences and commercial spaces transformed flawlessly.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col py-6 md:py-0 md:px-8 group">
                <span className="font-display font-black text-6xl md:text-7xl text-ivory group-hover:text-terracotta transition-colors duration-500 mb-4 tracking-tighter">8+</span>
                <h3 className="font-display uppercase tracking-widest text-sm font-semibold text-terracotta mb-2">Years of Experience</h3>
                <p className="font-serif italic text-ivory/50 text-sm">Mastering the intricate art of execution and design.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col py-6 md:py-0 md:px-8 group">
                <span className="font-display font-black text-6xl md:text-7xl text-ivory group-hover:text-brass transition-colors duration-500 mb-4 tracking-tighter">97%</span>
                <h3 className="font-display uppercase tracking-widest text-sm font-semibold text-brass mb-2">Satisfaction</h3>
                <p className="font-serif italic text-ivory/50 text-sm">Consistently exceeding client expectations, every single time.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col py-6 md:py-0 md:px-8 group">
                <span className="font-display font-black text-6xl md:text-7xl text-ivory group-hover:text-terracotta transition-colors duration-500 mb-4 tracking-tighter">45-60</span>
                <h3 className="font-display uppercase tracking-widest text-sm font-semibold text-terracotta mb-2">Days Handover</h3>
                <p className="font-serif italic text-ivory/50 text-sm">Guaranteed delivery timelines with zero compromises.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="bg-[#F5F1EB] py-32 px-8 md:px-16 lg:px-24 overflow-hidden border-b border-forest/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
            <div className="md:w-1/3">
              <motion.div 
                 initial={{ opacity: 0, y: 20 }} 
                 whileInView={{ opacity: 1, y: 0 }} 
                 viewport={{ once: true, margin: "-100px" }}
                 className="sticky top-32"
              >
                <span className="font-display uppercase tracking-[0.25em] text-xs text-terracotta font-semibold mb-3 block">✦ Our Process</span>
                <h2 className="font-display font-bold text-4xl md:text-5xl uppercase text-forest leading-none tracking-tight mb-6">
                  How We <br/><span className="text-terracotta">Work</span>
                </h2>
                <p className="font-serif italic text-forest/70 text-lg leading-relaxed">
                  A seamless, transparent journey. We handle the chaos, so you can enjoy the transformation.
                </p>
              </motion.div>
            </div>
            
            <div className="md:w-2/3 flex flex-col gap-12 md:gap-20">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="group flex flex-col md:flex-row gap-8 items-start">
                <span className="font-display font-black text-6xl md:text-8xl text-forest/15 group-hover:text-terracotta/40 transition-colors duration-500 leading-none shrink-0">01</span>
                <div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tight text-forest mb-3">Consultation & Vision</h3>
                  <p className="font-serif text-forest/70 text-base leading-relaxed max-w-md">We sit down to understand your lifestyle, requirements, and the hidden potential of your space. It's all about aligning with your dreams.</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="group flex flex-col md:flex-row gap-8 items-start">
                <span className="font-display font-black text-6xl md:text-8xl text-forest/15 group-hover:text-terracotta/40 transition-colors duration-500 leading-none shrink-0">02</span>
                <div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tight text-forest mb-3">Design & 3D Planning</h3>
                  <p className="font-serif text-forest/70 text-base leading-relaxed max-w-md">Translating ideas into comprehensive 3D visuals. We finalize materials, layouts, and finishes so there are no surprises.</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="group flex flex-col md:flex-row gap-8 items-start">
                <span className="font-display font-black text-6xl md:text-8xl text-forest/15 group-hover:text-terracotta/40 transition-colors duration-500 leading-none shrink-0">03</span>
                <div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tight text-forest mb-3">Flawless Execution</h3>
                  <p className="font-serif text-forest/70 text-base leading-relaxed max-w-md">Our master craftsmen and dedicated project managers bring the designs to life. Strict quality control at every stage.</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="group flex flex-col md:flex-row gap-8 items-start">
                <span className="font-display font-black text-6xl md:text-8xl text-forest/15 group-hover:text-terracotta/40 transition-colors duration-500 leading-none shrink-0">04</span>
                <div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tight text-forest mb-3">45-60-Day Handover</h3>
                  <p className="font-serif text-forest/70 text-base leading-relaxed max-w-md">Following a rigorous final inspection and deep cleaning, we hand over the keys to your spectacular new space on time.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CORE SERVICES GRID */}
        <section className="bg-ivory py-32 px-8 md:px-16 lg:px-24 overflow-hidden relative border-t border-forest/10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center flex flex-col items-center">
              <motion.span initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display uppercase tracking-[0.25em] text-xs text-terracotta font-semibold mb-3 block">✦ Expertise</motion.span>
              <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display font-bold text-5xl md:text-7xl uppercase text-forest leading-none tracking-tight mb-6">
                Our <span className="text-terracotta italic pr-4">Signature</span> Services
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif italic text-forest/70 text-lg max-w-xl text-center">
                Mastering the art of interior contracting. Every service is a testament to our obsession with perfection.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {services.map((service, index) => (
                <motion.div 
                  key={service.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.1 }} 
                  onClick={() => navigate(`/services#${service.catalogueId}`)}
                  className="group relative overflow-hidden h-[450px] md:h-[500px] w-full rounded-[2rem] bg-forest flex flex-col justify-end p-8 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <img src={service.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 opacity-80" alt={service.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/0 group-hover:text-ivory group-hover:bg-terracotta group-hover:border-terracotta transition-all duration-500 -rotate-45">
                    <ArrowRight className="w-5 h-5" />
                  </div>

                  <div className="relative z-10 w-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-display font-medium text-lg text-terracotta group-hover:text-brass transition-colors duration-500">{service.id}</span>
                      <div className="h-px bg-ivory/20 group-hover:bg-terracotta/50 flex-1 transition-colors duration-500"></div>
                    </div>
                    <h3 className="font-display font-bold text-3xl uppercase text-ivory tracking-tight mb-4 group-hover:text-terracotta transition-colors duration-500">{service.title}</h3>
                    <p className="font-serif text-ivory/80 text-base opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              ))}

            </div>
          </div>
        </section>

        {/* FOUNDERS SECTION */}
        <section className="bg-ivory py-32 px-8 md:px-16 lg:px-24 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 items-center mb-32">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:w-1/2 relative w-full">
                <div className="aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden relative group">
                  <img src={data.about.founder || undefined} alt="Founder" className="w-full h-full object-cover transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent mix-blend-normal"></div>
                  <div className="absolute bottom-10 left-10">
                    <p className="font-display uppercase tracking-[0.2em] text-xs text-brass font-bold mb-2">Founder & Lead</p>
                    <h3 className="font-display font-bold text-3xl md:text-4xl uppercase text-ivory">Mr. Suresh Bishnoi</h3>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:w-1/2">
                <span className="font-display uppercase tracking-[0.25em] text-xs text-terracotta font-semibold mb-3 block">✦ The Visionary</span>
                <h2 className="font-display font-bold text-4xl md:text-6xl uppercase text-forest leading-none tracking-tight mb-8">
                  Driven By <br/><span className="text-terracotta">Excellence.</span>
                </h2>
                <div className="flex flex-col gap-6 font-serif text-forest/70 text-lg leading-relaxed">
                  <p>
                    With a profound understanding of aesthetics and functionality, Krishna Interiors was started to bridge the gap between imagination and execution. 
                  </p>
                  <p>
                    Driven by an uncompromising dedication to craftsmanship, Mr. Bishnoi has cultivated a culture of transparency and quality within the firm. Every project is treated as a unique canvas.
                  </p>
                  <blockquote className="pl-6 border-l-2 border-terracotta mt-4">
                    <p className="italic text-xl text-forest">"It’s not just about building furniture or painting walls; it’s about crafting a lasting legacy that families will cherish."</p>
                    <footer className="mt-3 font-display font-medium text-terracotta uppercase tracking-[0.2em] text-xs">
                      — Mr. Suresh Bishnoi
                    </footer>
                  </blockquote>
                </div>
              </motion.div>
            </div>

            {/* CORE TEAM */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pt-20 border-t border-forest/10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                  <span className="font-display uppercase tracking-[0.25em] text-xs text-terracotta font-semibold mb-3 block">✦ The Executioners</span>
                  <h2 className="font-display font-bold text-3xl md:text-5xl uppercase text-forest leading-none tracking-tight">
                    The <span className="text-terracotta">Core Team</span>
                  </h2>
                </div>
                <p className="font-serif italic text-forest/60 text-lg max-w-sm">The driving forces ensuring our vision translates perfectly on-site.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Manager 1 */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 p-8 rounded-3xl bg-white border border-forest/5 hover:border-terracotta/20 hover:shadow-xl transition-all duration-500 group">
                  <div className="w-full sm:w-24 h-48 sm:h-24 rounded-2xl sm:rounded-xl overflow-hidden shrink-0 border-2 border-transparent group-hover:border-terracotta transition-colors duration-500">
                    <img src={data.about.pm1 || undefined} alt="Project Manager" className="w-full h-full object-cover transition-all duration-500" />
                  </div>
                  <div className="w-full">
                    <h4 className="font-display font-bold text-xl md:text-2xl uppercase tracking-wide text-forest mb-1 group-hover:text-terracotta transition-colors">{data.about.pm1Name}</h4>
                    <p className="font-display uppercase tracking-widest text-[10px] font-semibold text-forest/50 mb-3">Senior Execution Lead</p>
                    <p className="font-serif text-sm text-forest/60 italic">Ensuring every joint is perfect and every timeline is met.</p>
                  </div>
                </div>
                {/* Manager 2 */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 p-8 rounded-3xl bg-white border border-forest/5 hover:border-brass/40 hover:shadow-xl transition-all duration-500 group">
                  <div className="w-full sm:w-24 h-48 sm:h-24 rounded-2xl sm:rounded-xl overflow-hidden shrink-0 border-2 border-transparent group-hover:border-brass transition-colors duration-500">
                    <img src={data.about.pm2 || undefined} alt="Project Manager" className="w-full h-full object-cover transition-all duration-500" />
                  </div>
                  <div className="w-full">
                    <h4 className="font-display font-bold text-xl md:text-2xl uppercase tracking-wide text-forest mb-1 group-hover:text-brass transition-colors">{data.about.pm2Name}</h4>
                    <p className="font-display uppercase tracking-widest text-[10px] font-semibold text-forest/50 mb-3">Site & Quality Control</p>
                    <p className="font-serif text-sm text-forest/60 italic">Maintaining the highest standards across all materials.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="bg-ivory py-16 md:py-32 px-4 md:px-16 lg:px-24">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-7xl mx-auto text-center bg-forest p-10 py-16 md:p-24 rounded-3xl md:rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-grass/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
            <div className="relative z-10 w-full">
              <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl leading-[0.9] tracking-tight uppercase text-ivory mb-10 break-words sm:break-normal">
                Let's Build <br/><span className="text-terracotta italic font-serif font-light capitalize tracking-normal">Together.</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
                <Link to="/contact" className="flex items-center justify-center gap-4 bg-terracotta text-ivory px-8 md:px-10 py-4 md:py-5 rounded-full font-display uppercase tracking-widest text-xs md:text-sm font-semibold hover:bg-ivory hover:text-forest transition-colors duration-300 shadow-xl shadow-terracotta/25 w-full sm:w-max mx-auto group">
                  Start Your Project
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </PageTransition>
  );
}
