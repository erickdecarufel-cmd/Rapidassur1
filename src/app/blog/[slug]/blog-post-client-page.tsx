'use client'

import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { Breadcrumb } from '@/components/breadcrumb';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CustomPageLoader = ({ slug }: { slug: string }) => {
    const Component = React.useMemo(() => {
        const pathMap: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
            'assurance-chantier-tous-risques': () => import(`@/app/assurance-chantier-tous-risques/page`),
            'analyse-assurance-chantier': () => import(`@/app/blog/analyse-assurance-chantier/page`),
            'assurance-pollution-chantier': () => import(`@/app/blog/assurance-pollution-chantier/page`),
            'agences-de-placement-en-assurance': () => import(`@/app/blog/agences-de-placement-en-assurance/page`),
            'cas-speciaux': () => import(`@/app/blog/cas-speciaux/page`),
            'gouvernance-au-coeur-de-la-controverse': () => import(`@/app/blog/gouvernance-au-coeur-de-la-controverse/page`),
            'types-consultants-couverts': () => import(`@/app/blog/types-consultants-couverts/page`),
            'inspecteurs-batiment-nouvelles-regles-2027': () => import(`@/app/blog/inspecteurs-batiment-nouvelles-regles-2027/page`),
            'assurance-frais-supplementaires-soft-costs': () => import(`@/app/blog/assurance-frais-supplementaires-soft-costs/page`),
            'synthese-marche-assurance-2025': () => import(`@/app/blog/synthese-marche-assurance-2025/page`),
            'exclusions-rcg': () => import(`@/app/blog/exclusions-rcg/page`),
            'metiers-construction-risques-assurances': () => import(`@/app/blog/metiers-construction-risques-assurances/page`),
            'quest-ce-que-le-cautionnement': () => import(`@/app/blog/quest-ce-que-le-cautionnement/page`),
            'assurance-pros/fiche-conseil-soumission': () => import(`@/app/blog/assurance-pros/fiche-conseil-soumission/page`),
            'ce-que-je-demande-a-un-courtier-en-2026': () => import(`@/app/blog/ce-que-je-demande-a-un-courtier-en-2026/page`),
            'frustrations-assureurs-traditionnels': () => import(`@/app/blog/frustrations-assureurs-traditionnels/page`),
            'l-activite-professionnelle-en-assurance-responsabilite': () => import(`@/app/blog/l-activite-professionnelle-en-assurance-responsabilite/page`),
            'l-assurance-responsabilite-pour-les-ordres-professionnels': () => import(`@/app/blog/l-assurance-responsabilite-pour-les-ordres-professionnels/page`),
            'l-interpretation-du-contrat-d-assurance-responsabilite-professionnelle': () => import(`@/app/blog/l-interpretation-du-contrat-d-assurance-responsabilite-professionnelle/page`)
        };

        let loadComponent;
        if (slug.startsWith('metier/')) {
            loadComponent = pathMap['metier'];
        } else {
            loadComponent = pathMap[slug];
        }
        if (!loadComponent) {
            return () => <div className="flex flex-col min-h-screen"><Header /><main className="flex-grow container mx-auto px-4 py-12 text-center"><p>Page en construction.</p></main><Footer /></div>;
        }
        return dynamic(loadComponent, {
            loading: () => (
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow container mx-auto px-4 py-12 space-y-4">
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-96 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-full" />
                    </main>
                    <Footer />
                </div>
            ),
            ssr: false
        });
    }, [slug]);

    return <Component />;
};

export function BlogPostClientPage({ slug, post, isCustom }: { slug: string; post: any; isCustom: boolean }) {
    if (!post && !isCustom) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-12 text-center">
                    <h1 className="text-4xl font-bold text-primary mb-4">Article non trouvé</h1>
                    <p className="text-muted-foreground mb-8">Désolé, cet article n&apos;existe pas ou a été déplacé.</p>
                    <Button asChild><Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" />Retour au blog</Link></Button>
                </main>
                <Footer />
            </div>
        );
    }

    if (isCustom) {
        return <CustomPageLoader slug={slug} />;
    }

    if (post) {
        return (
            <div className="flex flex-col min-h-screen bg-background text-foreground">
                <Header />
                <main className="flex-grow py-12">
                    <div className="container mx-auto px-4">
                        <article className="max-w-4xl mx-auto">
                            <header className="mb-8">
                                <div className="mb-4">
                                    <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />
                                </div>
                                {post.imageUrl && (
                                    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-6">
                                        <Image src={post.imageUrl} alt={`Illustration : ${post.title}`} fill style={{ objectFit: 'cover' }} priority />
                                    </div>
                                )}
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                                    {post.category && <div className="flex items-center"><Tag className="mr-2 h-4 w-4 text-accent" /><span>{post.category}</span></div>}
                                    {post.date && <div className="flex items-center"><Calendar className="mr-2 h-4 w-4 text-accent" /><span>{post.date}</span></div>}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight">{post.title}</h1>
                            </header>
                            {post.content && (
                                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
                            )}
                        </article>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return null;
}
