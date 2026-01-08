"use client";

import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { CredentialSignIn } from "@stackframe/stack";
import GuestSignin from "./GuestSignin";
import OAuthButtonGroup from "./OAuthButtonGroup";

export default function Signin() {
  const { showSignup } = useAuthModal();

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="font-semibold text-2xl">Sign in to your account</h1>
        <p>
          Don&apos;t have an account?{" "}
          <Button variant="link" className="p-0" onClick={showSignup}>
            Sign up
          </Button>
        </p>
      </div>
      <OAuthButtonGroup type="Sign in" />
      <div className="text-center my-4">or</div>
      <CredentialSignIn />
      <div className="text-center my-4">or sign in as a guest</div>
      <GuestSignin />
    </>
  );
}
