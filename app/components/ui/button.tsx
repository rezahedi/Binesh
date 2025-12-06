import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "cursor-pointer shadow-[0_4px_0_0] active:shadow-none active:translate-y-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "text-background bg-foreground/90 shadow-foreground hover:bg-foreground/70",
        primary:
          "text-primary-foreground bg-primary shadow-primary-dark hover:bg-primary-light",
        destructive:
          "text-background bg-destructive shadow-destructive-dark hover:bg-destructive-light",
        accent:
          "text-accent-foreground bg-accent shadow-accent-dark hover:bg-accent-light",
        outline:
          "border-2 border-foreground/80 shadow-foreground/80 hover:bg hover:text",
        secondary:
          "text-secondary-foreground bg-secondary shadow-secondary-dark hover:bg-secondary-light",
        ghost:
          "border border-transparent shadow-transparent hover:shadow-muted hover:border-muted",
        link: "text-primary underline-offset-4 hover:underline shadow-none active:translate-y-0.5",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-4 py-2 text-sm shadow-[0_3px_0_0] active:translate-y-[3px]",
        lg: "px-10 py-4 text-lg shadow-[0_4px_0_0] active:translate-y-[4px]",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
