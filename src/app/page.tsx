import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="ra-gradient text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Rapid<span className="text-orange-400">Assur</span> Copilote
          </h1>
          <p className="text-xl text-blue-100 mb-2 font-light">
            Le cerveau prescriptif du courtier en assurance dommages
          </p>
          <p className="text-base text-blue-200 mb-10 max-w-2xl mx-auto">
            Automatisez vos soumissions. Libérez 75% de votre temps BMS.
            Concentrez-vous sur le conseil à haute valeur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/soumission"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Construis ta prime →
            </Link>
            <Link
              href="/internal/dashboard"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg border border-white/30 transition-colors"
            >
              Espace courtier
            </Link>
          </div>
        </div>
      </section>

      {/* SECTEURS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-3">
            10 secteurs couverts
          </h2>
          <p className="text-center text-slate-500 mb-12">
            De la construction à l&apos;agriculture — un formulaire intelligent par secteur
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {SECTEURS.map((s) => (
              <div
                key={s.nom}
                className="ra-card text-center hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="text-3xl mb-2">{s.emoji}</div>
                <div className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                  {s.nom}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-1">75-85%</div>
            <div className="text-slate-600">du temps BMS libéré</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-500 mb-1">22 500$</div>
            <div className="text-slate-600">ROI annuel / courtier</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-1">&lt; 3 mois</div>
            <div className="text-slate-600">payback garanti</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-6 text-center text-sm">
        <p className="text-white font-semibold mb-1">RapidAssur Copilote v3.0</p>
        <p>Erick de Carufel · erick.decarufel@rapidassur.com · 514-622-2163</p>
        <p className="mt-3 text-slate-600">
          © {new Date().getFullYear()} RapidAssur — Tous droits réservés
        </p>
      </footer>
    </main>
  );
}

const SECTEURS = [
  { nom: 'Construction', emoji: '🏗️' },
  { nom: 'Flotte', emoji: '🚛' },
  { nom: 'Immobilier', emoji: '🏢' },
  { nom: 'Professionnel', emoji: '💼' },
  { nom: 'Commercial', emoji: '🏪' },
  { nom: 'Hospitalité', emoji: '🏨' },
  { nom: 'Fabrication', emoji: '🏭' },
  { nom: 'Agricole', emoji: '🌾' },
  { nom: 'Santé', emoji: '🏥' },
  { nom: 'Sécurité', emoji: '🛡️' },
];
