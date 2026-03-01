'use client';
import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Breadcrumb } from '@/components/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const guides = [
    {
        title: "Guide de Soumission - Entrepreneur Général",
        description: "Les informations clés pour évaluer les risques d'un entrepreneur général : chiffre d'affaires, sous-traitants et projets spéciaux.",
        href: "/internal/questionnaire-entrepreneur-general"
    },
    {
        title: "Aide à la Proposition - Projet d'Autoconstruction",
        description: "Ce qu'il faut savoir pour bien assurer un projet d'autoconstruction, de la valeur à assurer aux risques spéciaux.",
        href: "/internal/questionnaire-autoconstruction"
    },
    {
        title: "Guide de Souscription - Entrepreneurs en Toiture",
        description: "Les informations nécessaires pour assurer un couvreur, avec un focus sur les types d'application (flamme nue vs. sans flamme).",
        href: "/internal/questionnaire-toiture"
    },
    {
        title: "Guide de Souscription - Inspecteurs en Bâtiment",
        description: "Les informations requises pour assurer un inspecteur, en lien avec les nouvelles réglementations RBQ et les certifications.",
        href: "/internal/questionnaire-inspecteur-batiment"
    }
];

const GuideCard = ({ title, description, href }: { title: string, description: string, href: string }) => (
    <Link href={href} className="block group">
        <Card className="h-full hover:border-accent hover:shadow-lg transition-all duration-300">
            <CardHeader>
                <CardTitle className="text-lg text-primary group-hover:text-accent">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
                <div className="text-sm font-semibold text-accent mt-4 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Consulter le guide <ArrowRight className="h-4 w-4" />
                </div>
            </CardContent>
        </Card>
    </Link>
);

export default function GuidesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
            <header className="space-y-4 mb-8">
                <Breadcrumb
                    items={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Guides' },
                    ]}
                />
                <div className="text-center">
                    <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                        <BookOpen className="h-12 w-12 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary">Guides de Soumission</h1>
                    <p className="text-lg text-muted-foreground mt-2">
                        Préparez votre dossier efficacement. Ces guides vous expliquent pourquoi chaque information est nécessaire pour obtenir la meilleure protection.
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {guides.map((guide) => (
                    <GuideCard key={guide.href} {...guide} />
                ))}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
