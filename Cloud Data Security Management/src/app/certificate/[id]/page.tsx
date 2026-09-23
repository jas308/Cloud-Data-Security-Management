"use client";

import { use } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Award,
  Blocks,
  Printer,
  Share2,
  ArrowLeft,
  Key,
  QrCode,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_CERTIFICATES } from "@/lib/mockData";

export default function CertificateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const certId = resolvedParams.id;

  const cert = MOCK_CERTIFICATES.find(
    (c) => c.certificateId.toLowerCase() === certId.toLowerCase()
  ) || MOCK_CERTIFICATES[0]; // fallback to first cert for demo

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col print:bg-white print:text-black">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="flex-1 container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Navigation back button */}
        <div className="flex items-center justify-between print:hidden">
          <Link href="/verify">
            <Button variant="outline" size="sm" className="gap-2 border-slate-800">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Public Lookup</span>
            </Button>
          </Link>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2 border-slate-800">
              <Printer className="h-4 w-4" />
              <span>Print Certificate</span>
            </Button>
          </div>
        </div>

        {/* OFFICIAL DIGITAL CERTIFICATE CREDENTIAL CANVAS */}
        <div className="relative rounded-3xl border-4 border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-12 shadow-2xl overflow-hidden print:border-black print:bg-white print:text-black">
          {/* Watermark Emblem Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <ShieldCheck className="w-[450px] h-[450px] text-cyan-400" />
          </div>

          {/* Glowing Header Border */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 print:hidden" />

          {/* Certificate Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8 text-center sm:text-left print:border-gray-300">
            <div className="flex items-center space-x-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 text-white shadow-xl">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-white print:text-black">
                  TrustRank<span className="text-cyan-400 font-mono">-PKI</span>
                </h1>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-widest print:text-gray-600">
                  Decentralized Digital Identity Credential
                </p>
              </div>
            </div>

            {/* Validity Seal */}
            <div className="flex items-center space-x-2">
              {cert.status === "Active" ? (
                <div className="flex items-center space-x-2 rounded-2xl border-2 border-emerald-500/50 bg-emerald-950/60 px-5 py-2.5 text-emerald-300 font-bold shadow-lg shadow-emerald-950 print:bg-emerald-100 print:text-emerald-900">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  <span className="text-base tracking-tight">✓ Certificate Valid</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 rounded-2xl border-2 border-rose-500/50 bg-rose-950/60 px-5 py-2.5 text-rose-300 font-bold shadow-lg shadow-rose-950 print:bg-rose-100 print:text-rose-900">
                  <XCircle className="h-6 w-6 text-rose-400" />
                  <span className="text-base tracking-tight">✗ Revoked Credential</span>
                </div>
              )}
            </div>
          </div>

          {/* Certificate Title */}
          <div className="py-8 text-center space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold print:text-blue-700">
              OFFICIAL CERTIFICATE OF MEDICAL IDENTITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide print:text-black">
              {cert.holderName}
            </h2>
            <p className="text-slate-400 text-sm print:text-gray-700">
              Has been verified and accredited by decentralized validator consensus.
            </p>
          </div>

          {/* Certificate Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-y border-slate-800 print:border-gray-300 text-sm">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-400 uppercase">Professional Role</span>
                <div className="font-semibold text-white text-base print:text-black">{cert.role}</div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-400 uppercase">Affiliated Organization</span>
                <div className="font-semibold text-white text-base print:text-black">{cert.organization}</div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-400 uppercase">Certificate Serial ID</span>
                <div className="font-mono font-bold text-cyan-400 text-base print:text-blue-800">
                  {cert.certificateId}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-400 uppercase">Issuance Date</span>
                <div className="font-mono text-slate-200 print:text-black">{cert.issueDate}</div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-400 uppercase">Expiration Date</span>
                <div className="font-mono text-slate-200 print:text-black">{cert.expiryDate}</div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-400 uppercase">Consensus Status</span>
                <div className="font-semibold text-emerald-400 flex items-center gap-1.5 print:text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" /> 75% Weighted Validator Consensus Passed
                </div>
              </div>
            </div>
          </div>

          {/* Cryptographic Key & Blockchain Footer */}
          <div className="pt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Cryptographic Hashes */}
            <div className="md:col-span-8 space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/80 space-y-1 print:border-gray-300 print:bg-gray-100">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">
                  Public Key Fingerprint (ED25519)
                </span>
                <div className="text-slate-300 truncate text-[11px] print:text-black">
                  {cert.publicKeyHash}
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/80 space-y-1 print:border-gray-300 print:bg-gray-100">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">
                  Blockchain Proof (Block #{cert.blockNumber})
                </span>
                <div className="text-cyan-400 truncate text-[11px] print:text-blue-800">
                  {cert.txHash}
                </div>
              </div>
            </div>

            {/* Right QR Code Placeholder */}
            <div className="md:col-span-4 flex flex-col items-center justify-center space-y-2 p-4 rounded-2xl border border-slate-800 bg-slate-950/90 print:border-gray-300">
              {/* QR Code SVG Placeholder */}
              <div className="h-24 w-24 bg-white p-2 rounded-xl flex items-center justify-center shadow-md">
                <QrCode className="h-20 w-20 text-slate-950" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest text-center">
                Scan to Verify Proof
              </span>
            </div>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
