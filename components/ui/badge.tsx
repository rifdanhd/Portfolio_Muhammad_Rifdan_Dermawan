import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
  {
    variants: {
      variant: {
        default:
          "border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20",
        secondary:
          "border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20",
        outline:
          "border-zinc-700 bg-zinc-800/40 text-zinc-300 hover:bg-zinc-800",
        success:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
