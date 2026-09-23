"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  ShieldCheck,
  Vote,
  Award,
  ShieldAlert,
  Blocks,
  SearchCheck,
  Settings,
  Building2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Identities",
      href: "/dashboard/identities",
      icon: Users,
      badge: "1.2k",
    },
    {
      name: "New Identity",
      href: "/dashboard/identities/new",
      icon: UserPlus,
      badge: "Add",
    },
    {
      name: "Validators",
      href: "/dashboard/validators",
      icon: ShieldCheck,
      badge: "36",
    },
    {
      name: "Voting & Consensus",
      href: "/dashboard/voting",
      icon: Vote,
      badge: "Pending",
    },
    {
      name: "Certificates",
      href: "/dashboard/certificates",
      icon: Award,
      badge: "1.1k",
    },
    {
      name: "Revocations",
      href: "/dashboard/revocations",
      icon: ShieldAlert,
      badge: "18",
    },
    {
      name: "Blockchain Ledger",
      href: "/dashboard/blockchain",
      icon: Blocks,
      badge: "10k+",
    },
  ];

  const secondaryItems = [
    {
      name: "Verify Certificate",
      href: "/verify",
      icon: SearchCheck,
      external: true,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-slate-800 bg-slate-950 text-slate-300 transition-all duration-300 z-30",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Sidebar Header / Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800/80">
        <Link href="/" className="flex items-center space-x-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 shadow-md shadow-cyan-950">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-base font-bold text-white tracking-tight flex items-center gap-1">
                TrustRank<span className="text-cyan-400 font-mono text-xs">-PKI</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                Enterprise Node
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* Organization Badge */}
      {!collapsed && (
        <div className="mx-3 my-4 rounded-xl border border-slate-800 bg-slate-900/80 p-3 flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/50">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-white truncate">City Hospital</div>
            <div className="text-[10px] text-slate-400 font-mono truncate">Org ID: CITY-HOSP-01</div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        <div>
          {!collapsed && (
            <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Management
            </div>
          )}
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all group",
                    isActive
                      ? "bg-slate-800 text-cyan-400 font-semibold border border-slate-700/80 shadow-md shadow-slate-950"
                      : "text-slate-400 hover:bg-slate-900/90 hover:text-slate-100"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon
                      className={cn(
                        "h-5 w-5 shrink-0 transition-colors",
                        isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"
                      )}
                    />
                    {!collapsed && <span>{item.name}</span>}
                  </div>
                  {!collapsed && item.badge && (
                    <span
                      className={cn(
                        "px-2 py-0.5 text-[10px] font-semibold rounded-full font-mono",
                        isActive
                          ? "bg-cyan-950 text-cyan-300 border border-cyan-700/50"
                          : "bg-slate-900 text-slate-400 border border-slate-800"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          {!collapsed && (
            <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Tools & Public
            </div>
          )}
          <nav className="space-y-1">
            {secondaryItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center space-x-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group",
                    isActive
                      ? "bg-slate-800 text-cyan-400 font-semibold border border-slate-700/80"
                      : "text-slate-400 hover:bg-slate-900/90 hover:text-slate-100"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0 text-slate-400 group-hover:text-cyan-400" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer / Trust Banner */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800/80">
          <div className="rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 p-3 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-semibold">
              <Sparkles className="h-4 w-4" />
              <span>Trust Consensus Active</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              4/4 Validators responding. 70% threshold set.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
