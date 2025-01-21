import Hero from "./hero-section";
import Navbar from "./navbar";

export default function LandingPage(): React.JSX.Element {
  return (
    <div className='bg-background min-h-screen'>
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
