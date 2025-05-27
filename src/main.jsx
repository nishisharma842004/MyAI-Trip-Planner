import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import CreateTrip from "./create-trip";
import Header from "./components/custom/Header";
import Footer from "./components/custom/Footer";
import { Toaster } from "./components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Viewtrip from "./view-trip/[tripId]";
import MyTrips from "./my-trips";
import FeedbackPage from "./pages/FeedbackPage";
import ProfilePage from "./pages/ProfilePage";
import AllUsers from "./pages/AllUsers";
import PackingChecklist from "./pages/PackingChecklist";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <main className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/view-trip/:tripId" element={<Viewtrip />} />
            <Route path="/my-trips" element={<MyTrips />} />
            <Route path="/packing-checklist" element={<PackingChecklist />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/all-users" element={<AllUsers />} />{" "}
            {/* ✅ New Route */}
          </Routes>
        </div>
        <Footer />
      </main>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
