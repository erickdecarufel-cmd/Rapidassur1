import Link from 'next/link';

const SECTEURS = [
  { nom: 'Construction', emoji: '🏗️', desc: 'EG, sous-traitants, rénovation, projets' },
  { nom: 'Flotte', emoji: '🚛', desc: 'Camionneurs, flottes commerciales' },
  { nom: 'Immobilier', emoji: '🏢', desc: 'Placements, syndicats, gestion' },
  { nom: 'Professionnel', emoji: '💼', desc: 'Consultants, TI, services conseils' },
  { nom: 'Commercial', emoji: '🏪', desc: 'Commerces de détail, bureaux' },
  { nom: 'Hospitalité', emoji: '🏨', desc: 'Hôtels, restaurants, hébergement' },
  { nom: 'Fabrication', emoji: '🏭', desc: 'Manufacturiers, industries' },
  { nom: 'Agricole', emoji: '🌾', desc: 'Exploitants, serres, élevage' },
  { nom: 'Santé', emoji: '🏥', desc: 'Médecins, cliniques, soins' },
  { nom: 'Sécurité', emoji: '🛡️', desc: 'Gardiennage, surveillance' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ background: '#030712' }}>

      {/* ═══ HERO ═══ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 60% 20%, #0F3460 0%, #060d1b 55%, #030712 100%)' }}
      >
        {/* Grille de fond */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Lueurs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 75% 15%, rgba(233,113,28,0.22) 0%, transparent 45%), radial-gradient(circle at 20% 70%, rgba(37,99,235,0.15) 0%, transparent 45%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border"
            style={{ background: 'rgba(233,113,28,0.1)', borderColor: 'rgba(233,113,28,0.3)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#E9711C' }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#E9711C' }}>
              Courtier indépendant · Québec · 30 ans d&apos;expérience
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Le cerveau<br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(105deg, #E9711C 0%, #DC2626 60%, #E9711C 100%)' }}
            >
              prescriptif
            </span>{' '}du courtier
          </h1>

          <p className="text-lg mb-4 max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Automatisez vos soumissions. Libérez{' '}
            <strong className="text-white">75 à 85% de votre temps BMS</strong>.
            Concentrez-vous sur le conseil à haute valeur.
          </p>

          <p className="text-sm mb-10" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Construction · Flotte · Immobilier · Pro · Commercial · et 5 autres secteurs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/soumission"
              className="inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(180deg, #f0882e 0%, #E9711C 45%, #c95a0a 100%)',
                boxShadow: '0 6px 24px rgba(233,113,28,0.35)',
              }}
            >
              ⚡ Construis ta prime
            </Link>
            <Link
              href="/internal/dashboard"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.2)' }}
            >
              🎛️ Espace courtier
            </Link>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {['Réponse en 2h', '10 secteurs couverts', '9 000 courtiers ciblés', '100% indépendant'].map((t, i) => (
              <>
                {i > 0 && <span key={`sep-${i}`} style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>}
                <span key={t} className="flex items-center gap-1.5">
                  <span style={{ color: '#E9711C' }}>✓</span> {t}
                </span>
              </>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AVANT / APRÈS ═══ */}
      <section className="py-24 px-6" style={{ background: '#070d1a' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: '#E9711C' }}>
              Pourquoi RapidAssur
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              L&apos;assurance de niche,<br />
              <em
                className="not-italic text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #E9711C, #DC2626)' }}
              >
                ce n&apos;est pas un produit générique
              </em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <div className="flex items-center gap-2 font-bold text-sm mb-6" style={{ color: '#f87171' }}>
                ✕ Le vieux modèle BMS
              </div>
              {[
                'Remplir 60+ champs à la main dans Epic',
                'Attendre 3 jours pour une soumission',
                'Produit standard mal adapté au secteur',
                'Renouvellement par défaut, sans révision',
                'Aucune visibilité sur l\'appétit des assureurs',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 mb-3 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <span className="mt-0.5 flex-shrink-0" style={{ color: '#ef4444' }}>✕</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-8" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <div className="flex items-center gap-2 font-bold text-sm mb-6" style={{ color: '#4ade80' }}>
                ✓ Le modèle Copilote
              </div>
              {[
                'JotForm intelligent → PDF → Epic en 1 clic',
                'Soumission automatisée, réponse en 2h',
                'Protection calibrée pour le métier exact',
                'Analyse annuelle proactive des risques',
                'Routing intelligent vers le bon assureur',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 mb-3 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <span className="mt-0.5 flex-shrink-0" style={{ color: '#22c55e' }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COMMENT ÇA MARCHE — 3 ÉTAPES ═══ */}
      <section className="py-24 px-6" style={{ background: '#030712' }}>
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: '#60a5fa' }}>
            Comment ça marche
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 leading-tight">
            De zéro à couvert :<br />
            <em className="not-italic" style={{ color: '#E9711C' }}>trois étapes, pas trente</em>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '01', icon: '🎯', title: 'Identifiez votre profil', desc: 'Répondez à 5 questions sur votre secteur. En 2 minutes, vous savez exactement quelles protections sont essentielles.' },
              { num: '02', icon: '⚡', title: 'Soumission express', desc: 'Votre JotForm pré-rempli est acheminé aux meilleurs assureurs du Québec. Le courtier compare et vous revient en 2h.' },
              { num: '03', icon: '✈️', title: 'Volez protégé', desc: 'Couvert et dans Epic. Votre Copilote surveille vos risques toute l\'année et vous avise si quelque chose doit changer.' },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-2xl p-8 text-left"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="text-5xl font-black mb-4" style={{ color: 'rgba(255,255,255,0.06)' }}>{step.num}</div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10 SECTEURS ═══ */}
      <section id="secteurs" className="py-24 px-6" style={{ background: '#070d1a' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: '#E9711C' }}>
              Secteurs couverts
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              10 marchés de niche.<br />
              <em className="not-italic" style={{ color: '#E9711C' }}>Un seul copilote.</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {SECTEURS.map((s) => (
              <div
                key={s.nom}
                className="rounded-2xl p-6 text-center transition-all cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="text-4xl mb-3">{s.emoji}</div>
                <div className="text-white font-semibold text-sm mb-1">{s.nom}</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ROI STATS ═══ */}
      <section className="py-20 px-6" style={{ background: '#030712', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            { val: '75-85%', label: 'du temps BMS libéré', color: '#60a5fa' },
            { val: '22 500$', label: 'ROI annuel / courtier', color: '#E9711C' },
            { val: '< 3 mois', label: 'payback garanti', color: '#4ade80' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-5xl font-black mb-2" style={{ color: stat.color }}>{stat.val}</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section
        className="py-28 px-6 text-center"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(233,113,28,0.1) 0%, transparent 60%), radial-gradient(ellipse at 30% 100%, rgba(37,99,235,0.08) 0%, transparent 60%), #030712',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: '#E9711C' }}>
            Prêt à passer au niveau supérieur ?
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Votre temps vaut<br />
            <em className="not-italic" style={{ color: '#E9711C' }}>22 500$ par an</em>
          </h2>
          <p className="mb-10 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            149$/mois par courtier · Essai 14 jours · Annulable en tout temps
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/soumission"
              className="inline-flex items-center justify-center gap-2 text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(180deg, #f0882e 0%, #E9711C 45%, #c95a0a 100%)',
                boxShadow: '0 8px 32px rgba(233,113,28,0.4)',
              }}
            >
              ⚡ Commencer maintenant
            </Link>
            <a
              href="tel:5146222163"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-10 py-5 rounded-2xl text-lg transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.15)' }}
            >
              📞 514-622-2163
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
