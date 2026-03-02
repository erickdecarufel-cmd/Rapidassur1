export default function SinistrePage() {
    return (
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Votre Guide en Cas de Sinistre</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Un sinistre est un événement stressant. Suivre les bonnes étapes est crucial pour une gestion efficace et une réclamation rapide. Voici votre procédure en 5 étapes.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-1 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <p className="text-white">1</p>
                </div>
                Sécurisez les lieux et prévenez les dommages additionnels.
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">Votre première priorité est la sécurité. Si nécessaire, coupez l'eau ou l'électricité. Prenez des mesures temporaires pour protéger vos biens (ex: bâcher un toit endommagé).</dd>
            </div>
            <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                        <p className="text-white">2</p>
                    </div>
                    Documentez le sinistre de manière exhaustive.
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Prenez des photos et des vidéos de tous les dommages, sous différents angles. Listez tous les biens endommagés ou volés avec leur valeur estimée et, si possible, une preuve d'achat.</dd>
            </div>
            <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                        <p className="text-white">3</p>
                    </div>
                    Rassemblez les documents pertinents.
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Préparez une copie de votre contrat d'assurance, ainsi que tout rapport de police ou d'incendie, le cas échéant. Ayez sous la main les coordonnées des autres parties impliquées.</dd>
            </div>
            <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                        <p className="text-white">4</p>
                    </div>
                    Contactez votre courtier RapidAssur.
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">N'appelez pas l'assureur directement. Appelez-nous. Nous sommes votre meilleur allié. Nous vous guiderons dans le processus de réclamation et agirons comme votre défenseur auprès de l'assureur.</dd>
            </div>
            <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                        <p className="text-white">5</p>
                    </div>
                    Conservez une copie de toutes les communications.
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Gardez une trace écrite de tous vos échanges avec nous et avec l'expert en sinistre (courriels, dates et heures des appels, noms des interlocuteurs). Ce dossier sera précieux tout au long du processus.</dd>
            </div>
          </dl>
        </div>
      </div>
    )
  }
  