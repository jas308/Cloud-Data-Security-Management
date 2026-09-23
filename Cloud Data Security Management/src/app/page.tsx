"use client";

import Link from "next/link";
import {
  ShieldCheck,
  SearchCheck,
  ArrowRight,
  Blocks,
  Users,
  Vote,
  Award,
  Lock,
  Zap,
  CheckCircle2,
  Building2,
  FileCheck,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroWorkflowDiagram } from "@/components/workflow/HeroWorkflowDiagram";
import { WorkflowTimeline } from "@/components/workflow/WorkflowTimeline";
import { ConsensusCalculator } from "@/components/workflow/ConsensusCalculator";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-4 py-1.5 text-xs text-cyan-300 font-semibold shadow-inner">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>Consensus-Driven PKI Architecture</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                TrustRank<span className="text-cyan-400 font-mono">-PKI</span>
              </h1>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-200 tracking-tight">
                Trust-Based Digital Identity & Certificate Verification
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Verify identities through trusted validators, issue tamper-resistant digital certificates, and make verification simple across organizations.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button variant="gradient" size="lg" className="w-full sm:w-auto gap-2 text-base">
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/verify" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base border-slate-700">
                    <SearchCheck className="h-5 w-5 text-cyan-400" />
                    <span>Verify Certificate</span>
                  </Button>
                </Link>
              </div>

              {/* Key Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-xl font-extrabold text-cyan-400 font-mono">70%+</div>
                  <div className="text-xs text-slate-400 font-medium">Weighted Threshold</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-emerald-400 font-mono">100%</div>
                  <div className="text-xs text-slate-400 font-medium">Blockchain Proof</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-blue-400 font-mono">&lt; 1 sec</div>
                  <div className="text-xs text-slate-400 font-medium">Instant Verification</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Diagram */}
            <div className="lg:col-span-5">
              <HeroWorkflowDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW TRUSTRANK-PKI WORKS (COMMON MAN WORKFLOW) */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-800 relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <Badge variant="cyan" className="uppercase font-mono text-xs">
              Step-by-Step Explanation
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              How TrustRank-PKI Works
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Understand the entire identity lifecycle from doctor onboarding to decentralized validator voting, certificate issuance, blockchain record, and revocation consensus.
            </p>
          </div>

          {/* Complete 11-step visual interactive timeline */}
          <WorkflowTimeline />
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE CONSENSUS CALCULATOR DEMO */}
      <section className="py-20 bg-slate-950 relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="cyan" className="uppercase font-mono text-xs">
                Interactive Simulator
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Try Trust-Weighted Consensus Live
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Unlike traditional voting systems where every node has equal weight, TrustRank evaluates validators based on historical accuracy.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 rounded-xl border border-slate-800 bg-slate-900/50">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <span className="font-semibold text-white">High Trust (90 Score):</span>
                    <span className="text-slate-300"> Carries 30% total voting weight.</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-xl border border-slate-800 bg-slate-900/50">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <span className="font-semibold text-white">Lower Trust (50 Score):</span>
                    <span className="text-slate-300"> Carries 10% total voting weight.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ConsensusCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: KEY FEATURES */}
      <section className="py-20 bg-slate-900/40 border-t border-slate-800">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Enterprise Grade Security Architecture
            </h2>
            <p className="text-base text-slate-300">
              Built for hospitals, government authorities, and enterprise networks demanding zero-trust verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Trust-Weighted Voting",
                desc: "Prevents rogue or compromise of low-trust nodes from invalidating legit medical credentials.",
                icon: Vote,
                color: "text-cyan-400",
              },
              {
                title: "Immutable Blockchain Audit",
                desc: "Every certificate issuance and revocation is anchored permanently on a block hash.",
                icon: Blocks,
                color: "text-purple-400",
              },
              {
                title: "Instant Verification",
                desc: "Hospitals verify doctor credentials in under 1 second without centralized bottlenecks.",
                icon: SearchCheck,
                color: "text-emerald-400",
              },
              {
                title: "Consensus Revocation",
                desc: "Key breaches require multi-validator agreement before a certificate transitions to REVOKED.",
                icon: ShieldAlert,
                color: "text-rose-400",
              },
              {
                title: "Decentralized PKI",
                desc: "Eliminates single-point-of-failure Certificate Authorities (CAs).",
                icon: Lock,
                color: "text-blue-400",
              },
              {
                title: "Cross-Org Trust Federation",
                desc: "Hospitals share a unified verification protocol without sharing sensitive internal records.",
                icon: Building2,
                color: "text-teal-400",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-3 hover:border-slate-700 hover:bg-slate-900 transition-all group shadow-lg"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 ${f.color} group-hover:scale-110 transition-transform`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border-t border-slate-800 relative">
        <div className="container mx-auto max-w-5xl px-4 text-center space-y-6">
          <Badge variant="cyan" className="font-mono text-xs">
            Ready to Explore?
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience the TrustRank-PKI Dashboard
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base">
            Explore live identities, validator trust metrics, consensus voting logs, and digital certificate verification tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link href="/dashboard">
              <Button variant="gradient" size="lg" className="gap-2 text-base w-full sm:w-auto">
                <span>Open Admin Dashboard</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/verify">
              <Button variant="outline" size="lg" className="gap-2 text-base w-full sm:w-auto border-slate-700">
                <SearchCheck className="h-5 w-5 text-cyan-400" />
                <span>Verify a Certificate</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
