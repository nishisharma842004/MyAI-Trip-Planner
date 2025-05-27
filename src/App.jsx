import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "./components/custom/Hero";
import Steps from "./components/custom/Steps";

function App() {
  // Ref for the "How It Works" section
  const howItWorksRef = useRef(null);

  // Function to handle scrolling to the "How It Works" section
  const scrollToHowItWorks = () => {
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#d6eef6] to-[#f0f9fc] px-5 md:px-10">
          <Hero onSeeHowItWorks={scrollToHowItWorks} />
        </section>
        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-5" ref={howItWorksRef}>
          <Steps />
        </section>
        {/* CTA Section */}
        <section className="py-20 px-5 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Plan Your Dream Trip with Ease!
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-10">
              Discover the easiest way to create a perfect itinerary—tailored to
              your budget, preferences, and travel style.
            </p>
            <Link
              to={"/create-trip"}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Button size="lg" variant="secondary" className="text-primary">
                Start Planning for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
