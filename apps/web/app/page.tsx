import LandingPage from "../components/landing-page";
import { Redirect } from "../hooks/redirect";

export default function Home() {
  return (
    <div>
      <Redirect />
      <LandingPage />
    </div>
  );
}
