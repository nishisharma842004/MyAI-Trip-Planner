import React, { useState } from "react";
import PlaceCardItem from "./PlaceCardItem";
import { ChevronDown, ChevronUp } from "lucide-react";

function PlacesToVisit({ trip }) {
  const [openDays, setOpenDays] = useState({});

  const toggleDay = (day) => {
    setOpenDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mt-10">
        Day-by-Day Itinerary
      </h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => {
          const isOpen = openDays[item?.day];

          return (
            <div key={index} className="my-4 border rounded-lg">
              <button
                onClick={() => toggleDay(item?.day)}
                className="flex justify-between items-center w-full px-4 py-3 text-left font-semibold text-xl"
              >
                <span>
                  Day {item?.day}: {item?.theme}
                </span>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
                    {item?.activities?.map((place, i) => (
                      <div key={i} className="flex items-center h-full">
                        <PlaceCardItem place={place} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
