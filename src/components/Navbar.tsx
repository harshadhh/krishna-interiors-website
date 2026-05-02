import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSiteData } from "../contexts/SiteDataContext";

const links = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const location = useLocation();
  const { data } = useSiteData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-ivory ${isScrolled ? 'py-4 shadow-sm' : 'py-6'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            {data.general.logo ? (
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                <img src={data.general.logo || undefined} alt="Logo" className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-11 h-11 bg-terracotta rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shadow-md shrink-0">
                <span className="font-display font-bold text-ivory text-lg leading-none">K</span>
              </div>
            )}
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-sm md:text-base tracking-widest uppercase text-forest">Krishna</span>
              <span className="font-display font-medium text-[10px] md:text-xs tracking-[0.15em] uppercase text-terracotta">Interiors & Designing</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="relative group font-display uppercase tracking-widest text-xs font-semibold text-forest"
                >
                  <span className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`}>
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="navbar-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-terracotta rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <a 
            href="tel:+918793093953"
            className="hidden md:flex items-center gap-2 bg-terracotta text-ivory px-5 py-2.5 rounded-full font-display uppercase tracking-widest text-xs font-semibold hover:bg-forest transition-colors duration-300 shadow-md"
          >
            <Phone size={12} />
            Call Us
          </a>

          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center text-forest" 
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-forest text-ivory flex flex-col pt-8 px-6 pb-12"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-display font-bold text-sm tracking-widest uppercase text-ivory">Menu</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-6 flex-1">
              {links.map(link => (
                <Link 
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-display text-4xl font-bold uppercase tracking-wide ${location.pathname === link.path ? 'text-terracotta' : 'text-ivory'}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <a 
              href="tel:+918793093953"
              className="flex items-center justify-center gap-3 bg-terracotta text-ivory w-full py-4 rounded-full font-display uppercase tracking-widest text-sm font-bold shadow-lg mt-auto"
            >
              <Phone size={16} /> Call Us Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
