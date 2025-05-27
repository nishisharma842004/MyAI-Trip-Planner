import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  // Fetch trip information from Firebase using the tripId

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrip(docSnap.data());
    } else {
      toast("No trip Found!");
    }
  };

  return (
    <div className="p-5 md:px-10 lg:px-20 xl:px-40">
      {/* Information Section */}
      <InfoSection trip={trip} />

      {/* Hotel Recommendations */}
      <Hotels trip={trip} />

      {/* Day-by-Day Itinerary */}
      <PlacesToVisit trip={trip} />

      {/* Note */}
    </div>
  );
}

export default Viewtrip;
