import { InteractiveBoard } from "../components/InteractiveBoard";
import { AnatomyOfPerfection } from "../components/AnatomyOfPerfection";
import { ServiceCatalogue } from "../components/ServiceCatalogue";
import { PageTransition } from "../components/PageTransition";

export function Services() {
  return (
    <PageTransition>
      <InteractiveBoard />
      <ServiceCatalogue />
      <AnatomyOfPerfection />
    </PageTransition>
  );
}