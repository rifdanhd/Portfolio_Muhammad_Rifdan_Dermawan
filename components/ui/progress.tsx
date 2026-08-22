"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  indicatorColor?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, indicatorColor = "bg-blue-500", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-zinc-800/80",
        className
      )}
      {...props}
    >
      <div
        className={cn("h-full transition-all duration-1000 ease-out rounded-full", indicatorColor)}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  )
);
Progress.displayName = "Progress";

export { Progress };
