"use client";

import { useState } from "react";
import { Vote, ShieldCheck, CheckCircle2, XCircle, RefreshCw, Sparkles, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface ValidatorSim {
  id: string;
  name: string;
  trustScore: number;
  vote: "Approve" | "Reject";
}

export function ConsensusCalculator() {
  const [threshold, setThreshold] = useState<number>(70);
  const [validators, setValidators] = useState<ValidatorSim[]>([
    { id: "a", name: "Validator A (National Board)", trustScore: 90, vote: "Approve" },
    { id: "b", name: "Validator B (Health Trust Net)", trustScore: 80, vote: "Approve" },
    { id: "c", name: "Validator C (Global Identity)", trustScore: 70, vote: "Approve" },
    { id: "d", name: "Validator D (Regional Auth)", trustScore: 50, vote: "Reject" },
  ]);

  // Calculate weighted approval
  const totalScoreSum = validators.reduce((acc, v) => acc + v.trustScore, 0);
  
  const approvalWeightSum = validators
    .filter((v) => v.vote === "Approve")
    .reduce((acc, v) => acc + v.trustScore, 0);

  const approvalPercentage = Math.round((approvalWeightSum / totalScoreSum) * 100);
  const isApproved = approvalPercentage >= threshold;

  const toggleVote = (id: string) => {
    setValidators((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, vote: v.vote === "Approve" ? "Reject" : "Approve" } : v
      )
    );
  };

  const updateTrustScore = (id: string, newScore: number) => {
    setValidators((prev) =>
      prev.map((v) => (v.id === id ? { ...v, trustScore: newScore } : v))
    );
  };

  const resetDefault = () => {
    setThreshold(70);
    setValidators([
      { id: "a", name: "Validator A (National Board)", trustScore: 90, vote: "Approve" },
      { id: "b", name: "Validator B (Health Trust Net)", trustScore: 80, vote: "Approve" },
      { id: "c", name: "Validator C (Global Identity)", trustScore: 70, vote: "Approve" },
      { id: "d", name: "Validator D (Regional Auth)", trustScore: 50, vote: "Reject" },
    ]);
  };

  return (
    <Card className="border-cyan-500/30 bg-slate-900/90 shadow-2xl">
      <CardHeader className="border-b border-slate-800 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Vote className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Interactive Consensus Calculator</CardTitle>
              <CardDescription>
                Simulate how Trust Scores affect final voting decisions and thresholds.
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={resetDefault} className="gap-1.5 text-xs">
            <RefreshCw className="h-3.5 w-3.5 text-cyan-400" />
            <span>Reset Demo</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Results Banner */}
        <div
          className={`p-5 rounded-2xl border transition-all duration-300 ${
            isApproved
              ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-100 shadow-xl shadow-emerald-950/30"
              : "border-rose-500/40 bg-rose-950/40 text-rose-100 shadow-xl shadow-rose-950/30"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                {isApproved ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-rose-400" />
                )}
                <span className="text-xl font-bold tracking-tight">
                  {isApproved ? "CONSENSUS APPROVED" : "CONSENSUS REJECTED"}
                </span>
              </div>
              <p className="text-xs opacity-90 font-mono">
                {isApproved
                  ? `Approval sum (${approvalPercentage}%) meets or exceeds the required threshold (${threshold}%).`
                  : `Approval sum (${approvalPercentage}%) is below the required threshold (${threshold}%).`}
              </p>
            </div>

            <div className="flex items-center space-x-4 bg-slate-950/60 px-4 py-3 rounded-xl border border-slate-800">
              <div className="text-right font-mono">
                <div className="text-[10px] text-slate-400 uppercase">Trust Approval</div>
                <div className="text-2xl font-bold text-white">{approvalPercentage}%</div>
              </div>
              <div className="h-8 w-[1px] bg-slate-800" />
              <div className="text-left font-mono">
                <div className="text-[10px] text-slate-400 uppercase">Threshold</div>
                <div className="text-2xl font-bold text-cyan-400">{threshold}%</div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Progress
              value={approvalPercentage}
              className="h-3"
              indicatorClassName={isApproved ? "bg-emerald-400" : "bg-rose-400"}
            />
          </div>
        </div>

        {/* Required Threshold Slider */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-300">Set Required Approval Threshold:</span>
            <span className="text-cyan-400 font-mono">{threshold}% Required</span>
          </div>
          <input
            type="range"
            min="50"
            max="90"
            step="5"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        {/* Validator Interactive Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Validator Nodes & Vote Toggles
          </h4>

          <div className="space-y-2.5">
            {validators.map((v) => {
              const weightPct = Math.round((v.trustScore / totalScoreSum) * 100);
              return (
                <div
                  key={v.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 gap-3 hover:border-slate-700 transition-colors"
                >
                  {/* Info */}
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold text-xs ${
                        v.trustScore >= 80
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : v.trustScore >= 60
                          ? "bg-amber-950 text-amber-400 border border-amber-800"
                          : "bg-rose-950 text-rose-400 border border-rose-800"
                      }`}
                    >
                      {v.trustScore}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{v.name}</div>
                      <div className="text-xs text-slate-400 font-mono">
                        Voting Weight: <span className="text-cyan-400 font-semibold">{weightPct}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Score Adjuster & Vote Toggle */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 text-xs">
                      <span className="text-slate-400">Score:</span>
                      <input
                        type="number"
                        min="10"
                        max="100"
                        value={v.trustScore}
                        onChange={(e) => updateTrustScore(v.id, Number(e.target.value))}
                        className="w-12 bg-slate-950 border border-slate-700 rounded text-center text-cyan-400 font-mono font-bold"
                      />
                    </div>

                    <button
                      onClick={() => toggleVote(v.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                        v.vote === "Approve"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-700 hover:bg-emerald-900"
                          : "bg-rose-950 text-rose-300 border border-rose-700 hover:bg-rose-900"
                      }`}
                    >
                      {v.vote === "Approve" ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Approve (+{weightPct}%)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3.5 w-3.5 text-rose-400" />
                          <span>Reject (0%)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
