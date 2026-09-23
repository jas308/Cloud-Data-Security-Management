"use client";

import { useState } from "react";
import {
  ShieldAlert,
  Vote,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Info,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { MOCK_REVOCATION_REQUEST } from "@/lib/mockData";

export default function RevocationsPage() {
  const rev = MOCK_REVOCATION_REQUEST;
  const [showModal, setShowModal] = useState(false);
  const [submittedToast, setSubmittedToast] = useState(false);

  const lifecycleStages = [
    { name: "ACTIVE", active: true },
    { name: "REVOCATION REQUEST", active: true },
    { name: "VALIDATOR VOTING", active: true, current: true },
    { name: "THRESHOLD CHECK", active: false },
    { name: "REVOKED", active: false },
  ];

  const handleRequestRevocation = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-rose-400" />
            Certificate Revocation Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Emergency credential cancellation protocol managed through trust-weighted validator voting.
          </p>
        </div>

        <Button variant="destructive" size="sm" onClick={() => setShowModal(true)} className="gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span>Request Revocation</span>
        </Button>
      </div>

      {submittedToast && (
        <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-950/40 text-amber-200 text-xs font-semibold animate-in fade-in">
          Emergency Revocation Request Created! Sent to assigned validators for voting.
        </div>
      )}

      {/* SECTION 15: REVOCATION LIFECYCLE PROGRESS BAR */}
      <Card className="border-rose-500/30 bg-slate-900/90 shadow-xl">
        <CardHeader className="border-b border-slate-800 pb-3">
          <CardTitle className="text-base text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-rose-400" />
            Certificate Revocation Lifecycle State
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {lifecycleStages.map((stage, idx) => (
              <div key={idx} className="flex items-center space-x-2 w-full md:w-auto">
                <div
                  className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl border text-xs font-mono font-bold text-center transition-all ${
                    stage.current
                      ? "border-amber-500 bg-amber-950 text-amber-300 shadow-lg shadow-amber-950 animate-pulse"
                      : stage.active
                      ? "border-slate-700 bg-slate-950 text-slate-300"
                      : "border-slate-800/60 bg-slate-950/40 text-slate-600"
                  }`}
                >
                  {stage.name}
                </div>
                {idx < lifecycleStages.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-slate-600 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ACTIVE REVOCATION REQUEST DETAIL CARD */}
      <Card className="border-amber-500/40 bg-slate-900/90 shadow-2xl">
        <CardHeader className="border-b border-slate-800 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <Badge variant="pending">Voting in Progress</Badge>
                <span className="text-xs font-mono text-slate-400">Req ID: {rev.id}</span>
              </div>
              <CardTitle className="text-xl font-bold text-white mt-1">
                Revocation Audit — {rev.certificateId}
              </CardTitle>
              <CardDescription>
                Holder: <span className="text-white font-semibold">{rev.holderName}</span> ({rev.role}) — {rev.organization}
              </CardDescription>
            </div>

            <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 text-right font-mono text-xs">
              <span className="text-slate-400 text-[10px] uppercase block">Requested By</span>
              <span className="text-cyan-400 font-semibold">{rev.requestedBy}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Reason Alert */}
          <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/30 text-rose-200 text-xs leading-relaxed space-y-1">
            <span className="font-mono text-rose-400 font-bold uppercase block">Stated Reason for Revocation:</span>
            <p>"{rev.reason}"</p>
          </div>

          {/* Voting Status Progress */}
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300">Revocation Approval Weight Sum:</span>
              <span className="text-amber-400 font-bold text-base">{rev.totalApproval}% / {rev.requiredThreshold}% Required</span>
            </div>
            <Progress value={rev.totalApproval} className="h-3" indicatorClassName="bg-amber-400" />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono pt-1">
              <span>Status: PENDING (Needs +5% more to reach 70% threshold)</span>
              <span>4 Validators Voted</span>
            </div>
          </div>

          {/* Validator Votes Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Validator Revocation Votes
            </h4>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Validator Node</TableHead>
                  <TableHead>Trust Score</TableHead>
                  <TableHead>Revocation Vote</TableHead>
                  <TableHead>Weighted Weight</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Audit Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rev.votes.map((v, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-semibold text-white text-sm">{v.validatorName}</TableCell>
                    <TableCell className="font-mono text-xs text-cyan-400">{v.trustScore}</TableCell>
                    <TableCell>
                      <Badge variant={v.vote === "Approve" ? "revoked" : "verified"}>
                        {v.vote === "Approve" ? "Approve Revocation" : "Reject Revocation"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-bold text-amber-400">
                      +{v.weightedValue}%
                    </TableCell>
                    <TableCell className="font-mono text-xs text-slate-400">{v.timestamp}</TableCell>
                    <TableCell className="text-xs text-slate-300 italic">"{v.comments}"</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* CREATE EMERGENCY REVOCATION REQUEST MODAL */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-rose-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Initiate Emergency Revocation Request
            </DialogTitle>
            <DialogDescription>
              This will notify assigned validators to cast immediate consensus votes on invalidating a certificate.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRequestRevocation} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Target Certificate ID</label>
              <Input required defaultValue="TR-CERT-2026-001245" className="font-mono text-cyan-400" />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Reason for Revocation</label>
              <Select required>
                <option value="key_compromised">Private key compromised / hardware stolen</option>
                <option value="employment_terminated">Practitioner employment terminated</option>
                <option value="license_suspended">Medical license suspended by board</option>
                <option value="other">Other security audit finding</option>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Audit Reference / Incident Notes</label>
              <textarea
                required
                rows={3}
                placeholder="Provide detailed incident notes for validators..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="border-slate-700">
                Cancel
              </Button>
              <Button type="submit" variant="destructive">
                Submit Revocation Request
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
