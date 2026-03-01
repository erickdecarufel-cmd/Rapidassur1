'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckSquare } from 'lucide-react';

const items = [
  "Licence RBQ en ordre (si applicable)",
  "Garantie GCR souscrite",
  "Valeur à neuf du projet estimée",
  "Couverture chantier (tous risques) en place",
  "Responsabilité civile du propriétaire-constructeur",
  "Couverture des matériaux en transit",
  "Plan de prévention incendie sur chantier",
];

export default function AutoconstructionChecklist() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <Card className="my-6 border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <CheckSquare className="h-5 w-5" />
          Check-list autoconstruction ({done}/{items.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <Checkbox
              id={`ac-${i}`}
              checked={!!checked[i]}
              onCheckedChange={(v) => setChecked(prev => ({ ...prev, [i]: !!v }))}
            />
            <label htmlFor={`ac-${i}`} className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
              {item}
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
