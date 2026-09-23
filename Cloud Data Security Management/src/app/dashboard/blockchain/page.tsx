"use client";

import { useState } from "react";
import {
  Blocks,
  Link as LinkIcon,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Key,
  Info,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MOCK_BLOCKCHAIN_BLOCKS, BlockchainBlock } from "@/lib/mockData";

export default function BlockchainPage() {
  const [selectedBlock, setSelectedBlock] = useState<BlockchainBlock | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Blocks className="h-6 w-6 text-purple-400" />
            Blockchain Audit Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Immutable block records anchoring digital certificate hashes and validator signatures.
          </p>
        </div>

        <Badge variant="cyan" className="font-mono text-xs w-fit">
          Ledger Height: #10245
        </Badge>
      </div>

      {/* PROMINENT REQUIREMENT NOTICE BANNER */}
      <Alert variant="info" className="border-cyan-500/40 bg-cyan-950/30">
        <Info className="h-5 w-5 text-cyan-400" />
        <AlertTitle className="text-cyan-300 font-bold">
          Frontend Prototype Notice
        </AlertTitle>
        <AlertDescription className="text-slate-300 text-xs leading-relaxed">
          “Certificate proofs are represented here as blockchain records. Actual blockchain integration will be connected in a future backend phase.”
        </AlertDescription>
      </Alert>

      {/* CONNECTED BLOCKCHAIN BLOCKS VISUALIZER */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <LinkIcon className="h-5 w-5 text-purple-400" />
          Connected Block Pipeline
        </h3>

        <div className="space-y-4">
          {MOCK_BLOCKCHAIN_BLOCKS.map((block, idx) => (
            <div key={block.blockNumber} className="relative">
              <Card className="border-purple-500/30 bg-slate-900/90 shadow-xl hover:border-purple-500/60 transition-all">
                <CardContent className="p-5 space-y-4">
                  {/* Top Bar of Block */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950 text-purple-300 border border-purple-800 font-bold font-mono">
                        #{block.blockNumber}
                      </div>
                      <div>
                        <span className="text-xs font-mono text-slate-400">Target Certificate:</span>
                        <div className="text-sm font-bold text-cyan-400 font-mono">
                          {block.certificateId}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-500" /> {block.timestamp}
                      </span>
                      <Badge variant="verified">{block.status}</Badge>
                    </div>
                  </div>

                  {/* Cryptographic Hashes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">
                        Block Hash
                      </span>
                      <div className="text-slate-200 truncate">{block.hash}</div>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">
                        Previous Block Hash
                      </span>
                      <div className="text-purple-400 truncate">{block.prevHash}</div>
                    </div>
                  </div>

                  {/* Actions & Signature */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-400 font-mono text-[11px] truncate">
                      Validator Sig: <span className="text-slate-200">{block.validatorSignature}</span>
                    </span>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedBlock(block)}
                      className="h-8 text-xs border-slate-700 gap-1"
                    >
                      <span>Inspect Payload</span>
                      <ChevronRight className="h-3.5 w-3.5 text-cyan-400" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Connecting Link Arrow */}
              {idx < MOCK_BLOCKCHAIN_BLOCKS.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="flex items-center space-x-2 text-xs font-mono text-purple-400">
                    <div className="h-6 w-[2px] bg-gradient-to-b from-purple-500 to-slate-800" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* BLOCK INSPECT MODAL */}
      <Dialog open={!!selectedBlock} onOpenChange={() => setSelectedBlock(null)}>
        {selectedBlock && (
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Blocks className="h-6 w-6 text-purple-400" />
                <span>Block #{selectedBlock.blockNumber} Payload</span>
              </DialogTitle>
              <DialogDescription>
                Detailed Merkle Root & Validator Signature Record
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                <span className="text-slate-500">Certificate ID:</span>
                <div className="text-sm font-bold text-cyan-400">{selectedBlock.certificateId}</div>
              </div>

              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                <span className="text-slate-500">Merkle Root Hash:</span>
                <div className="text-slate-200 break-all">{selectedBlock.merkleRoot}</div>
              </div>

              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                <span className="text-slate-500">Transaction Count:</span>
                <div className="text-slate-200">{selectedBlock.txCount} transactions</div>
              </div>

              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                <span className="text-slate-500">Full Block Hash:</span>
                <div className="text-purple-400 break-all">{selectedBlock.hash}</div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
