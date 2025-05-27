import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": "places.id,places.photos,places.displayName"
  },
};

export const GetPlaceDetails = (data) => axios.post(BASE_URL,data,config);

export const GetPlacePhotoUrl = (photoName) => {
  return `https://places.googleapis.com/v1/${photoName}/media?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}&maxHeightPx=1000&maxWidthPx=1900`;
};
