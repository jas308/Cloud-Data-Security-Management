"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Key,
  Upload,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function NewIdentityPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "Dr. Arun Kumar",
    role: "Senior Cardiologist",
    organization: "City Hospital",
    email: "arun.kumar@cityhospital.org",
    phone: "+1 (555) 234-5678",
    govIdType: "Medical Board License ID",
    identityNumber: "MED-IN-88910",
    publicKey: "0x4F89b910a372183e91024bcda98a123f829c3C91a2",
    certType: "Medical Practitioner Credential",
    validFrom: "2026-09-18",
    validUntil: "2028-09-18",
    supportingDoc: "Medical_Board_Certification_Arun.pdf",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(true);

      setTimeout(() => {
        router.push("/dashboard/voting");
      }, 1500);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <UserPlus className="h-6 w-6 text-cyan-400" />
          Register New Medical Identity
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Submit professional credential details to initiate decentralized validator consensus verification.
        </p>
      </div>

      {successMsg && (
        <Alert variant="success" className="animate-in fade-in duration-300">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <AlertTitle>Identity Verification Request Initiated!</AlertTitle>
          <AlertDescription>
            Dr. Arun Kumar’s identity has been submitted to 4 assigned validators. Redirecting to Voting Consensus page...
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Form Controls */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Personal Information */}
            <Card className="border-slate-800 bg-slate-900/90 shadow-xl">
              <CardHeader className="border-b border-slate-800/80 pb-3">
                <CardTitle className="text-base text-cyan-400 flex items-center gap-2">
                  1. Personal & Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Full Name</label>
                  <Input
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Arun Kumar"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Professional Role</label>
                  <Input
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Senior Cardiologist"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Organization</label>
                  <Select
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  >
                    <option value="City Hospital">City Hospital</option>
                    <option value="Metro Health Care">Metro Health Care</option>
                    <option value="Global Care Institute">Global Care Institute</option>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Email Address</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Phone Number</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Identity & Cryptographic Info */}
            <Card className="border-slate-800 bg-slate-900/90 shadow-xl">
              <CardHeader className="border-b border-slate-800/80 pb-3">
                <CardTitle className="text-base text-cyan-400 flex items-center gap-2">
                  2. Government ID & Cryptographic Public Key
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Government / Board ID Type</label>
                  <Input
                    value={formData.govIdType}
                    onChange={(e) => setFormData({ ...formData, govIdType: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Identity Number</label>
                  <Input
                    value={formData.identityNumber}
                    onChange={(e) => setFormData({ ...formData, identityNumber: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Key className="h-3.5 w-3.5 text-cyan-400" /> Public Key Hash (RSA / ED25519)
                  </label>
                  <Input
                    required
                    value={formData.publicKey}
                    onChange={(e) => setFormData({ ...formData, publicKey: e.target.value })}
                    className="font-mono text-xs text-cyan-400"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Supporting Document Upload</label>
                  <div className="flex items-center justify-between p-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 text-xs">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Upload className="h-4 w-4 text-cyan-400" />
                      <span>{formData.supportingDoc}</span>
                    </div>
                    <Badge variant="cyan" className="text-[10px]">
                      Attached
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Certificate Details */}
            <Card className="border-slate-800 bg-slate-900/90 shadow-xl">
              <CardHeader className="border-b border-slate-800/80 pb-3">
                <CardTitle className="text-base text-cyan-400 flex items-center gap-2">
                  3. Digital Certificate Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Certificate Type</label>
                  <Select
                    value={formData.certType}
                    onChange={(e) => setFormData({ ...formData, certType: e.target.value })}
                  >
                    <option value="Medical Practitioner Credential">Medical Practitioner Credential</option>
                    <option value="Chief Officer Authority">Chief Officer Authority</option>
                    <option value="Specialist Certification">Specialist Certification</option>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Valid From</label>
                  <Input
                    type="date"
                    value={formData.validFrom}
                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Valid Until</label>
                  <Input
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                disabled={isSubmitting}
                className="gap-2 text-base px-8"
              >
                {isSubmitting ? (
                  "Submitting to Validators..."
                ) : (
                  <>
                    <span>Start Verification</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Right Side Process Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-cyan-500/30 bg-slate-900/90 shadow-2xl sticky top-24">
            <CardHeader className="border-b border-slate-800 pb-3">
              <CardTitle className="text-base text-white flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-cyan-400" />
                Identity Verification Process
              </CardTitle>
              <CardDescription className="text-xs">
                What happens after you click "Start Verification"
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              {[
                { step: 1, title: "Identity Submitted", desc: "Identity payload registered on node network." },
                { step: 2, title: "Validators Selected", desc: "4 independent validators assigned with Trust Scores." },
                { step: 3, title: "Verification Started", desc: "Validators review board credentials and public key." },
                { step: 4, title: "Trust Consensus", desc: "70% weighted threshold consensus required for approval." },
                { step: 5, title: "Certificate Issued", desc: "Signed certificate written to immutable blockchain block." },
              ].map((s) => (
                <div key={s.step} className="flex items-start space-x-3 text-xs">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-950 text-cyan-400 font-bold border border-cyan-800">
                    {s.step}
                  </div>
                  <div>
                    <div className="font-bold text-white">{s.title}</div>
                    <div className="text-slate-400 text-[11px] leading-tight">{s.desc}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
