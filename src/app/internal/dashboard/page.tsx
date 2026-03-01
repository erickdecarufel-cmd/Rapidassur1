'use client';

import { useState } from 'react';
import Link from 'next/link';

// Types
type SubmissionStatus = 'recue' | 'en_traitement' | 'completee' | 'redirigee';

interface KPICard {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  icon: string;
  accentColor: string;
}

interface JotFormSector {
  name: string;
  formId: string;
  fields: number;
  icon: string;
  formUrl: string;
  description: string;
}

interface RecentSubmission {
  id: string;
  company: string;
  sector: string;
  date: string;
  status: SubmissionStatus;
  score: number;
}

const KPI_METRICS: KPICard[] = [
  { id: 'soumissions', label: 'Soumissions ce mois', value: '47', delta: '+12% vs mois dernier', deltaPositive: true, icon: '📋', accentColor: '#2563EB' },
  { id: 'traitement', label: 'En traitement', value: '8', delta: '3 prioritaires', deltaPositive: false, icon: '⏳', accentColor: '#E9711C' },
  { id: 'completees', label: 'Dossiers complétés', value: '39', delta: '+18% vs mois dernier', deltaPositive: true, icon: '✅', accentColor: '#22c55e' },
  { id: 'conversion', label: 'Taux de conversion', value: '83%', delta: '+5% vs mois dernier', deltaPositive: true, icon: '📈', accentColor: '#2563EB' },
  { id: 'heures', label: 'Heures économisées', value: '127h', delta: 'Ce mois • 75% du BMS', deltaPositive: true, icon: '⚡', accentColor: '#E9711C' },
  { id: 'roi', label: 'ROI estimé', value: '22 500$', delta: 'Annuel par courtier', deltaPositive: true, icon: '💰', accentColor: '#22c55e' },
];

const JOTFORM_SECTORS: JotFormSector[] = [
  { name: 'Construction', formId: '260507298912260', fields: 208, icon: '🏗️', formUrl: 'https://form.jotform.com/260507298912260', description: 'Entrepreneurs généraux, RBQ, sous-traitants' },
  { name: 'Flotte', formId: '260512085208248', fields: 187, icon: '🚛', formUrl: 'https://form.jotform.com/260512085208248', description: 'Véhicules commerciaux, transport marchandises' },
  { name: 'Immobilier', formId: '260512137678257', fields: 190, icon: '🏢', formUrl: 'https://form.jotform.com/260512137678257', description: 'Immeubles, copropriétés, locatifs' },
  { name: 'Professionnel', formId: '260512255889262', fields: 252, icon: '⚖️', formUrl: 'https://form.jotform.com/260512255889262', description: 'Fautes professionnelles, RC, E&O' },
  { name: 'Commercial', formId: '260522507223043', fields: 99, icon: '🏪', formUrl: 'https://form.jotform.com/260522507223043', description: 'Commerces de détail, bureaux, services' },
  { name: 'Hospitalité', formId: '260522506728052', fields: 75, icon: '🏨', formUrl: 'https://form.jotform.com/260522506728052', description: 'Hôtels, restaurants, bars, hébergement' },
  { name: 'Fabrication', formId: '260522561165048', fields: 84, icon: '🏭', formUrl: 'https://form.jotform.com/260522561165048', description: 'Manufacturiers, usines, produits' },
  { name: 'Agricole', formId: '260523334001036', fields: 88, icon: '🌾', formUrl: 'https://form.jotform.com/260523334001036', description: 'Fermes, équipements agricoles, récoltes' },
  { name: 'Santé', formId: '260523349099059', fields: 78, icon: '🏥', formUrl: 'https://form.jotform.com/260523349099059', description: 'Cliniques, praticiens, services santé' },
  { name: 'Sécurité', formId: '260522729700049', fields: 56, icon: '🔒', formUrl: 'https://form.jotform.com/260522729700049', description: 'Gardiennage, surveillance, alarmes' },
];

const RECENT_SUBMISSIONS: RecentSubmission[] = [
  { id: 'RA-2026-047', company: 'Construction Métro Inc.', sector: 'Construction', date: '2026-02-28', status: 'en_traitement', score: 87 },
  { id: 'RA-2026-046', company: 'Flotte Express SENC', sector: 'Flotte', date: '2026-02-27', status: 'completee', score: 92 },
  { id: 'RA-2026-045', company: 'Immeubles Laurentien', sector: 'Immobilier', date: '2026-02-27', status: 'completee', score: 78 },
  { id: 'RA-2026-044', company: 'Cabinet Tremblay Avocats', sector: 'Professionnel', date: '2026-02-26', status: 'redirigee', score: 45 },
  { id: 'RA-2026-043', company: 'Resto Le Vieux-Moulin', sector: 'Hospitalité', date: '2026-02-25', status: 'recue', score: 0 },
];

const STATUS_CONFIG = {
  recue: { label: 'Reçue', bg: 'bg-blue-500/20', text: 'text-blue-400' },
  en_traitement: { label: 'En traitement', bg: 'bg-orange-500/20', text: 'text-orange-400' },
  completee: { label: 'Complétée', bg: 'bg-green-500/20', text: 'text-green-400' },
  redirigee: { label: 'Redirigée', bg: 'bg-slate-500/20', text: 'text-slate-400' },
};

