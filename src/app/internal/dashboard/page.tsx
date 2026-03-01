'use client';

import { useState } from 'react';
import Link from 'next/link';

// ─── Types ───────────────────────────────────────────────────────────────────
type SubmissionStatus = 'recue' | 'en_traitement' | 'completee' | 'redirigee';

interface KPICard {
  id: string; label: string; value: string;
  delta: string; deltaPositive: boolean; icon: string; accentColor: string;
}
interface JotFormSector {
  name: string; formId: string; fields: number;
  icon: string; formUrl: string; description: string;
}
interface RecentSubmission {
  id: string; company: string; sector: string;
  date: string; status: SubmissionStatus; score: number;
}

// ─── Données ─────────────────────────────────────────────────────────────────
const KPI_METRICS: KPICard[] = [
  { id: 'soumissions', label: 'Soumissions ce mois', value: '47', delta: '+12% vs mois dernier', deltaPositive: true, icon: '📋', accentColor: '#2563EB' },
  { id: 'traitement',  label: 'En traitement',       value: '8',  delta: '3 prioritaires',        deltaPositive: false, icon: '⏳', accentColor: '#E9711C' },
  { id: 'completees',  label: 'Dossiers complétés',  value: '39', delta: '+18% vs mois dernier', deltaPositive: true,  icon: '✅', accentColor: '#22c55e' },
  { id: 'conversion',  label: 'Taux de conversion',  value: '83%',delta: '+5% vs mois dernier',  deltaPositive: true,  icon: '📈', accentColor: '#2563EB' },
  { id: 'heures',      label: 'Heures économisées',  value: '127h',delta: 'Ce mois · 75% du BMS', deltaPositive: true,  icon: '⚡', accentColor: '#E9711C' },
  { id: 'roi',         label: 'ROI estimé annuel',   value: '22 500$', delta: 'Payback < 3 mois', deltaPositive: true, icon: '💰', accentColor: '#22c55e' },
];

const JOTFORM_SECTORS: JotFormSector[] = [
  { name: 'Construction',  formId: '260507298912260', fields: 208, icon: '🏗️', formUrl: 'https://form.jotform.com/260507298912260', description: 'Entrepreneurs généraux, RBQ, sous-traitants' },
  { name: 'Flotte',        formId: '260512085208248', fields: 187, icon: '🚛', formUrl: 'https://form.jotform.com/260512085208248', description: 'Véhicules commerciaux, transport' },
  { name: 'Immobilier',    formId: '260512137678257', fields: 190, icon: '🏢', formUrl: 'https://form.jotform.com/260512137678257', description: 'Immeubles, copropriétés, locatifs' },
  { name: 'Professionnel', formId: '260512255889262', fields: 252, icon: '⚖️', formUrl: 'https://form.jotform.com/260512255889262', description: 'RC, E&O, fautes professionnelles' },
  { name: 'Commercial',    formId: '260522507223043', fields: 99,  icon: '🏪', formUrl: 'https://form.jotform.com/260522507223043', description: 'Commerces, bureaux, services' },
  { name: 'Hospitalité',   formId: '260522506728052', fields: 75,  icon: '🏨', formUrl: 'https://form.jotform.com/260522506728052', description: 'Hôtels, restaurants, hébergement' },
  { name: 'Fabrication',   formId: '260522561165048', fields: 84,  icon: '🏭', formUrl: 'https://form.jotform.com/260522561165048', description: 'Manufacturiers, usines, produits' },
  { name: 'Agricole',      formId: '260523334001036', fields: 88,  icon: '🌾', formUrl: 'https://form.jotform.com/260523334001036', description: 'Fermes, équipements, récoltes' },
  { name: 'Santé',         formId: '260523349099059', fields: 78,  icon: '🏥', formUrl: 'https://form.jotform.com/260523349099059', description: 'Cliniques, praticiens, services' },
  { name: 'Sécurité',      formId: '260522729700049', fields: 56,  icon: '🔒', formUrl: 'https://form.jotform.com/260522729700049', description: 'Gardiennage, surveillance, alarmes' },
];

