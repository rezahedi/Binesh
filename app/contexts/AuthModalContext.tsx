"use client";

import { createContext, useContext, useState } from "react";

interface IAppContext {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  authPage: AuthPage;
  showSignin: () => void;
  showSignup: () => void;
  showForgotPassword: () => void;
}

type AuthPage = "signin" | "signup" | "forgotPassword";

const AuthModalContext = createContext<IAppContext | null>(null);

export const AuthModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [authPage, setAuthPage] = useState<AuthPage>("signin");

  const showSignin = () => {
    setAuthPage("signin");
    setShowModal(true);
  };

  const showSignup = () => {
    setAuthPage("signup");
    setShowModal(true);
  };

  const showForgotPassword = () => {
    setAuthPage("forgotPassword");
    setShowModal(true);
  };

  return (
    <AuthModalContext.Provider
      value={{
        showModal,
        setShowModal,
        authPage,
        showSignin,
        showSignup,
        showForgotPassword,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within its provider");
  }
  return context;
};
