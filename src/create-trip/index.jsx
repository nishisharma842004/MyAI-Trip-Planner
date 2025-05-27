import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelersList,
} from "@/constants/options";
import { Input } from "@/components/ui/input";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import LoginDialog from "@/components/custom/LoginDialog";

function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState({});

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle input changes for all fields
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  // Handle form submission
  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    // Validation checks
    if (!formData?.location?.label || !formData?.budget || !formData?.traveler) {
      toast("Please fill in all details!");
      return;
    }

    if (
      !formData?.noOfDays ||
      formData?.noOfDays < 1 ||
      formData?.noOfDays > 15
    ) {
      toast("Please enter a valid trip duration between 1 and 15 days.");
      return;
    }

    if (!user) {
      setOpenDialog(true);
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{moneyPerDay}", formData?.moneyPerDay);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <main className="container py-12 px-5 mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Tell Us About Your Dream Trip!
        </h1>
        <p className="text-muted-foreground">
          Provide a few details about your travel style, and our AI-powered
          planner will create a tailored itinerary just for you!
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-10">
        {/* Destination Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Where would you like to go?
          </h2>
          <p className="text-muted-foreground mb-3">
            Tell us your dream destination, and we'll help plan your perfect
            trip.
          </p>

          {/* GooglePlacesAutocomplete Component */}
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
              placeholder: "Search your destination...",
            }}
          />
        </div>

        {/* Trip Duration Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <p className="text-muted-foreground mb-3">
            Let us know your trip duration so we can create the perfect
            itinerary.
          </p>
          <Input
            placeholder="Trip duration (1-15 days)"
            type="number"
            min="1"
            max="15"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            value={formData.noOfDays || ""}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">What's your budget?</h2>
          <p className="text-muted-foreground mb-3">
            Choose your budget range, from affordable stays to luxury
            experiences.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    budget: item.title,
                    moneyPerDay: item.moneyPerDay,
                  }))
                }
                className={
                  "flex flex-col items-center justify-center border border-gray-200 shadow-md rounded-lg p-4 cursor-pointer transition-all duration-300" +
                  (formData?.budget === item.title
                    ? " border-primary bg-primary/5 shadow-lg"
                    : " border-muted hover:border-primary")
                }
              >
                <h3 className="text-3xl">{item.icon}</h3>
                <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                <p className="text-sm text-gray-500 text-center mt-1">
                  {item.moneyPerDay} per day <br />
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Traveler Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who are you traveling with?
          </h2>
          <p className="text-muted-foreground mb-3">
            Select your group to tailor your experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {SelectTravelersList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={
                  "flex flex-col items-center justify-center border border-gray-200 shadow-md rounded-lg p-4 cursor-pointer transition-all duration-300" +
                  (formData?.traveler === item.people
                    ? " border-primary bg-primary/5 shadow-lg"
                    : " border-muted hover:border-primary")
                }
              >
                <h3 className="text-3xl">{item.icon}</h3>
                <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                <p className="text-sm text-gray-500 text-center mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 flex justify-end">
          <Button disabled={loading} onClick={OnGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        <LoginDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          onLogin={login}
        />
      </div>
    </main>
  );
}

export default CreateTrip;
