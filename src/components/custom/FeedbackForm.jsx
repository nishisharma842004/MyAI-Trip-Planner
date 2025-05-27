import { useState } from "react";
import { db } from "../../service/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast } from "sonner";

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "feedbacks"), {
        feedback,
        rating,
        createdAt: Timestamp.now(),
      });

      toast.success("Thanks for your feedback!");
      setFeedback("");
      setRating(0);
    } catch (error) {
      console.error("Error saving feedback:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-2">Share your feedback 💬</h2>
      
      <textarea
        className="w-full p-2 border rounded mb-3"
        placeholder="Tell us how we can improve..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        required
      />

      <div className="flex items-center mb-3">
        <span className="mr-2">Rate us:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-2xl cursor-pointer ${
              (hovered || rating) >= star ? "text-yellow-400" : "text-gray-400"
            }`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit Feedback
      </button>
    </form>
  );
}
