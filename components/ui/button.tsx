import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 hover:shadow-blue-500/30 border border-blue-500/50",
        secondary:
          "bg-purple-600 text-white shadow-lg shadow-purple-500/20 hover:bg-purple-500 border border-purple-500/50",
        outline:
          "border border-zinc-800 bg-zinc-900/60 text-zinc-200 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 backdrop-blur-md",
        ghost: "text-zinc-400 hover:bg-zinc-800/60 hover:text-white",
        link: "text-blue-400 underline-offset-4 hover:underline",
        glass:
          "glass-panel text-white hover:bg-zinc-800/80 hover:border-blue-500/40 shadow-xl",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-md px-3.5 text-xs",
        lg: "h-13 rounded-xl px-7 text-base font-semibold",
        icon: "h-10 w-10 rounded-lg",
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
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
