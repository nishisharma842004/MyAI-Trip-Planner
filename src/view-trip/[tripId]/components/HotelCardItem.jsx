import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, ExternalLink } from "lucide-react";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { GetPlaceDetails, GetPlacePhotoUrl } from "@/service/GlobalApi";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const textQuery = hotel?.hotelName;

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

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotelName +
        "," +
        hotel?.address
      }
      target="_blank"
    >
      <Card className="overflow-hidden flex flex-col h-full hover:scale-105 transition-all cursor-pointer">
        <div className="relative h-48">
          <img
            src={photoUrl ? photoUrl : "/placeholder.svg"}
            alt={hotel?.hotelName}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-sm font-medium">
            ${hotel?.pricePerNight}/night
          </div>
        </div>
        <CardContent className="flex flex-col justify-between flex-grow">
          <h3 className="font-bold text-lg mb-1">{hotel?.hotelName}</h3>
          <div className="flex items-center gap-1 mb-2">
            {/* Use Material UI Rating component */}
            <Rating
              value={hotel?.rating}
              precision={0.5} // To allow half-stars
              readOnly
              size="small"
            />
            <span className="text-sm text-muted-foreground">
              {hotel?.rating}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <MapPin className="h-5 w-5" />
            <span>{hotel?.address}</span>
          </div>
          <Separator className="my-3" />
          <Button className="w-full gap-2" size="sm">
            View on Map <ExternalLink className="h-3 w-3" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

export default HotelCardItem;
