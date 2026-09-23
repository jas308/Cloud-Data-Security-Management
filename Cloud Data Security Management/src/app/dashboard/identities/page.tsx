"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle2,
  Award,
  MoreVertical,
  ExternalLink,
  Building2,
  ShieldCheck,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MOCK_IDENTITIES, Identity } from "@/lib/mockData";

export default function IdentitiesPage() {
  const [identities, setIdentities] = useState<Identity[]>(MOCK_IDENTITIES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [orgFilter, setOrgFilter] = useState("All");
  const [selectedIdentity, setSelectedIdentity] = useState<Identity | null>(null);

  const filteredIdentities = identities.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.identityId.toLowerCase().includes(search.toLowerCase()) ||
      item.organization.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.verificationStatus === statusFilter;

    const matchesOrg =
      orgFilter === "All" || item.organization === orgFilter;

    return matchesSearch && matchesStatus && matchesOrg;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-cyan-400" />
            Identity Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage registered medical staff identities, credentials, public key pairs, and verification status.
          </p>
        </div>

        <Link href="/dashboard/identities/new">
          <Button variant="gradient" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Identity</span>
          </Button>
        </Link>
      </div>

      {/* Filters & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-900/80">
        <div className="sm:col-span-6 relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search by Doctor Name, Identity ID (TR-ID-10021), or Hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 text-xs bg-slate-950/80 border-slate-700"
          />
        </div>

        <div className="sm:col-span-3">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-950/80 border-slate-700"
          >
            <option value="All">All Verification Statuses</option>
            <option value="Verified">Verified Only</option>
            <option value="Pending">Pending Only</option>
            <option value="Under Review">Under Review</option>
          </Select>
        </div>

        <div className="sm:col-span-3">
          <Select
            value={orgFilter}
            onChange={(e) => setOrgFilter(e.target.value)}
            className="text-xs bg-slate-950/80 border-slate-700"
          >
            <option value="All">All Organizations</option>
            <option value="City Hospital">City Hospital</option>
            <option value="Metro Health Care">Metro Health Care</option>
            <option value="Global Care Institute">Global Care Institute</option>
          </Select>
        </div>
      </div>

      {/* Identities Main Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Identity ID</TableHead>
            <TableHead>Doctor Name & Role</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Public Key</TableHead>
            <TableHead>Verification Status</TableHead>
            <TableHead>Certificate Status</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredIdentities.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-mono text-xs font-bold text-cyan-400">
                {item.identityId}
              </TableCell>

              <TableCell>
                <div className="font-medium text-white text-sm">{item.name}</div>
                <div className="text-xs text-slate-400">{item.role}</div>
              </TableCell>

              <TableCell className="text-xs text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <Building2 className="h-3.5 w-3.5 text-slate-500" />
                  <span>{item.organization}</span>
                </div>
              </TableCell>

              <TableCell className="font-mono text-xs text-slate-400">
                <div className="flex items-center space-x-1">
                  <Key className="h-3 w-3 text-cyan-500" />
                  <span>{item.publicKey}</span>
                </div>
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    item.verificationStatus === "Verified"
                      ? "verified"
                      : item.verificationStatus === "Pending"
                      ? "pending"
                      : "default"
                  }
                  className="text-xs"
                >
                  {item.verificationStatus}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    item.certificateStatus === "Certificate Active"
                      ? "active"
                      : item.certificateStatus === "Revoked"
                      ? "revoked"
                      : "pending"
                  }
                  className="text-xs"
                >
                  {item.certificateStatus}
                </Badge>
              </TableCell>

              <TableCell className="font-mono text-xs text-slate-400">
                {item.createdDate}
              </TableCell>

              <TableCell className="text-right space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedIdentity(item)}
                  className="h-8 text-xs border-slate-700"
                >
                  <Eye className="h-3.5 w-3.5 text-cyan-400 mr-1" /> View
                </Button>
                <Link href="/dashboard/voting">
                  <Button size="sm" variant="ghost" className="h-8 text-xs text-slate-300">
                    Verify
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* VIEW IDENTITY DETAILS DIALOG */}
      <Dialog open={!!selectedIdentity} onOpenChange={() => setSelectedIdentity(null)}>
        {selectedIdentity && (
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <ShieldCheck className="h-6 w-6 text-cyan-400" />
                <span>Identity Details — {selectedIdentity.name}</span>
              </DialogTitle>
              <DialogDescription>
                Registered Medical Practitioner Identity Profile & Consensus Record
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl border border-slate-800 bg-slate-950/80">
                <div>
                  <span className="text-slate-400 font-mono">Identity ID:</span>
                  <div className="text-sm font-bold text-cyan-400 font-mono">
                    {selectedIdentity.identityId}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-mono">Full Name:</span>
                  <div className="text-sm font-bold text-white">{selectedIdentity.name}</div>
                </div>

                <div>
                  <span className="text-slate-400 font-mono">Role:</span>
                  <div className="text-slate-200">{selectedIdentity.role}</div>
                </div>

                <div>
                  <span className="text-slate-400 font-mono">Organization:</span>
                  <div className="text-slate-200">{selectedIdentity.organization}</div>
                </div>

                <div>
                  <span className="text-slate-400 font-mono">Email:</span>
                  <div className="text-slate-200">{selectedIdentity.email}</div>
                </div>

                <div>
                  <span className="text-slate-400 font-mono">Govt / Board ID:</span>
                  <div className="text-slate-200">{selectedIdentity.identityNumber} ({selectedIdentity.govIdType})</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-2">
                <span className="text-slate-400 font-mono">Public Key Hash:</span>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-400 break-all">
                  {selectedIdentity.publicKey}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900">
                <span className="text-slate-400">Supporting Document</span>
                <span className="text-cyan-400 font-semibold">{selectedIdentity.supportingDocName}</span>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
