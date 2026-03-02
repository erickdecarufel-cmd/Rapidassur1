import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ExpressSubmissionPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Soumission Clic+Express</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">Copiez/collez un appel d'offres, la description de votre entreprise, ou même l'adresse d'un site web. Notre IA analysera le tout pour démarrer votre soumission.</p>
      </div>

      <div className="mt-16 mx-auto max-w-xl">
        <form>
          <Textarea 
            placeholder="Collez votre texte ici..." 
            rows={10}
            className="shadow-sm"
          />
          <div className="mt-6 flex justify-center">
            <Button type="submit">Analyser et commencer</Button>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">Ou</p>
          <div className="mt-4 flex justify-center">
            <Button variant="outline" type="button">Téléverser un fichier</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