const RECENT_SUBMISSIONS: RecentSubmission[] = [
  { id: 'RA-2026-047', company: 'Construction Métro Inc.',    sector: 'Construction',  date: '2026-02-28', status: 'en_traitement', score: 87 },
  { id: 'RA-2026-046', company: 'Flotte Express SENC',        sector: 'Flotte',        date: '2026-02-27', status: 'completee',     score: 92 },
  { id: 'RA-2026-045', company: 'Immeubles Laurentien',       sector: 'Immobilier',    date: '2026-02-27', status: 'completee',     score: 78 },
  { id: 'RA-2026-044', company: 'Cabinet Tremblay Avocats',   sector: 'Professionnel', date: '2026-02-26', status: 'redirigee',     score: 45 },
  { id: 'RA-2026-043', company: 'Resto Le Vieux-Moulin',      sector: 'Hospitalité',   date: '2026-02-25', status: 'recue',         score: 0  },
];

const STATUS_CFG = {
  recue:         { label: 'Reçue',         bg: 'bg-blue-500/20',   text: 'text-blue-400' },
  en_traitement: { label: 'En traitement', bg: 'bg-orange-500/20', text: 'text-orange-400' },
  completee:     { label: 'Complétée',     bg: 'bg-green-500/20',  text: 'text-green-400' },
  redirigee:     { label: 'Redirigée',     bg: 'bg-slate-500/20',  text: 'text-slate-400' },
};

const OUTILS_INTERNES = [
  { href: '/internal/analyse-renouvellements', icon: '🔄', label: 'Renouvellements', desc: 'Analyse dossiers à risque' },
  { href: '/internal/outils/cope-evaluation',  icon: '🏗️', label: 'COPE Évaluation',  desc: 'Construction, occupants, protection, exposition' },
  { href: '/internal/outils',                  icon: '🛠️', label: 'Outils IA',         desc: 'Extracteur, calculateurs' },
  { href: '/extraction',                        icon: '🤖', label: 'Extracteur IA',     desc: 'Analyse documents PDF' },
  { href: '/guides',                            icon: '📖', label: 'Guides',            desc: 'Soumissions par type de risque' },
  { href: '/internal/propositions-nouvelles-affaires', icon: '📋', label: 'Propositions', desc: 'Nouvelles affaires' },
];

