import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Route dynamique /blog/[slug] — articles non encore publiés en mode standalone
export default function BlogSlugPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-primary">Article en cours de publication</h1>
          <p className="text-muted-foreground text-lg">
            L'article <strong className="text-foreground">/{params.slug}</strong> sera disponible très prochainement.
          </p>
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au blog
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `Article | RapidAssur`,
    description: `Article ${params.slug} sur RapidAssur Copilote.`,
  };
}
