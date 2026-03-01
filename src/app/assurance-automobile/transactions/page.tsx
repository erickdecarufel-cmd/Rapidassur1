'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Breadcrumb } from '@/components/breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Car, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString + 'T00:00:00');
        return new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
    } catch (e) { return dateString; }
};

const QuestionBlock: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="p-4 border rounded-lg bg-background">
        <Label className="font-semibold">{label}</Label>
        <div className="mt-2">{children}</div>
    </div>
);

export default function TransactionsPage() {
    const [formState, setFormState] = useState({
        nomClient: '', adresseClient: '', courriel: '', telephone: '',
        annee: '', marqueModele: '', valeurVehicule: '', datePossession: '',
        etatVehicule: 'neuf', kilometrage: '', numeroSerie: '',
        conducteurPrincipal: '', usageChantier: '', usagePersonnel: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto space-y-8">
                    <Breadcrumb items={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Assurance Automobile', href: '/assurance-automobile' },
                        { label: 'Transactions' },
                    ]} />
                    <div className="text-center">
                        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                            <Car className="h-12 w-12 text-primary" />
                        </div>
                        <h1 className="text-4xl font-bold text-primary">Transactions Automobile</h1>
                        <p className="text-lg text-muted-foreground mt-2">Gérez vos demandes de soumission, avenants et modifications de polices d&apos;assurance automobile.</p>
                    </div>
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl text-primary">Demande Client - Assurance Auto Rapide</CardTitle>
                            <CardDescription>Outil interactif pour préparer une demande de soumission d&apos;assurance automobile commerciale.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <QuestionBlock label="Nom du proposant">
                                    <Input name="nomClient" value={formState.nomClient} onChange={handleInputChange} placeholder="Nom de l'entreprise" />
                                </QuestionBlock>
                                <QuestionBlock label="Adresse">
                                    <Input name="adresseClient" value={formState.adresseClient} onChange={handleInputChange} placeholder="Adresse complète" />
                                </QuestionBlock>
                                <QuestionBlock label="Courriel">
                                    <Input name="courriel" value={formState.courriel} onChange={handleInputChange} placeholder="courriel@exemple.com" />
                                </QuestionBlock>
                                <QuestionBlock label="Téléphone">
                                    <Input name="telephone" value={formState.telephone} onChange={handleInputChange} placeholder="514 000-0000" />
                                </QuestionBlock>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <QuestionBlock label="Année du véhicule">
                                    <Input name="annee" value={formState.annee} onChange={handleInputChange} placeholder="2024" />
                                </QuestionBlock>
                                <QuestionBlock label="Marque / Modèle">
                                    <Input name="marqueModele" value={formState.marqueModele} onChange={handleInputChange} placeholder="Ford F-150" />
                                </QuestionBlock>
                                <QuestionBlock label="Valeur ($)">
                                    <Input name="valeurVehicule" value={formState.valeurVehicule} onChange={handleInputChange} placeholder="45000" />
                                </QuestionBlock>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <QuestionBlock label="No de série (VIN)">
                                    <Input name="numeroSerie" value={formState.numeroSerie} onChange={handleInputChange} placeholder="1FTFW1E..." />
                                </QuestionBlock>
                                <QuestionBlock label="Date de possession">
                                    <Input name="datePossession" type="date" value={formatDate(formState.datePossession)} onChange={handleInputChange} />
                                </QuestionBlock>
                            </div>
                            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg text-yellow-900 text-sm">
                                <p className="font-bold">Note de développement</p>
                                <p>Ce formulaire est en cours de reconstruction. Les sections suivantes seront ajoutées : financement, protections (FAQ), modèles de courriel, note de couverture, carte rose, note EPIC.</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md" id="avenant">
                        <CardHeader>
                            <CardTitle className="text-xl text-primary">Demande Client - Avenant Automobile</CardTitle>
                            <CardDescription>Outil interactif pour préparer une demande d&apos;avenant (modification, ajout, retrait de véhicule).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-blue-900 text-sm">
                                <p className="font-bold">En développement</p>
                                <p>Le formulaire d&apos;avenant automobile sera disponible dans une prochaine itération.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}