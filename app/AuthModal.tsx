"use client";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import Signin from "@/auth/Signin";
import Signup from "@/auth/Signup";
import { useAuthModal } from "./contexts/AuthModalContext";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function AuthModal() {
  const { showModal, setShowModal, authPage } = useAuthModal();

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogOverlay className="animate-fade-in bg-white bg-opacity-50 backdrop-blur-md" />
      <DialogContent>
        <DialogTitle className="sr-only">Authentication Modal</DialogTitle>
        <DialogDescription className="sr-only">
          Authentication is required to access this page.
        </DialogDescription>
        <div className="my-custom-login-container m-6">
          {authPage === "signin" && <Signin />}
          {authPage === "signup" && <Signup />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
