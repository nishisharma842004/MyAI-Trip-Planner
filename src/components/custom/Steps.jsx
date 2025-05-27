import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import step1 from "../../assets/step1.png";
import step2 from "../../assets/step2.png";
import step3 from "../../assets/step3.png";

function Steps() {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How PlanItAI Works
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Planning your dream trip is as easy as 1-2-3
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="step1" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="step1">1</TabsTrigger>
            <TabsTrigger value="step2">2</TabsTrigger>
            <TabsTrigger value="step3">3</TabsTrigger>
          </TabsList>
          <TabsContent value="step1">
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  📍 Enter Your Travel Details
                </h3>
                <p className="text-muted-foreground mb-4">
                  Tell us your destination, trip duration, budget, and who
                  you're traveling with (Solo, Family, Friends, or Couple).
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md border hidden md:block">
                <img
                  src={step1}
                  alt="Trip preferences form"
                  className="w-full h-[300px] border p-4"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="step2">
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  🏨 Get Personalized Hotel Suggestions
                </h3>
                <p className="text-muted-foreground mb-4">
                  Find the best accommodations that match your budget and
                  preferences.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md border hidden md:block">
                <img
                  src={step2}
                  alt="Trip preferences form"
                  className="w-full h-[300px] border p-4"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="step3">
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  🗺️ Receive a Complete Itinerary
                </h3>
                <p className="text-muted-foreground mb-4">
                  Get a day-by-day travel plan with top attractions, activities,
                  and must-visit spots.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md border hidden md:block">
                <img
                  src={step3}
                  alt="Trip preferences form"
                  className="w-full h-[300px] border p-4"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Steps;
