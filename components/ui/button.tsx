import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-ink text-paper hover:bg-ink/90 rounded-sm",
        brass: "bg-brass text-paper hover:bg-brass-dark rounded-sm",
        secondary:
          "bg-transparent text-ink border border-line-strong hover:border-ink hover:bg-paper-raised rounded-sm",
        ghost: "bg-transparent text-ink hover:bg-ink/5 rounded-sm",
        link: "bg-transparent text-ink underline-offset-4 hover:underline p-0",
        destructive: "bg-danger text-paper hover:bg-danger/90 rounded-sm",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export { buttonVariants };

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
