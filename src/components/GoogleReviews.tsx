import { motion } from "motion/react";

const reviews = [
  { name: "Rohit Kokarde", date: "3 months ago", text: "Outstanding Interior Work by Krishna Interior. I am extremely happy with the services provided by Krishna Interior. Mr. Suresh Bishnoi and his team are truly professional, skilled, and very cooperative." },
  { name: "Vista Prince", date: "3 months ago", text: "Krishna interrior had done a great work for my home. The finishing is top notch, it's cost effective. The supervision and the helping nature of Suresh is really appreciated." },
  { name: "Utkarsh Sharma", date: "3 months ago", text: "Superb experience, nice team, good and cooperative team, excellent finishing in carpenter work, kitchen work, painting, POP, electric work. The best part is after sales service is good." },
  { name: "Shirin Mondal", date: "8 months ago", text: "I’m extremely impressed with the interior work every detail has been executed beautifully. The quality of the materials, the precision in finishes, and the overall professionalism shown throughout the project are truly amazing." },
  { name: "Ram Janak", date: "2 weeks ago", text: "Very much satisfied with the kind of work done by krishana interior design. the entire team is amazing and listens to our requirements very carefully and provides the best idea." },
  { name: "Lingaapaa Patil", date: "2 weeks ago", text: "I just got the work done for my 2 bhk though them. It was a truly fantastic. Highly recommend." },
  { name: "Nishant Lohakare", date: "3 months ago", text: "The kitchen trolley made by Krishna Interiors is very sturdy and perfect for Indian kitchens. Good storage space for vegetables, utensils, and daily-use items. Wheels are smooth and easy to move." }
];

export function GoogleReviews() {
  return (
    <section className="py-20 px-4 md:px-8 bg-[#f8f9fa] border-t border-[#e5e7eb] font-sans">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.5rem] text-[#166534] font-[800] uppercase tracking-[-0.025em] mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#4b5563] text-[1.125rem]"
          >
            Recent Google Reviews from happy homeowners
          </motion.p>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-8 pt-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#166534] scrollbar-track-[#f1f1f1]">
          {reviews.map((r, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="min-w-[340px] max-w-[340px] bg-white p-8 rounded-[16px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)] snap-center border-t-[4px] border-[#166534] flex flex-col justify-between"
            >
              <div>
                <div className="text-[#fbbf24] text-[1.25rem] tracking-[0.1em] mb-4">★★★★★</div>
                <p className="text-[1rem] text-[#374151] leading-[1.6] italic mb-6 flex-grow">
                  "{r.text}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-[48px] h-[48px] bg-[#166534] text-white rounded-full flex items-center justify-center font-bold text-[1.25rem] uppercase">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-[700] text-[#111827] text-[1rem]">{r.name}</div>
                  <div className="text-[0.875rem] text-[#6b7280] mt-[0.25rem]">{r.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
