"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Award,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Blocks,
  ArrowRight,
  TrendingUp,
  UserCheck,
  Vote,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  Plus,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { DASHBOARD_STATS, MOCK_IDENTITIES, MOCK_CERTIFICATES } from "@/lib/mockData";

export default function DashboardOverviewPage() {
  const statCards = [
    {
      title: "Total Identities",
      value: DASHBOARD_STATS.totalIdentities,
      subtitle: "+12 added this week",
      icon: Users,
      color: "text-cyan-400",
      bgColor: "bg-cyan-950/80 border-cyan-800/60",
      href: "/dashboard/identities",
    },
    {
      title: "Active Certificates",
      value: DASHBOARD_STATS.activeCertificates,
      subtitle: "90% active rate",
      icon: Award,
      color: "text-emerald-400",
      bgColor: "bg-emerald-950/80 border-emerald-800/60",
      href: "/dashboard/certificates",
    },
    {
      title: "Pending Verifications",
      value: DASHBOARD_STATS.pendingVerifications,
      subtitle: "Awaiting validator vote",
      icon: Clock,
      color: "text-amber-400",
      bgColor: "bg-amber-950/80 border-amber-800/60",
      href: "/dashboard/voting",
    },
    {
      title: "Active Validators",
      value: DASHBOARD_STATS.activeValidators,
      subtitle: "Avg Trust Score 84",
      icon: ShieldCheck,
      color: "text-blue-400",
      bgColor: "bg-blue-950/80 border-blue-800/60",
      href: "/dashboard/validators",
    },
    {
      title: "Revoked Certificates",
      value: DASHBOARD_STATS.revokedCertificates,
      subtitle: "Security nullified",
      icon: ShieldAlert,
      color: "text-rose-400",
      bgColor: "bg-rose-950/80 border-rose-800/60",
      href: "/dashboard/revocations",
    },
    {
      title: "Blockchain Records",
      value: DASHBOARD_STATS.blockchainRecords,
      subtitle: "Immutable blocks #10245",
      icon: Blocks,
      color: "text-purple-400",
      bgColor: "bg-purple-950/80 border-purple-800/60",
      href: "/dashboard/blockchain",
    },
  ];

  const pipelineStages = [
    { name: "Identity Submission", status: "Completed", count: "1,284", badge: "active" },
    { name: "Validator Selection", status: "Completed", count: "4/4 Nodes", badge: "active" },
    { name: "Trust Score Weighting", status: "Completed", count: "Avg 84", badge: "active" },
    { name: "Weighted Voting", status: "In Progress", count: "42 Pending", badge: "pending" },
    { name: "Consensus Check", status: "Completed", count: "75% > 70%", badge: "active" },
    { name: "Certificate Issuance", status: "Completed", count: "1,156 Issued", badge: "active" },
    { name: "Blockchain Record", status: "Completed", count: "Block #10242", badge: "active" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time status of trust-weighted consensus, identity verification, and blockchain records.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/dashboard/identities/new">
            <Button variant="gradient" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              <span>New Identity Request</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((c, i) => (
          <Link key={i} href={c.href}>
            <Card className="h-full border-slate-800 bg-slate-900/90 hover:border-slate-700 transition-all hover:translate-y-[-2px] cursor-pointer">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">{c.title}</span>
                  <div className={`p-2 rounded-xl border ${c.bgColor}`}>
                    <c.icon className={`h-4 w-4 ${c.color}`} />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-mono">{c.value}</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{c.subtitle}</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* SECTION 7: LARGE WORKFLOW VISUALIZATION CARD */}
      <Card className="border-cyan-500/30 bg-slate-900/90 shadow-2xl">
        <CardHeader className="border-b border-slate-800 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-cyan-400" />
                Live Consensus Pipeline Architecture
              </CardTitle>
              <CardDescription>
                Identity → Validator Selection → Trust Score → Voting → Consensus → Certificate → Blockchain
              </CardDescription>
            </div>
            <Badge variant="cyan" className="w-fit font-mono text-xs">
              Protocol Health: 99.98%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {pipelineStages.map((stage, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-2 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono uppercase">
                    Stage 0{idx + 1}
                  </span>
                  <Badge variant={stage.badge as any} className="text-[9px] px-1.5 py-0">
                    {stage.status}
                  </Badge>
                </div>
                <div className="text-xs font-bold text-white">{stage.name}</div>
                <div className="text-[11px] text-cyan-400 font-mono font-semibold">{stage.count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* RECENT IDENTITIES & CERTIFICATES TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Identities */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-cyan-400" />
              Recent Identity Verification Requests
            </h3>
            <Link href="/dashboard/identities" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Identity ID</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_IDENTITIES.map((id) => (
                <TableRow key={id.id}>
                  <TableCell className="font-mono text-xs font-semibold text-cyan-400">
                    {id.identityId}
                  </TableCell>
                  <TableCell className="font-medium text-white">{id.name}</TableCell>
                  <TableCell className="text-slate-300 text-xs">{id.organization}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        id.verificationStatus === "Verified"
                          ? "verified"
                          : id.verificationStatus === "Pending"
                          ? "pending"
                          : "default"
                      }
                      className="text-[11px]"
                    >
                      {id.verificationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/voting`}>
                      <Button size="sm" variant="ghost" className="h-7 text-xs text-cyan-400">
                        Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Right: Active Certificates */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-400" />
              Issued Certificates
            </h3>
            <Link href="/dashboard/certificates" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_CERTIFICATES.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-900/90 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-white">{c.certificateId}</span>
                    <Badge
                      variant={
                        c.status === "Active"
                          ? "active"
                          : c.status === "Revoked"
                          ? "revoked"
                          : "expired"
                      }
                      className="text-[10px]"
                    >
                      {c.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-300">{c.holderName} — {c.organization}</div>
                </div>

                <Link href={`/certificate/${c.certificateId}`} target="_blank">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-cyan-400">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
