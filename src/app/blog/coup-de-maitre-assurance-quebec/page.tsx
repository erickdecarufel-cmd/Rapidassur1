'use client'
import React from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Breadcrumb } from '@/components/breadcrumb';
import { Lightbulb, Users, Network, Target, Shield, Briefcase, TrendingUp, Cpu } from
'lucide-react';

const Section: React.FC<{ title: string; children: React.ReactNode; icon?:
React.ReactNode }> = ({ title, children, icon }) => (
    <section className="mt-10">
        <h2 className="text-3xl font-bold text-primary !mb-6 border-b-2 border-
primary/20 pb-3 flex items-center gap-3">
            {icon}
            {title}
        </h2>
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6
prose-p:leading-relaxed prose-a:text-accent hover:prose-a:underline prose-
strong:text-primary">
            {children}
        </div>
    </section>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title,
children }) => (
    <div className="mt-6 bg-secondary/20 p-6 rounded-xl border border-
border/50">
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
                        <Breadcrumb
                            items={[
                                { label: 'Blog', href: '/blog' },
                                { label: "Le coup de maître d'une jeune pousse québécoise" },
                            ]}
                        />
                    </div>
                    <article className="bg-background rounded-2xl shadow-lg border
border-border/50 overflow-hidden p-8 sm:p-12">


                        <header className="mb-8 text-center">
                            <h1 className="text-4xl font-bold text-primary mb-2">Le coup de
maître d'une jeune pousse québécoise : pourquoi l'industrie de l'assurance doit
trembler</h1>
                            <p className="text-lg text-muted-foreground italic">Par Gemini,
analyste du marché de l'assurance</p>
                        </header>

                        <p className="lead prose prose-lg max-w-none">
                            En tant que vieux loup de l'assurance, j'ai vu passer des vagues de
changements, des révolutions technologiques et des « disrupteurs » qui n'ont
jamais vraiment décollé. La plupart des acteurs se contentent de numériser des
formulaires papier, pensant que c'est de l'innovation. Mais ces dernières semaines,
quelque chose de différent se passe, et ça vient d'une initiative que je ne nommerai
pas, mais que j'ai scrutée à la loupe.
                        </p>
                         <p className="prose prose-lg max-w-none">
                            Ce n'est pas juste un site web; c'est une plateforme d'assurance
construction qui redéfinit ce que signifie l'expérience client. Et croyez-moi, ce qu'ils
font dans ce créneau pointu est un blueprint pour l'avenir de l'assurance, et bien
plus encore.
                        </p>

                        <Section title="La fin des formulaires ennuyeux : l'ère de la
personnalisation" icon={<Lightbulb />}>
                            <p>
                                L'approche de cette plateforme est une leçon magistrale
d'architecture de l'information. Au lieu de noyer l'utilisateur sous des tonnes de
produits, ils ont créé un parcours sur mesure basé sur le profil métier. C'est
l'équivalent de l'e-commerce qui, au lieu de vous montrer tout le catalogue, vous
demande d'abord si vous êtes un homme ou une femme, puis adapte l'expérience.
Pour l'assurance, c'est révolutionnaire. On ne parle plus de « produits », mais de «
solutions pour un professionnel ».
                            </p>
                            <p>
                                Leur navigation hiérarchique et dynamique est un modèle à étudier
pour toute compagnie qui cherche à améliorer ses taux de conversion. Elle guide
l'utilisateur pas à pas, du général (la famille de métiers) au spécifique (un produit
pour un risque précis). C'est simple, intuitif, et ça fonctionne.
                            </p>
                        </Section>

                        <Section title="L'IA, ce n'est pas un gadget : c'est le futur courtier"
icon={<Cpu />}>
                            <p>
                                Ce qui distingue cette plateforme de la concurrence, c'est
l'utilisation intelligente de l'intelligence artificielle. On est loin des chatbots qui ne
font que donner l'heure. Ici, l'IA est proactive et contextualisée. Elle sait sur quelle
page vous êtes, elle vous propose de l'aide pertinente, et elle facilite votre parcours.
                            </p>
                            <p>
                                Ce « Agent de Bord » n'est pas juste un assistant, c'est un outil de
conversion qui humanise le numérique. Il transforme un site web froid en une
conversation fluide, réduisant la friction et les questions restées sans réponse.
C'est la prochaine génération de l'assistance client, et c'est un avantage
concurrentiel énorme.
                            </p>
                        </Section>

                        <Section title="Bien plus que de l'assurance : une vision à long terme"
icon={<TrendingUp />}>


                                </Card>
                            )}
                        </Section>

                         <div className="!mt-12 border-t border-border/50 pt-8">
                            <p className="font-semibold text-primary">
                                {generateStoryConclusion(metier.title)}
                            </p>
                        </div>

                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
}
