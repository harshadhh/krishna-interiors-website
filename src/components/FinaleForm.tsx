import { useState, useRef, useEffect } from "react";
import { MoveRight } from "lucide-react";
import emailjs from '@emailjs/browser';

export function FinaleForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Modular Kitchen");
  const [budget, setBudget] = useState("");
  const [area, setArea] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, 40)}px`;
    }
  }, [details]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("idle");

    try {
      await emailjs.send(
        'service_o0buqf9', 
        'template_vtzl3ep',
        {
          name,
          phone,
          email,
          service,
          budget,
          area,
          details,
        },
        'xDyeXz1qQnbIioSks' 
      );
      
      setSubmissionStatus("success");
      // Optional: Clear form
      // setName(""); setPhone(""); setEmail(""); setArea(""); setDetails(""); setBudget("");
    } catch (error) {
      console.error("FAILED...", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-terracotta flex flex-col justify-center items-center py-24 px-4 md:px-8 relative overflow-hidden">
      
      {/* Decorative large BG text */}
      <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 opacity-10 pointer-events-none">
        <h1 className="font-display text-[30vw] leading-none uppercase font-bold text-ivory">
          Start
        </h1>
      </div>

      <div className="max-w-6xl w-full relative z-10 mt-12">
        <h2 className="font-display text-4xl md:text-7xl font-bold text-ivory uppercase leading-tight mb-12 text-center tracking-tight">
          Ready to build <br className="hidden md:block"/> something extraordinary?
        </h2>

        <div className="max-w-5xl mx-auto">
          <form 
            onSubmit={handleSubmit}
            className="font-serif italic text-2xl md:text-5xl leading-loose md:leading-[1.8] text-ivory/80 text-center"
          >
            "Hi, my name is{" "}
            <input 
              type="text" 
              placeholder="Rahul Sharma" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border-b-2 border-ivory/30 focus:border-ivory outline-none w-[180px] md:w-[280px] text-ivory placeholder-ivory/20 text-center font-display not-italic transition-colors mx-2"
              required
            />
            , you can reach me at my number{" "}
            <input 
              type="tel" 
              placeholder="+91 98765 43210" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-transparent border-b-2 border-ivory/30 focus:border-ivory outline-none w-[200px] md:w-[340px] text-ivory placeholder-ivory/20 text-center font-display not-italic transition-colors mx-2"
              required
            />
            {" "}or email{" "}
            <input 
              type="email" 
              placeholder="rahul@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-b-2 border-ivory/30 focus:border-ivory outline-none w-[220px] md:w-[400px] text-ivory placeholder-ivory/20 text-center font-display not-italic transition-colors mx-2"
              required
            />
            . I need help with{" "}
            <div className="inline-block relative">
              <select 
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="bg-transparent border-b-2 border-ivory/30 focus:border-ivory text-ivory outline-none font-display not-italic mx-2 cursor-pointer appearance-none text-center pr-8"
              >
                <optgroup label="Kitchen" className="text-forest">
                  <option value="Modular Kitchen">Modular Kitchen</option>
                </optgroup>
                <optgroup label="Furniture" className="text-forest">
                  <option value="Wardrobes & Bedroom">Wardrobes & Bedroom</option>
                  <option value="Living Room & TV Unit">Living Room & TV Unit</option>
                  <option value="Mandir / Dining Table">Mandir / Dining Table</option>
                </optgroup>
                <optgroup label="Civil & Structure" className="text-forest">
                  <option value="False Ceiling">False Ceiling</option>
                  <option value="Civil Work & Renovation">Civil Work & Renovation</option>
                  <option value="Painting & Plumbing">Painting & Plumbing</option>
                </optgroup>
                <optgroup label="Finishes" className="text-forest">
                  <option value="Lighting Design">Lighting Design</option>
                  <option value="Wallpapers">Wallpapers</option>
                  <option value="Tiles & Marble">Tiles & Marble</option>
                </optgroup>
                <optgroup label="Entrance & Exterior" className="text-forest">
                  <option value="Entrance & Main Door">Entrance & Main Door</option>
                  <option value="Balcony & PVC">Balcony & PVC</option>
                </optgroup>
                <optgroup label="Commercial" className="text-forest">
                  <option value="Office Interior">Office Interior</option>
                  <option value="Shop / Mall">Shop / Mall</option>
                </optgroup>
                <optgroup label="Full Home" className="text-forest">
                  <option value="Full Home — Everything">Full Home — Everything</option>
                </optgroup>
                <optgroup label="Other" className="text-forest">
                  <option value="Other / Not Sure">Other / Not Sure</option>
                </optgroup>
              </select>
            </div>
            {" "}and my approximate budget is{" "}
            <div className="inline-block relative">
              <select 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="bg-transparent border-b-2 border-ivory/30 focus:border-ivory text-ivory outline-none font-display not-italic mx-2 cursor-pointer appearance-none text-center pr-8 w-auto min-w-[200px]"
                required
              >
                <option value="" disabled className="text-forest/50">Select budget range</option>
                <option value="Under ₹50K" className="text-forest">Under ₹50K</option>
                <option value="₹50K - ₹1L" className="text-forest">₹50K - ₹1L</option>
                <option value="₹1L - ₹2L" className="text-forest">₹1L - ₹2L</option>
                <option value="₹2L - ₹3L" className="text-forest">₹2L - ₹3L</option>
                <option value="₹3L - ₹5L" className="text-forest">₹3L - ₹5L</option>
                <option value="₹5L - ₹10L" className="text-forest">₹5L - ₹10L</option>
                <option value="₹10L - ₹15L" className="text-forest">₹10L - ₹15L</option>
                <option value="₹15L - ₹20L+" className="text-forest">₹15L - ₹20L+</option>
              </select>
            </div>
            . My area in Pune is{" "}
            <input 
              type="text" 
              placeholder="e.g. Viman Nagar, Kharadi, Baner, Wakad..." 
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="bg-transparent border-b-2 border-ivory/30 focus:border-ivory outline-none w-[320px] md:w-[600px] text-ivory placeholder-ivory/20 text-center font-display not-italic transition-colors mx-2"
              required
            />
            . Here's a bit more about my project:{" "}
            <div className="inline-block w-[90%] mt-4 align-top">
              <textarea 
                ref={textareaRef}
                placeholder="e.g. 3BHK in Kharadi — need a full modular kitchen, 2 wardrobes, false ceiling throughout and painting. Want to start in 2 months." 
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="bg-transparent border-b-2 border-ivory/30 focus:border-ivory outline-none w-full text-ivory placeholder-ivory/20 text-center font-display not-italic transition-colors resize-none overflow-hidden"
                rows={1}
                required
              />
            </div>
            ."

            <div className="mt-12 flex flex-col items-center gap-6 text-base md:text-lg font-sans not-italic text-ivory/70 w-[90%] mx-auto">
              <p className="font-display uppercase tracking-widest text-xs text-ivory/40">Optional Attachments (Floorplans, 3D Renders, Inspirations)</p>
              <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
                 <div className="flex flex-col items-center gap-2 border border-ivory/20 rounded-xl p-4 hover:bg-ivory/5 transition-colors cursor-pointer w-full sm:w-auto relative group">
                   <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" title="Attach Image 1" />
                   <div className="w-8 h-8 rounded-full bg-ivory/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <span className="text-xl leading-none">+</span>
                   </div>
                   <span className="font-display tracking-widest text-xs uppercase">Attach Image 1</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 border border-ivory/20 rounded-xl p-4 hover:bg-ivory/5 transition-colors cursor-pointer w-full sm:w-auto relative group">
                   <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" title="Attach Image 2" />
                   <div className="w-8 h-8 rounded-full bg-ivory/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <span className="text-xl leading-none">+</span>
                   </div>
                   <span className="font-display tracking-widest text-xs uppercase">Attach Image 2</span>
                 </div>
              </div>
            </div>

            <div className="mt-20 flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting || submissionStatus === "success"}
                className={`group flex items-center gap-4 px-10 py-6 rounded-full font-display uppercase tracking-widest text-sm font-semibold transition-colors shadow-2xl ${
                  submissionStatus === "success" 
                    ? "bg-green-600 text-white" 
                    : "bg-ivory text-terracotta hover:bg-white"
                } disabled:opacity-80 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : submissionStatus === "success" ? (
                  "Inquiry Sent Successfully!"
                ) : (
                  <>
                    Send Inquiry — We'll Respond Within 24 Hours
                    <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-2">
                      <MoveRight className="w-4 h-4 text-terracotta" />
                    </div>
                  </>
                )}
              </button>
              {submissionStatus === "error" && (
                <p className="font-sans text-sm text-red-200 mt-2 not-italic">Something went wrong. Please try again or email us directly.</p>
              )}
              <p className="font-display text-xs text-ivory/50 mt-4 tracking-widest uppercase not-italic">
                By submitting, you agree to be contacted by Krishna Interiors. We never share your details.
              </p>
            </div>
          </form>
        </div>
      </div>
      
    </section>
  );
}
