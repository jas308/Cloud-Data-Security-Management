"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Eye,
  Blocks,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MOCK_CERTIFICATES, Certificate } from "@/lib/mockData";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>(MOCK_CERTIFICATES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const filtered = certificates.filter((c) => {
    const searchMatch =
      c.certificateId.toLowerCase().includes(search.toLowerCase()) ||
      c.holderName.toLowerCase().includes(search.toLowerCase()) ||
      c.organization.toLowerCase().includes(search.toLowerCase());

    const statusMatch = statusFilter === "All" || c.status === statusFilter;

    return searchMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Award className="h-6 w-6 text-emerald-400" />
            Digital Certificates Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Cryptographically signed digital credentials backed by multi-validator trust consensus.
          </p>
        </div>

        <Link href="/verify">
          <Button variant="outline" size="sm" className="gap-2 border-slate-700">
            <Search className="h-4 w-4 text-cyan-400" />
            <span>Verify Certificate</span>
          </Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-900/80">
        <div className="sm:col-span-8 relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search by Certificate ID (TR-CERT-2026-001245), Holder Name, or Hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 text-xs bg-slate-950/80 border-slate-700"
          />
        </div>

        <div className="sm:col-span-4">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-950/80 border-slate-700"
          >
            <option value="All">All Certificate Statuses</option>
            <option value="Active">Active Credentials</option>
            <option value="Revoked">Revoked Credentials</option>
            <option value="Expired">Expired</option>
            <option value="Pending">Pending Issuance</option>
          </Select>
        </div>
      </div>

      {/* Main Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Certificate ID</TableHead>
            <TableHead>Holder Name</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Blockchain Proof</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-mono text-xs font-bold text-cyan-400">
                {c.certificateId}
              </TableCell>

              <TableCell>
                <div className="font-medium text-white text-sm">{c.holderName}</div>
                <div className="text-xs text-slate-400">{c.role}</div>
              </TableCell>

              <TableCell className="text-xs text-slate-300">{c.organization}</TableCell>

              <TableCell className="font-mono text-xs text-slate-300">{c.issueDate}</TableCell>

              <TableCell className="font-mono text-xs text-slate-300">{c.expiryDate}</TableCell>

              <TableCell>
                <Badge
                  variant={
                    c.status === "Active"
                      ? "active"
                      : c.status === "Revoked"
                      ? "revoked"
                      : c.status === "Expired"
                      ? "expired"
                      : "pending"
                  }
                  className="text-xs uppercase"
                >
                  {c.status}
                </Badge>
              </TableCell>

              <TableCell className="font-mono text-xs text-emerald-400">
                <div className="flex items-center space-x-1">
                  <Blocks className="h-3.5 w-3.5 text-purple-400" />
                  <span>Block #{c.blockNumber}</span>
                </div>
              </TableCell>

              <TableCell className="text-right space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedCert(c)}
                  className="h-8 text-xs border-slate-700"
                >
                  <Eye className="h-3.5 w-3.5 text-cyan-400 mr-1" /> Inspect
                </Button>
                <Link href={`/certificate/${c.certificateId}`} target="_blank">
                  <Button size="sm" variant="ghost" className="h-8 text-xs text-slate-300">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* INSPECT CERTIFICATE DETAILS MODAL */}
      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        {selectedCert && (
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-emerald-400" />
                <span>Certificate Record — {selectedCert.certificateId}</span>
              </DialogTitle>
              <DialogDescription>
                Cryptographic Proof & Blockchain Ledger Trace
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl border border-slate-800 bg-slate-950/80">
                <div>
                  <span className="text-slate-400 font-mono">Holder:</span>
                  <div className="text-sm font-bold text-white">{selectedCert.holderName}</div>
                </div>

                <div>
                  <span className="text-slate-400 font-mono">Role:</span>
                  <div className="text-slate-200">{selectedCert.role}</div>
                </div>

                <div>
                  <span className="text-slate-400 font-mono">Organization:</span>
                  <div className="text-slate-200">{selectedCert.organization}</div>
                </div>

                <div>
                  <span className="text-slate-400 font-mono">Status:</span>
                  <Badge
                    variant={
                      selectedCert.status === "Active"
                        ? "active"
                        : selectedCert.status === "Revoked"
                        ? "revoked"
                        : "expired"
                    }
                    className="mt-1"
                  >
                    {selectedCert.status}
                  </Badge>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-2">
                <span className="text-slate-400 font-mono">Transaction Proof ID (txHash):</span>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-purple-400 break-all">
                  {selectedCert.txHash}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Link href={`/certificate/${selectedCert.certificateId}`} target="_blank">
                  <Button variant="gradient" size="sm" className="gap-2">
                    <span>Open Official Credential View</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
