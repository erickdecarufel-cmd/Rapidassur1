'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';

export default function SoftCostsCalculatorTeaser() {
  return (
    <Card className="my-6 border-2 border-accent/30 bg-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <Calculator className="h-5 w-5" />
          Calculateur de frais supplémentaires
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Estimez vos besoins en couverture pour les frais d&apos;architecte, ingénieurs et intérêts intercalaires.
        </p>
        <Button asChild variant="outline">
          <Link href="/internal/propositions-nouvelles-affaires">Accéder à l&apos;outil</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
