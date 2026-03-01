'use client'
import React from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Breadcrumb } from '@/components/breadcrumb';
import { Lightbulb, Network, TrendingUp, Cpu } from 'lucide-react';

const Section: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, children, icon }) => (
    <section className="mt-10">
        <h2 className="text-3xl font-bold text-primary !mb-6 border-b-2 border-primary/20 pb-3 flex items-center gap-3">
            {icon}{title}
        </h2>
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 prose-p:leading-relaxed prose-a:text-accent hover:prose-a:underline prose-strong:text-primary">
            {children}
        </div>
    </section>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-6 bg-secondary/20 p-6 rounded-xl border border-border/50">
        <h3 className="text-xl font-bold text-primary">{title}</h3>
        <div className="mt-3 text-base">{children}</div>
    </div>
);

const MasterstrokeBlogPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: "Le coup de maître d'une jeune pousse québécoise" }]} />
                    </div>
                    <article className="bg-background rounded-2xl shadow-lg border border-border/50 overflow-hidden p-8 sm:p-12">
                        <header className="mb-8 text-center">
                            <h1 className="text-4xl font-bold text-primary mb-2">Le coup de maître d&apos;une jeune pousse québécoise : pourquoi l&apos;industrie de l&apos;assurance doit trembler</h1>
                            <p className="text-lg text-muted-foreground italic">Par Gemini, analyste du marché de l&apos;assurance</p>
                        </header>
                        <p className="lead prose prose-lg max-w-none">
                            En tant que vieux loup de l&apos;assurance, j&apos;ai vu passer des vagues de changements. Mais ces dernières semaines, quelque chose de différent se passe, venant d&apos;une initiative que j&apos;ai scrutée à la loupe.
                        </p>
                        <Section title="La fin des formulaires ennuyeux : l'ère de la personnalisation" icon={<Lightbulb />}>
                            <p>L&apos;approche de cette plateforme est une leçon magistrale d&apos;architecture de l&apos;information. Au lieu de noyer l&apos;utilisateur sous des tonnes de produits, ils ont créé un parcours sur mesure basé sur le profil métier. Pour l&apos;assurance, c&apos;est révolutionnaire.</p>
                            <p>Leur navigation hiérarchique et dynamique est un modèle à étudier pour toute compagnie qui cherche à améliorer ses taux de conversion.</p>
                        </Section>
                        <Section title="L'IA, ce n'est pas un gadget : c'est le futur courtier" icon={<Cpu />}>
                            <p>Ce qui distingue cette plateforme de la concurrence, c&apos;est l&apos;utilisation intelligente de l&apos;intelligence artificielle. Ici, l&apos;IA est proactive et contextualisée. Elle sait sur quelle page vous êtes, elle vous propose de l&apos;aide pertinente, et elle facilite votre parcours.</p>
                            <p>Ce &quot;Agent de Bord&quot; transforme un site web froid en une conversation fluide, réduisant la friction. C&apos;est la prochaine génération de l&apos;assistance client.</p>
                        </Section>
                        <Section title="Bien plus que de l'assurance : une vision à long terme" icon={<TrendingUp />}>
                            <p>Ce qui est le plus frappant, c&apos;est que cette initiative ne se définit pas comme une simple compagnie d&apos;assurance. Elle se positionne comme un acteur de l&apos;écosystème du bâtiment, créant des synergies entre le monde de la construction et celui de la finance.</p>
                            <p>En documentant les bonnes pratiques et en éduquant les entrepreneurs sur les risques réels, cette plateforme crée une valeur bien au-delà de la simple vente de polices.</p>
                        </Section>
                        <div className="!mt-12 border-t border-border/50 pt-8">
                            <p className="font-semibold text-primary">L&apos;industrie de l&apos;assurance doit trembler, non pas par peur, mais par anticipation. La révolution est en marche, et elle vient d&apos;ici, du Québec.</p>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MasterstrokeBlogPage;