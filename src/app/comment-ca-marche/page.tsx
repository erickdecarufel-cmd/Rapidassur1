import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Comment obtenir votre soumission ?</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">Nous avons simplifié le processus pour vous. Choisissez l'option qui vous convient le mieux.</p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Option 1: Web */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-2xl font-semibold leading-6 text-gray-900">Via le Web</h3>
          <p className="mt-4 text-base text-gray-600">Le plus rapide. Utilisez nos outils interactifs pour cibler votre besoin et laissez notre IA pré-remplir votre demande.</p>
          <div className="mt-6">
            <Button asChild>
                <Link href="/#professions">Commencer la soumission</Link>
            </Button>
          </div>
        </div>

        {/* Option 2: Guides */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-2xl font-semibold leading-6 text-gray-900">Via nos Guides</h3>
          <p className="mt-4 text-base text-gray-600">Consultez nos guides de soumission PDF, remplissez-les à votre rythme et envoyez-les nous par courriel.</p>
          <div className="mt-6">
            <Button asChild variant="outline">
                <Link href="/soumission/repertoire">Voir les guides</Link>
            </Button>
          </div>
        </div>

        {/* Option 3: Contact Direct */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-2xl font-semibold leading-6 text-gray-900">Contact Direct</h3>
          <p className="mt-4 text-base text-gray-600">Parlez directement à un courtier. Idéal pour les cas complexes ou si vous préférez le contact humain.</p>
          <div className="mt-6">
            <p className="text-base font-semibold">Erick de Carufel</p>
            <p className="text-sm text-gray-600">Courtier en assurance de dommages</p>
            <a href="tel:1-819-806-5256" className="text-sm text-accent hover:underline">1-819-806-5256</a>
            <br />
            <a href="mailto:erick@rapidassur.com" className="text-sm text-accent hover:underline">erick@rapidassur.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
