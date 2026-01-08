"use client";

import { createContext, useContext, useState } from "react";

interface IAppContext {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  authPage: AuthPage;
  showSignin: () => void;
  showSignup: () => void;
}

type AuthPage = "signin" | "signup";

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

  return (
    <AuthModalContext.Provider
      value={{
        showModal,
        setShowModal,
        authPage,
        showSignin,
        showSignup,
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
