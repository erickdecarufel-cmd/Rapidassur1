import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SubmissionsPage() {
  return (
    <div className="bg-white">
      <div className="relative px-6 isolate pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Nos demandes de soumissions possibles</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Que vous soyez un entrepreneur en construction, un professionnel de la tech ou un commerçant, nous avons une porte d'entrée adaptée à votre réalité. Choisissez le chemin qui vous convient.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild>
                <Link href="/soumission/express">Soumission Clic+Express (IA)</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/soumission/repertoire">Répertoire complet</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
