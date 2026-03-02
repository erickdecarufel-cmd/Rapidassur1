export default function ComplaintsPolicyPage() {
    return (
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Politique de Traitement des Plaintes</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Votre satisfaction est notre priorité. Si vous êtes insatisfait de nos services, voici la procédure à suivre pour nous en informer et obtenir une résolution.
            </p>
          </div>
          <div className="mt-16 text-base leading-7 text-gray-700">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Étape 1 : Contactez votre courtier</h2>
            <p className="mt-4">
              Le premier réflexe devrait toujours être de discuter de votre insatisfaction avec votre courtier attitré, Erick de Carufel. Un simple échange permet souvent de clarifier la situation et de trouver une solution rapide. Vous pouvez le joindre par téléphone au <a href="tel:1-819-806-5256" className="text-accent hover:underline">1-819-806-5256</a> ou par courriel à <a href="mailto:erick@rapidassur.com" className="text-accent hover:underline">erick@rapidassur.com</a>.
            </p>
  
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">Étape 2 : Déposez une plainte formelle</h2>
            <p className="mt-4">
              Si la discussion avec votre courtier ne résout pas le problème, vous pouvez déposer une plainte formelle. La plainte doit être faite par écrit et adressée au responsable du traitement des plaintes à l'adresse suivante :
            </p>
            <div className="mt-4 border-l-4 border-accent pl-4">
              <p><strong>Erick de Carufel</strong></p>
              <p>Responsable du traitement des plaintes</p>
              <p>RapidAssur</p>
              <p>Courriel : <a href="mailto:erick@rapidassur.com" className="text-accent hover:underline">erick@rapidassur.com</a></p>
            </div>
            <p className="mt-4">
              Le responsable accusera réception de votre plainte dans les 5 jours ouvrables et vous informera de la procédure et des délais de traitement.
            </p>
  
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">Étape 3 : Analyse de la plainte</h2>
            <p className="mt-4">
              Votre dossier de plainte sera créé et analysé. Nous nous engageons à effectuer une analyse approfondie et impartiale. Après analyse, nous vous transmettrons une réponse finale écrite et motivée.
            </p>
  
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">Étape 4 : Transfert du dossier à l'AMF</h2>
            <p className="mt-4">
              Si vous êtes insatisfait de la réponse ou du traitement de votre plainte, vous pouvez demander le transfert de votre dossier à l'Autorité des marchés financiers (AMF). L'AMF examinera le dossier et pourra, si elle le juge approprié, proposer une médiation. Notez que la médiation est un processus volontaire.
            </p>
            <div className="mt-4 bg-gray-50 p-6 rounded-lg">
              <p className="font-semibold">Coordonnées de l'AMF :</p>
              <p><strong>Autorité des marchés financiers</strong></p>
              <p>Place de la Cité, tour Cominar</p>
              <p>2640, boulevard Laurier, bureau 400</p>
              <p>Québec (Québec) G1V 5C1</p>
              <p className="mt-2">À Montréal : <a href="tel:1-514-395-0337" className="text-accent hover:underline">514 395-0337</a></p>
              <p>Ailleurs au Québec : <a href="tel:1-877-525-0337" className="text-accent hover:underline">1 877 525-0337</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  