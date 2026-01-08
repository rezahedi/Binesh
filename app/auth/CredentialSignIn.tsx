"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useStackApp } from "@stackframe/stack";
import { useState } from "react";

const CredentialSignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const app = useStackApp();
  const { showForgotPassword } = useAuthModal();

  const onSubmit = async () => {
    if (!password) {
      setError("Please enter your password");
      return;
    }
    const result = await app.signInWithCredential({ email, password });
    if (result.status === "error") {
      setError(result.error.message);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <p className="text-destructive text-sm">{error}</p>
      <Input
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-4"
      />
      <Button
        variant="link"
        onClick={showForgotPassword}
        className="text-sm p-0"
      >
        Forgot password?
      </Button>
      <Button
        variant="default"
        className="rounded-md flex gap-2 w-full mb-4 bg-black text-white hover:bg-black/80 mt-4"
        size={"sm"}
        type="submit"
      >
        Sign In
      </Button>
    </form>
  );
};

export default CredentialSignIn;
