import Footer from "./footer";
import Hero from "./hero-section";
import Navbar from "./navbar";
import Reminder from "./reminder";
import Testimonials from "./testimonials";
import WorkingSection from "./working-section";

export default function LandingPage(): React.JSX.Element {
  return (
    <div className='bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 min-h-screen'>
      <Navbar />
      <main>
        <Hero />
        <WorkingSection />
        <Testimonials />
        <Reminder />
      </main>
      <Footer />
    </div>
  );
}
