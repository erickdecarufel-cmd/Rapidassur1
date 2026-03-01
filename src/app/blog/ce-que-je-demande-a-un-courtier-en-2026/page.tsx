'use client'
import React from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Breadcrumb } from '@/components/breadcrumb';
import { Lightbulb, Users, Network, Zap, Award } from 'lucide-react';

const Section: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, children, icon }) => (
    <section className="mt-10">
        <h2 className="text-3xl font-bold text-primary !mb-6 border-b-2 border-primary/20 pb-3 flex items-center gap-3">
            {icon}{title}
        </h2>
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 prose-p:leading-relaxed prose-strong:text-primary">
            {children}
        </div>
    </section>
);

const BrokerOfTheFutureBlogPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: "Ce que je demande à un courtier en 2026" }]} />
                    </div>
                    <article className="bg-background rounded-2xl shadow-lg border border-border/50 overflow-hidden p-8 sm:p-12">
                        <header className="mb-8 text-center">
                            <h1 className="text-4xl font-bold text-primary mb-2">Ce que je demande à un courtier en 2026</h1>
                            <p className="text-lg text-muted-foreground italic">L&apos;IA ne remplacera pas un être humain, mais un être humain sans ces compétences sera obsolète.</p>
                        </header>
                        <p className="lead prose prose-lg max-w-none">
                            Le monde de l&apos;assurance est à un point de rupture. L&apos;intelligence artificielle est en train de réécrire les règles du jeu. Mon équipe construit un système qui gère la connaissance et l&apos;expérience utilisateur de manière si poussée que la simple vente de police n&apos;aura bientôt plus de valeur.
                        </p>
                        <Section title="1. La Maîtrise de la Connaissance au-delà du Produit" icon={<Lightbulb />}>
                            <p>Le courtier de demain ne doit plus se contenter de connaître les produits par cœur. Mon système, avec son Knowledge-Index, le fait déjà 1000 fois plus vite.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Analyser des cas complexes :</strong> L&apos;IA sait que le travail à la torche est un risque pour un couvreur, mais elle ne saura jamais interpréter la subtilité d&apos;un contrat de sous-traitance international.</li>
                                <li><strong>Transmettre une expertise avec pédagogie :</strong> La vraie valeur n&apos;est plus dans l&apos;information, mais dans la manière de la transmettre.</li>
                            </ul>
                            <p><strong>Mon système fournit les réponses techniques ; le courtier apporte la sagesse et le jugement.</strong></p>
                        </Section>
                        <Section title="2. Le Rôle de Stratège et de Consultant" icon={<Network />}>
                            <p>L&apos;IA va prendre en charge la soumission standard. Cela libère un temps précieux pour le courtier pour qu&apos;il devienne un véritable consultant en risques.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Penser au-delà de l&apos;assurance :</strong> Être capable de dire au client ce dont il a besoin avant même qu&apos;il le demande.</li>
                                <li><strong>Créer des solutions sur mesure :</strong> Assembler différentes couvertures, négocier des clauses spécifiques.</li>
                            </ul>
                        </Section>
                        <Section title="3. La Connexion Humaine et l'Intelligence Émotionnelle" icon={<Users />}>
                            <p>L&apos;IA ne sait pas ce que c&apos;est que la peur de tout perdre à la suite d&apos;un sinistre. Le courtier de la prochaine génération doit posséder une intelligence émotionnelle.</p>
                        </Section>
                        <Section title="Mission et Valeur du Gestionnaire de la Connaissance" icon={<Award />}>
                            <ul className="list-disc pl-5 space-y-3">
                                <li><strong>Désintermédiation Intelligente :</strong> Qualifier en amont les prospects, créant de la valeur pour toute la chaîne.</li>
                                <li><strong>Hyper-Personnalisation :</strong> Chaque parcours utilisateur est contextualisé.</li>
                                <li><strong>Education-First Marketing :</strong> Votre glossaire et vos guides positionnent votre marque comme autorité avant vendeur.</li>
                            </ul>
                            <p className="font-bold">L&apos;IA ne remplacera pas un être humain, mais un être humain sans ces compétences sera obsolète.</p>
                        </Section>
                        <div className="!mt-12 border-t border-border/50 pt-8">
                            <p className="font-semibold text-primary text-lg">Je construis un monde où le courtier n&apos;aura plus à faire de tâches répétitives et pourra se concentrer sur ce qui compte vraiment : l&apos;expertise, la stratégie et la relation humaine.</p>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BrokerOfTheFutureBlogPage;