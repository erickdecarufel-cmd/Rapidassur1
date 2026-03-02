export default function QuickSiteSubmissionPage() {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Quiz d'Éligibilité - Chantier Rapide</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Répondez à quelques questions rapides pour savoir si votre projet de construction est admissible à notre service de soumission prioritaire en 2 heures.
          </p>
        </div>
  
        <div className="mt-16 mx-auto max-w-2xl bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-5 sm:p-8">
            {/* Contenu du quiz ici */}
            <p className="text-center text-gray-500">Le quiz interactif sera intégré ici.</p>
          </div>
        </div>
      </div>
    );
  }
  