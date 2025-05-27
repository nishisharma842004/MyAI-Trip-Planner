import { IoShareSocialOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GetPlaceDetails, GetPlacePhotoUrl } from "@/service/GlobalApi";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const textQuery =
      trip?.userSelection?.location?.label || trip?.tripData?.tripName;

    if (!textQuery) return;

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

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const title = `Check out my trip to ${trip?.userSelection?.location?.label || "this place"}!`;

  return (
    <div>
      {photoUrl && (
        <img
          src={photoUrl ? photoUrl : "/placeholder.svg"}
          className="md:h-[340px] w-full object-cover rounded-xl"
          alt="Trip Location"
        />
      )}
      <div className="my-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex flex-col gap-2 text-sm">
          <h1 className="text-3xl md:text-4xl font-bold">
            Your Trip to {trip?.userSelection?.location?.label}
          </h1>
          <div className="mt-2 flex flex-wrap gap-3">
            <h2 className="p-3 bg-primary/10 backdrop-blur-sm rounded-full font-medium">
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-3 bg-primary/10 backdrop-blur-sm rounded-full font-medium">
              👥 No. of Traveler: {trip?.userSelection?.traveler}
            </h2>
            <h2 className="p-3 bg-primary/10 backdrop-blur-sm rounded-full font-medium">
              💰 {trip?.userSelection?.budget} Budget : {trip?.userSelection?.moneyPerDay} per day
            </h2>
          </div>
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="border-1 mt-4 md:mt-0"
            onClick={() => setShowShareOptions(!showShareOptions)}
          >
            <IoShareSocialOutline className="mr-2" /> Share
          </Button>

          {showShareOptions && (
            <div className="absolute right-0 mt-2 p-3 bg-white shadow-md rounded-md z-50 flex flex-col gap-2">
              <FacebookShareButton url={shareUrl} quote={title}>
                <div className="flex items-center gap-2">
                  <FacebookIcon size={32} round />
                  Facebook
                </div>
              </FacebookShareButton>

              <TwitterShareButton url={shareUrl} title={title}>
                <div className="flex items-center gap-2">
                  <TwitterIcon size={32} round />
                  Twitter
                </div>
              </TwitterShareButton>

              <WhatsappShareButton url={shareUrl} title={title}>
                <div className="flex items-center gap-2">
                  <WhatsappIcon size={32} round />
                  WhatsApp
                </div>
              </WhatsappShareButton>

              <LinkedinShareButton url={shareUrl} title={title}>
                <div className="flex items-center gap-2">
                  <LinkedinIcon size={32} round />
                  LinkedIn
                </div>
              </LinkedinShareButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
