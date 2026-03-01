'use client';
import React from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Breadcrumb } from '@/components/breadcrumb';
import Image from 'next/image';
import OccurrenceClaimsMadeQuiz from '@/components/quiz/occurrence-claims-made-quiz';

const Section: React.FC<{ title: string; children: React.ReactNode; id: string }> = ({
title, children, id }) => (
    <section id={id} className="mt-10">
        <h2 className="text-3xl font-bold text-primary !mb-6 border-b-2 border-primary/20 pb-3">{title}</h2>
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 prose-p:leading-relaxed prose-strong:text-primary">
            {children}
        </div>
    </section>
);

const TableRow: React.FC<{ th: string; a: string; b: string; }> = ({ th, a, b }) => (
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
                                { label: "Occurrence vs. Claims-Made" },
                            ]}
                        />
                    </div>
                    <article className="bg-background rounded-2xl shadow-lg border border-border/50 p-8 sm:p-12">
                        <header className="mb-8">
                            <h1 className="text-4xl font-bold text-primary mb-2">Comprendre la
différence : Polices d'assurance "Occurrence" vs. "Claims-Made"</h1> <p className="text-lg text-muted-foreground">Le guide du courtier débutant</p> </header>    <div className="prose prose-lg max-w-none text-muted-foreground space-y-6"> <p className="lead"> Bienvenue, futur as de l'assurance ! Si vous débutez dans ce monde
fascinant, vous avez probablement déjà rencontré une multitude de termes
techniques. Aujourd'hui, nous allons nous attaquer à deux concepts fondamentaux qui sont souvent une source de confusion : les polices d'assurance « Occurrence »
et « Claims-Made ». Ne vous inquiétez pas, je suis là pour vous guider pas à pas,
avec quelques images pour éclairer le chemin !
                            </p>
                        </div>

                        <Section title="1. La Police 'Occurrence' : La couverture 'quand ça arrive'" id="occurrence">
                            <div className="relative w-full h-56 rounded-lg overflow-hidden my- 4">
                                <Image src="https://picsum.photos/seed/occurrence/800/400"
layout="fill" objectFit="cover" alt="Illustration pour la police Occurrence" data-ai-
hint="calendar event" />
                            </div>
                            <p>Une police "Occurrence" est conçue pour couvrir les incidents qui
se produisent <strong>pendant la période de validité de la police</strong>, quel
que soit le moment où la réclamation est signalée. C'est un peu comme une capsule temporelle : tant que l'événement dommageable s'est produit pendant que la police était active, la couverture est là, même si la réclamation est déposée des années plus tard.</p>  <h4 className="font-bold text-primary">Exemple concret :</h4> <ul className="list-disc pl-5 space-y-2"> <li>Votre client avait une police "Occurrence" du 1er janvier 2020 au 31 décembre 2020.</li> <li>Un incident (par exemple, un défaut de construction qui cause des dégâts) se produit le 15 juin 2020.</li> <li>La police de votre client est annulée ou il change d'assureur le
1er janvier 2021.</li>
                                <li>Le 1er mars 2023, la victime découvre les dégâts et dépose une
réclamation.</li>
                                <li><strong>Résultat :</strong> Même si la réclamation est déposée