function getScoreBadge(score: number) {
  if (score === 0) return { label: 'N/A', color: 'text-slate-500' };
  if (score >= 80) return { label: score + '%', color: 'text-green-400' };
  if (score >= 60) return { label: score + '%', color: 'text-orange-400' };
  return { label: score + '%', color: 'text-red-400' };
}

function KPICardItem({ card }: { card: KPICard }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border p-5 transition-all duration-200 hover:scale-[1.02]"
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

function SectorCard({ sector }: { sector: JotFormSector }) {
  return (
    <a href={sector.formUrl} target="_blank" rel="noopener noreferrer"
      className="group flex flex-col gap-2 rounded-xl border p-4 transition-all duration-200 hover:scale-[1.04]"
      style={{ background: 'rgba(15,52,96,0.15)', borderColor: 'rgba(37,99,235,0.15)' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xl">{sector.icon}</span>
        <span className="text-xs text-slate-500">{sector.fields} champs</span>
      </div>
      <div className="font-semibold text-white text-sm">{sector.name}</div>
      <div className="text-xs text-slate-500 leading-tight">{sector.description}</div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">actif</span>
        <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">Ouvrir →</span>
      </div>
    </a>
  );
}

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<'tous' | SubmissionStatus>('tous');

  const today = new Date().toLocaleDateString('fr-CA', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const filteredSubmissions = activeFilter === 'tous'
    ? RECENT_SUBMISSIONS
    : RECENT_SUBMISSIONS.filter((s) => s.status === activeFilter);

  const filterLabels: Record<string, string> = {
    tous: 'Tous', recue: 'Reçue', en_traitement: 'En traitement',
    completee: 'Complétée', redirigee: 'Redirigée',
  };

  return (
    <div className="min-h-screen p-6 md:p-8" style={{ background: '#030712' }}>

      {/* En-tête */}
      <header className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Bonjour, <span style={{ color: '#E9711C' }}>Erick</span> 👋
            </h1>
            <p className="text-slate-400 text-sm capitalize">{today}</p>
            <p className="text-slate-600 text-xs mt-1">RapidAssur Copilote v3.0 — Espace courtier</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link href="/internal/propositions-nouvelles-affaires"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: '#E9711C' }}>
              + Nouvelle soumission
            </Link>
            <a href="tel:5146222163"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-[1.02]"
              style={{ color: '#60a5fa', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)' }}>
              📞 514-622-2163
            </a>
          </div>
        </div>
      </header>

      {/* KPIs */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
          Performance — Février 2026
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {KPI_METRICS.map((card) => <KPICardItem key={card.id} card={card} />)}
        </div>
      </section>

      {/* Actions rapides */}
      <section className="mb-8">
        <div className="rounded-xl border p-4 flex flex-wrap items-center gap-3"
          style={{ background: 'rgba(15,52,96,0.2)', borderColor: 'rgba(37,99,235,0.2)' }}>
          <span className="text-sm font-semibold text-slate-300 mr-1">Actions rapides :</span>
          <Link href="/internal/propositions-nouvelles-affaires"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:opacity-90"
            style={{ background: 'rgba(37,99,235,0.2)', color: '#93c5fd', border: '1px solid rgba(37,99,235,0.3)' }}>
            📋 Nouvelle soumission
          </Link>
          <Link href="/extraction"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:opacity-90"
            style={{ background: 'rgba(233,113,28,0.15)', color: '#fb923c', border: '1px solid rgba(233,113,28,0.3)' }}>
            🤖 Extracteur IA
          </Link>
          <button onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:opacity-90"
            style={{ background: 'rgba(34,197,94,0.15)', color: '#86efac', border: '1px solid rgba(34,197,94,0.3)' }}>
            📊 Rapport mensuel
          </button>
          <a href="https://app.jotform.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:opacity-90"
            style={{ background: 'rgba(15,52,96,0.3)', color: '#94a3b8', border: '1px solid rgba(37,99,235,0.2)' }}>
            🎛️ Cockpit JotForm
          </a>
        </div>
      </section>

      {/* 10 Secteurs */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            10 Secteurs — Formulaires JotForm
          </h2>
          <span className="text-xs text-slate-600">1 317 champs • 3 couches fonctionnelles</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {JOTFORM_SECTORS.map((sector) => <SectorCard key={sector.formId} sector={sector} />)}
        </div>
      </section>

      {/* Soumissions récentes */}
      <section className="mb-8">
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
                {filteredSubmissions.map((sub, i) => {
                  const sc = STATUS_CONFIG[sub.status];
                  const badge = getScoreBadge(sub.score);
                  return (
                    <tr key={sub.id} className="transition-colors hover:bg-white/[0.03]"
                      style={{ borderBottom: i < filteredSubmissions.length - 1 ? '1px solid rgba(37,99,235,0.1)' : 'none' }}>
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
            {filteredSubmissions.length === 0 && (
              <div className="px-5 py-10 text-center text-slate-600 text-sm">Aucune soumission dans cette catégorie</div>
            )}
          </div>
        </div>
      </section>

      {/* Note architecture */}
      <footer className="text-center">
        <p className="text-xs text-slate-700">
          RapidAssur conserve uniquement le courriel + consentement Loi 25
          · Tout le reste → PDF → Epic BMS · Erick de Carufel · 514-622-2163
        </p>
      </footer>
    </div>
  );
}