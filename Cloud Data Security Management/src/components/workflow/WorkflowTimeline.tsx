"use client";

import { useState } from "react";
import {
  UserCheck,
  Users,
  ShieldCheck,
  Vote,
  Award,
  FileCheck,
  Blocks,
  SearchCheck,
  ShieldAlert,
  BadgeAlert,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

export function WorkflowTimeline() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      title: "Step 1 — Doctor Identity",
      shortTitle: "Identity Submission",
      description:
        "Dr. Arun submits his identity details, public key, and supporting hospital credentials to the TrustRank system.",
      icon: UserCheck,
      details: {
        Doctor: "Dr. Arun Kumar",
        Role: "Senior Cardiologist",
        Hospital: "City Hospital",
        PublicKey: "0x4F89b910a372183e91024bcda98a123f829c3C91a2",
        Status: "Submitted for Consensus",
      },
      color: "from-cyan-500 to-blue-500",
    },
    {
      step: 2,
      title: "Step 2 — Trusted Validators",
      shortTitle: "Validator Selection",
      description:
        "The system selects independent, decentralized trusted validators to audit and verify Dr. Arun's credentials.",
      icon: Users,
      details: {
        AssignedValidators: "4 Independent Institutional Nodes",
        ConsensusMode: "Trust-Weighted Decentralized Protocol",
        AuditType: "Cryptographic & Credential Verification",
      },
      color: "from-blue-500 to-indigo-500",
    },
    {
      step: 3,
      title: "Step 3 — Trust Score Weighting",
      shortTitle: "Trust Score Rating",
      description:
        "Each validator receives a Trust Score based on previous verification performance, uptime, and reliability.",
      icon: ShieldCheck,
      details: {
        "Validator A (National Board)": "Trust Score: 90 (High Trust)",
        "Validator B (Health Network)": "Trust Score: 80 (Very Reliable)",
        "Validator C (Global Health)": "Trust Score: 70 (Reliable)",
        "Validator D (Regional Auth)": "Trust Score: 50 (Moderate)",
      },
      color: "from-indigo-500 to-purple-500",
    },
    {
      step: 4,
      title: "Step 4 — Trust-Weighted Voting",
      shortTitle: "Weighted Voting",
      description:
        "Validators verify the identity and cast Approve or Reject votes. Higher-trust validators carry greater voting weight.",
      icon: Vote,
      details: {
        "Validator A (Score 90)": "Vote: APPROVE ➔ Weight: 30%",
        "Validator B (Score 80)": "Vote: APPROVE ➔ Weight: 25%",
        "Validator C (Score 70)": "Vote: APPROVE ➔ Weight: 20%",
        "Validator D (Score 50)": "Vote: REJECT  ➔ Weight: 10%",
      },
      color: "from-purple-500 to-pink-500",
    },
    {
      step: 5,
      title: "Step 5 — Consensus Calculation",
      shortTitle: "Consensus Check",
      description:
        "The system calculates the trust-weighted approval sum. Total approval is compared against the required threshold.",
      icon: Award,
      details: {
        "Approval Formula": "30% + 25% + 20% = 75%",
        "Total Approval": "75%",
        "Required Threshold": "70%",
        "Final Result": "APPROVED ✅ (75% >= 70%)",
      },
      color: "from-emerald-500 to-teal-500",
    },
    {
      step: 6,
      title: "Step 6 — Digital Certificate",
      shortTitle: "Certificate Issuance",
      description:
        "A cryptographically signed Digital Certificate is issued to Dr. Arun after successful consensus approval.",
      icon: FileCheck,
      details: {
        CertificateID: "TR-CERT-2026-001245",
        Holder: "Dr. Arun Kumar",
        IssuedDate: "18 September 2026",
        ExpiryDate: "18 September 2028",
        Status: "ACTIVE & VALID",
      },
      color: "from-teal-500 to-emerald-400",
    },
    {
      step: 7,
      title: "Step 7 — Blockchain Record",
      shortTitle: "Blockchain Audit",
      description:
        "The digital certificate fingerprint proof is recorded on the immutable blockchain ledger for lifetime auditability.",
      icon: Blocks,
      details: {
        BlockchainBlock: "Block #10242",
        BlockHash: "0x6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e...",
        Timestamp: "2026-09-18 11:00:10 UTC",
        Immutability: "100% Tamper-Proof",
      },
      color: "from-cyan-500 to-blue-600",
    },
    {
      step: 8,
      title: "Step 8 — Certificate Verification",
      shortTitle: "Cross-Org Verification",
      description:
        "Another hospital (e.g., Metro Health) can verify Dr. Arun's certificate instantly using his Certificate ID.",
      icon: SearchCheck,
      details: {
        LookupMethod: "Public /verify Search Portal",
        VerificationTime: "Instant (< 1 second)",
        CryptographicProof: "Valid RSA / Blockchain Hash Matched",
      },
      color: "from-blue-600 to-indigo-600",
    },
    {
      step: 9,
      title: "Step 9 — Revocation Request",
      shortTitle: "Compromise Alert",
      description:
        "If a security breach occurs or a private key is compromised, an emergency revocation request can be created.",
      icon: ShieldAlert,
      details: {
        TargetCertificate: "TR-CERT-2026-001245",
        Reason: "Private key compromised on external device",
        InitiatedBy: "Hospital Cyber Security Officer",
        Status: "Revocation Voting Initiated",
      },
      color: "from-amber-500 to-orange-600",
    },
    {
      step: 10,
      title: "Step 10 — Revocation Voting",
      shortTitle: "Revocation Consensus",
      description:
        "Trusted validators review the revocation request evidence and cast votes to decide on credential cancellation.",
      icon: Vote,
      details: {
        "Validator A (30%)": "Approve Revocation",
        "Validator B (25%)": "Approve Revocation",
        "Validator C (20%)": "Reject Revocation",
        "Validator D (10%)": "Approve Revocation",
        "Total Revocation Weight": "65% (Threshold 70%)",
      },
      color: "from-orange-600 to-rose-600",
    },
    {
      step: 11,
      title: "Step 11 — Certificate Revoked",
      shortTitle: "State Transition",
      description:
        "If the required threshold is reached during voting, the certificate transitions immediately to REVOKED across all systems.",
      icon: BadgeAlert,
      details: {
        PreviousState: "ACTIVE",
        NewState: "REVOKED ❌",
        RevocationNotice: "Certificate nullified across global PKI network",
        BlockchainAudit: "Revocation block recorded permanently",
      },
      color: "from-rose-600 to-red-700",
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Workflow Navigation / Step selector */}
      <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-thin scrollbar-thumb-slate-800">
        {steps.map((s) => (
          <button
            key={s.step}
            onClick={() => setActiveStep(s.step)}
            className={`flex-none px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center space-x-2 ${
              activeStep === s.step
                ? "border-cyan-500 bg-cyan-950/80 text-cyan-300 shadow-lg shadow-cyan-950"
                : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
            }`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] font-mono">
              {s.step}
            </span>
            <span>{s.shortTitle}</span>
          </button>
        ))}
      </div>

      {/* Main Active Step Detail Showcase */}
      {steps
        .filter((s) => s.step === activeStep)
        .map((s) => (
          <Card key={s.step} className="border-cyan-500/30 bg-slate-900/90 shadow-2xl relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color}`} />
            <CardContent className="p-6 md:p-8 space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-xl`}>
                    <s.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <Badge variant="cyan" className="mb-1">
                      Step {s.step} of 11
                    </Badge>
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {s.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    disabled={activeStep === 1}
                    onClick={() => setActiveStep((prev) => Math.max(prev - 1, 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium text-slate-300 hover:bg-slate-800 disabled:opacity-30"
                  >
                    Previous
                  </button>
                  <button
                    disabled={activeStep === 11}
                    onClick={() => setActiveStep((prev) => Math.min(prev + 1, 11))}
                    className="px-3 py-1.5 rounded-lg bg-cyan-600 text-xs font-semibold text-white hover:bg-cyan-500 disabled:opacity-30 flex items-center gap-1"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-base text-slate-300 leading-relaxed font-sans bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                "{s.description}"
              </p>

              {/* Special interactive visual for Step 5 Consensus */}
              {s.step === 5 && (
                <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-3">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-emerald-300 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" /> Calculated Approval: 75%
                    </span>
                    <span className="text-slate-400 font-mono">Threshold: 70%</span>
                  </div>
                  <Progress value={75} className="h-3" indicatorClassName="bg-emerald-400" />
                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-slate-400">Weighted Approval Sum: 30% + 25% + 20% = 75%</span>
                    <Badge variant="verified">Consensus Reached — APPROVED</Badge>
                  </div>
                </div>
              )}

              {/* Special interactive visual for Step 11 Revocation */}
              {s.step === 11 && (
                <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-950/20 space-y-3">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-rose-300">Status State Transition</span>
                    <div className="flex items-center space-x-2 font-mono text-xs">
                      <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        ACTIVE
                      </span>
                      <ArrowRight className="h-4 w-4 text-rose-400" />
                      <span className="px-2 py-1 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold animate-pulse">
                        REVOKED
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step Key-Value Data Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {Object.entries(s.details).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex flex-col p-3 rounded-xl border border-slate-800 bg-slate-950/80"
                  >
                    <span className="text-xs font-semibold text-slate-400 font-mono">{key}</span>
                    <span className="text-sm font-medium text-slate-100 font-mono mt-0.5">{val}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

      {/* Visual Timeline Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {steps.map((s) => (
          <div
            key={s.step}
            onClick={() => setActiveStep(s.step)}
            className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
              activeStep === s.step
                ? "border-cyan-500 bg-slate-900 shadow-xl ring-2 ring-cyan-500/20"
                : "border-slate-800/80 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-cyan-400 font-semibold">Step {s.step}</span>
              <s.icon className={`h-4 w-4 ${activeStep === s.step ? "text-cyan-400" : "text-slate-500"}`} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">{s.shortTitle}</h4>
            <p className="text-xs text-slate-400 line-clamp-2">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
