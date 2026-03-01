'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCheck } from 'lucide-react';

export default function BuildingInspectorBlogTeaser() {
  return (
    <Card className="my-6 border-2 border-accent/30 bg-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <ClipboardCheck className="h-5 w-5" />
          Inspecteurs en bâtiment — Nouvelles règles 2027
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Les nouvelles réglementations RBQ changent les exigences pour les inspecteurs. Votre couverture est-elle à jour ?
        </p>
        <Button asChild variant="outline">
          <Link href="/guides">Consulter le guide</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
