import Reminder from "./cta";
import FAQ from "./faq";
import Footer from "./footer";
import Hero from "./hero-section";
import Navbar from "./navbar";
import ProductDescription from "./product-description";

import Testimonials from "./testimonials";
import WorkingSection from "./working-section";

export default function LandingPage(): React.JSX.Element {
  return (
    <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProductDescription />
        <WorkingSection />
        <Testimonials />
        <FAQ />
        <Reminder />
      </main>
      <Footer />
    </div>
  );
}
