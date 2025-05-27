import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-5">
        Hotel Recommendations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCardItem key={hotel?.hotelName || index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
