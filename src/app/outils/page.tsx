const tools = [
    {
      name: 'Quiz : Rôle sur le Chantier',
      description: 'Déterminez votre profil de risque et les assurances essentielles pour votre rôle dans un projet de construction.',
      href: '/outils/quiz-role-construction',
    },
    {
      name: 'Calculateur de Coûts Indirects (Soft Costs)',
      description: 'Estimez les frais supplémentaires (financiers, administratifs) en cas d'arrêt de chantier pour bien assurer votre projet.',
      href: '/outils/calculateur-couts-indirects',
    },
    {
        name: 'Quiz : Licence Agricole RBQ',
        description: 'Vérifiez si votre projet agricole nécessite une licence de la Régie du bâtiment du Québec.',
        href: '/outils/quiz-licence-agricole-rbq',
    }
  ]
  
  export default function ToolsPage() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Outils & Quiz Interactifs</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
                Évaluez vos risques, quantifiez vos besoins et prenez des décisions éclairées grâce à nos outils conçus pour les professionnels.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {tools.map((tool) => (
                <div key={tool.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    {tool.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{tool.description}</p>
                    <p className="mt-6">
                      <a href={tool.href} className="text-sm font-semibold leading-6 text-accent hover:text-accent-dark">
                        Lancer l'outil <span aria-hidden="true">→</span>
                      </a>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )
  }
  