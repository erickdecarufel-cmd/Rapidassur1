'use client';
import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Breadcrumb } from '@/components/breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
    Bot, Building2, RefreshCw, BookOpen, Car, AlertTriangle,
    FileText, Users, Search, ArrowRight, HardHat
} from 'lucide-react';
import Link from 'next/link';

const PortalCard = ({ href, title, description, icon, badge }: {
    href: string; title: string; description: string;
    icon: React.ReactNode; badge?: string;
}) => (
    <Link href={href} className="block group">
        <Card className="h-full hover:border-accent hover:shadow-lg transition-all duration-300">
            <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-3 group-hover:text-accent">
                    {icon}{title}
                    {badge && <span className="ml-auto text-xs font-normal bg-accent/10 text-accent px-2 py-0.5 rounded-full">{badge}</span>}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
                <div className="text-sm font-semibold text-accent mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Accéder <ArrowRight className="h-4 w-4" />
                </div>
            </CardContent>
        </Card>
    </Link>
);

export default function InternalPortalPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-5xl mx-auto space-y-10">
                    <Breadcrumb items={[{ label: 'Portail Clic+Pro' }]} />
                    <header className="text-center space-y-3">
                        <div className="inline-block p-4 bg-primary/10 rounded-full mb-2">
                            <HardHat className="h-12 w-12 text-primary" />
                        </div>
                        <h1 className="text-4xl font-bold text-primary">Portail Clic+Pro</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Votre espace de travail intégré — outils d&apos;analyse, guides de soumission et suivi des dossiers.
                        </p>
                    </header>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Outils & Analyse</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <PortalCard href="/internal/outils" title="Outils Internes"
                                icon={<Bot className="h-5 w-5" />}                          
                                description="Analyseur de texte IA, évaluation COPE, calculateur de ventilation des coûts." />
                            <PortalCard href="/internal/analyse-renouvellements" title="Analyse des Renouvellements"
                                icon={<RefreshCw className="h-5 w-5" />}                                
                                description="Identifiez les renouvellements à risque et préparez vos arguments de rétention." />
                            <PortalCard href="/assurance-automobile/transactions" title="Transactions Auto"
                                icon={<Car className="h-5 w-5" />}                                
                                description="Nouvelles affaires et avenants automobile — workflow complet." />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Guides & Souscription</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <PortalCard href="/guides" title="Guides de Soumission"
                                icon={<BookOpen className="h-5 w-5" />}                                
                                description="Guides pratiques par type de risque : entrepreneur général, toiture, inspecteur." />
                            <PortalCard href="/internal/bloquants-souscription" title="Guide des Bloquants"
                                icon={<AlertTriangle className="h-5 w-5" />}                                
                                description="50+ métiers de la construction — risques, conseils et drapeaux rouges." badge="Nouveau" />
                            <PortalCard href="/internal/coordonnees-assureurs" title="Mon Bottin"
                                icon={<Users className="h-5 w-5" />}                                
                                description="Coordonnées des souscripteurs clés par compagnie d\'assurance." />
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}