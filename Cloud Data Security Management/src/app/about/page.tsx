"use client";

import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Lock,
  Vote,
  ArrowRight,
  Blocks,
  Building2,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan" className="uppercase font-mono text-xs">
            System Architecture & Concept
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            About TrustRank-PKI
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            A next-generation trust-weighted digital identity and certificate verification framework designed for healthcare, enterprise, and multi-organization networks.
          </p>
        </div>

        {/* What is TrustRank-PKI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900/60 p-8 rounded-3xl border border-slate-800 shadow-xl">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-cyan-400" />
              What is TrustRank-PKI?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              TrustRank-PKI is a trust-based digital identity and certificate verification system. It replaces single-point-of-failure Centralized Certificate Authorities (CAs) with a network of independent validator nodes.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              When a professional (such as Dr. Arun) joins an organization, independent validators review his credentials and cast votes. The consensus engine calculates a trust-weighted score before issuing a cryptographically signed Digital Certificate backed by an immutable blockchain audit trail.
            </p>
          </div>

          <div className="space-y-3 bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300">
            <div className="text-cyan-400 font-semibold uppercase tracking-wider mb-2">
              Core Technical Paradigm
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Identity Standard:</span>
              <span className="text-white">X.509 + ED25519 Keys</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Consensus Mechanism:</span>
              <span className="text-white">Trust-Weighted Voting</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Approval Threshold:</span>
              <span className="text-emerald-400">70% Weighted Sum</span>
            </div>
            <div className="flex justify-between">
              <span>Ledger Storage:</span>
              <span className="text-purple-400">Block Hash Audit Trail</span>
            </div>
          </div>
        </div>

        {/* Why TrustRank? */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-white">Why TrustRank?</h2>
            <p className="text-slate-300 text-sm">
              In traditional voting systems, every node has equal 1-node-1-vote weight. But not all validators have equal reliability or historical accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-rose-500/30 bg-rose-950/20 space-y-3">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-lg">
                <XCircle className="h-6 w-6" />
                <span>The Problem with Unweighted Voting</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If 5 low-reputation or newly joined nodes collaborate, they could easily outvote 2 highly trusted, authoritative medical boards. This creates severe security vulnerabilities in medical credential verification.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-lg">
                <CheckCircle2 className="h-6 w-6" />
                <span>The TrustRank Solution</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                TrustRank dynamically assigns Trust Scores (0–100) based on historical verification precision, compliance uptime, and audit history. Higher-trust validators carry proportionally higher voting weight in consensus calculations.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-white">Architecture Comparison</h2>
            <p className="text-slate-400 text-xs">
              Comparing Traditional PKI CAs vs Basic Blockchain vs TrustRank-PKI
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Traditional CA PKI</TableHead>
                <TableHead>Basic Blockchain Identity</TableHead>
                <TableHead className="text-cyan-400">TrustRank-PKI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-white">Central Point of Failure</TableCell>
                <TableCell className="text-rose-400">High (Single CA)</TableCell>
                <TableCell className="text-emerald-400">None</TableCell>
                <TableCell className="text-emerald-400 font-bold">None (Decentralized)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-white">Validator Weighting</TableCell>
                <TableCell className="text-slate-400">N/A (Monolithic)</TableCell>
                <TableCell className="text-amber-400">Equal (Unweighted)</TableCell>
                <TableCell className="text-cyan-400 font-bold">Trust-Weighted Consensus</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-white">Cross-Org Verification</TableCell>
                <TableCell className="text-amber-400">Complex CRL/OCSP</TableCell>
                <TableCell className="text-emerald-400">Fast</TableCell>
                <TableCell className="text-emerald-400 font-bold">Instant (&lt; 1s Public)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-white">Revocation Security</TableCell>
                <TableCell className="text-slate-400">Slow CA Updates</TableCell>
                <TableCell className="text-amber-400">Raw Key Nullification</TableCell>
                <TableCell className="text-cyan-400 font-bold">Multi-Validator Revocation Voting</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <Accordion>
            <AccordionItem title="Can a single malicious validator approve a fake doctor?" icon={<HelpCircle />}>
              No. TrustRank-PKI requires a minimum 70% trust-weighted consensus sum across all assigned validators. Even a high-trust validator (e.g. 90 score = 30% weight) cannot single-handedly meet the 70% requirement.
            </AccordionItem>
            <AccordionItem title="What happens when a doctor's private key is lost or stolen?" icon={<HelpCircle />}>
              The hospital security officer initiates an emergency Revocation Request. Assigned validators review the breach evidence and cast revocation votes. Once the 70% threshold is met, the certificate status transitions permanently to REVOKED across all institutions.
            </AccordionItem>
            <AccordionItem title="How does another hospital verify a certificate?" icon={<HelpCircle />}>
              The receiving hospital simply inputs the Certificate ID into the public verification lookup tool or scans the QR code. The system checks the cryptographic signature against the blockchain block hash in less than one second.
            </AccordionItem>
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8 border-t border-slate-800">
          <Link href="/how-it-works">
            <Button variant="gradient" size="lg" className="gap-2">
              <span>View Interactive 11-Step Workflow</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
