"use client";

import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { CredentialSignUp } from "@stackframe/stack";
import GuestSignin from "./GuestSignin";
import OAuthButtonGroup from "./OAuthButtonGroup";

export default function Signin() {
  const { showSignin } = useAuthModal();

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="font-semibold text-2xl">Create a new account</h1>
        <p>
          Already have an account?{" "}
          <Button variant="link" className="p-0" onClick={showSignin}>
            Sign in
          </Button>
        </p>
      </div>
      <OAuthButtonGroup type="Sign up" />
      <div className="text-center my-4">or</div>
      <CredentialSignUp />
      <div className="text-center my-4">or sign in as a guest</div>
      <GuestSignin />
    </>
  );
}
