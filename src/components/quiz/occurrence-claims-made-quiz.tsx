'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const questions = [
  {
    q: "Votre client est poursuivi en 2024 pour un acte commis en 2021. Sa police était une police 'Occurrence'. Est-il couvert?",
    a: "Oui",
    explanation: "La police Occurrence couvre les actes commis pendant la période de couverture, peu importe quand la réclamation est faite."
  },
  {
    q: "Un professionnel change d'assureur en 2024. Il reçoit une réclamation pour un acte commis en 2023 sous l'ancienne police 'Claims-Made'. Est-il couvert par la nouvelle police?",
    a: "Non (sauf extension de délai)",
    explanation: "Une police Claims-Made couvre les réclamations faites pendant la période de couverture. Il faut une extension de délai de présentation ('tail coverage')."
  },
  {
    q: "Qu'est-ce que la 'date de rétroactivité' dans une police Claims-Made?",
    a: "La date avant laquelle les actes ne sont pas couverts",
    explanation: "C'est la date limite avant laquelle les actes commis ne sont pas couverts, même si la réclamation est faite pendant la période active."
  }
];

export default function OccurrenceClaimsMadeQuiz() {
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[current];

  const handleReveal = () => setRevealed(true);
  const handleNext = (correct: boolean) => {
    if (correct) setScore(s => s + 1);
    if (current + 1 >= questions.length) setDone(true);
    else { setCurrent(c => c + 1); setRevealed(false); }
  };

  if (done) return (
    <Card className="my-8 border-2 border-primary/20">
      <CardHeader><CardTitle className="text-primary">Résultat du Quiz</CardTitle></CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-center">{score} / {questions.length}</p>
        <p className="text-center text-muted-foreground mt-2">
          {score === questions.length ? '🏆 Excellent ! Vous maîtrisez la différence Occurrence vs Claims-Made.' : '📚 Révisez les concepts pour mieux protéger vos clients.'}
        </p>
        <Button className="mt-4 w-full" onClick={() => { setCurrent(0); setRevealed(false); setScore(0); setDone(false); }}>
          Recommencer
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Card className="my-8 border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-primary text-sm font-medium">Question {current + 1} / {questions.length}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-semibold text-foreground">{q.q}</p>
        {!revealed ? (
          <Button onClick={handleReveal} variant="outline" className="w-full">Voir la réponse</Button>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="font-bold text-primary">{q.a}</p>
              <p className="text-sm text-muted-foreground mt-1">{q.explanation}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleNext(true)} className="flex-1 bg-green-600 hover:bg-green-700">✓ Je savais</Button>
              <Button onClick={() => handleNext(false)} variant="outline" className="flex-1">✗ À revoir</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
