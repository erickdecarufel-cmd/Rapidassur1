'use client';

import Link from 'next/link';

function NavLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
      style={{
        color: '#94a3b8',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(37,99,235,0.15)';
        (e.currentTarget as HTMLElement).style.color = '#e2e8f0';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'transparent';
        (e.currentTarget as HTMLElement).style.color = '#94a3b8';
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen" style={{ background: '#030712' }}>

      {/* ── Sidebar ── */}
      <aside
        className="fixed left-0 top-0 h-full w-64 flex flex-col z-40 border-r"
        style={{
          background: 'rgba(3,7,18,0.95)',
          borderColor: 'rgba(37,99,235,0.15)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Logo */}
        <div
          className="px-5 py-5 border-b"
          style={{ borderColor: 'rgba(37,99,235,0.15)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #0F3460 0%, #2563EB 100%)' }}
            >
              RA
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight">RapidAssur</div>
              <div className="text-xs" style={{ color: '#E9711C' }}>
                Copilote v3.0
              </div>
            </div>
          </div>
        </div>

        {/* Navigation principale */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-600">
              Espace courtier
            </span>
          </div>
          <NavLink href="/internal/dashboard" label="Tableau de bord" icon="📊" />
          <NavLink href="/internal/propositions-nouvelles-affaires" label="Nouvelle soumission" icon="📋" />
          <NavLink href="/internal/soumissions" label="Soumissions" icon="📂" />
          <NavLink href="/internal/clients" label="Clients" icon="👥" />

          <div className="px-3 pt-4 pb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-600">
              Outils IA
            </span>
          </div>
          <NavLink href="/extraction" label="Extracteur IA" icon="🤖" />
          <NavLink href="https://app.jotform.com" label="Cockpit JotForm" icon="🎛️" />
        </nav>

        {/* Footer sidebar */}
        <div
          className="px-4 py-4 border-t"
          style={{ borderColor: 'rgba(37,99,235,0.15)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: '#E9711C' }}
            >
              ED
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-300 truncate">
                Erick de Carufel
              </div>
              <div className="text-xs text-slate-600 truncate">514-622-2163</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Contenu principal ── */}
      <main className="flex-1 ml-64 min-h-screen" style={{ background: '#030712' }}>
        {children}
      </main>
    </div>
  );
}
