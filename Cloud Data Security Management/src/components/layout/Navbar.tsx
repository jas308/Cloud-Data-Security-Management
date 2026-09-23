"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Search, ArrowRight, Layers, HelpCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();

  const isDashboard = pathname?.startsWith("/dashboard");
  if (isDashboard) return null; // Dashboard has its own sidebar & topbar

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: "How It Works", icon: Layers },
    { href: "/about", label: "About TrustRank", icon: Info },
    { href: "/verify", label: "Verify Certificate", icon: Search },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 shadow-lg shadow-cyan-900/30 group-hover:scale-105 transition-transform">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              TrustRank<span className="text-cyan-400 font-mono text-sm font-semibold">-PKI</span>
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              Decentralized Identity
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  isActive
                    ? "bg-slate-800/80 text-cyan-400 font-semibold border border-slate-700/60"
                    : "text-slate-300 hover:text-white hover:bg-slate-900"
                }`}
              >
                {link.icon && <link.icon className="h-4 w-4 text-cyan-400/80" />}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Link href="/verify" className="hidden sm:block">
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="h-4 w-4 text-cyan-400" />
              <span>Verify ID</span>
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="gradient" size="sm" className="gap-2">
              <span>Admin Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
