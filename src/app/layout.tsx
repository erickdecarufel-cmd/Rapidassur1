import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-[#030712] text-white font-sans antialiased">
        
        {/* HEADER */}
        <header className="sticky top-0 z-50 w-full border-b border-white/10" style={{ backgroundColor: 'rgba(3,7,18,0.90)', backdropFilter: 'blur(18px)' }}>
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="url(#shield-grad)">
                <defs>
                  <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0F3460" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                </defs>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>
                <span className="text-white">Rapid</span>
                <span className="text-[#2563EB]">Assur</span>
                <span className="font-normal text-gray-300"> Copilote</span>
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
              <Link href="/#secteurs" className="hover:text-white transition-colors">Spécialités</Link>
              <Link href="/internal/dashboard" className="hover:text-white transition-colors">Cockpit</Link>
              <Link href="/extraction" className="hover:text-white transition-colors">Extraction IA</Link>
            </nav>

            {/* Phone */}
            <div className="font-bold text-[#E9711C]">
              📞 514-622-2163
            </div>
          </div>
        </header>

        {/* CONTENU PRINCIPAL */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-[#070d1a] border-t border-white/10 py-12 text-sm text-gray-400">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Col 1 */}
            <div>
              <div className="flex items-center gap-2 font-bold text-lg mb-4 text-white">
                <span className="text-white">Rapid</span>
                <span className="text-[#2563EB]">Assur</span>
              </div>
              <p>RapidAssur Copilote v3.0</p>
              <p className="mt-2">Votre copilote en assurance de niche, tous métiers, au Québec.</p>
            </div>
            {/* Col 2 */}
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-white mb-2">Navigation</h4>
              <Link href="/#construis" className="hover:text-[#E9711C] transition-colors">Construis ta prime</Link>
              <Link href="/internal/dashboard" className="hover:text-[#E9711C] transition-colors">Espace courtier</Link>
              <Link href="/extraction" className="hover:text-[#E9711C] transition-colors">Extraction IA</Link>
            </div>
            {/* Col 3 */}
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-white mb-2">Contact</h4>
              <p>Erick de Carufel</p>
              <p>erick.decarufel@rapidassur.com</p>
              <p>514-622-2163</p>
            </div>
          </div>
          <div className="container mx-auto px-4 pt-8 border-t border-white/10 text-center flex flex-col gap-2">
            <p>© 2026 RapidAssur — Tous droits réservés</p>
            <p className="text-xs text-gray-500">⚠ Les analyses IA sont des suggestions — toujours valider avec un courtier certifié.</p>
          </div>
        </footer>

      </body>
    </html>
  );
}