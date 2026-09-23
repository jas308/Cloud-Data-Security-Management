"use client";

import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  Filter,
  Activity,
  Server,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { MOCK_VALIDATORS, Validator } from "@/lib/mockData";

export default function ValidatorsPage() {
  const [validators, setValidators] = useState<Validator[]>(MOCK_VALIDATORS);
  const [minScoreFilter, setMinScoreFilter] = useState("0");
  const [statusFilter, setStatusFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");

  const filteredValidators = validators.filter((v) => {
    const scoreOk = v.trustScore >= Number(minScoreFilter);
    const statusOk = statusFilter === "All" || v.status === statusFilter;
    const availOk = availabilityFilter === "All" || v.availability === availabilityFilter;
    return scoreOk && statusOk && availOk;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-cyan-400" />
            Validator Nodes & Trust Metric Scores
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Independent institutional validator nodes, historical precision ratings, and weighted consensus influence.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-900/80">
        <div className="sm:col-span-4 flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">
            Min Trust Score:
          </span>
          <Select
            value={minScoreFilter}
            onChange={(e) => setMinScoreFilter(e.target.value)}
            className="text-xs bg-slate-950/80 border-slate-700"
          >
            <option value="0">All Scores (0+)</option>
            <option value="60">Above 60 Score</option>
            <option value="75">Above 75 Score</option>
            <option value="85">High Trust Only (85+)</option>
          </Select>
        </div>

        <div className="sm:col-span-4">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-950/80 border-slate-700"
          >
            <option value="All">All Node Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Under Review">Under Review</option>
          </Select>
        </div>

        <div className="sm:col-span-4">
          <Select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="text-xs bg-slate-950/80 border-slate-700"
          >
            <option value="All">All Availabilities</option>
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
            <option value="Offline">Offline</option>
          </Select>
        </div>
      </div>

      {/* Grid of Highlighted Validator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredValidators.map((val) => (
          <Card
            key={val.id}
            className={`border transition-all shadow-xl ${
              val.trustScore >= 80
                ? "border-emerald-500/30 bg-slate-900/90"
                : val.trustScore >= 60
                ? "border-amber-500/30 bg-slate-900/90"
                : "border-rose-500/30 bg-slate-900/90"
            }`}
          >
            <CardHeader className="pb-3 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    val.status === "Active"
                      ? "active"
                      : val.status === "Under Review"
                      ? "pending"
                      : "default"
                  }
                  className="text-[10px]"
                >
                  {val.status}
                </Badge>
                <span className="text-[10px] text-slate-400 font-mono">{val.availability}</span>
              </div>
              <CardTitle className="text-sm font-bold text-white leading-tight mt-2">
                {val.name}
              </CardTitle>
              <CardDescription className="text-[11px] truncate">
                {val.organization}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 space-y-4">
              {/* Trust Score Rating Visualizer */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-mono">Trust Score</span>
                  <span
                    className={`font-bold font-mono ${
                      val.trustScore >= 80
                        ? "text-emerald-400"
                        : val.trustScore >= 60
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}
                  >
                    {val.trustScore} / 100
                  </span>
                </div>
                <Progress
                  value={val.trustScore}
                  className="h-2.5"
                  indicatorClassName={
                    val.trustScore >= 80
                      ? "bg-emerald-400"
                      : val.trustScore >= 60
                      ? "bg-amber-400"
                      : "bg-rose-400"
                  }
                />
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Accuracy</span>
                  <span className="font-bold text-cyan-400">{val.accuracy}%</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Verifications</span>
                  <span className="font-bold text-white">{val.completedVerifications}</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 font-mono truncate">
                Node: {val.nodeAddress}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Validator Node</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Trust Score</TableHead>
            <TableHead>Accuracy</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredValidators.map((val) => (
            <TableRow key={val.id}>
              <TableCell className="font-medium text-white text-sm">{val.name}</TableCell>
              <TableCell className="text-xs text-slate-300">{val.organization}</TableCell>
              <TableCell className="font-mono text-xs font-bold text-cyan-400">
                {val.trustScore} / 100
              </TableCell>
              <TableCell className="font-mono text-xs text-emerald-400 font-semibold">
                {val.accuracy}%
              </TableCell>
              <TableCell className="font-mono text-xs text-slate-300">
                {val.completedVerifications}
              </TableCell>
              <TableCell className="text-xs text-slate-400 font-mono">
                {val.availability}
              </TableCell>
              <TableCell>
                <Badge
                  variant={val.status === "Active" ? "active" : "pending"}
                  className="text-xs"
                >
                  {val.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
