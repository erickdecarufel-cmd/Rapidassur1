import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'RapidAssur Copilote',
    template: '%s | RapidAssur',
  },
  description:
    'RapidAssur Copilote — La plateforme SaaS de courtage augmenté par IA pour courtiers en assurance dommages des entreprises.',
  keywords: [
    'assurance entreprise',
    'courtier assurance',
    'assurance commerciale',
    'assurance construction',
    'RapidAssur',
    'Quebec',
  ],
  authors: [{ name: 'Erick de Carufel', url: 'https://rapidassur.com' }],
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: 'https://rapidassur.com',
    siteName: 'RapidAssur Copilote',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-slate-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
