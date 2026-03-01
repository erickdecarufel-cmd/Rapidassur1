'use client';
import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Breadcrumb } from '@/components/breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
    Bot, Building2, RefreshCw, BookOpen, Car, AlertTriangle,
    FileText, Users, Search, ArrowRight, HardHat, LayoutDashboard,
    TrendingUp, Wrench, Shield, Newspaper
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
                    Acceder <ArrowRight className="h-4 w-4" />
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

                    {/* En-tete */}
                    <header className="text-center space-y-3">
                        <div className="inline-block p-4 bg-primary/10 rounded-full mb-2">
                            <HardHat className="h-12 w-12 text-primary" />
                        </div>
                        <h1 className="text-4xl font-bold text-primary">Portail Clic+Pro</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Votre espace de travail integre -- outils d&apos;analyse, guides de soumission et suivi des dossiers.
                        </p>
                    </header>

                    {/* Dashboard hero card */}
                    <section>
                        <Link href="/internal/dashboard" className="block group">
                            <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 p-8 transition-all duration-300 hover:border-accent hover:shadow-xl"
                                style={{ background: 'linear-gradient(135deg, rgba(0,51,102,0.06) 0%, rgba(37,99,235,0.08) 100%)' }}>
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                    <div className="flex items-start gap-5">
                                        <div className="p-4 rounded-xl bg-primary/10 shrink-0">
                                            <LayoutDashboard className="h-10 w-10 text-primary" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h2 className="text-2xl font-bold text-primary">Dashboard Courtier</h2>
                                                <span className="text-xs font-semibold bg-green-500/15 text-green-700 px-3 py-1 rounded-full">Live</span>
                                            </div>
                                            <p className="text-muted-foreground max-w-xl">
                                                KPIs en temps reel, 10 secteurs JotForm actifs, soumissions recentes et outils rapides.
                                                ROI 22 500$/an -- Payback moins de 3 mois.
                                            </p>
                                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5 text-accent" /> 47 soumissions ce mois</span>
                                                <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-green-600" /> 83% taux de conversion</span>
                                                <span className="flex items-center gap-1"><Wrench className="h-3.5 w-3.5 text-primary" /> 1 317 champs actifs</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all shrink-0">
                                        Ouvrir le Dashboard <ArrowRight className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </section>

                    {/* Outils & Analyse */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Outils &amp; Analyse</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <PortalCard href="/internal/outils" title="Outils Internes"
                                icon={<Bot className="h-5 w-5" />}
                                description="Analyseur de texte IA, evaluation COPE, calculateur de ventilation des couts." />
                            <PortalCard href="/internal/analyse-renouvellements" title="Analyse des Renouvellements"
                                icon={<RefreshCw className="h-5 w-5" />}
                                description="Identifiez les renouvellements a risque et preparez vos arguments de retention." />
                            <PortalCard href="/assurance-automobile/transactions" title="Transactions Auto"
                                icon={<Car className="h-5 w-5" />}
                                description="Nouvelles affaires et avenants automobile -- workflow complet." />
                        </div>
                    </section>

                    {/* Guides & Souscription */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Guides &amp; Souscription</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <PortalCard href="/guides" title="Guides de Soumission"
                                icon={<BookOpen className="h-5 w-5" />}
                                description="Guides pratiques par type de risque : entrepreneur general, toiture, inspecteur." />
                            <PortalCard href="/internal/bloquants-souscription" title="Guide des Bloquants"
                                icon={<AlertTriangle className="h-5 w-5" />}
                                description="50+ metiers de la construction -- risques, conseils et drapeaux rouges." badge="Nouveau" />
                            <PortalCard href="/internal/propositions-nouvelles-affaires" title="Propositions"
                                icon={<FileText className="h-5 w-5" />}
                                description="Nouvelles affaires -- generez et suivez vos propositions clients." />
                        </div>
                    </section>

                    {/* Blog & Ressources */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Ressources &amp; Blog</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <PortalCard href="/blog" title="Articles du Blog"
                                icon={<Newspaper className="h-5 w-5" />}
                                description="Conseils pratiques, analyses de marche et actualites en assurance commerciale." />
                            <PortalCard href="/guides" title="Guides Assurance"
                                icon={<Search className="h-5 w-5" />}
                                description="Recherchez par secteur -- construction, flotte, immobilier, professionnel." />
                            <PortalCard href="/extraction" title="Extracteur IA"
                                icon={<Bot className="h-5 w-5" />}
                                description="Analysez des documents PDF -- extraction automatique des donnees cles." badge="IA" />
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
}
