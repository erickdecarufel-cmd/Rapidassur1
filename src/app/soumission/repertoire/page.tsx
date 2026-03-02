export default function SubmissionsDirectoryPage() {
    const submissions = [
      { name: "Assurance Chantier (Projet Spécifique)", href: "#" },
      { name: "Assurance Erreurs & Omissions (E&O)", href: "#" },
      { name: "Assurance Cyber-Risques", href: "#" },
      { name: "Assurance des Biens et RCG", href: "#" },
      { name: "Cautionnement de Contrat", href: "#" },
      { name: "Assurance Flotte Automobile", href: "#" },
    ];
  
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Répertoire Complet des Soumissions</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Trouvez ici tous nos formulaires de soumission, incluant nos guides PDF et les liens directs vers les portails assureurs.
          </p>
        </div>
  
        <div className="mt-16 flow-root">
          <div className="-my-2 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nom du Formulaire</th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Ouvrir</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {submissions.map((submission) => (
                      <tr key={submission.name}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{submission.name}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href={submission.href} className="text-accent hover:text-accent-dark">Ouvrir<span className="sr-only">, {submission.name}</span></a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  