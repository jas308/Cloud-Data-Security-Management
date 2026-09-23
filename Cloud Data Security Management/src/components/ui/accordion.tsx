"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export function AccordionItem({ title, children, defaultOpen = false, className, icon }: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className={cn("rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden transition-all", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-slate-100 hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          {icon && <span className="text-cyan-400">{icon}</span>}
          <span className="text-base font-semibold">{title}</span>
        </div>
        <ChevronDown
          className={cn("h-5 w-5 text-slate-400 transition-transform duration-200", isOpen && "rotate-180 text-cyan-400")}
        />
      </button>
      {isOpen && <div className="border-t border-slate-800 px-5 py-4 text-slate-300 text-sm leading-relaxed">{children}</div>}
    </div>
  );
}

export function Accordion({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("space-y-3", className)}>{children}</div>;
}
