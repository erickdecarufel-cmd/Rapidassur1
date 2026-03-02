import Image from "next/image";

export default function AboutMePage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Erick de Carufel</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Courtier en assurance de dommages & Architecte de la plateforme RapidAssur Copilote
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Ma Philosophie : Le Courtier Augmenté</h3>
            <p className="mt-6 text-base leading-7 text-gray-700">
              Je crois que l'avenir de l'assurance ne réside pas dans le remplacement de l'humain par la machine, mais dans l'augmentation de l'expertise humaine par l'intelligence artificielle. Mon objectif avec RapidAssur Copilote est de créer un écosystème où la technologie s'occupe des tâches répétitives, libérant ainsi le courtier pour qu'il puisse se concentrer sur ce qui compte vraiment : le conseil stratégique et la relation client.
            </p>
            <p className="mt-4 text-base leading-7 text-gray-700">
              Chaque outil, chaque ligne de code de cette plateforme a été pensé pour transformer le courtier traditionnel en un "Courtier Augmenté" : plus rapide, plus précis, et infiniment plus pertinent pour ses clients.
            </p>

            <h3 className="mt-12 text-2xl font-bold tracking-tight text-gray-900">Mes Champs d'Expertise</h3>
            <p className="mt-6 text-base leading-7 text-gray-700">
              Avec des années d'expérience dans le domaine, je me suis spécialisé dans les risques complexes et les industries de niche, là où une compréhension fine du métier du client fait toute la différence.
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2 text-base leading-7 text-gray-700">
              <li>**Assurance Construction :** Des entrepreneurs généraux aux artisans spécialisés, je comprends les réalités du chantier.</li>
              <li>**Risques Professionnels et Technologiques :** J'accompagne les consultants, les firmes de TI et les innovateurs dans la protection de leur capital intellectuel.</li>
              <li>**Assurance des Entreprises :** Du commerce de détail à l'immobilier, j'offre des solutions sur mesure pour les PME.</li>
              <li>**Cautionnement :** Un domaine de niche où la confiance et la crédibilité sont les maîtres-mots.</li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <Image
              className="h-64 w-64 rounded-full object-cover"
              src="/erick-de-carufel.jpg"
              alt="Erick de Carufel"
              width={256}
              height={256}
            />
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900">Erick de Carufel</h3>
              <p className="text-md text-gray-600">Président & Courtier</p>
              <p className="mt-2">
                <a href="mailto:erick@rapidassur.com" className="text-accent hover:underline">erick@rapidassur.com</a>
              </p>
              <p>
                <a href="tel:1-819-806-5256" className="text-accent hover:underline">1-819-806-5256</a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
