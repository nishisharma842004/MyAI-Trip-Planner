import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import { DialogDescription } from "@radix-ui/react-dialog";

function LoginDialog({ open, onOpenChange, onLogin }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <img src="/logo.svg" alt="logo" className="w-6 mr-2" />
            PlanItAI
          </DialogTitle>
          <DialogDescription>
            <span className="text-lg font-bold mb-2 block">
              Sign In With Google
            </span>
            Sign in to the app with Google authentication.
            <Button
              className="w-full flex items-center mt-4 gap-2"
              onClick={onLogin}
            >
              <FaGoogle className="h-6 w-6" />
              Sign in with Google
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
