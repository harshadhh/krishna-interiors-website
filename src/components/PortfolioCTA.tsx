import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function PortfolioCTA() {
  return (
    <section className="bg-ivory py-24 px-6 md:px-12 flex justify-center">
      <div className="bg-forest rounded-[2rem] w-full max-w-5xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-terracotta text-lg">✦</span>
            <span className="font-display uppercase tracking-[0.2em] text-xs text-terracotta font-bold">
              Your Story Next
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase leading-none tracking-tight mb-6">
            <span className="text-white block">Inspired By</span>
            <span className="text-brass block">Our Work?</span>
          </h2>
          <p className="font-serif text-white/80 text-lg md:text-xl max-w-md italic">
            Let's craft a masterpiece tailored just for you. Book a free consultation with our design team today.
          </p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
          <a 
            href="#" 
            className="w-full sm:w-auto bg-terracotta hover:bg-terracotta/90 text-white font-display text-xs md:text-sm uppercase tracking-widest font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-colors shrink-0"
          >
            <MessageCircle size={18} />
            Whatsapp Us
          </a>
          <Link 
            to="/contact" 
            className="w-full sm:w-auto bg-transparent border border-white/30 text-white hover:bg-white/10 font-display text-xs md:text-sm uppercase tracking-widest font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-colors shrink-0"
          >
            Contact Form
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
