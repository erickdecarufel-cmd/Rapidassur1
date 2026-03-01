'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function GovernanceControversyTeaser() {
  return (
    <Card className="my-6 border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Shield className="h-5 w-5" />
          Gouvernance et controverse — Êtes-vous bien couvert ?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Les décisions de gouvernance peuvent exposer vos administrateurs à des poursuites. Découvrez les protections essentielles.
        </p>
        <Button asChild variant="outline">
          <Link href="/internal/propositions-nouvelles-affaires">Obtenir une soumission</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
