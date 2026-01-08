"use client";

import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/contexts/AuthModalContext";
import {
  CredentialSignUp,
  OAuthButtonGroup,
  useStackApp,
} from "@stackframe/stack";

export default function Signin() {
  const stackApp = useStackApp();
  const { showSignin } = useAuthModal();

  const handleTestSignin = async () => {
    await stackApp.signInWithCredential({
      email: "john.doe@example.com",
      password: "z7EM3RRtQ9z3fvL",
    });
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="font-semibold text-2xl">Sign up</h1>
        <p>
          Have an account?{" "}
          <Button variant="link" className="p-0" onClick={showSignin}>
            Sign in
          </Button>
        </p>
      </div>
      <OAuthButtonGroup type={"sign-up"} />
      <div className="text-center my-4">or</div>
      <CredentialSignUp />
      <div className="text-center my-4">or sign in as a guest</div>
      <button
        className="rounded-sm border text-sm py-2 px-5 cursor-pointer block mx-auto"
        onClick={handleTestSignin}
      >
        John Doe
      </button>
    </>
  );
}
