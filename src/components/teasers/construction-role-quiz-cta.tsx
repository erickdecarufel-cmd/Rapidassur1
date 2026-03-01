'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import Link from 'next/link';

const roles = [
  { label: "Entrepreneur général", href: "/internal/questionnaire-entrepreneur-general" },
  { label: "Sous-traitant spécialisé", href: "/internal/propositions-nouvelles-affaires" },
  { label: "Promoteur / Propriétaire-constructeur", href: "/internal/propositions-nouvelles-affaires" },
  { label: "Gestionnaire de projet", href: "/internal/propositions-nouvelles-affaires" },
];

export default function ConstructionRoleQuizCTA() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Card className="my-6 border-2 border-accent/30 bg-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <HelpCircle className="h-5 w-5" />
          Quel est votre rôle sur le chantier ?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">Sélectionnez votre profil pour accéder à la soumission adaptée :</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {roles.map((r, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`p-3 rounded-lg border text-sm text-left transition-all ${
                selected === i
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border hover:border-accent/50 hover:bg-accent/10'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        {selected !== null && (
          <Button asChild className="w-full mt-2">
            <Link href={roles[selected].href}>Démarrer ma soumission →</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
