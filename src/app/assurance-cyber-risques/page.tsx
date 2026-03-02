'''use client''';
import React, { useState, useRef } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Breadcrumb } from '@/components/breadcrumb';
import { Shield, ArrowRight, Laptop, Server, Mail, Users, FileWarning, Banknote, ShoppingCart, Smartphone, Wifi, Phone, Download, Lock, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NouvelleAffaireCyber } from './components/NouvelleAffaireCyber';

const RiskCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-secondary/30 p-4 rounded-lg flex gap-4 items-start">
        <div className="flex-shrink-0 text-accent">{icon}</div>
        <div>
            <h4 className="font-semibold text-primary">{title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <section className={`mt-12 ${className}`}>
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">{title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
            {children}
        </div>
    </section>
);

export default function CyberAssurancePage() {
    const { toast } = useToast();
    const pageContentRef = useRef<HTMLDivElement>(null);
    const [initialData, setInitialData] = useState({});

    const handleDownloadPdf = async () => {
        if (!pageContentRef.current) return;

        try {
            const canvas = await html2canvas(pageContentRef.current, {
                scale: 2, // Augmente la résolution
                useCORS: true,
                backgroundColor: '#ffffff',
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save("assurance-cyber-risques.pdf");

            toast({
                title: "Téléchargement lancé",
                description: "Le fichier PDF a été généré et le téléchargement va commencer.",
            });
        } catch (e) {
            console.error("Failed to generate PDF: ", e);
            toast({
                title: "Erreur de génération",
                description: "Impossible de générer le fichier PDF.",
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div id="page-content-wrapper" ref={pageContentRef} className="max-w-4xl mx-auto bg-background p-8 rounded-lg">
                    <div className="mb-8">
                        <Breadcrumb items={[
                            { label: 'Accueil', href: '/' },
                            { label: 'Assurance Cyber-Risques' },
                        ]} />
                    </div>

                    <header className="text-center mb-12">
                        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                            <Shield className="h-12 w-12 text-primary" />
                        </div>
                        <h1 className="text-4xl font-bold text-primary">Bravo ! Votre entreprise est admissible à l'Assurance Cyber-Risques Cyber Totale*</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            *produit exclusif construit pour vous par Erick de Carufel
                        </p>
                        <p className="text-lg text-muted-foreground mt-4">Pour vous, il est essentiel d'être bien couvert face à ces menaces : protéger les accès virtuels de votre entreprise.</p>
                        <div className="flex justify-center flex-wrap gap-x-6 gap-y-4 text-muted-foreground mt-6">
                            <div className="flex flex-col items-center gap-1"><ShoppingCart className="h-7 w-7" /><span className="text-xs">Point de Vente</span></div>
                            <div className="flex flex-col items-center gap-1"><Laptop className="h-7 w-7" /><span className="text-xs">Ordinateurs</span></div>
                            <div className="flex flex-col items-center gap-1"><Server className="h-7 w-7" /><span className="text-xs">Serveurs</span></div>
                            <div className="flex flex-col items-center gap-1"><Wifi className="h-7 w-7" /><span className="text-xs">Modems</span></div>
                            <div className="flex flex-col items-center gap-1"><Smartphone className="h-7 w-7" /><span className="text-xs">Cellulaires</span></div>
                            <div className="flex flex-col items-center gap-1"><Phone className="h-7 w-7" /><span className="text-xs">Téléphones VoIP</span></div>
                        </div>
                    </header>

                    <div className="my-8">
                        <NouvelleAffaireCyber initialData={initialData} />
                    </div>

                    <Card className="mt-12">
                        <CardHeader>
                            <CardTitle>Évaluation Rapide de votre Risque Cyber</CardTitle>
                            <CardDescription>Répondez à ces questions pour nous aider à préparer votre soumission.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                                <div className="space-y-2">
                                    <Label htmlFor="revenu">Revenu annuel</Label>
                                    <Input id="revenu" placeholder="Entrez votre revenu annuel" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Authentification multi-facteurs (MFA)*</Label>
                                    <RadioGroup className="flex gap-4 pt-2">
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="oui" id="mfa-oui" /><Label htmlFor="mfa-oui">Oui</Label></div>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="non" id="mfa-non" /><Label htmlFor="mfa-non">Non</Label></div>
                                    </RadioGroup>
                                </div>
                                <div className="space-y-2">
                                    <Label>Limite d’assurance</Label>
                                    <RadioGroup className="flex gap-4 pt-2">
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="500k" id="limite-500k" /><Label htmlFor="limite-500k">500 000 $</Label></div>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="1M" id="limite-1m" /><Label htmlFor="limite-1m">1 000 000 $</Label></div>
                                    </RadioGroup>
                                </div>
                                <div className="space-y-2">
                                    <Label>Franchise demandée</Label>
                                    <RadioGroup className="flex gap-4 pt-2">
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="2.5k" id="franchise-2.5k" /><Label htmlFor="franchise-2.5k">2 500 $</Label></div>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="5k" id="franchise-5k" /><Label htmlFor="franchise-5k">5 000 $</Label></div>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="10k" id="franchise-10k" /><Label htmlFor="franchise-10k">10 000 $</Label></div>
                                    </RadioGroup>
                                </div>
                            </div>
                            <div className="pt-6">
                                <p className="text-sm font-medium text-center border-t border-b py-4">Au cours des trois (3) dernières années, le demandeur a-t-il subi un ou plusieurs incidents cybernétiques où le montant des pertes a dépassé 10 000$? si oui parler a votre courtier -</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-4">
                            <Button onClick={handleDownloadPdf}>
                                <Download className="mr-2 h-4 w-4" />
                                Télécharger en PDF
                            </Button>
                            <p className="text-xs text-muted-foreground">
                                * <strong>Authentification multi-facteurs (MFA) :</strong> Méthode de sécurité qui exige plus d’une forme d'authentification pour vérifier l’identité d’un utilisateur (ex : un mot de passe + un code envoyé par texto). <br />
                                ** Des limites plus élevées peuvent être souscrites à la carte en collaboration avec votre courtier.
                            </p>
                        </CardFooter>
                    </Card>

                    <section className="mt-12">
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                            <h3 className="text-2xl font-bold text-blue-900 flex items-center gap-3"><Lock className="h-6 w-6"/>Pourquoi MFA est essentiel ?</h3>
                            <p className="mt-4 text-blue-800">L’authentification multifacteur constitue l’une des mesures les plus efficaces pour réduire les risques de cyberattaques. Nous recommandons fortement son implantation, puisqu’elle permet d’accéder à des limites de protection plus élevées et d’améliorer la posture globale en cybersécurité. De plus, sa mise en place est simple, rapide et généralement peu coûteuse — voire entièrement gratuite selon les outils choisis.</p>
                        </div>
                    </section>

                    <section className="mt-12">
                        <Card className="bg-secondary/30 border-secondary-foreground/10">
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">Règles de Souscription (Absence de MFA)</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3">
                                <p>Afin de renforcer la sécurité des entreprises et de clarifier les conditions de souscription du programme Cyber Totale, voici la procédure applicable pour les assurés qui n’ont pas mis en place l’authentification multi-facteurs (MFA) pour :</p>
                                <ul className="list-disc pl-5">
                                    <li>Les accès distants à leur réseau, ou</li>
                                    <li>Tous les comptes courriels.</li>
                                </ul>
                                <div>
                                    <h4 className="font-semibold text-primary">✅ Limite de couverture standard</h4>
                                    <p>Pour ces assurés, la limite de couverture qui pourra être offerte sera comprise entre <strong>25 000 $ et 100 000 $</strong>.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-primary">✅ Demande pour une limite supérieure à 100 000 $</h4>
                                    <p>Si l’assuré souhaite obtenir une limite supérieure à 100 000 $, la procédure est la suivante :</p>
                                    <ol className="list-decimal pl-5 mt-2">
                                        <li>Compléter la proposition.</li>
                                        <li>Envoyer la demande à <a href="mailto:info@rapidassurcopilote.com" className="text-accent underline">info@rapidassurcopilote.com</a></li>
                                        <li>Je ferai parvenir le tout à un souscripteur de HSB qui examinera la demande et vous transmettra : L’approbation, et Les tarifs correspondants.</li>
                                    </ol>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <blockquote className="mt-8 text-center text-sm italic text-muted-foreground">
                        "Il n'y a que deux types d'entreprises : celles qui ont été piratées et celles qui le seront."
                        <cite className="block text-xs text-muted-foreground mt-1 not-italic">- Robert Mueller (Ancien Directeur du FBI)</cite>
                    </blockquote>

                    <Section title="Les Menaces Sont Partout">
                        <RiskCard
                            icon={<Mail className="h-6 w-6" />}
                            title="Hameçonnage et Fraude"
                            description="Des courriels frauduleux qui semblent légitimes peuvent tromper vos employés et leur voler des accès ou des informations sensibles."
                        />
                        <RiskCard
                            icon={<Laptop className="h-6 w-6" />}
                            title="Rançongiciels (Ransomware)"
                            description="Vos données sont prises en otage et cryptées par un pirate qui exige une rançon pour vous en redonner l'accès. Vos opérations sont paralysées."
                        />
                        <RiskCard
                            icon={<Users className="h-6 w-6" />}
                            title="Malveillance des Employés"
                            description="Un employé mécontent ou négligent peut intentionnellement ou non causer une fuite de données ou un dommage à vos systèmes."
                        />
                        <RiskCard
                            icon={<Server className="h-6 w-6" />}
                            title="Attaques sur vos Systèmes"
                            description="Des pirates peuvent exploiter une faille de sécurité dans votre site web ou vos serveurs pour voler des informations ou perturber vos services."
                        />
                    </Section>

                    <Section title="Comment l'Assurance Cyber-Risques Vous Protège">
                         <RiskCard
                            icon={<FileText className="h-6 w-6" />}
                            title="Gestion de Crise & Frais d'Experts"
                            description="Accès immédiat à une équipe d'experts (informatique, juridique, relations publiques) pour gérer l'incident, contenir l'attaque et vous conseiller."
                        />
                        <RiskCard
                            icon={<Banknote className="h-6 w-6" />}
                            title="Pertes de Revenus"
                            description="Indemnisation pour la perte de profits et les frais fixes qui continuent de courir pendant que votre entreprise est paralysée par une cyberattaque."
                        />
                        <RiskCard
                            icon={<FileWarning className="h-6 w-6" />}
                            title="Frais de Notification et Responsabilité"
                            description="Couvre les coûts pour notifier vos clients dont les données ont été compromises (selon la Loi 25) et les frais de défense en cas de poursuite."
                        />
                        <RiskCard
                            icon={<Laptop className="h-6 w-6" />}
                            title="Restauration des Données"
                            description="Couvre les coûts pour restaurer ou recréer vos données et vos logiciels à partir de sauvegardes après une attaque."
                        />
                    </Section>

                    <div className="text-center mt-16">
                        <h2 className="text-3xl font-bold text-primary">N'attendez pas qu'il soit trop tard.</h2>
                        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Une cyberassurance n'est pas une dépense, c'est un investissement dans la continuité de vos affaires.</p>
                        <Button asChild size="lg" className="mt-6 glowing-btn">
                            <a href="mailto:info@rapidassurcopilote.com">
                                Obtenir ma soumission Cyber
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
