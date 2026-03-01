'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Calendar, Tag } from 'lucide-react';
import Image from 'next/image';
import { Breadcrumb } from '@/components/breadcrumb';

export default function Page() {
    const post = {
        title: "Les frustrations de l'assurance traditionnelle : Pourquoi nous devons changer",
        imageUrl: '/images/blog/frustration-assurance.jpg',
        category: 'Expérience Client',
        date: '2024-07-25',
        content: `
            <p>En tant qu\'acteur du secteur de l\'assurance depuis des années, j\'ai partagé et entendu de nombreuses frustrations concernant les processus traditionnels. Chez RapidAssur, nous sommes nés de ces frustrations, avec la conviction qu\'il existe une meilleure façon de faire. Voici les points de friction les plus courants et comment nous les abordons.</p>

            <h2 class="text-2xl font-bold my-4">1. La Lenteur et l'Opacité des Soumissions</h2>
            <p><strong>La frustration :</strong> Attendre des jours, voire des semaines, pour une soumission d'assurance est un non-sens à l'ère du numérique. Le processus est souvent une "boîte noire" où les informations disparaissent chez l'assureur pour en ressortir plus tard, sans visibilité pour le client ou même le courtier.</p>
            <p><strong>Notre solution :</strong> La rapidité est notre nom. En automatisant l'extraction et l'analyse des données, nous pouvons générer des analyses de risque et des recommandations en quelques minutes, pas en quelques semaines. Notre plateforme est conçue pour être un "copilote" qui offre une transparence totale sur l'état d'avancement du dossier.</p>

            <h2 class="text-2xl font-bold my-4">2. La Saisie Manuelle et Répétitive des Données</h2>
            <p><strong>La frustration :</strong> Les entrepreneurs doivent remplir des formulaires interminables, souvent en fournissant les mêmes informations encore et encore. C'est une perte de temps et une source d'erreurs. Les courtiers eux-mêmes passent une grande partie de leur temps sur cette tâche à faible valeur ajoutée.</p>
            <p><strong>Notre solution :</strong> Nous connectons les sources de données publiques (comme le REQ) pour pré-remplir les informations. Notre système est intelligent : il pose une question une seule fois et réutilise l'information lorsque c'est pertinent. Le but est de réduire la saisie manuelle de plus de 80%, libérant ainsi l'entrepreneur et le courtier pour qu'ils se concentrent sur la stratégie de gestion des risques.</p>

            <h2 class="text-2xl font-bold my-4">3. Le Manque de Personnalisation</h2>
            <p><strong>La frustration :</strong> Les polices d'assurance sont souvent des produits "taille unique" qui ne correspondent pas aux réalités spécifiques d'une entreprise. Un entrepreneur spécialisé en excavation n'a pas les mêmes risques qu'un consultant en TI, pourtant leurs formulaires de base se ressemblent étrangement.</p>
            <p><strong>Notre solution :</strong> En analysant finement les données de l'entreprise et en les croisant avec notre base de connaissances des risques par industrie, nous pouvons identifier les couvertures réellement nécessaires et éliminer les superflus. Chaque recommandation est sur-mesure, ce qui se traduit par une meilleure protection et souvent, des économies.</p>

            <h2 class="text-2xl font-bold my-4">4. La Difficulté à Gérer la Conformité</h2>
            <p><strong>La frustration :</strong> Naviguer dans le labyrinthe des exigences légales et réglementaires (Loi 25, GCR, etc.) est un casse-tête. Le fardeau de la preuve et de la documentation repose entièrement sur l'entreprise, avec peu de soutien de la part de l'assureur.</p>
            <p><strong>Notre solution :</strong> Notre plateforme intègre les exigences de conformité. Par exemple, pour la Loi 25, nous assurons que les données sensibles sont traitées localement sur le poste du client pour garantir la confidentialité. Nous créons des journaux d'audit détaillés (logs) pour chaque action, simplifiant ainsi la reddition de comptes. Nous transformons la conformité d'un fardeau en un processus intégré et gérable.</p>

            <h3 class="text-xl font-bold mt-6 mb-2">Conclusion : Il est temps d'exiger mieux</h3>
            <p>Les frustrations liées à l'assurance traditionnelle ne sont pas une fatalité. La technologie existe aujourd'hui pour rendre l'assurance plus rapide, plus transparente, et plus intelligente. C'est notre mission chez RapidAssur. Il est temps que l'industrie se modernise et place enfin l'expérience client au cœur de ses préoccupations.</p>
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
