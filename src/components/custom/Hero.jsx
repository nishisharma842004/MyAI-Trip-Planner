import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ListChecks, MessageSquare, Users} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import heroImg from "../../assets/heroImg.jpg";

function Hero({ onSeeHowItWorks }) {
  return (
    <div className="flex flex-col items-center text-center pt-12 lg:pt-24 md:pt-32 pb-12 md:pb-24">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        Plan Your Perfect Trip with <span className="text-primary">AI</span>
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-10">
        Let our AI create personalized travel itineraries based on your
        preferences, budget, and schedule.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to={"/create-trip"}>
          <Button size="lg" className="gap-2">
            Plan My Trip <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
        <Button
          size="lg"
          variant="outline"
          onClick={onSeeHowItWorks} // Trigger scroll on click
        >
          See How It Works
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Link to="/packing-checklist">
          <Button size="lg" variant="outline" className="gap-2">
            <ListChecks className="h-4 w-4" />
            Packing Checklist
          </Button>
        </Link>
        <Link to="/feedback">
          <Button size="lg" variant="outline" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Feedback
          </Button>
        </Link>
        <Link to="/all-users">
          <Button size="lg" variant="outline" className="gap-2">
            <Users className="h-4 w-4" />
            Connect
          </Button>
        </Link>
      </div>

      <div className="mt-12 relative w-full max-w-4xl md:px-5">
        <div className="relative rounded-lg overflow-hidden shadow-2xl">
          <img
            src={heroImg}
            alt="PlanItAI interface preview"
            className="w-full md:h-[600px] object-cover"
          />
          <div className="absolute top-4 right-2 flex items-center gap-1 bg-background/50 backdrop-blur-sm rounded-md px-2 py-1 text-xs md:text-sm font-medium">
            <MapPin className="h-3 w-3" />
            Seoul, South Korea
          </div>
        </div>
        <div className="absolute -bottom-4 -right-1 bg-primary text-primary-foreground p-3 rounded-lg shadow-lg md:max-w-xs hidden md:block">
          <p className="text-sm font-medium">
            "Seoul's soul reflected in still waters — where history, nature, and
            harmony coexist."
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
