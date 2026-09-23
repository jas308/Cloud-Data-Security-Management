"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  User,
  Shield,
  CheckCircle2,
  Plus,
  ExternalLink,
  ChevronDown,
  Building2,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function DashboardTopbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notifications = [
    {
      id: 1,
      title: "Identity Approved",
      desc: "Dr. Arun Kumar passed consensus approval (75%).",
      time: "10m ago",
      type: "success",
    },
    {
      id: 2,
      title: "Revocation Request",
      desc: "Emergency key revocation vote initiated for TR-CERT-2026-001245.",
      time: "1h ago",
      type: "warning",
    },
    {
      id: 3,
      title: "New Block Mined",
      desc: "Block #10245 confirmed on local trust ledger.",
      time: "2h ago",
      type: "info",
    },
  ];

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 backdrop-blur-xl">
      {/* Search Input */}
      <div className="flex items-center space-x-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search Identity, Certificate ID (e.g. TR-CERT-2026-001245)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-xs bg-slate-900/90 border-slate-800 text-slate-200 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Quick Add Button */}
        <Link href="/dashboard/identities/new">
          <Button size="sm" variant="gradient" className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Identity</span>
          </Button>
        </Link>

        {/* Public Verify Shortcut */}
        <Link href="/verify" target="_blank">
          <Button size="sm" variant="outline" className="gap-1.5 text-xs border-slate-800 hidden md:flex">
            <span>Public Verify</span>
            <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
          </Button>
        </Link>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <span className="font-semibold text-sm text-white flex items-center gap-2">
                  <Bell className="h-4 w-4 text-cyan-400" /> Notifications
                </span>
                <Badge variant="cyan">3 New</Badge>
              </div>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all text-left"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{n.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-[1px] bg-slate-800" />

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-3 rounded-xl border border-slate-800 bg-slate-900/80 p-1.5 pr-3 hover:bg-slate-800/80 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 font-bold text-white text-xs shadow-md">
              DA
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-100">Dr. Arun Kumar</span>
              <span className="text-[10px] text-cyan-400 font-mono">City Hospital Node</span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 hidden sm:block" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95">
              <div className="p-2 border-b border-slate-800">
                <div className="font-semibold text-xs text-white">Dr. Arun Kumar</div>
                <div className="text-[11px] text-slate-400">arun.kumar@cityhospital.org</div>
                <Badge variant="active" className="mt-1 text-[10px]">
                  Verified Node Admin
                </Badge>
              </div>
              <div className="py-1 text-xs">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Shield className="h-4 w-4 text-cyan-400" />
                  <span>Node Settings</span>
                </Link>
                <Link
                  href="/"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 text-rose-400 hover:bg-slate-800 hover:text-rose-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Exit Dashboard</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
