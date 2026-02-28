import Link from 'next/link';

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-700">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              Rapid<span className="text-orange-400">Assur</span>
            </span>
          </Link>
          <div className="text-xs text-slate-400 mt-1">Espace courtier v3.0</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavLink href="/internal/dashboard" label="🏠 Tableau de bord" />
          <NavLink href="/internal/propositions-nouvelles-affaires" label="📋 Nouvelles affaires" />
          <NavLink href="/internal/soumissions" label="📁 Soumissions" />
          <NavLink href="/internal/clients" label="👤 Clients" />

          <div className="pt-4 pb-2 text-xs text-slate-500 uppercase tracking-wider px-2">
            Outils
          </div>
          <NavLink href="/internal/extracteur" label="🔍 Extracteur IA" />
          <NavLink href="/internal/cockpit" label="🎯 Cockpit JotForm" />
        </nav>

        {/* Footer sidebar */}
        <div className="px-6 py-4 border-t border-slate-700 text-xs text-slate-500">
          <div>Erick de Carufel</div>
          <div>514-622-2163</div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
    >
      {label}
    </Link>
  );
}
