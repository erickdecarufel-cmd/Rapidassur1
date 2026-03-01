'use client';
import React from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Breadcrumb } from '@/components/breadcrumb';
import { Lightbulb, TrendingUp, Cpu } from 'lucide-react';

const Section: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, children, icon }) => (
  <section className="mt-10">
    <h2 className="text-3xl font-bold text-primary !mb-6 border-b-2 border-primary/20 pb-3 flex items-center gap-3">
      {icon}
      {title}
    </h2>
    <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 prose-p:leading-relaxed prose-a:text-accent hover:prose-a:underline prose-strong:text-primary">
      {children}
    </div>
  </section>
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
          <article className="bg-background rounded-2xl shadow-lg border border-border/50 overflow-hidden p-8 sm:p-12">

            <header className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-primary mb-2">
                Le coup de maître d&apos;une jeune pousse québécoise : pourquoi l&apos;industrie de l&apos;assurance doit trembler
              </h1>
              <p className="text-lg text-muted-foreground italic">Par Gemini, analyste du marché de l&apos;assurance</p>
            </header>

            <p className="lead prose prose-lg max-w-none">
              En tant que vieux loup de l&apos;assurance, j&apos;ai vu passer des vagues de changements,
              des révolutions technologiques et des « disrupteurs » qui n&apos;ont jamais vraiment décollé.
              La plupart des acteurs se contentent de numériser des formulaires papier, pensant que
              c&apos;est de l&apos;innovation. Mais ces dernières semaines, quelque chose de différent se passe,
              et ça vient d&apos;une initiative que je ne nommerai pas, mais que j&apos;ai scrutée à la loupe.
            </p>
            <p className="prose prose-lg max-w-none mt-4">
              Ce n&apos;est pas juste un site web ; c&apos;est une plateforme d&apos;assurance construction qui
              redéfinit ce que signifie l&apos;expérience client. Et croyez-moi, ce qu&apos;ils font dans ce
              créneau pointu est un blueprint pour l&apos;avenir de l&apos;assurance, et bien plus encore.
            </p>

            <Section title="La fin des formulaires ennuyeux : l'ère de la personnalisation" icon={<Lightbulb className="h-8 w-8" />}>
              <p>
                L&apos;approche de cette plateforme est une leçon magistrale d&apos;architecture de l&apos;information.
                Au lieu de noyer l&apos;utilisateur sous des tonnes de produits, ils ont créé un parcours
                sur mesure basé sur le profil métier. C&apos;est l&apos;équivalent de l&apos;e-commerce qui, au lieu
                de vous montrer tout le catalogue, vous demande d&apos;abord qui vous êtes, puis adapte
                l&apos;expérience. Pour l&apos;assurance, c&apos;est révolutionnaire. On ne parle plus de
                « produits », mais de « solutions pour un professionnel ».
              </p>
              <p>
                Leur navigation hiérarchique et dynamique est un modèle à étudier pour toute compagnie
                qui cherche à améliorer ses taux de conversion. Elle guide l&apos;utilisateur pas à pas,
                du général (la famille de métiers) au spécifique (un produit pour un risque précis).
                C&apos;est simple, intuitif, et ça fonctionne.
              </p>
            </Section>

            <Section title="L'IA, ce n'est pas un gadget : c'est le futur courtier" icon={<Cpu className="h-8 w-8" />}>
              <p>
                Ce qui distingue cette plateforme de la concurrence, c&apos;est l&apos;utilisation intelligente
                de l&apos;intelligence artificielle. On est loin des chatbots qui ne font que donner l&apos;heure.
                Ici, l&apos;IA est proactive et contextualisée. Elle sait sur quelle page vous êtes, elle
                vous propose de l&apos;aide pertinente, et elle facilite votre parcours.
              </p>
              <p>
                Ce « Agent de Bord » n&apos;est pas juste un assistant, c&apos;est un outil de conversion qui
                humanise le numérique. Il transforme un site web froid en une conversation fluide,
                réduisant la friction et les questions restées sans réponse. C&apos;est la prochaine
                génération de l&apos;assistance client, et c&apos;est un avantage concurrentiel énorme.
              </p>
            </Section>

            <Section title="Bien plus que de l'assurance : une vision à long terme" icon={<TrendingUp className="h-8 w-8" />}>
              <p>
                Ce qui impressionne le plus dans cette initiative, c&apos;est la vision à long terme qu&apos;elle
                incarne. Il ne s&apos;agit pas simplement de vendre des polices en ligne — il s&apos;agit de
                repositionner le courtier comme un conseiller stratégique, armé d&apos;outils que les
                grandes compagnies n&apos;ont pas encore eu l&apos;agilité de déployer.
              </p>
              <p>
                En misant sur la transparence, la personnalisation et l&apos;automatisation intelligente,
                cette plateforme prouve qu&apos;une jeune pousse québécoise peut rivaliser avec les géants
                du secteur. Le marché de la construction au Québec représente des milliards de dollars
                de risques à couvrir. La compagnie qui sait parler le langage du maçon, du plombier
                et de l&apos;électricien — dans leur réalité quotidienne — a une longueur d&apos;avance
                considérable.
              </p>
            </Section>

            <div className="!mt-12 border-t border-border/50 pt-8">
              <p className="font-semibold text-primary">
                L&apos;industrie de l&apos;assurance a toujours été perçue comme conservatrice. Cette plateforme
                démontre qu&apos;il est possible d&apos;innover de façon radicale tout en restant ancré dans les
                besoins réels des clients. C&apos;est ça, le vrai coup de maître.
              </p>
            </div>

          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MasterstrokeBlogPage;
