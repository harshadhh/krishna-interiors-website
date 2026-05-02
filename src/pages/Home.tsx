import { Hero } from "../components/Hero";
import { PremiumPartners } from "../components/PremiumPartners";
import { ServicesList } from "../components/ServicesList";
import { CoreServices } from "../components/CoreServices";
import { PortfolioPreview } from "../components/PortfolioPreview";
import { BeforeAfterGallery } from "../components/BeforeAfterGallery";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { GoogleReviews } from "../components/GoogleReviews";
import { PageTransition } from "../components/PageTransition";

export function Home() {
  return (
    <PageTransition>
      <div className="w-full min-h-screen bg-ivory text-forest selection:bg-terracotta selection:text-ivory">
        <Hero />
        <PremiumPartners />
        <ServicesList />
        <CoreServices />
        <PortfolioPreview />
        <BeforeAfterGallery />
        <WhyChooseUs />
        <GoogleReviews />
      </div>
    </PageTransition>
  );
}
