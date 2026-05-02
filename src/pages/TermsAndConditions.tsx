import { PageTransition } from "../components/PageTransition";
import { useSiteData } from "../contexts/SiteDataContext";

export function TermsAndConditions() {
  const { data } = useSiteData();

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wider text-forest mb-8">
          Terms &amp; <span className="text-terracotta">Conditions</span>
        </h1>
        
        <div className="prose prose-forest prose-lg max-w-none text-forest/80 space-y-6 break-words">
          
          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-12 mb-4 border-b border-forest/10 pb-2">1. Introduction</h2>
          <p>
            Welcome to our website. These Terms &amp; Conditions govern your use of our website and services. By accessing our website, submitting an inquiry, or engaging our services, you agree to comply with and be bound by these terms. 
          </p>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">2. Definitions</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Company:</strong> We / Us</li>
            <li><strong>Client:</strong> Any individual or entity availing our services</li>
            <li><strong>Services:</strong> Interior design, renovation, and turnkey project execution</li>
          </ul>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">3. Scope of Services</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>We provide end-to-end interior and construction solutions as per the agreed design, specifications, and Bill of Quantities (BOQ).</li>
            <li>Any work beyond the finalized scope will be treated as additional work and charged accordingly.</li>
          </ul>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">4. Design &amp; Approval</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Design concepts and layouts will be shared for approval prior to execution.</li>
            <li>Up to 2 revisions are included.</li>
            <li>Any changes after approval details will incur additional costs and may impact project timelines.</li>
          </ul>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">5. Pricing &amp; Payment Terms</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>20% advance before project commencement.</li>
            <li>Stage-wise payments linked to predefined milestones.</li>
            <li>Full and final payment must be cleared before project handover.</li>
            <li><strong>Late Payment Policy:</strong> Delayed payments may attract interest of up to 1.5% per month and may result in temporary suspension of services or delayed timeline of project. </li>
          </ul>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">6. Material Procurement &amp; Pricing</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Materials will be sourced as per approved selections.</li>
            <li>Prices are subject to market fluctuations.</li>
            <li>Any significant increase in costs may lead to revised pricing with prior intimation.</li>
          </ul>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">7. Project Timeline</h2>
          <p>Project timelines are indicative and depend on:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Timely client approvals</li>
            <li>Site readiness</li>
            <li>Availability of materials</li>
            <li>Act of God</li>
            <li>Strike and Holidays</li>
          </ul>
          <p>Delays arising from these factors or unforeseen circumstances shall not constitute a breach of contract.</p>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">8. Site Readiness &amp; Client Responsibilities</h2>
          <p>The Client is responsible for:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Providing uninterrupted access to the site</li>
            <li>Ensuring availability of electricity and water</li>
            <li>Giving timely approvals and decisions</li>
            <li>Any Govt approval or complaints</li>
          </ul>
          <p>Any delay caused due to the above may impact delivery timelines.</p>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">9. Third-Party Services</h2>
          <p>Certain services may involve third-party vendors. While we ensure quality standards, we shall not be liable for delays or issues arising from third-party services. </p>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">10. Cancellation &amp; Termination</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Advance payments are non-refundable.</li>
            <li>In case of project cancellation: Work completed will be billed proportionately and materials procured will be chargeable.</li>
            <li>We reserve the right to suspend or terminate services in case of non-payment or breach of terms.</li>
          </ul>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">11. Intellectual Property</h2>
          <p>All designs, drawings, concepts, and creatives remain our intellectual property and may not be reused or reproduced without prior written consent. </p>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">12. Limitation of Liability</h2>
          <p>We shall not be liable for:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Prior structural defects of the property</li>
            <li>Delays caused by external or uncontrollable factors</li>
          </ul>
          <p>Total liability shall be limited to the amount paid by the Client. </p>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">13. Force Majeure</h2>
          <p>We shall not be held responsible for delays or failure in performance due to events beyond our control, including but not limited to natural disasters, labor strikes, government restrictions, or supply chain disruptions. </p>
          
          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">14. Portfolio &amp; Marketing Rights</h2>
          <p>We reserve the right to use images, videos, and details of completed projects for marketing, promotional, and portfolio purposes. </p>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">15. Governing Law &amp; Jurisdiction</h2>
          <p>These Terms &amp; Conditions shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Delhi/NCR or Pune/Maharashtra area. </p>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">16. Digital Acceptance</h2>
          <p>By using our website, submitting inquiries, or making any payment, you confirm that you have read, understood, and agreed to these Terms &amp; Conditions. </p>

          <p className="text-sm mt-12 pt-8 border-t border-forest/10">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
