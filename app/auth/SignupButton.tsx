"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useAuthModal } from "@/contexts/AuthModalContext";

interface ISignupButtonProps extends ButtonProps {
  title: string;
}

const SignupButton = ({ title, ...buttonProps }: ISignupButtonProps) => {
  const { showSignup } = useAuthModal();

  return (
    <Button {...buttonProps} onClick={showSignup}>
      {title}
    </Button>
  );
};

export default SignupButton;
