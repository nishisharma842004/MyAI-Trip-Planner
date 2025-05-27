export const SelectTravelersList = [
  {
    id: 1,
    title: "Solo",
    desc: "Adventure at your own pace.",
    icon: "✈️",
    people: "1 person",
  },
  {
    id: 2,
    title: "Couple",
    desc: "A romantic escape for two.",
    icon: "🥂",
    people: "2 people (Couple)",
  },
  {
    id: 3,
    title: "Family",
    desc: "Fun-filled memories with loved ones.",
    icon: "🏡",
    people: "3+ people (Family)",
  },
  {
    id: 4,
    title: "Friends",
    desc: "Exciting adventures with your crew.",
    icon: "⛵",
    people: "2+ people (Friends)",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay budget-friendly and save more.",
    icon: "💵",
    moneyPerDay: "$20 - $50",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "A balance of comfort and affordability.",
    icon: "💰",
    moneyPerDay: "$50 - $150",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Indulge in premium travel experiences.",
    icon: "💸",
    moneyPerDay: "$150+",
  },
];

export const AI_PROMPT = 
  "Generate a detailed travel plan for {location} for {noOfDays} days for {traveler} with a {budget} budget ({moneyPerDay} per day). " + 
  "Provide hotel options with name, address, price, image URL, geo coordinates, rating, and description. " + 
  "Also, create a day-wise itinerary including place name, details, image URL, geo coordinates, ticket pricing, rating, estimated travel time, time to visit, and best time to visit in AM/PM format for each activity. " + 
  "Format the response in JSON.";
