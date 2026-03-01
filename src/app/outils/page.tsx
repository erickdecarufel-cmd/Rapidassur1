'use client'
import{useState}from 'react'
const QS=[
  {q:'Avez-vous une licence RBQ?',opts:['Oui, licence active','Non, pas requise','En cours d\'obtention']},
  {q:'Nombre d\'employés?',opts:['1-5','6-20','21-100','100+']},
  {q:'Chiffre d\'affaires annuel?',opts:['Moins de 500K$','500K$ à 2M$','2M$ à 10M$','Plus de 10M$']},
]
const RES:Record<string,{t:string,f:string,d:string}>={
  'Oui, licence active':{t:'Construction RBQ',f:'260507298912260',d:'CGL + RC Entrepreneur adaptée à votre licence RBQ'},
  'Non, pas requise':{t:'Professionnels & Services',f:'260512255889262',d:'RC Professionnelle et Erreurs & Omissions'},
  "En cours d'obtention":{t:'Construction Démarrage',f:'260507298912260',d:'Couverture complète dès le démarrage de vos activités'},
}
function Quiz(){
  const[step,setStep]=useState(0)
  const[ans,setAns]=useState<Record<number,string>>({})
  const[sel,setSel]=useState<string|null>(null)
  if(step===0)return(
    <div className="text-center py-4">
      <div className="text-5xl mb-4">🧭</div>
      <h2 className="text-2xl font-bold text-white mb-3">Quel formulaire me correspond?</h2>
      <p className="text-gray-400 mb-8">3 questions pour vous orienter vers la bonne couverture</p>
      <button onClick={()=>setStep(1)} className="bg-[#E9711C] text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-500 transition-colors text-lg">
        Commencer →
      </button>
    </div>
  )
  if(step<=QS.length){
    const q=QS[step-1]
    return(
      <div>
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2"><span>Question {step} sur {QS.length}</span><span>{Math.round((step-1)/QS.length*100)}%</span></div>
          <div className="h-2 bg-[#1E293B] rounded-full"><div className="h-2 bg-[#E9711C] rounded-full transition-all" style={{width:`${(step-1)/QS.length*100}%`}}/></div>
        </div>
        <h3 className="text-xl font-bold text-white mb-5">{q.q}</h3>
        <div className="space-y-3 mb-6">
          {q.opts.map(o=>(
            <button key={o} onClick={()=>setSel(o)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${sel===o?'border-[#E9711C] bg-orange-500/10 text-white':'border-[#1E293B] text-gray-300 hover:border-gray-500'}`}>
              {o}
            </button>
          ))}
        </div>
        <button disabled={!sel} onClick={()=>{setAns({...ans,[step]:sel!});setSel(null);setStep(step+1)}}
          className="w-full bg-[#E9711C] disabled:opacity-40 text-white font-bold py-3 rounded-xl hover:bg-orange-500 transition-colors">
          {step<QS.length?'Question suivante →':'Voir mon résultat →'}
        </button>
      </div>
    )
  }
  const r=RES[ans[1]]??RES['Non, pas requise']
  return(
    <div className="text-center py-4">
      <div className="text-5xl mb-4">🎯</div>
      <div className="inline-block bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-bold px-4 py-1 rounded-full mb-4">Résultat personnalisé</div>
      <h3 className="text-2xl font-bold text-white mb-2">{r.t}</h3>
      <p className="text-gray-400 mb-8">{r.d}</p>
      <a href={`https://form.jotform.com/${r.f}`} target="_blank" rel="noopener noreferrer"
        className="inline-block bg-[#E9711C] text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-500 transition-colors text-lg mb-4">
        Remplir mon formulaire →
      </a>
      <div><button onClick={()=>{setStep(0);setAns({});setSel(null)}} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">↩ Recommencer</button></div>
    </div>
  )
}
export default function OutilsPage(){
  return(
    <main className="min-h-screen bg-[#030712]">
      <section className="bg-gradient-to-br from-[#003366] to-[#0a0a1a] py-20 px-4 text-center">
        <span className="inline-block bg-[#E9711C] text-white text-sm font-bold px-4 py-2 rounded-full mb-6">OUTILS INTELLIGENTS</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Outils & Ressources</h1>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto">Quiz interactif, calculateurs et guides pratiques pour courtiers et entreprises</p>
      </section>
      <section className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-[#0F172A] rounded-2xl border border-[#1E293B] p-8 shadow-2xl">
          <Quiz/>
        </div>
        <p className="text-center text-gray-600 mt-6 text-sm">D&apos;autres outils arrivent bientôt -- calculateur de prime, vérificateur RBQ, carte de zones inondables</p>
      </section>
    </main>
  )
}
