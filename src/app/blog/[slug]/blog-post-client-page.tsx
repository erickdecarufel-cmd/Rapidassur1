'use client'



import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import SoftCostsCalculatorTeaser from '@/components/calculators/soft-costs-teaser';
import GovernanceControversyTeaser from '@/components/teasers/governance-controversy-teaser';
import BuildingInspectorBlogTeaser from '@/components/teasers/building-inspector-teaser';
import AutoconstructionChecklist from '@/components/teasers/autoconstruction-checklist';
import AccompagnementTeaser from '@/components/teasers/accompagnement-teaser';
import ConstructionRoleQuizCTA from '@/components/teasers/construction-role-quiz-cta';
import { Breadcrumb } from '@/components/breadcrumb';
import dynamic from 'next/dynamic';
import { PageLayout } from '@/components/page-layout';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// This component dynamically loads other pages based on the slug.
// It's marked as a client component to handle this dynamic logic. const CustomPageLoader = ({ slug }: { slug: string }) => { const Component = React.useMemo(() => { // A static map is needed for Next.js dynamic imports to work correctly. const pathMap: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = { 'assurance-chantier-tous-risques': () => import(`@/app/assurance-chantier- tous-risques/page`), 'analyse-assurance-chantier': () => import(`@/app/blog/analyse-assurance- chantier/page`), 'assurance-pollution-chantier': () => import(`@/app/blog/assurance- pollution-chantier/page`), 'agences-de-placement-en-assurance': () => import(`@/app/blog/agences- de-placement-en-assurance/page`), 'cas-speciaux': () => import(`@/app/blog/cas-speciaux/page`), 'gouvernance-au-coeur-de-la-controverse': () => import(`@/app/blog/gouvernance-au-coeur-de-la-controverse/page`), 'types-consultants-couverts': () => import(`@/app/blog/types-consultants- couverts/page`), 'inspecteurs-batiment-nouvelles-regles-2027': () => import(`@/app/blog/inspecteurs-batiment-nouvelles-regles-2027/page`), 'assurance-frais-supplementaires-soft-costs': () => import(`@/app/blog/assurance-frais-supplementaires-soft-costs/page`), 'synthese-marche-assurance-2025': () => import(`@/app/blog/synthese- marche-assurance-2025/page`), 'exclusions-rcg': () => import(`@/app/blog/exclusions-rcg/page`), 'metiers-construction-risques-assurances': () => import(`@/app/blog/metiers-construction-risques-assurances/page`), 'quest-ce-que-le-cautionnement': () => import(`@/app/blog/quest-ce-que-le- cautionnement/page`), 'assurance-pros/fiche-conseil-soumission': () => import(`@/app/blog/assurance-pros/fiche-conseil-soumission/page`),   'assurance-pros/guide-prevention-risques': () => import(`@/app/assurance- pros/guide-prevention-risques/page`), 'assurance-pros/analyse-vision-erick-de-carufel': () => import(`@/app/assurance-pros/analyse-vision-erick-de-carufel/page`), 'assurance-pros/difficultes-de-placement': () => import(`@/app/assurance- pros/difficultes-de-placement/page`), 'assurance-wrap-up-expliquee': () => import(`@/app/blog/assurance-wrap- up-expliquee/page`), 'les-extensions-meconnues-en-rcg': () => import(`@/app/blog/les-extensions- meconnues-en-rcg/page`), 'assurance-3d-fraude-entreprise': () => import(`@/app/blog/assurance-3d- fraude-entreprise/page`), 'guide-assurance-entrepreneur-specialise': () => import(`@/app/blog/guide- assurance-entrepreneur-specialise/page`), 'guide-assurance-entrepreneur-general': () => import(`@/app/blog/guide- assurance-entrepreneur-general/page`), 'reussir-son-projet-d-autoconstruction-les-assurances-cles': () => import(`@/app/blog/reussir-son-projet-d-autoconstruction-les-assurances- cles/page`), 'autoconstruction-gcr': () => import(`@/app/blog/autoconstruction- gcr/page`), 'guide-assurance-gestionnaire-projet': () => import(`@/app/blog/guide- assurance-gestionnaire-projet/page`), 'assurance-sur-mesure-economies': () => import(`@/app/blog/assurance-sur- mesure-economies/page`), 'risques-hasardeux-construction': () => import(`@/app/blog/risques- hasardeux-construction/page`), 'engagements-formels-assurance-construction': () => import(`@/app/blog/engagements-formels-assurance-construction/page`), 'ecosysteme-assurance-nouvelle-generation': () => import(`@/app/blog/ecosysteme-assurance-nouvelle-generation/page`), 'phenomene-assurance-dommages-quebec': () => import(`@/app/blog/phenomene-assurance-dommages-quebec/page`), 'coup-de-maitre-assurance-quebec': () => import(`@/app/blog/coup-de- maitre-assurance-quebec/page`), 'ce-que-je-demande-a-un-courtier-en-2026': () => import(`@/app/blog/ce- que-je-demande-a-un-courtier-en-2026/page`), 'frustrations-assureurs-traditionnels': () => import(`@/app/blog/frustrations- assureurs-traditionnels/page`), 'l-activite-professionnelle-en-assurance-responsabilite': () => import(`@/app/blog/l-activite-professionnelle-en-assurance- responsabilite/page`), 'l-assurance-responsabilite-pour-les-ordres-professionnels': () => import(`@/app/blog/l-assurance-responsabilite-pour-les-ordres- professionnels/page`), 'l-interpretation-du-contrat-d-assurance-responsabilite-professionnelle': () => import(`@/app/blog/l-interpretation-du-contrat-d-assurance-responsabilite- professionnelle/page`), 'assurance-cyber-risques': () => import(`@/app/assurance-cyber- risques/page`), 'metier': () => import(`@/app/blog/metier/[metierId]/page`), // For profession- specific blogs 'sinistre': () => import(`@/app/sinistre/page`), 'occurrence-vs-claims-made': () => import(`@/app/blog/occurrence-vs- claims-made/page`), 'risques-poussiere-industrie-bois': () => import('@/app/blog/risques-
poussiere-industrie-bois/page'), 'assurance-entreprise-les-fondamentaux': () => import('@/app/blog/assurance-entreprise-les-fondamentaux/page'), 'assurance-biens-confies-soin-garde-controle': () => import('@/app/blog/assurance-biens-confies-soin-garde-controle/page'), };    let loadComponent; if (slug.startsWith('metier/')) { loadComponent = pathMap['metier']; } else { loadComponent = pathMap[slug]; }  if (!loadComponent) { return () => <div>Page en construction.</div>; }  // Dynamically import the component with a loading skeleton. return dynamic(loadComponent, { loading: () => ( <div className="flex flex-col min-h-screen"> <Header /> <PageLayout className="container mx-auto px-4 py-12"> <PageLayout.Main> <Skeleton className="h-8 w-1/2 mb-4" /> <Skeleton className="h-96 w-full mb-6" /> <Skeleton className="h-6 w-3/4 mb-4" /> <Skeleton className="h-6 w-full mb-2" /> <Skeleton className="h-6 w-full mb-2" /> <Skeleton className="h-6 w-5/6" /> </PageLayout.Main> </PageLayout> <Footer /> </div> ), ssr: false // Render these custom pages on the client side }); }, [slug]);  return <Component />; }   export function BlogPostClientPage({ slug, post, isCustom }: { slug: string, post: any, isCustom: boolean }) {  if (!post && !isCustom) { return ( <div className="flex flex-col min-h-screen"> <Header /> <main className="flex-grow container mx-auto px-4 py-12 text-center"> <h1 className="text-4xl font-bold text-primary mb-4">Article non trouvé</h1> <p className="text-muted-foreground mb-8">Désolé, l'article que vous
cherchez n'existe pas ou a été déplacé.</p> <Button asChild> <Link href="/blog"> <ArrowLeft className="mr-2 h-4 w-4" />   Retour au blog </Link> </Button> </main> <Footer /> </div> ); }  // If `post` data is provided, it's a standard blog post.
  if (post) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
              <article className="max-w-4xl mx-auto">
                  <header className="mb-8">
                       <div className="mb-4">
                          <Breadcrumb
                              items={[
                                  { label: 'Blog de la lecture durant votre vol', href: '/blog' },
                                  { label: post.title },
                              ]}
                          />
                      </div>

                      <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-6">
                           <Image
                              src={post.imageUrl}
                              alt={`Illustration pour l'article : ${post.title}`}
                              fill
                              style={{ objectFit: 'cover' }}
                              data-ai-hint={post.dataAiHint}
                              priority
                          />
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center">
                              <Tag className="mr-2 h-4 w-4 text-accent" />
                              <span>{post.category}</span>
                          </div>
                          <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-accent" />
                              <span>{post.date}</span>
                          </div>
                      </div>

                      <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight">


                                    <li>L'agriculture (fourrage, céréales, gazon, tabac, production laitière, etc.);</li> <li>De l'horticulture (légumes, fruits, fleurs, arbres, arbustes,
culture en serre, etc.);</li>
                                    <li>L'apiculture (abeilles);</li> <li>L'aviculture (oiseaux, volailles);</li>
                                    <li>L'acériculture (érablière);</li> <li>L'aquiculture (espèces ou plantes aquatiques,
pisciculture);</li>
                                    <li>La partie boisée de l'exploitation agricole (par exemple : arbres de Noël);</li> <li>L'élevage d'animaux à fourrure, de l'élevage de chevaux ou de
l'élevage d'animaux pouvant servir à l'alimentation humaine;</li> <li>Toute activité liée à la reproduction d'animaux destinés à
l'alimentation humaine.</li> </ul> <p> En principe, les exploitations agricoles se trouvent en territoire agricole (une pépinière urbaine ou une écurie urbaine pourraient difficilement se prévaloir de cette exemption). </p> <p> L'exploitant agricole et l'entrepreneur n'ont pas l'obligation de détenir une licence pour exécuter des travaux de construction sur des bâtiments, équipements, installations ou ouvrages qui sont érigés sur une exploitation agricole (exemples : maison de l'exploitant et ses annexes, garage, grange, étable, fosse à
purin, pont, serre), sauf pour les installations électriques ou celles destinées à
utiliser ou à distribuer du gaz. Dans ce cas, ils doivent détenir la licence appropriée.
                                </p>
                            </blockquote>
                            <AgricultureLicenseQuizCTA />
                        </Section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SpecialCasesBlog;
