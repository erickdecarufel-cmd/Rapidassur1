'use client';
import { Breadcrumb } from '@/components/breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from
'@/components/ui/card';
import { Bot, Calculator, Building2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ToolCard = ({ href, title, description, icon }: { href: string; title: string;
description: string; icon: React.ReactNode }) => (
    <Link href={href} className="block group">
        <Card className="h-full hover:border-accent hover:shadow-lg transition-all duration-300">
            <CardHeader>
                 <CardTitle className="text-xl text-primary flex items-center gap-3">
                    {icon}
                    {title}
                </CardTitle>
            </CardHeader>
             <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    </Link>
);


export default function InternalToolsPage() {
    return (
        <div className="space-y-8">
             <Breadcrumb
                items={[
                    { label: 'Portail Clic+Pro', href: '/internal' },
                    { label: "Outils Internes" },
                ]}
            />
            <header className="text-center">


                <h1 className="text-4xl font-bold text-primary">Outils Internes</h1>
                <p className="text-lg text-muted-foreground mt-2">Votre boîte à outils
pour accélérer l'analyse et la préparation des dossiers.</p> </header>  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> <ToolCard href="/internal/outils/analyseur-de-texte" title="Analyseur de Texte IA" icon={<Bot />} description="Extrayez automatiquement les informations clés d'un texte
brut (courriel, notes) pour pré-remplir vos demandes." /> <ToolCard href="/internal/outils/cope-evaluation" title="Évaluation des Risques COPE" icon={<Building2 />} description="Structurez votre analyse de risque pour un bâtiment en
utilisant le cadre Construction, Occupation, Protection, Exposition." /> <ToolCard href="/outils/calculateur-ventilation-couts" title="Calculateur de Ventilation des Coûts" icon={<Calculator />} description="Ventilez les coûts d'un projet de construction pour estimer la valeur totale à assurer et justifier les montants." /> </div> </div> ); } 