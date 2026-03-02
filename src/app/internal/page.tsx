'''use client''';
import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Edit, RefreshCw, Bot, FileText, Landmark, HardHat, Search, ArrowRight, Workflow, TrendingUp, Car, Briefcase, Utensils, Truck as TruckIcon, Mail, Rocket, ShieldCheck, Gauge, Building2, ShieldOff, FileSignature, Mailbox, Check, Users, FilePlus } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Breadcrumb } from '@/components/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 1. DIALOGUE D'ACTIONS RAPIDES (Mis à jour avec Le Placeur)
const QuickActionsDialog: React.FC<{ isOpen: boolean; onOpenChange: (open: boolean) => void }> = ({ isOpen, onOpenChange }) => {
    const actions = [
        { href: "/internal/mon-marketer", label: "MON MARKETER (Gare de Propulsion)", icon: <Rocket className="text-orange-500" />, highlight: true },
        { href: "/assurance-automobile/transactions", label: "Portail Automobile (Clic+Auto)", icon: <Car /> },
        { href: "/assurance-construction/transactions", label: "Chantier & Construction", icon: <HardHat /> },
        { href: "/assurance-restauration/transactions", label: "Restauration", icon: <Utensils /> },
        { href: "/assurance-automobile/transactions#transport", label: "Transport", icon: <TruckIcon /> },
        { href: "/assurance-pros", label: "Professionnels & Général", icon: <Briefcase /> },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md w-full p-0">
                <DialogHeader className="p-6 text-center items-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-2">
                        <Workflow className="h-7 w-7 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-primary">Actions Rapides</DialogTitle>
                    <DialogDescription>Votre poste de pilotage pour les tâches essentielles.</DialogDescription>
                </DialogHeader>
                <div className="px-6 pb-6 space-y-3">
                    {actions.map(action => (
                        <Button asChild key={action.href} className={`w-full justify-between text-base py-6 ${action.highlight ? 'border-2 border-orange-500 bg-orange-50 hover:bg-orange-100 text-orange-900' : 'rome-button'}`}>
                            <Link href={action.href} onClick={() => onOpenChange(false)}>
                                <span className="flex items-center gap-3">
                                    {action.icon}
                                    {action.label}
                                </span>
                                <ArrowRight />
                            </Link>
                        </Button>
                    ))}
                </div>
                <div className="px-6 pb-4">
                    <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => onOpenChange(false)}>
                        Fermer et voir le cockpit complet
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const WorkflowButton: React.FC<{ href: string; title: string; icon: React.ReactNode; variant?: "secondary" | "outline" | "default" }> = ({ href, title, icon, variant = "secondary" }) => (
    <Button asChild variant={variant} className="w-full justify-start gap-3 text-left h-auto py-2">
        <Link href={href}>
            {icon}
            <span className="truncate">{title}</span>
        </Link>
    </Button>
);

const SubSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div>
        <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
            {icon}
            {title}
        </h4>
        <div className="space-y-2">
            {children}
        </div>
    </div>
);

