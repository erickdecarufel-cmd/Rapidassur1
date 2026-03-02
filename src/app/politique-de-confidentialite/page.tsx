export default function PrivacyPolicyPage() {
    return (
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Politique de Confidentialité</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Votre confiance est importante pour nous. Cette politique détaille comment nous collectons, utilisons et protégeons vos renseignements personnels, conformément à la Loi 25 au Québec.
            </p>
          </div>
          <div className="mt-16 text-base leading-7 text-gray-700">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">1. Responsable de la protection des renseignements personnels</h2>
            <p className="mt-4">
              Erick de Carufel, président de RapidAssur, est le responsable de la protection des renseignements personnels. Pour toute question ou préoccupation, vous pouvez le contacter à <a href="mailto:erick@rapidassur.com" className="text-accent hover:underline">erick@rapidassur.com</a>.
            </p>
  
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">2. Collecte des renseignements</h2>
            <p className="mt-4">
              Nous collectons les renseignements que vous nous fournissez directement via nos formulaires, quiz, et outils d'intelligence artificielle. Cela inclut, sans s'y limiter, votre nom, vos coordonnées, et les informations spécifiques à votre entreprise et à vos besoins d'assurance. Nous pouvons également collecter des informations publiques via des registres gouvernementaux (RBQ, REQ, etc.) pour compléter votre dossier.
            </p>
  
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">3. Utilisation des renseignements</h2>
            <p className="mt-4">
              Vos renseignements sont utilisés exclusivement pour les finalités suivantes :
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>Évaluer vos besoins en assurance.</li>
              <li>Préparer et soumettre des propositions d'assurance aux assureurs.</li>
              <li>Communiquer avec vous concernant votre dossier.</li>
              <li>Vous fournir des conseils et des recommandations personnalisés.</li>
              <li>Améliorer nos services et outils.</li>
            </ul>
  
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">4. Partage des renseignements</h2>
            <p className="mt-4">
              Nous ne partageons vos renseignements personnels qu'avec les tiers nécessaires à l'accomplissement de notre mandat, c'est-à-dire principalement les assureurs susceptibles de vous proposer une protection. Nous ne vendons ni ne louons vos données à des tiers à des fins de marketing.
            </p>
  
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">5. Conservation et Sécurité</h2>
            <p className="mt-4">
              Vos renseignements sont conservés dans un environnement sécurisé. Nous utilisons des mesures techniques et organisationnelles pour protéger vos données contre la perte, le vol, et l'accès non autorisé. Les communications avec nos services d'IA sont sécurisées et ne transitent pas en clair sur Internet.
            </p>
  
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">6. Vos Droits</h2>
            <p className="mt-4">
              Conformément à la loi, vous avez le droit d'accéder à vos renseignements personnels, de les rectifier ou de demander leur suppression. Pour exercer ces droits, veuillez contacter notre responsable de la protection des renseignements personnels.
            </p>
  
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">7. Modifications de la politique</h2>
            <p className="mt-4">
              Nous nous réservons le droit de modifier cette politique à tout moment. La version la plus récente sera toujours disponible sur notre site web.
            </p>
          </div>
        </div>
      </div>
    );
  }
  