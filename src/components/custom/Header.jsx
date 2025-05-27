import React, { useState } from "react";
import { Button } from "../ui/button";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginDialog from "./LoginDialog";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95">
      <div className="flex justify-between items-center px-5 h-16">
        {/* Logo */}
        <a href="/" className="text-xl font-bold p-2 flex items-center">
          <img src="/logo-icon.png" alt="logo" className="w-6 me-1" />
          PlanItAI
        </a>

        {user ? (
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <a href="/create-trip">
                <Button variant="outline" className="rounded-full">
                  Create Trip
                </Button>
              </a>
              <a href="/my-trips">
                <Button variant="outline" className="rounded-full">
                  My Trips
                </Button>
              </a>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="p-2 rounded-md focus:outline-none"
                    aria-label="Toggle menu"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="end"
                  className="flex flex-col gap-2 w-44 p-2"
                >
                  <a
                    href="/create-trip"
                    className="text-sm text-gray-700 hover:text-primary py-1"
                  >
                    Create Trip
                  </a>
                  <a
                    href="/my-trips"
                    className="text-sm text-gray-700 hover:text-primary py-1"
                  >
                    My Trips
                  </a>
                </PopoverContent>
              </Popover>
            </div>

            {/* Profile Popover */}
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <img
                  src={user?.picture}
                  alt="profile"
                  className="h-[35px] w-[35px] rounded-full cursor-pointer mr-2"
                />
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-44 p-2 flex flex-col gap-2"
              >
                <Button
                  variant="outline"
                  className="w-full text-center focus-visible:ring-0 focus-visible:ring-offset-0"
                  onClick={() => {
                    setPopoverOpen(false); // close popover
                    navigate("/profile");
                  }}
                >
                  View Profile
                </Button>
                <Button
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                  className="w-full flex items-center"
                >
                  Logout <LogOut className="w-4 h-4 ml-2" />
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button size="sm" onClick={() => setOpenDialog(true)}>
            Sign In
          </Button>
        )}

        {/* Sign In Dialog */}
        <LoginDialog open={openDialog} onOpenChange={setOpenDialog} onLogin={login} />
      </div>
    </header>
  );
}

export default Header;
