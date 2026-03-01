'use client';
import React from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Breadcrumb } from '@/components/breadcrumb';
import Image from 'next/image';
import OccurrenceClaimsMadeQuiz from '@/components/quiz/occurrence-claims-made-quiz';

const Section: React.FC<{ title: string; children: React.ReactNode; id: string }> = ({ title, children, id }) => (
    <section id={id} className="mt-10">
        <h2 className="text-3xl font-bold text-primary !mb-6 border-b-2 border-primary/20 pb-3">{title}</h2>
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 prose-p:leading-relaxed prose-strong:text-primary">{children}</div>
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
                        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'Portail des Professionnels', href: '/assurance-pros' }, { label: "Occurrence vs. Claims-Made" }]} />
                    </div>
                    <article className="bg-background rounded-2xl shadow-lg border border-border/50 p-8 sm:p-12">
                        <header className="mb-8">
                            <h1 className="text-4xl font-bold text-primary mb-2">Comprendre la différence : Polices d&apos;assurance &quot;Occurrence&quot; vs. &quot;Claims-Made&quot;</h1>
                            <p className="text-lg text-muted-foreground">Le guide du courtier débutant</p>
                        </header>
                        <p className="lead prose prose-lg max-w-none text-muted-foreground">
                            Bienvenue, futur as de l&apos;assurance ! Aujourd&apos;hui, nous allons nous attaquer à deux concepts fondamentaux qui sont souvent une source de confusion : les polices d&apos;assurance &laquo; Occurrence &raquo; et &laquo; Claims-Made &raquo;.
                        </p>

                        <Section title="1. La Police 'Occurrence' : La couverture 'quand ça arrive'" id="occurrence">
                            <div className="relative w-full h-56 rounded-lg overflow-hidden my-4">
                                <Image src="https://picsum.photos/seed/occurrence/800/400" fill style={{ objectFit: 'cover' }} alt="Illustration pour la police Occurrence" />
                            </div>
                            <p>Une police &quot;Occurrence&quot; est conçue pour couvrir les incidents qui se produisent <strong>pendant la période de validité de la police</strong>, quel que soit le moment où la réclamation est signalée.</p>
                            <h4 className="font-bold text-primary">Exemple concret :</h4>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Votre client avait une police &quot;Occurrence&quot; du 1er janvier 2020 au 31 décembre 2020.</li>
                                <li>Un incident se produit le 15 juin 2020.</li>
                                <li>Le 1er mars 2023, la victime découvre les dégâts et dépose une réclamation.</li>
                                <li><strong>Résultat :</strong> La police de 2020 couvrirait l&apos;incident, car l&apos;occurrence a eu lieu pendant sa validité.</li>
                            </ul>
                        </Section>

                        <Section title='2. La Police "Claims-Made" : La couverture "quand on déclare"' id="claims-made">
                            <div className="relative w-full h-56 rounded-lg overflow-hidden my-4">
                                <Image src="https://picsum.photos/seed/claims-made/800/400" fill style={{ objectFit: 'cover' }} alt="Illustration pour la police Claims-Made" />
                            </div>
                            <p>Une police &quot;Claims-Made&quot; couvre les réclamations qui sont <strong>déclarées pendant la période de validité</strong> et qui découlent d'un incident survenu après la <strong>&quot;date rétroactive&quot;</strong>.</p>
                            <h4 className="font-bold text-primary mt-6">L&apos;importance de la &quot;Tail Coverage&quot;</h4>
                            <p>Si un assuré met fin à sa police &quot;Claims-Made&quot;, il peut acheter une &quot;tail coverage&quot; — une extension permettant de déclarer des réclamations pour des événements survenus pendant la période initiale, même après son expiration. Crucial lors d&apos;une retraite ou d&apos;un changement d&apos;assureur.</p>
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
                                        <TableRow th="Quand l'incident est couvert ?" a="Quand l'incident se produit (pendant la période)." b="Quand la réclamation est déclarée (pendant la période ET après la date rétroactive)." />
                                        <TableRow th="Couverture après fin de police ?" a="OUI, si l'incident s'est produit pendant la période." b="NON, sauf si une 'Tail Coverage' a été achetée." />
                                        <TableRow th="Date Rétroactive ?" a="NON applicable." b="OUI, l'incident doit s'être produit après cette date." />
                                        <TableRow th="Coût (généralement)" a="Plus élevé initialement." b="Moins élevé initialement." />
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