'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Calendar, Tag } from 'lucide-react';
import Image from 'next/image';
import { Breadcrumb } from '@/components/breadcrumb';

export default function Page() {
    const post = {
        title: "L'Assurance Responsabilité pour les Ordres Professionnels : Une Protection Collective",
        imageUrl: '/images/blog/ordres-professionnels.jpg',
        category: 'Assurance Responsabilité',
        date: '2024-07-23',
        content: `
            <p>Les ordres professionnels jouent un rôle crucial dans la protection du public en encadrant la pratique de leurs membres. Une des pierres angulaires de cette protection est l'obligation pour les membres de détenir une assurance responsabilité professionnelle. Mais comment fonctionnent ces régimes collectifs ?</p>

            <h2 class="text-2xl font-bold my-4">Le Rôle de l'Ordre Professionnel</h2>
            <p>L'ordre professionnel négocie un contrat d'assurance collectif pour l'ensemble de ses membres. Cette approche présente plusieurs avantages :</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Protection du public :</strong> Elle garantit que toute personne faisant appel à un membre de l'ordre aura un recours financier en cas de faute professionnelle.</li>
                <li><strong>Mutualisation du risque :</strong> En regroupant tous les membres, le risque est réparti, ce qui permet généralement d'obtenir des primes plus avantageuses que si chaque membre devait s'assurer individuellement.</li>
                <li><strong>Couverture adaptée :</strong> Le contrat est spécifiquement négocié pour couvrir les risques inhérents à la profession, offrant une protection plus pertinente qu'un contrat standard.</li>
            </ul>

            <h2 class="text-2xl font-bold my-4">Que couvre l'assurance de l'ordre ?</h2>
            <p>Typiquement, le régime de base de l'ordre couvre les fautes, erreurs ou omissions commises dans l'exercice normal des activités réglementées par l'ordre. Cependant, il y a des limites.</p>
            <p><strong>Ce qui n'est souvent pas couvert :</strong></p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Les activités hors du champ de pratique :</strong> Si un professionnel exerce des activités non réglementées par son ordre, celles-ci ne sont généralement pas couvertes.</li>
                <li><strong>Les limites d'assurance :</strong> La limite de base peut être insuffisante pour des mandats d'envergure ou pour des clients qui exigent des montants de couverture plus élevés.</li>
                <li><strong>Les exclusions spécifiques :</strong> Le contrat peut contenir des exclusions pour certains types de risques (par exemple, la fraude, les actes intentionnels, etc.).</li>
            </ul>

            <h2 class="text-2xl font-bold my-4">Avez-vous besoin d'une assurance complémentaire ?</h2>
            <p>Pour de nombreux professionnels, l'assurance de base de leur ordre est un excellent point de départ, mais elle n'est pas toujours suffisante. C'est là qu'intervient l'assurance "excédentaire" ou "complémentaire".</p>
            <p>Vous devriez envisager une assurance complémentaire si :</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Vos contrats l'exigent :</strong> De plus en plus de clients, notamment les grandes entreprises et les organismes publics, exigent des limites d'assurance plus élevées.</li>
                <li><strong>Vos activités dépassent le cadre de l'ordre :</strong> Vous offrez des services-conseils qui ne sont pas strictement définis par votre profession ? Une police complémentaire est essentielle.</li>
                <li><strong>Vous voulez une protection accrue :</strong> Une assurance complémentaire peut offrir une paix d'esprit supplémentaire, surtout si vous travaillez sur des projets à haut risque.</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-2">Conclusion</h3>
            <p>L'assurance responsabilité fournie par votre ordre professionnel est un filet de sécurité indispensable. Cependant, il est crucial de ne pas la considérer comme une solution universelle. Analysez attentivement vos activités et vos contrats pour déterminer si une assurance complémentaire est nécessaire pour combler les lacunes et vous offrir une protection à toute épreuve.</p>
        `
    };

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
