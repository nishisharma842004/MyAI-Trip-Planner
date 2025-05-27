import { GetPlaceDetails, GetPlacePhotoUrl } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { SelectTravelersList } from "@/constants/options";

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const textQuery =
      trip?.userSelection?.location?.label || trip?.tripData?.tripName;

    if (!textQuery) {
      return;
    }

    try {
      const response = await GetPlaceDetails({ textQuery });

      const place = response?.data?.places?.[0];

      if (place?.photos?.[0]?.name) {
        const photoRef = place.photos[0].name;
        const url = GetPlacePhotoUrl(photoRef);
        setPhotoUrl(url);
      } else {
        console.warn("No photo found for:", textQuery);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  const travelerTitle = SelectTravelersList.find(
    (item) => item.people === trip?.userSelection?.traveler
  )?.title;

  return (
    <Link
      to={`/view-trip/${trip?.id}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Card className="overflow-hidden flex flex-col h-full hover:scale-105 transition-all cursor-pointer">
        <div className="relative h-48">
          <img
            src={photoUrl ? photoUrl : "/placeholder.svg"}
            alt={trip?.userSelection?.location?.label}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-sm font-medium">
            {trip?.userSelection?.noOfDays} Days
          </div>
        </div>
        <CardContent className="flex flex-col justify-between flex-grow">
          <h3 className="font-bold text-lg mb-1">
            {trip?.userSelection?.location?.label}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            A <span className="font-medium">{travelerTitle}</span> trip with a{" "}
            <span className="font-medium">{trip?.userSelection?.budget}</span>{" "}
            budget
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default UserTripCardItem;
