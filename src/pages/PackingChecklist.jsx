import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const defaultItems = [
  "🪪 Passport / ID",
  "🎫 Travel tickets",
  "🏨 Hotel reservation",
  "🔌 Charger",
  "🎧 Headphones",
  "🧼 Toiletries",
  "👖 Clothes",
  "🕶️ Sunglasses",
  "🛏️ Travel pillow",
  "📷 Camera",
];

const PackingChecklist = () => {
  const [place, setPlace] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState("");
  const [budget, setBudget] = useState("");
  const [season, setSeason] = useState("");
  const [items, setItems] = useState(
    defaultItems.map((item) => ({ label: item, checked: false }))
  );
  const [tripInfo, setTripInfo] = useState("");
  const [destination, setDestination] = useState("");

  const handleLocationSelect = (place) => {
    if (!place.geometry) {
      alert("Please select a valid location from the dropdown.");
      return;
    }
    setDestination(place.formatted_address);
  };

  const toggleCheck = (index) => {
    const updated = [...items];
    updated[index].checked = !updated[index].checked;
    setItems(updated);
  };

  const generatePackingList = () => {
    const duration =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;
    const activityArray = activities
      .toLowerCase()
      .split(",")
      .map((a) => a.trim());

    const suggestions = [
      `👕 ${duration} sets of clothes`,
      "🩲 Undergarments",
      "🪥 Toothbrush & Toothpaste",
    ];

    // Add based on budget
    if (budget.toLowerCase() === "low") {
      suggestions.push(
        "🍜 Instant food",
        "🧴 Travel-size toiletries",
        "🪙 Extra coins for transport"
      );
    } else if (budget.toLowerCase() === "high") {
      suggestions.push(
        "👔 Extra formal wear",
        "💳 Travel card",
        "📱 Power bank"
      );
    }

    // Add based on season
    if (season.toLowerCase() === "winter") {
      suggestions.push("🧥 Warm Jacket", "🧣 Scarf", "🧤 Gloves");
    } else if (season.toLowerCase() === "summer") {
      suggestions.push("🧢 Cap", "☀️ Sunscreen", "🩳 Light Cotton Clothes");
    } else if (season.toLowerCase() === "monsoon") {
      suggestions.push("🌂 Umbrella", "🩴 Flip-Flops", "🧼 Extra towels");
    }

    // Add based on activities
    if (activityArray.includes("trekking")) {
      suggestions.push("🥾 Trekking Shoes", "🎒 Backpack", "💧 Water Bottle");
    }
    if (activityArray.includes("swimming")) {
      suggestions.push(
        "🩱 Swimsuit",
        "🧴 Waterproof Sunscreen",
        "🩴 Flip-Flops"
      );
    }
    if (activityArray.includes("snow")) {
      suggestions.push("⛷️ Snow Boots", "🧤 Snow Gloves", "🧊 Thermal Wear");
    }

    const finalItems = [...defaultItems, ...suggestions];
    setItems(finalItems.map((item) => ({ label: item, checked: false })));

    setTripInfo(
      `📍 ${destination} | Duration: ${duration} days | Budget: ${budget} | Season: ${season}`
    );
  };

  return (
    <div className="container mx-auto max-w-xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        🧳 Packing Checklist
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          generatePackingList();
        }}
        className="space-y-4 mb-6"
      >
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          selectProps={{
            value: place,
            onChange: setPlace,
            placeholder: "Enter your destination...",
          }}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Activities (e.g., trekking, swimming)"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Budget (e.g., low, medium, high)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Season (e.g., summer, winter, monsoon)"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Packing List
        </button>
      </form>

      {tripInfo && (
        <div className="mb-4 text-center text-lg font-semibold text-gray-700">
          {tripInfo}
        </div>
      )}

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm"
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleCheck(index)}
              className="w-5 h-5"
            />
            <span className={item.checked ? "line-through text-gray-400" : ""}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackingChecklist;
