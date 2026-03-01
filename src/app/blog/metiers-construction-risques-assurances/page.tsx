'use client';
import React from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Breadcrumb } from '@/components/breadcrumb';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="text-2xl font-semibold text-primary !mb-4">{title}</h2>
    <div className="prose prose-lg max-w-none text-muted-foreground space-y-4 prose-p:leading-relaxed prose-ul:text-muted-foreground prose-strong:text-primary">
      {children}
    </div>
  </section>
);

const RiskCard: React.FC<{ title: string; risk: string; insurance: string }> = ({ title, risk, insurance }) => (
  <div className="bg-secondary/20 p-6 rounded-xl border border-border/50">
    <h3 className="text-xl font-bold text-primary">{title}</h3>
    <p className="mt-2"><strong>Risque Principal :</strong> {risk}</p>
    <p className="mt-2"><strong>Assurance Clé :</strong> {insurance}</p>
  </div>
);

const ConstructionTradesBlog: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: 'Métiers de la Construction : À Chaque Spécialiste, Son Assurance' },
              ]}
            />
          </div>
          <div className="bg-background rounded-2xl shadow-lg border border-border/50 overflow-hidden p-8 sm:p-12">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Métiers de la Construction : À Chaque Spécialiste, Son Assurance
            </h1>
            <p className="text-lg text-muted-foreground">
              Le secteur de la construction est un écosystème complexe où chaque corps de métier
              joue un rôle essentiel. Cependant, un plombier ne fait pas face aux mêmes dangers
              qu&apos;un couvreur, et un électricien n&apos;a pas les mêmes responsabilités qu&apos;un maçon.
              Comprendre ces nuances est la clé pour souscrire une assurance qui protège vraiment.
            </p>

            <Section title="Pourquoi une Approche Spécifique est-elle Nécessaire ?">
              <p>
                Une police d&apos;assurance &quot;taille unique&quot; est un mythe dans la construction.
                Les risques varient énormément en fonction des matériaux utilisés, des techniques
                employées, de l&apos;environnement de travail (hauteur, espaces clos) et de l&apos;impact
                potentiel d&apos;une erreur. Une couverture inadaptée peut laisser des brèches béantes,
                exposant votre entreprise à des pertes financières catastrophiques.
              </p>
            </Section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <RiskCard
                title="Le Maçon"
                risk="Erreur de fondation ou de structure pouvant affecter l'intégrité du bâtiment."
                insurance="Responsabilité Civile Générale avec une couverture élevée pour les travaux complétés."
              />
              <RiskCard
                title="Le Plombier"
                risk="Dégât des eaux majeur suite à un raccord défectueux, causant des dommages étendus et graduels."
                insurance="Responsabilité Civile Générale incluant une extension pour les 'dommages graduels'."
              />
              <RiskCard
                title="L'Électricien"
                risk="Incendie causé par un défaut de câblage, mettant en danger les biens et les vies."
                insurance="Responsabilité Civile Générale et Professionnelle couvrant les dommages consécutifs à une erreur d'installation."
              />
              <RiskCard
                title="Le Couvreur"
                risk="Infiltration d'eau due à une mauvaise étanchéité, provoquant des dommages importants à l'intérieur du bâtiment."
                insurance="Responsabilité Civile Générale spécifique aux travaux de toiture, couvrant les dommages par l'eau."
              />
            </div>

            <Section title="Les Protections Communes Mais Essentielles">
              <p>
                Au-delà des spécificités, certains besoins sont universels pour tous les entrepreneurs spécialisés :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Responsabilité Civile Générale :</strong> C&apos;est la base. Elle couvre les
                  dommages matériels ou corporels que vous pourriez causer à des tiers sur le chantier.
                </li>
                <li>
                  <strong>Assurance Équipements et Outils :</strong> Vos outils sont votre gagne-pain.
                  Cette assurance les protège contre le vol et le bris, que ce soit sur le chantier,
                  dans votre camion ou en location.
                </li>
                <li>
                  <strong>Assurance Pollution :</strong> De plus en plus cruciale, elle couvre les frais
                  liés à une contamination accidentelle des sols ou de l&apos;eau, un risque présent même
                  dans des métiers où on l&apos;attend le moins.
                </li>
              </ul>
            </Section>

            <div className="!mt-12 border-t border-border/50 pt-8">
              <p className="font-semibold text-primary">
                Ne considérez pas votre assurance comme une simple dépense, mais comme un
                investissement stratégique dans la pérennité de votre entreprise.
                Chaque métier a ses risques ; nous avons les solutions.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConstructionTradesBlog;
