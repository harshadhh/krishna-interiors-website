import { MessageCircle, Instagram } from "lucide-react";
import { useSiteData } from "../contexts/SiteDataContext";

export function FloatingButtons() {
  const { data } = useSiteData();
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <a 
        href="https://instagram.com/krishna_interiors_94" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] rounded-full flex items-center justify-center text-white shadow-lg shadow-pink-500/30 hover:scale-110 hover:-translate-y-1 transition-all duration-300 group relative"
        aria-label="Follow us on Instagram"
      >
        <Instagram size={28} className="group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute right-full mr-4 bg-black/80 text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Follow on Instagram
        </span>
      </a>

      <a 
        href="https://wa.me/918793093953" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#25D366]/30 hover:scale-110 hover:-translate-y-1 transition-all duration-300 group relative"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute right-full mr-4 bg-black/80 text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
