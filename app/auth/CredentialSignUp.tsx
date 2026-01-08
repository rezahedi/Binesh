"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStackApp } from "@stackframe/stack";
import { useState } from "react";

const CredentialSignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const app = useStackApp();

  const onSubmit = async () => {
    if (!password) {
      setError("Please enter your password");
      return;
    }
    const result = await app.signUpWithCredential({ email, password });
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
      <Input
        type="password"
        placeholder="Repeat Password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        className="mt-4"
      />
      <Button
        variant="default"
        className="rounded-md flex gap-2 w-full mb-4 bg-black text-white hover:bg-black/80 mt-4"
        size={"sm"}
        type="submit"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default CredentialSignUp;
