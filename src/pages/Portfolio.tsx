import { CinematicPortfolio } from "../components/CinematicPortfolio";
import { PortfolioCTA } from "../components/PortfolioCTA";
import { PageTransition } from "../components/PageTransition";

export function Portfolio() {
  return (
    <PageTransition>
      <CinematicPortfolio />
      <PortfolioCTA />
    </PageTransition>
  );
}
