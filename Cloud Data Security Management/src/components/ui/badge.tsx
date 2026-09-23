import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "active"
    | "verified"
    | "pending"
    | "revoked"
    | "expired"
    | "outline"
    | "cyan";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variants = {
    default: "bg-slate-800 text-slate-200 border border-slate-700",
    active:
      "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-950",
    verified:
      "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-950",
    pending:
      "bg-amber-950/80 text-amber-400 border border-amber-500/30 shadow-sm shadow-amber-950",
    revoked:
      "bg-rose-950/80 text-rose-400 border border-rose-500/30 shadow-sm shadow-rose-950",
    expired:
      "bg-slate-900 text-slate-400 border border-slate-700 shadow-sm",
    outline: "text-slate-300 border border-slate-700 bg-transparent",
    cyan: "bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-950",
  };

  return <div className={cn(base, variants[variant], className)} {...props} />;
}

export { Badge };
