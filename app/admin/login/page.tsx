"use client";

import React, { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";
import { Lock, ArrowRight, ShieldAlert } from "lucide-react";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4 font-mono">
      {/* Decorative Editorial Watermark */}
      <div className="absolute top-8 left-8 text-xs text-zinc-600 uppercase tracking-widest border-b border-zinc-800 pb-1">
        SYS // ADMIN_AUTH_GATEWAY
      </div>

      <div className="w-full max-w-md bg-zinc-950 border-2 border-zinc-800 p-8 shadow-[8px_8px_0px_0px_#0DFF72]">
        <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#0DFF72] animate-pulse" />
            <h1 className="text-xl font-bold uppercase tracking-tight text-white">
              ADMIN LOGIN
            </h1>
          </div>
          <Lock className="w-5 h-5 text-zinc-400" />
        </div>

        {state?.error && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-500 text-red-400 text-xs flex items-center gap-3">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-zinc-400 block font-semibold">
              ACCESS PASSWORD
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••••••"
              className="w-full bg-black border-2 border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0DFF72] transition-colors placeholder:text-zinc-700"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#0DFF72] text-black font-bold uppercase py-3.5 px-6 text-sm flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[4px_4px_0px_0px_#FFFFFF] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50"
          >
            <span>{isPending ? "VERIFYING..." : "ENTER DASHBOARD"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-zinc-900 text-center text-[10px] text-zinc-600 uppercase tracking-widest">
          RESTRICTED AREA // AUTHORIZED PERSONNEL ONLY
        </div>
      </div>
    </div>
  );
}
