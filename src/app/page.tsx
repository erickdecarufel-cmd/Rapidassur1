import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* SECTION 1 : HERO */}
      <section 
        className="relative pt-24 pb-32 px-4 text-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 60% 20%, #0F3460 0%, #060d1b 55%, #030712 100%)' }}
      >
        <div className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium tracking-widest text-gray-300 uppercase">
            ● COURTIER INDÉPENDANT · QUÉBEC · 30 ANS D'EXPÉRIENCE
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Le cerveau <span className="bg-gradient-to-r from-[#E9711C] to-orange-400 bg-clip-text text-transparent">prescriptif</span> du courtier
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Automatisez vos soumissions. Libérez 75 à 85% de votre temps BMS.
          </p>

          <p className="text-sm text-gray-400 mb-10 font-medium">
            Construction · Flotte · Immobilier · Pro · Commercial · et 5 autres secteurs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/#construis" className="bg-[#E9711C] hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              ⚡ Construis ta prime
            </Link>
            <Link href="/internal/dashboard" className="border border-white/30 hover:bg-white/5 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              🎛️ Espace courtier
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span>✓ Réponse en 2h</span>
            <span>✓ 10 secteurs couverts</span>
            <span>✓ 9 000 courtiers ciblés</span>
            <span>✓ 100% indépendant</span>
          </div>
        </div>
      </section>

      {/* SECTION 2 : AVANT/APRÈS */}
      <section className="py-24 bg-[#030712] px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-[#E9711C] font-bold text-sm tracking-wider uppercase">POURQUOI RAPIDASSUR</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">L'assurance de niche, ce n'est pas un produit générique</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card Rouge */}
            <div className="bg-[#111] border border-[#DC2626]/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-[#DC2626] mb-6">✗ Le vieux modèle BMS</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-3"><span>-</span> Remplir 60+ champs à la main dans Epic</li>
                <li className="flex gap-3"><span>-</span> Risque de mal positionner le risque</li>
                <li className="flex gap-3"><span>-</span> Renouvellement par défaut, sans révision</li>
                <li className="flex gap-3"><span>-</span> Aucune visibilité sur l'appétit des assureurs</li>
                <li className="flex gap-3"><span>-</span> 29h/semaine de saisie BMS</li>
              </ul>
            </div>

            {/* Card Verte */}
            <div className="bg-[#111] border border-[#16a34a]/30 rounded-xl p-8 shadow-[0_0_30px_rgba(22,163,74,0.1)]">
              <h3 className="text-2xl font-bold text-[#16a34a] mb-6">✓ Le modèle Copilote</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-3"><span>-</span> JotForm intelligent → PDF → Epic en 1 clic</li>
                <li className="flex gap-3"><span>-</span> Scoring automatique du risque par secteur</li>
                <li className="flex gap-3"><span>-</span> Analyse annuelle proactive des risques</li>
                <li className="flex gap-3"><span>-</span> Routing intelligent vers le bon assureur</li>
                <li className="flex gap-3"><span>-</span> 75-85% du temps BMS libéré</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 : 3 ÉTAPES */}
      <section className="py-24 bg-[#060d1b] px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="text-[#E9711C] font-bold text-sm tracking-wider uppercase mb-2 block">COMMENT ÇA MARCHE</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            De zéro à couvert : <span className="text-[#E9711C]">trois étapes, pas trente</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-[#030712] p-8 rounded-xl border border-white/5">
              <div className="text-4xl mb-4">01</div>
              <h3 className="text-xl font-bold mb-2">🎯 Identifiez votre profil</h3>
              <p className="text-gray-400">Répondez au formulaire intelligent 10 secteurs</p>
            </div>
            <div className="bg-[#030712] p-8 rounded-xl border border-white/5">
              <div className="text-4xl mb-4">02</div>
              <h3 className="text-xl font-bold mb-2">⚡ Soumission en 2h</h3>
              <p className="text-gray-400">Notre AI analyse votre dossier</p>
            </div>
            <div className="bg-[#030712] p-8 rounded-xl border border-white/5">
              <div className="text-4xl mb-4">03</div>
              <h3 className="text-xl font-bold mb-2">✈️ Volez protégé</h3>
              <p className="text-gray-400">PDF vers Epic, courtier gère la suite</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 : 10 SECTEURS */}
      <section id="secteurs" className="py-24 bg-[#030712] px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <span className="text-[#E9711C] font-bold text-sm tracking-wider uppercase mb-2 block">SECTEURS COUVERTS</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            10 marchés de niche. <span className="text-[#E9711C]">Un seul copilote.</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">🏗️ Construction</div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">🚛 Flotte</div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">🏢 Immobilier</div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">💼 Professionnel</div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">🏪 Commercial</div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">🏨 Hospitalité</div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">🏭 Fabrication</div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">🌾 Agricole</div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">🏥 Santé</div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">🛡️ Sécurité</div>
          </div>
        </div>
      </section>

      {/* SECTION 5 : ROI STATS */}
      <section className="py-20 bg-[#060d1b] border-y border-white/5 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="py-4 md:py-0">
              <div className="text-5xl font-extrabold text-[#2563EB] mb-2">75-85%</div>
              <p className="text-gray-300 font-medium">du temps BMS libéré</p>
            </div>
            <div className="py-4 md:py-0">
              <div className="text-5xl font-extrabold text-[#E9711C] mb-2">22 500$</div>
              <p className="text-gray-300 font-medium">ROI annuel / courtier</p>
            </div>
            <div className="py-4 md:py-0">
              <div className="text-5xl font-extrabold text-[#16a34a] mb-2">&lt; 3 mois</div>
              <p className="text-gray-300 font-medium">payback garanti</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 : CTA FINAL */}
      <section 
        className="py-32 px-4 text-center"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(233,113,28,0.15), #030712)' }}
      >
        <div className="container mx-auto max-w-3xl">
          <span className="text-gray-400 font-bold text-sm tracking-wider uppercase mb-4 block">PRÊT À PASSER AU NIVEAU SUPÉRIEUR ?</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Votre temps vaut <span className="text-[#E9711C]">22 500$ par an</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10">
            149$/mois par courtier · Essai 14 jours · Annulable en tout temps
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/#construis" className="bg-[#E9711C] hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-lg transition-colors text-lg">
              ⚡ Commencer maintenant
            </Link>
            <a href="tel:514-622-2163" className="border border-white/30 hover:bg-white/5 text-white font-bold py-4 px-10 rounded-lg transition-colors text-lg">
              📞 514-622-2163
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}