en 2023, la police "Occurrence" de 2020 couvrirait l'incident, car l'événement
déclencheur (l'occurrence) a eu lieu pendant sa période de validité.</li> </ul> </Section>  <Section title='2. La Police "Claims-Made" : La couverture "quand on déclare"' id="claims-made"> <div className="relative w-full h-56 rounded-lg overflow-hidden my- 4"> <Image src="https://picsum.photos/seed/claims-made/800/400" layout="fill" objectFit="cover" alt="Illustration pour la police Claims-Made" data-ai- hint="file report" /> </div> <p>Une police "Claims-Made" couvre les réclamations qui sont <strong>déclarées pendant la période de validité de la police</strong> et qui découlent d'un incident qui s'est produit à partir d'une date spécifique appelée
<strong>"date rétroactive"</strong>.</p>
                            <h4 className="font-bold text-primary">Exemple concret :</h4>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Votre client a une police "Claims-Made" du 1er janvier 2020 au
31 décembre 2020, avec une date rétroactive du 1er janvier 2018.</li>


                                <li>Un incident se produit le 15 juin 2020 (donc après la date
rétroactive).</li>
                                <li>La police de votre client est annulée le 31 décembre 2020.</li>
                                <li>Le 1er mars 2021, la victime découvre les dégâts et dépose une
réclamation.</li>
                                <li><strong>Résultat :</strong> La réclamation NE SERAIT PAS
couverte, car elle a été déposée APRES la fin de la période de validité de la police.
C'est ici que la "Tail Coverage" devient essentielle.</li> </ul>  <h4 className="font-bold text-primary mt-6">L'importance de la
"Tail Coverage" (ou "Période de Déclaration Prolongée")</h4>
                             <p>Si un assuré met fin à sa police "Claims-Made", il peut acheter une
"tail coverage". C'est une extension qui permet de déclarer des réclamations pour des événements survenus pendant la période de la police initiale, même après son expiration. C'est crucial lors d'une retraite ou d'un changement d'assureur.</p> </Section>  <Section title="Tableau Récapitulatif" id="recap"> <div className="overflow-x-auto"> <table className="min-w-full bg-white border"> <thead> <tr className="bg-secondary/30"> <th className="px-4 py-2 text-left">Caractéristique</th> <th className="px-4 py-2 text-left">Police "Occurrence"</th> <th className="px-4 py-2 text-left">Police "Claims- Made"</th> </tr> </thead> <tbody> <TableRow th="Quand l'incident est couvert ?" a="Quand
l'incident se produit (pendant la période de la police)." b="Quand la réclamation est déclarée (pendant la période de la police ET l'incident s'est produit après la date rétroactive)." /> <TableRow th="Couverture après fin de police ?" a="OUI, si l'incident s'est produit pendant la période." b="NON, sauf si une 'Tail Coverage' a été achetée." /> <TableRow th="Date Rétroactive ?" a="NON applicable." b="OUI, l'incident doit s'être produit après cette date." /> <TableRow th="Coût (généralement)" a="Plus élevé initialement." b="Moins élevé initialement." /> <TableRow th="Risque pour l'assuré" a="Moins complexe,
couverture 'automatique' pour les incidents passés." b="Nécessite une
compréhension de la 'tail coverage' et de la date rétroactive." /> </tbody> </table> </div> </Section>  <div className="!mt-12"> <OccurrenceClaimsMadeQuiz /> </div>  </article> </div> </main> <Footer /> </div>   --chart-3: 30 80% 55%; --chart-4: 280 65% 60%; --chart-5: 340 75% 55%; --sidebar-background: 240 5.9% 10%; --sidebar-foreground: 240 4.8% 95.9%; --sidebar-primary: 224.3 76.3% 48%; --sidebar-primary-foreground: 0 0% 100%; --sidebar-accent: 240 3.7% 15.9%; --sidebar-accent-foreground: 240 4.8% 95.9%; --sidebar-border: 240 3.7% 15.9%; --sidebar-ring: 217.2 91.2% 59.8%; } }  @layer base { * { @apply border-border; } body { @apply bg-background text-foreground font-body antialiased; } h1 { @apply font-headline; } }  @layer components { .glowing-btn { position: relative; color: white; transition: all 0.3s; background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent))); } .glowing-btn::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent))); background-size: 400% 400%; border-radius: inherit; filter: blur(8px); opacity: 0.75; z-index: -1; animation: glowing 20s linear infinite; } .glowing-btn::after { content: ''; position: absolute; top: 0;   left: 0; width: 100%; height: 100%; background: inherit; border-radius: inherit; z-index: -1; }  .glowing-btn-alt { position: relative; color: white; transition: all 0.3s; background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent))); } .glowing-btn-alt::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent))); background-size: 400% 400%; border-radius: inherit; filter: blur(8px); opacity: 0.75; z-index: -1; animation: glowing 20s linear infinite; } .glowing-btn-alt::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: inherit; border-radius: inherit; z-index: -1; }  .shine-button { position: relative; display: inline-block; color: white; background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent))); border: none; border-radius: 0.75rem; /* rounded-xl */ cursor: pointer; overflow: hidden; box-shadow: 0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--accent)); transition: background 0.3s ease, box-shadow 0.3s ease;   }  .shine-button::before { content: ''; position: absolute; top: -50%; left: -25%; width: 50%; height: 200%; background: linear-gradient( 120deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0.4) 100% ); transform: skewX(-25deg); animation: shine 3.5s linear infinite; }  .shine-button:hover { background: linear-gradient(135deg, hsl(var(--primary) / 0.9), hsl(var(--accent) / 0.9)); box-shadow: 0 0 18px hsl(var(--primary)), 0 0 35px hsl(var(--accent)); }  .rome-button { background-color: hsl(var(--primary)); box-shadow: 0 4px hsl(210 100% 15%); transition: all 0.1s ease-in-out; user-select: none; } .rome-button:hover { background-color: hsl(210 100% 25%); } .rome-button:active { box-shadow: 0 2px hsl(210 100% 15%); transform: translateY(2px); }  .signature-font { font-family: 'Arizonia', cursive; } .text-gold-gradient { background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-fill-color: transparent; } .text-blue-signature { font-family: 'Arizonia', cursive;   color: hsl(var(--primary)); } }  @layer utilities { .text-glow { @apply bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent; } }  @keyframes glowing { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }  @keyframes shine { 0% { left: -25%; } 100% { left: 125%; } }  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .no-print, header, footer { display: none !important; } .page-break { page-break-before: always; } .prose { font-size: 10pt; line-height: 1.4; } h1 { font-size: 24pt !important; } h2 { font-size: 18pt !important; } h3 { font-size: 14pt !important; } h4 { font-size: 12pt !important; } article { box-shadow: none !important; border: none !important; padding: 0 !important; } } 