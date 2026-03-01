'use client';
import React from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Breadcrumb } from '@/components/breadcrumb';
import Image from 'next/image';
import OccurrenceClaimsMadeQuiz from '@/components/quiz/occurrence-claims-made-quiz';

const Section: React.FC<{ title: string; children: React.ReactNode; id: string }> = ({
  title, children, id
}) => (
  <section id={id} className="mt-10">
    <h2 className="text-3xl font-bold text-primary !mb-6 border-b-2 border-primary/20 pb-3">
      {title}
    </h2>
    <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 prose-p:leading-relaxed prose-strong:text-primary">
      {children}
    </div>
  </section>
);

const TableRow: React.FC<{ th: string; a: string; b: string }> = ({ th, a, b }) => (
  <tr className="border-t">
    <td className="px-4 py-3 font-semibold text-primary">{th}</td>
    <td className="px-4 py-3">{a}</td>
    <td className="px-4 py-3">{b}</td>
  </tr>
);

const OccurrenceVsClaimsMadePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: 'Blog', href: '/blog' },
                { label: 'Portail des Professionnels', href: '/assurance-pros' },
                { label: 'Occurrence vs. Claims-Made' },
              ]}
            />
          </div>
          <article className="bg-background rounded-2xl shadow-lg border border-border/50 p-8 sm:p-12">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-primary mb-2">
                Comprendre la différence : Polices d&apos;assurance &quot;Occurrence&quot; vs. &quot;Claims-Made&quot;
              </h1>
              <p className="text-lg text-muted-foreground">Le guide du courtier débutant</p>
            </header>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="lead">
                Bienvenue, futur as de l&apos;assurance ! Si vous débutez dans ce monde fascinant,
                vous avez probablement déjà rencontré une multitude de termes techniques.
                Aujourd&apos;hui, nous allons nous attaquer à deux concepts fondamentaux qui sont
                souvent une source de confusion : les polices d&apos;assurance « Occurrence »
                et « Claims-Made ». Ne vous inquiétez pas, je suis là pour vous guider pas à pas,
                avec quelques exemples pour éclairer le chemin !
              </p>
            </div>

            <Section title="1. La Police 'Occurrence' : La couverture 'quand ça arrive'" id="occurrence">
              <div className="relative w-full h-56 rounded-lg overflow-hidden my-4">
                <Image
                  src="https://picsum.photos/seed/occurrence/800/400"
                  fill
                  style={{ objectFit: 'cover' }}
                  alt="Illustration pour la police Occurrence"
                />
              </div>
              <p>
                Une police &quot;Occurrence&quot; est conçue pour couvrir les incidents qui se produisent{' '}
                <strong>pendant la période de validité de la police</strong>, quel que soit le moment
                où la réclamation est signalée. C&apos;est un peu comme une capsule temporelle : tant que
                l&apos;événement dommageable s&apos;est produit pendant que la police était active, la couverture
                est là, même si la réclamation est déposée des années plus tard.
              </p>
              <h4 className="font-bold text-primary">Exemple concret :</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Votre client avait une police &quot;Occurrence&quot; du 1er janvier 2020 au 31 décembre 2020.</li>
                <li>Un incident (par exemple, un défaut de construction qui cause des dégâts) se produit le 15 juin 2020.</li>
                <li>La police de votre client est annulée ou il change d&apos;assureur le 1er janvier 2021.</li>
                <li>Le 1er mars 2023, la victime découvre les dégâts et dépose une réclamation.</li>
                <li>
                  <strong>Résultat :</strong> Même si la réclamation est déposée en 2023, la police
                  &quot;Occurrence&quot; de 2020 couvrirait l&apos;incident, car l&apos;événement déclencheur (l&apos;occurrence)
                  a eu lieu pendant sa période de validité.
                </li>
              </ul>
            </Section>

            <Section title='2. La Police "Claims-Made" : La couverture "quand on déclare"' id="claims-made">
              <div className="relative w-full h-56 rounded-lg overflow-hidden my-4">
                <Image
                  src="https://picsum.photos/seed/claims-made/800/400"
                  fill
                  style={{ objectFit: 'cover' }}
                  alt="Illustration pour la police Claims-Made"
                />
              </div>
              <p>
                Une police &quot;Claims-Made&quot; couvre les réclamations qui sont{' '}
                <strong>déclarées pendant la période de validité de la police</strong> et qui découlent
                d&apos;un incident qui s&apos;est produit à partir d&apos;une date spécifique appelée{' '}
                <strong>&quot;date rétroactive&quot;</strong>.
              </p>
              <h4 className="font-bold text-primary">Exemple concret :</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Votre client a une police &quot;Claims-Made&quot; du 1er janvier 2020 au 31 décembre 2020,
                  avec une date rétroactive du 1er janvier 2018.
                </li>
                <li>Un incident se produit le 15 juin 2020 (donc après la date rétroactive).</li>
                <li>La police de votre client est annulée le 31 décembre 2020.</li>
                <li>Le 1er mars 2021, la victime découvre les dégâts et dépose une réclamation.</li>
                <li>
                  <strong>Résultat :</strong> La réclamation NE SERAIT PAS couverte, car elle a été
                  déposée APRÈS la fin de la période de validité de la police. C&apos;est ici que la
                  &quot;Tail Coverage&quot; devient essentielle.
                </li>
              </ul>
              <h4 className="font-bold text-primary mt-6">
                L&apos;importance de la &quot;Tail Coverage&quot; (ou &quot;Période de Déclaration Prolongée&quot;)
              </h4>
              <p>
                Si un assuré met fin à sa police &quot;Claims-Made&quot;, il peut acheter une &quot;tail coverage&quot;.
                C&apos;est une extension qui permet de déclarer des réclamations pour des événements survenus
                pendant la période de la police initiale, même après son expiration. C&apos;est crucial lors
                d&apos;une retraite ou d&apos;un changement d&apos;assureur.
              </p>
            </Section>

            <Section title="Tableau Récapitulatif" id="recap">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr className="bg-secondary/30">
                      <th className="px-4 py-2 text-left">Caractéristique</th>
                      <th className="px-4 py-2 text-left">Police &quot;Occurrence&quot;</th>
                      <th className="px-4 py-2 text-left">Police &quot;Claims-Made&quot;</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableRow
                      th="Quand l'incident est couvert ?"
                      a="Quand l'incident se produit (pendant la période de la police)."
                      b="Quand la réclamation est déclarée (pendant la période de la police ET l'incident s'est produit après la date rétroactive)."
                    />
                    <TableRow
                      th="Couverture après fin de police ?"
                      a="OUI, si l'incident s'est produit pendant la période."
                      b="NON, sauf si une 'Tail Coverage' a été achetée."
                    />
                    <TableRow
                      th="Date Rétroactive ?"
                      a="NON applicable."
                      b="OUI, l'incident doit s'être produit après cette date."
                    />
                    <TableRow
                      th="Coût (généralement)"
                      a="Plus élevé initialement."
                      b="Moins élevé initialement."
                    />
                    <TableRow
                      th="Risque pour l'assuré"
                      a="Moins complexe, couverture automatique pour les incidents passés."
                      b="Nécessite une compréhension de la 'tail coverage' et de la date rétroactive."
                    />
                  </tbody>
                </table>
              </div>
            </Section>

            <div className="!mt-12">
              <OccurrenceClaimsMadeQuiz />
            </div>

          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OccurrenceVsClaimsMadePage;
