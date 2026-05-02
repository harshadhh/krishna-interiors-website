import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Star, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useSiteData } from "../contexts/SiteDataContext";

export function Footer() {
  const { data } = useSiteData();
  
  return (
    <footer className="bg-forest text-ivory py-20 px-8 md:px-16 lg:px-24 rounded-t-3xl border-t border-white/10 relative z-10 w-full mt-auto overflow-hidden">
      <div className="absolute bottom-0 right-0 pointer-events-none overflow-hidden opacity-[0.04]">
        <h1 className="font-display text-[20vw] leading-none font-bold uppercase text-white whitespace-nowrap">Krishna</h1>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              {data.general.logo ? (
                <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 bg-white/10 rounded-md p-1">
                  <img src={data.general.logo || undefined} alt="Logo" className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shadow-md shrink-0">
                  <span className="font-display font-bold text-ivory text-xl leading-none">K</span>
                </div>
              )}
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-base tracking-widest uppercase text-ivory">Krishna</span>
                <span className="font-display font-medium text-[10px] tracking-[0.15em] uppercase text-terracotta">Interiors & Designing</span>
              </div>
            </Link>
            <p className="font-serif italic text-ivory/60 text-base mb-6 leading-relaxed">
              Lohegaon's most trusted interior contractor. Turning raw spaces into living stories — end-to-end furniture & design solutions.
            </p>
            <div className="flex flex-col gap-2">
              <span className="border border-brass/30 text-brass font-display uppercase tracking-widest text-[10px] px-3 py-1.5 rounded-full inline-block w-fit">10-Year Furniture Warranty</span>
              <span className="border border-brass/30 text-brass font-display uppercase tracking-widest text-[10px] px-3 py-1.5 rounded-full inline-block w-fit">45-60 Days Handover Guarantee</span>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-brass text-brass" />
                ))}
              </div>
              <span className="font-display text-xs text-ivory/50 uppercase tracking-wider">{data.general.reviewsScore || "4.8"} · {data.general.reviewsCount || "66"} Reviews</span>
            </div>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-widest text-sm font-semibold text-brass mb-6">Navigation</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/" className="text-ivory/70 hover:text-white transition-colors uppercase font-display text-xs tracking-wider hover:tracking-widest duration-300">Home</Link></li>
              <li><Link to="/services" className="text-ivory/70 hover:text-white transition-colors uppercase font-display text-xs tracking-wider hover:tracking-widest duration-300">Services</Link></li>
              <li><Link to="/portfolio" className="text-ivory/70 hover:text-white transition-colors uppercase font-display text-xs tracking-wider hover:tracking-widest duration-300">Portfolio</Link></li>
              <li><Link to="/about" className="text-ivory/70 hover:text-white transition-colors uppercase font-display text-xs tracking-wider hover:tracking-widest duration-300">About</Link></li>
              <li><Link to="/contact" className="text-ivory/70 hover:text-white transition-colors uppercase font-display text-xs tracking-wider hover:tracking-widest duration-300">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-widest text-sm font-semibold text-brass mb-6">Services</h4>
            <ul className="flex flex-col gap-3 text-ivory/70 font-display text-xs tracking-wider uppercase">
              <li><Link to="/services#01" className="hover:text-white transition-colors">Modular Kitchens</Link></li>
              <li><Link to="/services#03" className="hover:text-white transition-colors">Wardrobes & Storage</Link></li>
              <li><Link to="/services#04" className="hover:text-white transition-colors">Living Room Design</Link></li>
              <li><Link to="/services#03" className="hover:text-white transition-colors">Bedroom Interiors</Link></li>
              <li><Link to="/services#08" className="hover:text-white transition-colors">Tiles & Flooring</Link></li>
              <li><Link to="/services#10" className="hover:text-white transition-colors">Civil Work</Link></li>
              <li><Link to="/services#11" className="hover:text-white transition-colors">Commercial Spaces</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-widest text-sm font-semibold text-brass mb-6">Contact</h4>
            <div className="flex flex-col gap-5 text-ivory/70">
              <a href={`mailto:${data.contact.email}`} className="flex items-start gap-3 hover:text-white transition-colors group">
                <div className="w-[14px] flex justify-center mt-0.5">
                  <span className="text-terracotta text-xs font-display">✉</span>
                </div>
                <div>
                  <p className="font-display text-xs uppercase tracking-wider font-semibold text-ivory/50 mb-1">Email</p>
                  <p className="font-serif text-sm font-medium text-ivory group-hover:text-white transition-colors break-all">{data.contact.email}</p>
                </div>
              </a>
              <a href="tel:+919549234994" className="flex items-start gap-3 hover:text-white transition-colors group">
                <Phone size={14} className="mt-0.5 text-terracotta flex-shrink-0" />
                <div>
                  <p className="font-display text-xs uppercase tracking-wider font-semibold text-ivory/50 mb-1">Phone</p>
                  <p className="font-serif text-base font-medium text-ivory group-hover:text-white transition-colors">095492 34994<br/>087930 93953</p>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <div className="w-[14px] flex justify-center mt-0.5">
                  <span className="text-terracotta text-xs font-display">⌚</span>
                </div>
                <div>
                  <p className="font-display text-xs uppercase tracking-wider font-semibold text-ivory/50 mb-1">Hours</p>
                  <p className="font-serif text-sm text-ivory/70 break-words">9:00 AM - 9:30 PM<br/>(All Days)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 text-terracotta flex-shrink-0" />
                <div>
                  <p className="font-display text-xs uppercase tracking-wider font-semibold text-ivory/50 mb-1">Address</p>
                  <address className="font-serif not-italic text-sm text-ivory/70 leading-relaxed">
                    Sr. No. 282, Porwal Road,<br/>Near Kamlai Dairy, Kand Nagar,<br />Lohegaon, Pune - 411047
                  </address>
                </div>
              </div>
              <a href="https://www.google.com/maps/place/Krishna+interiors/@18.6020001,73.9044344,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c7c299ecab11:0x7993cc5e03431411!8m2!3d18.6019951!4d73.9093!16s%2Fg%2F11xp6sn46k?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brass hover:text-white transition-colors font-display text-xs uppercase tracking-widest group">
                Get Directions
                <ArrowUpRight size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center pt-8 border-t border-white/10 text-ivory/40 text-[10px] sm:text-xs font-display uppercase tracking-widest gap-4">
          <div className="flex flex-col md:flex-row w-full justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left flex-wrap justify-center">
              <p>© {new Date().getFullYear()} Krishna Interiors & Designing.</p>
              <span className="hidden sm:inline">|</span>
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span className="hidden sm:inline">|</span>
              <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <span className="hidden sm:inline">|</span>
              <Link to="/admin" className="hover:text-terracotta transition-colors">Admin Portal</Link>
            </div>
            <p className="text-center md:text-right uppercase">Designed By <a href="https://peakmediastudio.com" target="_blank" rel="noopener noreferrer" className="text-brass hover:text-white transition-colors font-semibold ml-1">PEAKMEDIASTUDIO</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