export default function InternalDashboardPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && !sessionStorage.getItem('quickActionsDialogSeen')) {
            const timer = setTimeout(() => {
                setIsDialogOpen(true);
                sessionStorage.setItem('quickActionsDialogSeen', 'true');
            }, 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleOpenChange = useCallback((open: boolean) => {
        setIsDialogOpen(open);
    }, []);

    return (
        <div className="space-y-8">
            <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Clic+Cockpit' }]} />

            <QuickActionsDialog isOpen={isDialogOpen} onOpenChange={handleOpenChange} />

            <header className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-primary tracking-tight">Le Cockpit du Courtier</h1>
                <p className="text-lg text-muted-foreground">Gestion stratégique, analyse de conformité et propulsion de dossiers.</p>
                <div className="flex justify-center items-center pt-2 gap-4">
                    <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 shadow-lg px-8">
                        <Link href="/internal/mon-marketer">
                            <Rocket className="mr-2 h-5 w-5" /> OUVRIR MON MARKETER
                        </Link>
                    </Button>
                    <Button asChild size="lg">
                        <Link href="/internal/fiche-nominative">
                            <FilePlus className="mr-2 h-4 w-4" /> Créer une Fiche Nominative
                        </Link>
                    </Button>
                </div>
            </header>

            <section>
                <Tabs defaultValue="nouvelle-affaire" className="w-full">
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-auto bg-transparent p-0">
                        <TabsTrigger value="nouvelle-affaire" className="p-4 h-full flex flex-col gap-2 rounded-lg border-2 data-[state=active]:border-primary">
                            <PlusCircle className="h-8 w-8 text-primary"/>
                            <span className="text-base font-semibold">Nouvelle Affaire</span>
                        </TabsTrigger>
                        <TabsTrigger value="modifications" className="p-4 h-full flex flex-col gap-2 rounded-lg border-2 data-[state=active]:border-primary">
                            <Edit className="h-8 w-8 text-primary"/>
                            <span className="text-base font-semibold">Modifications</span>
                        </TabsTrigger>
                        <TabsTrigger value="renouvellement" className="p-4 h-full flex flex-col gap-2 rounded-lg border-2 data-[state=active]:border-primary">
                            <RefreshCw className="h-8 w-8 text-primary"/>
                            <span className="text-base font-semibold">Renouvellement</span>
                        </TabsTrigger>
                        <TabsTrigger value="assistant" className="p-4 h-full flex flex-col gap-2 rounded-lg border-2 data-[state=active]:border-primary">
                            <TrendingUp className="h-8 w-8 text-primary"/>
                            <span className="text-base font-semibold">Assistant Producteur</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="nouvelle-affaire">
                        <Card className="mt-4 border-t-4 border-primary">
                            <CardHeader>
                                <CardTitle>Qualification & Propulsion</CardTitle>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-3 gap-6">
                                <SubSection title="Analyse & Qualification" icon={<Search />}>
                                    <WorkflowButton href="/internal/mon-marketer" title="MON MARKETER (Propulsion)" icon={<Rocket className="text-orange-500" />} variant="default" />
                                    <WorkflowButton href="/internal/hub-extractor" title="Clic+Extracteur (IA)" icon={<Bot />} />
                                    <WorkflowButton href="/internal/outils/cope-evaluation" title="Évaluation COPE" icon={<Building2 />} />
                                </SubSection>
                                <SubSection title="Marché & Placement" icon={<HardHat />}>
                                    <WorkflowButton href="/internal/appetit-assureurs" title="Appétits (Marchés)" icon={<Gauge />} />
                                    <WorkflowButton href="/internal/lunique-appetit" title="Appétit L'Unique" icon={<ShieldCheck />} />
                                </SubSection>
                                <SubSection title="Conformité & Avis" icon={<FileSignature />}>
                                    <WorkflowButton href="/internal/avizio" title="AVIZIO (Divergence)" icon={<ShieldOff />} />
                                    <WorkflowButton href="/internal/quick-parts-outlook" title="Modèles Outlook" icon={<Mailbox />} />
                                </SubSection>
                            </CardContent>
                             <CardFooter>
                                <Button asChild className="w-full bg-slate-800">
                                    <Link href="/internal/nouvelle-affaire">Ouvrir le Workflow Complet <ArrowRight className="ml-2"/></Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="modifications">
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle>Gérez les changements aux polices existantes avec des communications et une documentation impeccables.</CardTitle>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-3 gap-6">
                                <SubSection title="Transactions Automobiles" icon={<Car/>}>
                                    <p className="text-xs text-muted-foreground">Accédez au portail Clic+Auto pour tous les outils transactionnels : demande rapide, note de couverture, carte rose, etc.</p>
                                    <Button asChild><Link href="/assurance-automobile/transactions">Ouvrir Clic+Auto</Link></Button>
                                </SubSection>
                                <SubSection title="Modèles de Communication" icon={<Mailbox/>}>
                                    <p className="text-xs text-muted-foreground">Utilisez nos modèles de courriels pour standardiser et professionnaliser vos communications sur les avenants.</p>
                                    <Button asChild><Link href="/internal/quick-parts-outlook">Voir les modèles</Link></Button>
                                </SubSection>
                                <SubSection title="Conformité (Art. 2400 C.c.Q.)" icon={<FileSignature/>}>
                                    <p className="text-xs text-muted-foreground">Générez des avis de divergence pour tout changement inattendu à la police, assurant votre conformité légale.</p>
                                    <Button asChild><Link href="/internal/avizio">Ouvrir Clic+AVIZIO</Link></Button>
                                </SubSection>
                            </CardContent>
                             <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href="/internal/modifications">Ouvrir le Cockpit Modifications <ArrowRight className="ml-2"/></Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="renouvellement">
                        <Card className="mt-4">
                             <CardHeader>
                                <CardTitle>Préparez et optimisez les renouvellements pour maximiser la rétention et la valeur client.</CardTitle>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-3 gap-6">
                                <SubSection title="Analyse Stratégique" icon={<Check />}>
                                    <p className="text-xs text-muted-foreground">Checklist complète pour analyser le dossier client avant le renouvellement et identifier les opportunités.</p>
                                    <Button asChild><Link href="/internal/analyse-renouvellements">Ouvrir la Checklist</Link></Button>
                                </SubSection>
                                 <SubSection title="Marché & Placement" icon={<HardHat />}>
                                     <p className="text-xs text-muted-foreground">Outils pour la remise en marché : appétits des assureurs, aide à la proposition et fiches conseil.</p>
                                     <Button asChild><Link href="/internal/appetit-assureurs">Voir les Appétits</Link></Button>
                                </SubSection>
                                <SubSection title="Communications" icon={<Mail />}>
                                    <p className="text-xs text-muted-foreground">Modèles pour la gestion des refus de protection, la confirmation des garanties et les notes pour EPIC.</p>
                                    <Button asChild><Link href="/internal/quick-parts-outlook">Accéder aux modèles</Link></Button>
                                </SubSection>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href="/internal/renouvellement">Ouvrir le Cockpit Renouvellement <ArrowRight className="ml-2"/></Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="assistant">
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle>Un module pour la recherche, la qualification et le traitement proactif des prospects.</CardTitle>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-3 gap-6">
                                <SubSection title="Tableau de Bord" icon={<Users />}>
                                    <p className="text-xs text-muted-foreground">Vue centralisée de toutes les opportunités d'affaires en cours.</p>
                                </SubSection>
                                <SubSection title="Qualification" icon={<Check />}>
                                    <p className="text-xs text-muted-foreground">Outils pour évaluer le potentiel de chaque lead et prioriser vos efforts.</p>
                                </SubSection>
                                <SubSection title="Traitement Accéléré" icon={<ArrowRight />}>
                                    <p className="text-xs text-muted-foreground">Pré-remplissage des dossiers pour une prise en charge rapide.</p>
                                </SubSection>
                            </CardContent>
                             <CardFooter>
                                <Button asChild className="w-full"><Link href="/internal/assistant-producteur">Ouvrir l'Assistant Producteur</Link></Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </section>
        </div>
    );
}
