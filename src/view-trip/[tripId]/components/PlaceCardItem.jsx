import { Rating } from "@mui/material";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, Ticket } from "lucide-react";
import { GetPlaceDetails, GetPlacePhotoUrl } from "@/service/GlobalApi";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const textQuery = place?.placeName;

    if (!textQuery) {
      return;
    }

    try {
      const response = await GetPlaceDetails({ textQuery });

      const place = response?.data?.places?.[0];

      if (place?.photos?.[0]?.name) {
        const photoRef = place.photos[3].name;
        const url = GetPlacePhotoUrl(photoRef);
        setPhotoUrl(url);
      } else {
        console.warn("No photo found for:", textQuery);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
      target="_blank"
    >
      <div className="border rounded-xl p-5 flex flex-col h-full hover:scale-105 transition-all cursor-pointer">
        <h2 className="text-lg mb-2 text-orange-600 font-bold">
          {place.timeToVisit}
        </h2>
        <div className="flex flex-col md:flex-row gap-5">
          <img
            src={photoUrl ? photoUrl : "/placeholder.svg"}
            alt={place?.placeName}
            className="w-[130px] h-[130px] rounded-xl object-cover"
          />
          <div className="flex flex-col w-full">
            <h2 className="font-bold text-lg">{place?.placeName}</h2>

            <div className="flex items-center gap-1 my-2">
              <Rating
                value={parseFloat(place.rating)}
                precision={0.5}
                readOnly
                size="small"
              />
              <span className="text-sm text-muted-foreground">
                {place?.rating}
              </span>
            </div>

            <p className="text-sm md:text-sm mb-2">{place?.description}</p>

            <div className="flex flex-wrap gap-3">
              <Badge variant="outline">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-wrap">
                  Best Time to Visit : {place?.bestTimeToVisit}
                </span>
              </Badge>
              <Badge variant="outline">
                <Ticket className="w-5 h-5 text-primary" />
                <span className="text-wrap">{place?.ticketPricing}</span>
              </Badge>
              <Badge variant="outline">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-wrap">{place?.estimatedTravelTime}</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
