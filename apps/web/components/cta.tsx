import Button from "@repo/ui/button";
import Link from "next/link";

export default function Reminder(): React.JSX.Element {
  return (
    <section className="py-16 md:py-32 net-pattern-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-neutral-900 rounded-2xl p-8 md:p-12 border border-neutral-700 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Creating{" "}
              <span className="bg-gradient-to-r from-royal-blue-500 to-amethyst-500 text-transparent bg-clip-text">
                Amazing Diagrams
              </span>{" "}
              Today
            </h2>
            <p className="text-xl text-gray-400 mb-8 md:mb-0">
              Join thousands of users who trust MindSketch for their diagramming
              needs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth/signup">
              <Button variant="primary" size="lg">
                Start For Free
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="lg">
                Login Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
