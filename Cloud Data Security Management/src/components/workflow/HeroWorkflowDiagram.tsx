"use client";

import { UserCheck, Users, Vote, FileCheck, Blocks, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroWorkflowDiagram() {
  const stages = [
    {
      step: 1,
      title: "Doctor Identity",
      subtitle: "Dr. Arun Kumar",
      icon: UserCheck,
      color: "from-blue-500 to-cyan-400",
      badge: "Public Key Submitted",
    },
    {
      step: 2,
      title: "Trusted Validators",
      subtitle: "4 Independent Nodes",
      icon: Users,
      color: "from-indigo-500 to-blue-400",
      badge: "Scores: 90, 80, 70, 50",
    },
    {
      step: 3,
      title: "Trust Consensus",
      subtitle: "75% Weighted Approval",
      icon: Vote,
      color: "from-cyan-500 to-emerald-400",
      badge: "Threshold 70% Met",
    },
    {
      step: 4,
      title: "Digital Certificate",
      subtitle: "TR-CERT-2026-001245",
      icon: FileCheck,
      color: "from-emerald-500 to-teal-400",
      badge: "Cryptographically Signed",
    },
    {
      step: 5,
      title: "Blockchain Proof",
      subtitle: "Immutable Ledger Block",
      icon: Blocks,
      color: "from-purple-500 to-indigo-400",
      badge: "Block #10242 Hash",
    },
  ];

  return (
    <div className="relative w-full rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl overflow-hidden group">
      {/* Background glow effects */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      {/* Header of the diagram card */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-200 tracking-wider uppercase">
            Live Trust Consensus Lifecycle
          </span>
        </div>
        <Badge variant="cyan" className="font-mono text-[10px]">
          Status: ACTIVE & VERIFIED
        </Badge>
      </div>

      {/* Connected Diagram Pipeline */}
      <div className="relative space-y-4">
        {stages.map((stage, idx) => (
          <div key={stage.step} className="relative">
            <div className="flex items-center space-x-4 rounded-xl border border-slate-800/90 bg-slate-950/80 p-3.5 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/90 hover:translate-x-1 shadow-md">
              {/* Step indicator */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${stage.color} text-white shadow-lg`}
              >
                <stage.icon className="h-5 w-5" />
              </div>

              {/* Stage content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">
                    Stage 0{stage.step}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <Check className="h-3 w-3" /> {stage.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight">{stage.title}</h4>
                <p className="text-xs text-slate-400 font-mono truncate">{stage.subtitle}</p>
              </div>
            </div>

            {/* Connecting line */}
            {idx < stages.length - 1 && (
              <div className="flex justify-center py-1">
                <div className="h-4 w-[2px] bg-gradient-to-b from-cyan-500 to-slate-800" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Banner */}
      <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2 text-emerald-300">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>Cross-Hospital Instant Verification Ready</span>
        </div>
        <span className="font-mono text-emerald-400 font-semibold">100% Tamper-Proof</span>
      </div>
    </div>
  );
}
