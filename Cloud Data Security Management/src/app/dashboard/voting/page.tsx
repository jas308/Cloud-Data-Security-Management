"use client";

import { useState } from "react";
import {
  Vote,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  Info,
  UserCheck,
  Building2,
  Key,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { MOCK_VOTING_REQUEST } from "@/lib/mockData";

export default function VotingPage() {
  const req = MOCK_VOTING_REQUEST;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Vote className="h-6 w-6 text-cyan-400" />
            Consensus Voting & Approval Review
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Review live validator votes, trust weights, and threshold verification results.
          </p>
        </div>

        <Badge variant="cyan" className="font-mono text-xs w-fit">
          Protocol Version: TR-VOTE-v2.4
        </Badge>
      </div>

      {/* Target Candidate Summary Banner */}
      <Card className="border-cyan-500/30 bg-slate-900/90 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold text-lg">
                DA
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-white">{req.candidateName}</h2>
                  <Badge variant="cyan" className="text-xs font-mono">
                    {req.identityId}
                  </Badge>
                </div>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  {req.role} — <span className="text-white">{req.organization}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs font-mono">
              <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-950">
                <span className="text-slate-400 block">Submitted:</span>
                <span className="text-slate-200">{req.submissionDate}</span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-950">
                <span className="text-slate-400 block">Status:</span>
                <Badge variant="verified">Verification Approved</Badge>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center space-x-2 text-xs font-mono text-slate-400">
            <Key className="h-3.5 w-3.5 text-cyan-400" />
            <span className="truncate">Public Key: {req.publicKey}</span>
          </div>
        </CardContent>
      </Card>

      {/* LARGE CONSENSUS STATUS RESULT CARD */}
      <div className="p-6 rounded-2xl border-2 border-emerald-500/50 bg-emerald-950/30 text-emerald-100 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-900/60 border border-emerald-700">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                Consensus Outcome
              </span>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">APPROVED</h3>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
            <div>
              <span className="text-slate-400 uppercase text-[10px]">Calculated Approval</span>
              <div className="text-2xl font-extrabold text-emerald-400">{req.approvalPercentage}%</div>
            </div>
            <div className="h-8 w-[1px] bg-slate-800" />
            <div>
              <span className="text-slate-400 uppercase text-[10px]">Required Threshold</span>
              <div className="text-2xl font-extrabold text-cyan-400">{req.requiredThreshold}%</div>
            </div>
          </div>
        </div>

        <Progress value={req.approvalPercentage} className="h-3" indicatorClassName="bg-emerald-400" />

        {/* Visual Explanation Text Box */}
        <div className="flex items-start space-x-2 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
          <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            "{req.explanation}"
          </p>
        </div>
      </div>

      {/* Validator Votes Table */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-cyan-400" />
          Validator Votes Breakdown
        </h3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Validator Node</TableHead>
              <TableHead>Trust Score</TableHead>
              <TableHead>Vote Cast</TableHead>
              <TableHead>Weighted Value Contribution</TableHead>
              <TableHead>Vote Timestamp</TableHead>
              <TableHead>Validator Audit Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {req.votes.map((v, i) => (
              <TableRow key={i}>
                <TableCell className="font-semibold text-white text-sm">
                  {v.validatorName}
                </TableCell>
                <TableCell className="font-mono text-xs font-bold text-cyan-400">
                  {v.trustScore} / 100
                </TableCell>
                <TableCell>
                  <Badge
                    variant={v.vote === "Approve" ? "verified" : "revoked"}
                    className="text-xs"
                  >
                    {v.vote}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs font-bold text-emerald-400">
                  +{v.weightedValue}% Total Approval
                </TableCell>
                <TableCell className="font-mono text-xs text-slate-400">
                  {v.timestamp}
                </TableCell>
                <TableCell className="text-xs text-slate-300 italic max-w-xs truncate">
                  "{v.comments}"
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
