"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Blocks,
  Key,
  ExternalLink,
  Award,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_CERTIFICATES, Certificate } from "@/lib/mockData";
import confetti from "canvas-confetti";

function VerifySearchComponent() {
  const searchParams = useSearchParams();
  const initialId = searchParams?.get("id") || "";

  const [certificateId, setCertificateId] = useState(initialId);
  const [searchedCert, setSearchedCert] = useState<Certificate | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId]);

  const handleSearch = (idToSearch?: string) => {
    const targetId = (idToSearch !== undefined ? idToSearch : certificateId).trim();
    if (!targetId) return;

    setIsSearching(true);
    setHasSearched(false);

    setTimeout(() => {
      const match = MOCK_CERTIFICATES.find(
        (c) => c.certificateId.toLowerCase() === targetId.toLowerCase()
      );

      setSearchedCert(match || null);
      setHasSearched(true);
      setIsSearching(false);

      if (match && match.status === "Active") {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    }, 400);
  };

  const copyLink = () => {
    if (!searchedCert) return;
    navigator.clipboard.writeText(
      `${window.location.origin}/certificate/${searchedCert.certificateId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Search Input Box */}
      <Card className="border-cyan-500/30 bg-slate-900/90 shadow-2xl p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="e.g. TR-CERT-2026-001245"
                className="pl-11 h-12 text-base font-mono bg-slate-950/90 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              disabled={isSearching}
              className="h-12 px-8 text-base font-semibold"
            >
              {isSearching ? "Verifying..." : "Verify Certificate"}
            </Button>
          </div>

          {/* Quick Sample IDs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="text-slate-400 font-medium">Try Sample IDs:</span>
            <button
              type="button"
              onClick={() => {
                setCertificateId("TR-CERT-2026-001245");
                handleSearch("TR-CERT-2026-001245");
              }}
              className="px-2.5 py-1 rounded-lg border border-emerald-800/80 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900 transition-colors font-mono"
            >
              TR-CERT-2026-001245 (Active)
            </button>
            <button
              type="button"
              onClick={() => {
                setCertificateId("TR-CERT-2026-001201");
                handleSearch("TR-CERT-2026-001201");
              }}
              className="px-2.5 py-1 rounded-lg border border-rose-800/80 bg-rose-950/60 text-rose-300 hover:bg-rose-900 transition-colors font-mono"
            >
              TR-CERT-2026-001201 (Revoked)
            </button>
            <button
              type="button"
              onClick={() => {
                setCertificateId("TR-CERT-2024-000890");
                handleSearch("TR-CERT-2024-000890");
              }}
              className="px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 transition-colors font-mono"
            >
              TR-CERT-2024-000890 (Expired)
            </button>
          </div>
        </form>
      </Card>

      {/* VERIFICATION RESULT DISPLAY */}
      {hasSearched && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          {searchedCert ? (
            <Card
              className={`border-2 shadow-2xl overflow-hidden ${
                searchedCert.status === "Active"
                  ? "border-emerald-500/50 bg-slate-900/90"
                  : searchedCert.status === "Revoked"
                  ? "border-rose-500/50 bg-slate-900/90"
                  : "border-slate-700 bg-slate-900/90"
              }`}
            >
              {/* Status Bar */}
              <div
                className={`p-4 flex items-center justify-between font-semibold ${
                  searchedCert.status === "Active"
                    ? "bg-emerald-950/80 text-emerald-300 border-b border-emerald-800"
                    : searchedCert.status === "Revoked"
                    ? "bg-rose-950/80 text-rose-300 border-b border-rose-800"
                    : "bg-slate-950/80 text-slate-300 border-b border-slate-800"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {searchedCert.status === "Active" && (
                    <>
                      <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                      <span className="text-lg">✅ Certificate Verified & Valid</span>
                    </>
                  )}
                  {searchedCert.status === "Revoked" && (
                    <>
                      <XCircle className="h-6 w-6 text-rose-400" />
                      <span className="text-lg">❌ Certificate Revoked</span>
                    </>
                  )}
                  {searchedCert.status === "Expired" && (
                    <>
                      <AlertTriangle className="h-6 w-6 text-amber-400" />
                      <span className="text-lg">⚠️ Certificate Expired</span>
                    </>
                  )}
                </div>
                <Badge
                  variant={
                    searchedCert.status === "Active"
                      ? "active"
                      : searchedCert.status === "Revoked"
                      ? "revoked"
                      : "expired"
                  }
                  className="text-xs uppercase font-bold"
                >
                  {searchedCert.status}
                </Badge>
              </div>

              <CardContent className="p-6 md:p-8 space-y-6">
                {/* Key Metadata Table */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-1">
                    <span className="text-xs text-slate-400 font-mono">Certificate ID</span>
                    <div className="text-base font-bold text-white font-mono">
                      {searchedCert.certificateId}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-1">
                    <span className="text-xs text-slate-400 font-mono">Holder Name</span>
                    <div className="text-base font-bold text-cyan-300">
                      {searchedCert.holderName}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-1">
                    <span className="text-xs text-slate-400 font-mono">Role / Specialty</span>
                    <div className="text-sm font-semibold text-slate-200">
                      {searchedCert.role}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-1">
                    <span className="text-xs text-slate-400 font-mono">Organization</span>
                    <div className="text-sm font-semibold text-slate-200">
                      {searchedCert.organization}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-1">
                    <span className="text-xs text-slate-400 font-mono">Issue Date</span>
                    <div className="text-sm font-mono text-slate-200">{searchedCert.issueDate}</div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-1">
                    <span className="text-xs text-slate-400 font-mono">Expiry Date</span>
                    <div className="text-sm font-mono text-slate-200">{searchedCert.expiryDate}</div>
                  </div>
                </div>

                {/* Cryptographic & Blockchain Indicators */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-400" />
                    Cryptographic & Trust Audit Proofs
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-850 bg-slate-900">
                      <span className="text-slate-400">Blockchain Record</span>
                      <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Verified (Block #{searchedCert.blockNumber})
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-850 bg-slate-900">
                      <span className="text-slate-400">Public Key Hash</span>
                      <span className="text-cyan-400 font-mono font-semibold flex items-center gap-1">
                        <Key className="h-3.5 w-3.5" /> Verified SHA-256
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-850 bg-slate-900">
                      <span className="text-slate-400">Validator Approval</span>
                      <span className="text-emerald-400 font-mono font-semibold">
                        75% Weighted Consensus
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-850 bg-slate-900">
                      <span className="text-slate-400">Current Status</span>
                      <span
                        className={`font-mono font-bold uppercase ${
                          searchedCert.status === "Active"
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }`}
                      >
                        {searchedCert.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
                  <Link
                    href={`/certificate/${searchedCert.certificateId}`}
                    target="_blank"
                  >
                    <Button variant="gradient" className="gap-2 w-full sm:w-auto">
                      <Award className="h-4 w-4" />
                      <span>View Full Digital Credential Page</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>

                  <Button variant="outline" onClick={copyLink} className="gap-2 border-slate-700 w-full sm:w-auto">
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    <span>{copied ? "Link Copied!" : "Copy Verification URL"}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-rose-500/30 bg-slate-900/90 text-center p-8 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-950 text-rose-400 border border-rose-800 mx-auto">
                <XCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Certificate Not Found</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                No certificate matching ID <span className="font-mono text-cyan-400">{certificateId}</span> was found in the TrustRank PKI ledger. Please check for typos.
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <Badge variant="cyan" className="uppercase font-mono text-xs">
            Public Verification Portal
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verify a Digital Certificate
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Enter a certificate ID to verify its authenticity, validator consensus approval, and current blockchain status.
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-slate-400 py-10 font-mono">Loading verification module...</div>}>
          <VerifySearchComponent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