// ─── Sous-composants ─────────────────────────────────────────────────────────
function KPIItem({ card }: { card: KPICard }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border p-5 transition-all duration-200 hover:scale-[1.02] cursor-default"
      style={{ background: 'rgba(15,52,96,0.2)', borderColor: 'rgba(37,99,235,0.2)', backdropFilter: 'blur(12px)' }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 pointer-events-none"
        style={{ background: card.accentColor, transform: 'translate(30%,-30%)' }} />
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{card.icon}</span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${card.deltaPositive ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
          {card.deltaPositive ? '↑' : '⚠️'} {card.delta}
        </span>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
      <div className="text-sm text-slate-400">{card.label}</div>
    </div>
  );
}

function SectorCard({ s }: { s: JotFormSector }) {
  return (
    <a href={s.formUrl} target="_blank" rel="noopener noreferrer"
      className="group flex flex-col gap-2 rounded-xl border p-4 transition-all duration-200 hover:scale-[1.04]"
      style={{ background: 'rgba(15,52,96,0.15)', borderColor: 'rgba(37,99,235,0.15)' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xl">{s.icon}</span>
        <span className="text-xs text-slate-500">{s.fields} champs</span>
      </div>
      <div className="font-semibold text-white text-sm">{s.name}</div>
      <div className="text-xs text-slate-500 leading-tight">{s.description}</div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">actif</span>
        <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">Ouvrir →</span>
      </div>
    </a>
  );
}

function OutilCard({ href, icon, label, desc }: { href: string; icon: string; label: string; desc: string }) {
  return (
    <Link href={href}
      className="group flex items-center gap-3 rounded-xl border p-4 transition-all duration-200 hover:scale-[1.02]"
      style={{ background: 'rgba(15,52,96,0.15)', borderColor: 'rgba(37,99,235,0.15)' }}
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">{label}</div>
        <div className="text-xs text-slate-500">{desc}</div>
      </div>
      <span className="ml-auto text-slate-600 group-hover:text-blue-400 transition-colors text-lg">→</span>
    </Link>
  );
}

function getScoreBadge(score: number) {
  if (score === 0) return { label: 'N/A', color: 'text-slate-500' };
  if (score >= 80)  return { label: score + '%', color: 'text-green-400' };
  if (score >= 60)  return { label: score + '%', color: 'text-orange-400' };
  return { label: score + '%', color: 'text-red-400' };
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<'tous' | SubmissionStatus>('tous');

  const today = new Date().toLocaleDateString('fr-CA', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const filtered = activeFilter === 'tous'
    ? RECENT_SUBMISSIONS
    : RECENT_SUBMISSIONS.filter((s) => s.status === activeFilter);

  const filterLabels: Record<string, string> = {
    tous: 'Tous', recue: 'Reçue', en_traitement: 'En traitement',
    completee: 'Complétée', redirigee: 'Redirigée',
  };

  return (
    <div className="min-h-screen" style={{ background: '#030712' }}>

      {/* ── Barre de navigation interne ── */}
      <nav className="sticky top-0 z-40 border-b flex items-center justify-between px-6 py-3"
        style={{ background: 'rgba(3,7,18,0.95)', borderColor: 'rgba(37,99,235,0.2)', backdropFilter: 'blur(16px)' }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-bold" style={{ color: '#E9711C' }}>
            RapidAssur
          </Link>
          <span className="text-slate-700">›</span>
          <Link href="/internal" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
            Clic+Pro
          </Link>
          <span className="text-slate-700">›</span>
          <span className="text-sm text-white font-medium">Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://app.jotform.com" target="_blank" rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
            style={{ background: 'rgba(37,99,235,0.15)', color: '#93c5fd', border: '1px solid rgba(37,99,235,0.3)' }}>
            🎛️ Cockpit JotForm
          </a>
          <Link href="/internal/propositions-nouvelles-affaires"
            className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all hover:opacity-90"
            style={{ background: '#E9711C', color: '#fff' }}>
            + Nouvelle soumission
          </Link>
        </div>
      </nav>

      <div className="p-6 md:p-8 max-w-screen-2xl mx-auto">

        {/* ── En-tête ── */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">
            Bonjour, <span style={{ color: '#E9711C' }}>Erick</span> 👋
          </h1>
          <p className="text-slate-400 text-sm capitalize">{today}</p>
          <p className="text-slate-700 text-xs mt-0.5">RapidAssur Copilote 2.1 — Espace courtier privé</p>
        </header>

        {/* ── KPIs ── */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            Performance — Février 2026
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {KPI_METRICS.map((card) => <KPIItem key={card.id} card={card} />)}
          </div>
        </section>

        {/* ── Layout 2 colonnes ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">

          {/* Colonne gauche — Outils internes (2/3) */}
          <div className="xl:col-span-2 space-y-8">

            {/* 10 Secteurs JotForm */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  10 Secteurs — Formulaires JotForm actifs
                </h2>
                <span className="text-xs text-slate-700">1 317 champs · 3 couches fonctionnelles</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {JOTFORM_SECTORS.map((s) => <SectorCard key={s.formId} s={s} />)}
              </div>
            </section>

            {/* Soumissions récentes */}
            <section>
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(37,99,235,0.2)' }}>
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                  style={{ background: 'rgba(15,52,96,0.3)', borderBottom: '1px solid rgba(37,99,235,0.2)' }}>
                  <h2 className="text-sm font-semibold text-white">Soumissions récentes</h2>
                  <div className="flex flex-wrap gap-2">
                    {(['tous', 'recue', 'en_traitement', 'completee', 'redirigee'] as const).map((f) => (
                      <button key={f} onClick={() => setActiveFilter(f)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          activeFilter === f ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'
                        }`}>
                        {filterLabels[f]}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ background: 'rgba(3,7,18,0.85)' }}>
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(37,99,235,0.15)' }}>
                        {['ID', 'Entreprise', 'Secteur', 'Date', 'Statut', 'Score'].map((h) => (
                          <th key={h} className="px-5 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((sub, i) => {
                        const sc = STATUS_CFG[sub.status];
                        const badge = getScoreBadge(sub.score);
                        return (
                          <tr key={sub.id} className="transition-colors hover:bg-white/[0.03]"
                            style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(37,99,235,0.1)' : 'none' }}>
                            <td className="px-5 py-4 text-xs font-mono text-blue-400 whitespace-nowrap">{sub.id}</td>
                            <td className="px-5 py-4 text-sm text-white font-medium">{sub.company}</td>
                            <td className="px-5 py-4 text-sm text-slate-400">{sub.sector}</td>
                            <td className="px-5 py-4 text-sm text-slate-500 whitespace-nowrap">{sub.date}</td>
                            <td className="px-5 py-4">
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${sc.bg} ${sc.text}`}>{sc.label}</span>
                            </td>
                            <td className={`px-5 py-4 text-sm font-bold ${badge.color}`}>{badge.label}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {filtered.length === 0 && (
                    <div className="px-5 py-10 text-center text-slate-600 text-sm">Aucune soumission dans cette catégorie</div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Colonne droite — Outils rapides (1/3) */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                Outils Clic+Pro
              </h2>
              <div className="space-y-3">
                {OUTILS_INTERNES.map((o) => (
                  <OutilCard key={o.href} href={o.href} icon={o.icon} label={o.label} desc={o.desc} />
                ))}
              </div>
            </section>

            {/* Rappel architecture */}
            <section className="rounded-xl border p-5 space-y-3"
              style={{ background: 'rgba(15,52,96,0.15)', borderColor: 'rgba(37,99,235,0.15)' }}>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Architecture</h3>
              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <span>JotForm = moteur de collecte</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <span>Gemini = scoring IA</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <span>PDF → Epic BMS (aucune donnée stockée)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-500 shrink-0" />
                  <span>Conservé : courriel + opt-in Loi 25</span>
                </div>
              </div>
            </section>

            {/* Contact rapide */}
            <section className="rounded-xl border p-5"
              style={{ background: 'rgba(233,113,28,0.08)', borderColor: 'rgba(233,113,28,0.2)' }}>
              <h3 className="text-xs font-semibold text-orange-500/70 uppercase tracking-widest mb-3">Contact courtier</h3>
              <p className="text-sm font-semibold text-white mb-1">Erick de Carufel</p>
              <p className="text-xs text-slate-500 mb-3">Courtier en assurance dommages des entreprises · 30 ans d&apos;expérience</p>
              <a href="tel:5146222163"
                className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors">
                📞 514-622-2163
              </a>
              <a href="mailto:erick.decarufel@rapidassur.com"
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-400 transition-colors mt-1">
                ✉️ erick.decarufel@rapidassur.com
              </a>
            </section>
          </div>
        </div>

        {/* ── Pied de page ── */}
        <footer className="text-center pt-4 border-t" style={{ borderColor: 'rgba(37,99,235,0.1)' }}>
          <p className="text-xs text-slate-700">
            RapidAssur Copilote 2.1 · Conserve uniquement courriel + consentement Loi 25
            · Tout le reste → PDF → Epic BMS · Erick de Carufel · 514-622-2163
          </p>
        </footer>

      </div>
    </div>
  );
}
