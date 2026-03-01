const F=[
{id:'construction',e:'🏗️',t:'Construction & Rénovation',s:'CGL · Chantier · RC Entrepreneur',f:'260507298912260'},
{id:'professionnels',e:'💼',t:'Professionnels & Services',s:'RC Pro · Erreurs & Omissions',f:'260512255889262'},
{id:'immobilier',e:'🏢',t:'Immobilier & Propriétaires',s:'Bâtiment · Locataires commerciaux',f:'260512137678257'},
{id:'transport',e:'🚛',t:'Transport & Flotte',s:'Camions · Flottes · Marchandises',f:'260512085208248'},
{id:'commerce',e:'🏪',t:'Commerce & Détail',s:'Magasins · Restaurants · Hôtels',f:'260522507223043'},
{id:'fabrication',e:'🏭',t:'Fabrication & Production',s:'Manufacturiers · Produits · RC',f:'260522561165048'},
{id:'agriculture',e:'🌾',t:'Agriculture & Agroalimentaire',s:'Fermes · Cultures · Équipement',f:'260523334001036'},
{id:'sante',e:'🏥',t:'Santé & Services aux Personnes',s:'Cliniques · Soins · Bien-être',f:'260523349099059'},
]
export default function SpecialitesPage(){
  return(
    <main className="min-h-screen bg-[#030712]">
      <section className="bg-gradient-to-br from-[#003366] to-[#0a0a1a] py-20 px-4 text-center">
        <span className="inline-block bg-[#E9711C] text-white text-sm font-bold px-4 py-2 rounded-full mb-6">8 FAMILLES D&apos;ASSURANCE</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Votre spécialité, notre expertise</h1>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto">Chaque secteur a ses risques spécifiques. Trouvez la couverture exacte pour votre activité.</p>
        <div className="flex justify-center gap-8 mt-10 flex-wrap">
          {[['8','Familles'],['23','Profils'],['10','Formulaires'],['<10min','Soumission']].map(([v,l])=>(
            <div key={l} className="text-center">
              <div className="text-3xl font-bold text-[#E9711C]">{v}</div>
              <div className="text-blue-300 text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {F.map((f)=>(
            <div key={f.id} className="bg-[#0F172A] rounded-2xl overflow-hidden border border-[#1E293B] hover:border-[#E9711C] transition-all">
              <div className="bg-gradient-to-br from-[#003366] to-[#0F3460] p-6">
                <div className="text-4xl mb-3">{f.e}</div>
                <h3 className="text-white font-bold text-lg leading-tight">{f.t}</h3>
                <p className="text-blue-300 text-sm mt-1">{f.s}</p>
              </div>
              <div className="p-4">
                <a href={`https://form.jotform.com/${f.f}`} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center bg-[#E9711C] hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-colors text-sm">
                  Obtenir ma soumission →
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Votre secteur n&apos;est pas listé? Nous couvrons tous les risques d&apos;entreprise.</p>
          <a href="tel:5146222163" className="inline-block bg-[#003366] hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">
            📞 514-622-2163 — Parler à Erick
          </a>
        </div>
      </section>
    </main>
  )
}
