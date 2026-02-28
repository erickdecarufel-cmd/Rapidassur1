export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Tableau de bord</h1>
        <p className="text-slate-500 mt-1">
          Bienvenue, Erick — RapidAssur Copilote v3.0
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {KPI_CARDS.map((kpi) => (
          <div key={kpi.label} className="ra-card">
            <div className="text-3xl mb-2">{kpi.icon}</div>
            <div className="text-2xl font-bold text-slate-800">{kpi.value}</div>
            <div className="text-sm text-slate-500 mt-1">{kpi.label}</div>
            {kpi.delta && (
              <div className="text-xs text-green-600 mt-1 font-medium">
                {kpi.delta}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="ra-card mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Actions rapides
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="/internal/propositions-nouvelles-affaires"
            className="ra-btn-primary text-sm"
          >
            + Nouvelle soumission
          </a>
          <button className="ra-btn-outline text-sm">📊 Rapport mensuel</button>
          <button className="ra-btn-outline text-sm">🔍 Extracteur IA</button>
        </div>
      </div>

      {/* Secteurs JotForm */}
      <div className="ra-card">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Formulaires JotForm — 10 secteurs
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {SECTEURS_JOTFORM.map((s) => (
            <div
              key={s.nom}
              className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors text-center"
            >
              <div className="text-2xl mb-1">{s.emoji}</div>
              <div className="text-xs font-semibold text-slate-700">{s.nom}</div>
              <div className="text-xs text-slate-400">{s.champs} champs</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const KPI_CARDS = [
  { icon: '📋', label: 'Soumissions ce mois', value: '—', delta: undefined },
  { icon: '✅', label: 'Dossiers complétés', value: '—', delta: undefined },
  { icon: '⏱️', label: 'Heures économisées', value: '—', delta: '+75%' },
  { icon: '💰', label: 'ROI estimé ($/mois)', value: '—', delta: undefined },
];

const SECTEURS_JOTFORM = [
  { nom: 'Construction', emoji: '🏗️', champs: 208 },
  { nom: 'Flotte', emoji: '🚛', champs: 187 },
  { nom: 'Immobilier', emoji: '🏢', champs: 190 },
  { nom: 'Professionnel', emoji: '💼', champs: 252 },
  { nom: 'Commercial', emoji: '🏪', champs: 99 },
  { nom: 'Hospitalité', emoji: '🏨', champs: 75 },
  { nom: 'Fabrication', emoji: '🏭', champs: 84 },
  { nom: 'Agricole', emoji: '🌾', champs: 88 },
  { nom: 'Santé', emoji: '🏥', champs: 78 },
  { nom: 'Sécurité', emoji: '🛡️', champs: 56 },
];
