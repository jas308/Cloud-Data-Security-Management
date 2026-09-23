"use client";

import Link from "next/link";
import { ArrowRight, Layers, Sparkles, SearchCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkflowTimeline } from "@/components/workflow/WorkflowTimeline";
import { ConsensusCalculator } from "@/components/workflow/ConsensusCalculator";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan" className="uppercase font-mono text-xs flex items-center gap-1.5 w-fit mx-auto">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Interactive Workflow Blueprint</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            How TrustRank-PKI Works
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Follow the complete 11-step digital identity lifecycle from Dr. Arun’s credential submission to validator consensus voting, digital certificate issuance, blockchain record, and revocation workflow.
          </p>
        </div>

        {/* 11-Step Interactive Workflow */}
        <WorkflowTimeline />

        {/* Consensus Simulator */}
        <div className="pt-8 border-t border-slate-800 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold text-white">Consensus Engine Sandbox</h2>
            <p className="text-slate-300 text-sm">
              Toggle validator votes and adjust trust scores to see how the consensus engine evaluates approval threshold compliance.
            </p>
          </div>
          <ConsensusCalculator />
        </div>

        {/* Next Steps Banner */}
        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-8 text-center space-y-6">
          <h3 className="text-2xl font-bold text-white">Ready to test credential verification?</h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Use our public verification tool to test searching for real sample digital certificate IDs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/verify">
              <Button variant="gradient" size="lg" className="gap-2">
                <SearchCheck className="h-5 w-5" />
                <span>Verify Sample Certificate</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="gap-2 border-slate-700">
                <span>Go to Admin Dashboard</span>
                <ArrowRight className="h-5 w-5 text-cyan-400" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
