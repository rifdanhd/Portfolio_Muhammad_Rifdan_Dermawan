"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

const socialLinks = [
  {
    href: "mailto:rifdandermawan252@gmail.com",
    icon: <Mail className="w-4 h-4 text-orange-500" />,
    label: "Email",
    value: "rifdandermawan252@gmail.com",
  },
  {
    href: "https://github.com/rifdanhd",
    icon: <Github className="w-4 h-4 text-orange-500" />,
    label: "GitHub",
    value: "github.com/rifdanhd",
  },
  {
    href: "https://linkedin.com/in/muhammad-rifdan-dermawan-1532a7388",
    icon: <Linkedin className="w-4 h-4 text-orange-500" />,
    label: "LinkedIn",
    value: "linkedin.com/in/muhammad-rifdan...",
  },
  {
    href: "https://instagram.com/idanderrrrr",
    icon: <Instagram className="w-4 h-4 text-orange-500" />,
    label: "Instagram",
    value: "@idanderrrrr",
  },
];

export default function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({ type: "success", msg: t.contact.successMsg });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", msg: data.error || t.contact.errorMsg });
      }
    } catch {
      setStatus({ type: "error", msg: "Network error. Please email rifdandermawan252@gmail.com directly." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-background border-b border-zinc-200/80 dark:border-zinc-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="studio-badge text-orange-600 dark:text-orange-400">
            <Sparkles className="w-3 h-3" />
            <span>08 / GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-none text-foreground">
            {t.contact.heading}{" "}
            <span className="text-orange-gradient">
              {t.contact.headingHighlight}
            </span>
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 font-sans">
            {t.contact.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          
          {/* ── Left Column: Direct Links ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="studio-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold text-foreground">
                {t.contact.directChannels}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                {t.contact.directChannelsDesc}
              </p>

              <div className="space-y-3 font-mono text-xs">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-3.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100/40 dark:bg-zinc-900/60 text-foreground hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 shrink-0">
                      {link.icon}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-widest">{link.label}</span>
                      <span className="text-xs font-semibold truncate group-hover:text-orange-500 transition-colors">{link.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right Column: Input Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="studio-card p-6 sm:p-8 rounded-3xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-foreground">
                  {t.contact.sendMessage}
                </h3>

                {status && (
                  <div
                    className={`p-4 rounded-xl border font-mono text-xs flex items-center gap-3 ${
                      status.type === "success"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-500 border-rose-500/30"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    )}
                    <span>{status.msg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-semibold text-foreground uppercase tracking-wider">{t.contact.nameLabel}</label>
                    <Input
                      required
                      placeholder={t.contact.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-zinc-100/50 dark:bg-zinc-900/80 border border-zinc-300/80 dark:border-zinc-800 text-foreground placeholder:text-zinc-400 font-sans text-xs rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-orange-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-semibold text-foreground uppercase tracking-wider">{t.contact.emailLabel}</label>
                    <Input
                      required
                      type="email"
                      placeholder={t.contact.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-zinc-100/50 dark:bg-zinc-900/80 border border-zinc-300/80 dark:border-zinc-800 text-foreground placeholder:text-zinc-400 font-sans text-xs rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-semibold text-foreground uppercase tracking-wider">{t.contact.subjectLabel}</label>
                  <Input
                    required
                    placeholder={t.contact.subjectPlaceholder}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-zinc-100/50 dark:bg-zinc-900/80 border border-zinc-300/80 dark:border-zinc-800 text-foreground placeholder:text-zinc-400 font-sans text-xs rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-orange-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-semibold text-foreground uppercase tracking-wider">{t.contact.messageLabel}</label>
                  <Textarea
                    required
                    rows={5}
                    placeholder={t.contact.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-zinc-100/50 dark:bg-zinc-900/80 border border-zinc-300/80 dark:border-zinc-800 text-foreground placeholder:text-zinc-400 font-sans text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-orange-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-orange-600 text-white hover:bg-orange-500 font-mono font-semibold text-xs uppercase tracking-widest h-12 shadow-md transition-all"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      <span>{t.contact.submitBtn}</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}