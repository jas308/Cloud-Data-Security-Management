import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indicatorClassName?: string;
  showValueLabel?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    { className, value = 0, max = 100, indicatorClassName, showValueLabel = false, ...props },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div className="w-full space-y-1">
        <div
          ref={ref}
          className={cn(
            "relative h-3 w-full overflow-hidden rounded-full bg-slate-800/90 border border-slate-700/50 p-0.5",
            className
          )}
          {...props}
        >
          <div
            className={cn(
              "h-full w-full flex-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500 ease-out",
              indicatorClassName
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showValueLabel && (
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>Progress</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        )}
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
