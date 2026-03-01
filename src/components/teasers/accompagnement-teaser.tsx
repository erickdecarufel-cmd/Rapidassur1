'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function AccompagnementTeaser() {
  return (
    <Card className="my-6 border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Users className="h-5 w-5" />
          Accompagnement courtier personnalisé
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Un courtier spécialisé analyse votre dossier et vous propose les meilleures couvertures adaptées à votre secteur d&apos;activité.
        </p>
        <Button asChild>
          <Link href="/#soumission">Démarrer ma soumission</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
