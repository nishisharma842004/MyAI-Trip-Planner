// src/pages/FeedbackPage.jsx
import React from "react";
import FeedbackForm from "../components/custom/FeedbackForm";

const FeedbackPage = () => {
  return (
    <div className="min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">We Value Your Feedback</h1>
      <FeedbackForm />
    </div>
  );
};

export default FeedbackPage;
