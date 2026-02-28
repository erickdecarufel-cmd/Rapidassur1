import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'RapidAssur Copilote', template: '%s | RapidAssur' },
  description: 'RapidAssur Copilote — La plateforme SaaS de courtage augmenté par IA pour courtiers en assurance dommages des entreprises.',
  keywords: ['assurance entreprise', 'courtier assurance', 'assurance commerciale', 'assurance construction', 'RapidAssur', 'Quebec'],
  authors: [{ name: 'Erick de Carufel', url: 'https://rapidassur.com' }],
  openGraph: { type: 'website', locale: 'fr_CA', url: 'https://rapidassur.com', siteName: 'RapidAssur Copilote' },
};

function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center"
      style={{ background: 'rgba(3,7,18,0.90)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-white no-underline hover:opacity-90 transition-opacity">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
            <path d="M18 3L4 9v10c0 8.3 5.9 16.1 14 18 8.1-1.9 14-9.7 14-18V9L18 3z" fill="url(#hg1)" />
            <path d="M12 18l4 4 8-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="hg1" x1="4" y1="3" x2="32" y2="33" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0F3460" />
                <stop offset="1" stopColor="#2563EB" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-bold text-base tracking-tight">
            Rapid
            <span style={{ background: 'linear-gradient(90deg, #2563EB, #E9711C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Assur
            </span>{' '}
            <span style={{ fontWeight: 300, color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>Copilote</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            { href: '/#secteurs', label: 'Spécialités' },
            { href: '/internal/dashboard', label: 'Cockpit' },
            { href: '/extraction', label: 'Extraction IA' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Téléphone */}
        <a
          href="tel:5146222163"
          className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: '#E9711C' }}
        >
          📞 514-622-2163
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer
      className="py-14 px-6"
      style={{ background: '#070d1a', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
                <path d="M18 3L4 9v10c0 8.3 5.9 16.1 14 18 8.1-1.9 14-9.7 14-18V9L18 3z" fill="url(#fg1)" />
                <path d="M12 18l4 4 8-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="fg1" x1="4" y1="3" x2="32" y2="33" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0F3460" /><stop offset="1" stopColor="#2563EB" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-white font-bold text-sm">RapidAssur Copilote v3.0</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Le cerveau prescriptif du courtier en assurance dommages des entreprises au Québec.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Navigation
            </p>
            {[
              { href: '/soumission', label: 'Construis ta prime' },
              { href: '/internal/dashboard', label: 'Espace courtier' },
              { href: '/extraction', label: 'Extraction IA' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block text-sm mb-2 transition-colors"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Contact
            </p>
            <p className="text-sm font-semibold text-white mb-1">Erick de Carufel</p>
            <a
              href="mailto:erick.decarufel@rapidassur.com"
              className="block text-sm mb-2 transition-colors"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              erick.decarufel@rapidassur.com
            </a>
            <a
              href="tel:5146222163"
              className="text-sm font-semibold transition-colors"
              style={{ color: '#E9711C' }}
            >
              514-622-2163
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row justify-between items-center gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} RapidAssur — Tous droits réservés
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
            ⚠️ Les analyses IA sont des suggestions — toujours valider avec un courtier certifié.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased" style={{ background: '#030712' }}>
        <Header />
        <div className="pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
