"use client";

import { useState } from "react";
import { Settings, Shield, Bell, Key, Save, CheckCircle2, Building2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function SettingsPage() {
  const [threshold, setThreshold] = useState("70");
  const [nodeOrg, setNodeOrg] = useState("City Hospital & Health System");
  const [keyPair, setKeyPair] = useState("ED25519_CityHosp_Node_01");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Settings className="h-6 w-6 text-cyan-400" />
          Node & Consensus Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Configure node threshold parameters, local cryptographic key pairs, and notification alerts.
        </p>
      </div>

      {saved && (
        <Alert variant="success" className="animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <AlertTitle>Settings Saved Successfully!</AlertTitle>
          <AlertDescription>
            Consensus parameters updated across local node configuration.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Consensus Settings */}
        <Card className="border-slate-800 bg-slate-900/90 shadow-xl">
          <CardHeader className="border-b border-slate-800 pb-3">
            <CardTitle className="text-base text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-cyan-400" />
              Consensus & Threshold Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">
                Required Trust Approval Threshold (%)
              </label>
              <Select value={threshold} onChange={(e) => setThreshold(e.target.value)}>
                <option value="60">60% Approval Threshold</option>
                <option value="70">70% Approval Threshold (Default Standard)</option>
                <option value="75">75% High Security Threshold</option>
                <option value="80">80% Strict Consensus Threshold</option>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Organization Name</label>
              <Input value={nodeOrg} onChange={(e) => setNodeOrg(e.target.value)} />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Validator Key Pair Alias</label>
              <Input value={keyPair} onChange={(e) => setKeyPair(e.target.value)} className="font-mono text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-slate-800 bg-slate-900/90 shadow-xl">
          <CardHeader className="border-b border-slate-800 pb-3">
            <CardTitle className="text-base text-white flex items-center gap-2">
              <Bell className="h-5 w-5 text-cyan-400" />
              Alert & Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-3 text-xs">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-cyan-500 rounded" />
              <span className="text-slate-200">Notify when a new identity consensus vote is initiated</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-cyan-500 rounded" />
              <span className="text-slate-200">Emergency revocation vote alerts</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-cyan-500 rounded" />
              <span className="text-slate-200">New blockchain block mined notifications</span>
            </label>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="gradient" className="gap-2">
            <Save className="h-4 w-4" />
            <span>Save Configuration</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
