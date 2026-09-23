import Link from "next/link";
import { ShieldCheck, Lock, CheckCircle2, Blocks, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-600">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                TrustRank<span className="text-cyan-400 font-mono text-sm">-PKI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trust-based digital identity and certificate verification system empowering hospitals, institutions, and enterprise networks with consensus-driven trust metrics.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Consensus Engine Operational</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Public Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Overview & Demo
                </Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-cyan-400 transition-colors">
                  Verify Certificate ID
                </Link>
              </li>
              <li>
                <Link href="/certificate/TR-CERT-2026-001245" className="hover:text-cyan-400 transition-colors">
                  Sample Digital Credential
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-cyan-400 transition-colors">
                  Interactive 11-Step Workflow
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Enterprise Dashboard
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">
                  Dashboard Overview
                </Link>
              </li>
              <li>
                <Link href="/dashboard/identities" className="hover:text-cyan-400 transition-colors">
                  Identity Management
                </Link>
              </li>
              <li>
                <Link href="/dashboard/validators" className="hover:text-cyan-400 transition-colors">
                  Validator Trust Scores
                </Link>
              </li>
              <li>
                <Link href="/dashboard/voting" className="hover:text-cyan-400 transition-colors">
                  Weighted Voting Consensus
                </Link>
              </li>
              <li>
                <Link href="/dashboard/blockchain" className="hover:text-cyan-400 transition-colors">
                  Blockchain Ledger Explorer
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Security Architecture
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Combines PKI RSA/ED25519 digital signatures with trust-weighted validator voting and immutable blockchain proofs.
            </p>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-slate-300">
                <span>Standard</span>
                <span className="font-mono text-cyan-400">X.509 + TrustRank</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Default Threshold</span>
                <span className="font-mono text-emerald-400">70% Approval</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 TrustRank-PKI. All rights reserved. Enterprise Digital Identity Infrastructure.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              About
            </Link>
            <Link href="/how-it-works" className="hover:text-slate-300 transition-colors">
              How It Works
            </Link>
            <Link href="/dashboard" className="hover:text-slate-300 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
