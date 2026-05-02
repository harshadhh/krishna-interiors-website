import { PageTransition } from "../components/PageTransition";
import { useSiteData } from "../contexts/SiteDataContext";

export function PrivacyPolicy() {
  const { data } = useSiteData();

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wider text-forest mb-8">
          Privacy <span className="text-terracotta">Policy</span>
        </h1>
        
        <div className="prose prose-forest prose-lg max-w-none text-forest/80 space-y-6 break-words">
          
          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-12 mb-4 border-b border-forest/10 pb-2">1. Introduction</h2>
          <p>
            We respect your privacy and are committed to protecting your personal data.
          </p>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">2. Information We Collect</h2>
          <p>We may collect:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Name, phone number, email address</li>
            <li>Project requirements and preferences</li>
            <li>Location and property details</li>
          </ul>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">3. How We Use Information</h2>
          <p>Your information is used to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Provide design consultation and services</li>
            <li>Contact you regarding your inquiry</li>
            <li>Improve our services and user experience</li>
          </ul>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">4. Data Sharing</h2>
          <p>We do not sell or rent your personal data. Data may be shared with:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Internal team members</li>
            <li>Trusted vendors (for project execution only)</li>
          </ul>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">5. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your data from unauthorized access.
          </p>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">6. Cookies</h2>
          <p>
            Our website may use cookies to enhance user experience and track website performance.
          </p>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">7. Your Rights</h2>
          <p>You may request:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Access to your data</li>
            <li>Correction or deletion of your data</li>
          </ul>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">8. Updates</h2>
          <p>
            This policy may be updated periodically.
          </p>

          <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">9. Contact</h2>
          <p>
            For privacy concerns, contact us at:<br/>
            <strong>Email:</strong> {data.contact.email}
          </p>

          <div className="mt-20 pt-10 border-t border-forest/20">
            <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wider text-forest mb-8">
              Refund &amp; <span className="text-terracotta">Cancellation Policy</span>
            </h1>

            <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">1. Booking Amount</h2>
            <p>
              All advance payments made to us are non-refundable.
            </p>

            <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">2. Project Cancellation</h2>
            <p>In case of cancellation:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Work completed will be billed proportionately</li>
              <li>Materials procured will be charged</li>
            </ul>

            <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">3. Refund Eligibility</h2>
            <p>Refunds (if any) are applicable only if:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>We fail to initiate work within agreed timelines without valid reason</li>
            </ul>

            <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">4. Timeline for Refund</h2>
            <p>Eligible refunds will be processed within 7–15 business days.</p>

            <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">5. Mode of Refund</h2>
            <p>Refunds will be processed via the original payment method.</p>

            <h2 className="font-display text-2xl uppercase tracking-widest text-forest mt-10 mb-4 border-b border-forest/10 pb-2">6. Non-Refundable Cases</h2>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Change of mind after booking</li>
              <li>Delay caused by client</li>
              <li>Design approval given and work started</li>
            </ul>
          </div>

          <p className="text-sm mt-12 pt-8 border-t border-forest/10">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
