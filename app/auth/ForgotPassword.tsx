"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useStackApp } from "@stackframe/stack";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const app = useStackApp();
  const { showSignin } = useAuthModal();

  const onSubmit = async () => {
    if (!email) {
      setError("Please enter your email address");
      setMessage("");
      return;
    }

    try {
      const result = await app.sendForgotPasswordEmail(email);
      if (result?.status === "error") {
        if (result.error.errorCode === "user_not_found") {
          // For security reasons, don't reveal if a user exists or not
          setError("");
          setMessage(
            "If an account exists with this email, a password reset link has been sent."
          );
        } else {
          setError(`Error: ${result.error.message}`);
          setMessage("");
        }
      } else {
        setError("");
        setMessage("Password reset email sent! Please check your inbox.");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(`An unexpected error occurred: ${message}`);
      setMessage("");
    }
  };
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="font-semibold text-2xl">Reset Your Password</h1>
        <p>
          Don&apos;t need to reset?{" "}
          <Button variant="link" className="p-0" onClick={showSignin}>
            Sign in
          </Button>
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {error && <div className="text-destructive text-sm">{error}</div>}
        {message ? (
          <div className="text-primary text-sm">{message}</div>
        ) : (
          <>
            <Input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <Button
              variant="default"
              className="rounded-md flex gap-2 w-full mb-4 mt-4"
              size={"sm"}
              type="submit"
            >
              Reset Password
            </Button>
          </>
        )}
      </form>
    </>
  );
}
