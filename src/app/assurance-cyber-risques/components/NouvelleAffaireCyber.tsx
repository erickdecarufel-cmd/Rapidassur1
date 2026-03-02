'''use client''';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Shield, User, DollarSign, History, Bot, Radio, Briefcase, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

const QuestionBlock: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="p-4 border rounded-lg bg-background">
        <Label className="font-semibold">{label}</Label>
        <div className="mt-2">{children}</div>
    </div>
);

export const NouvelleAffaireCyber: React.FC<{ initialData?: any }> = ({ initialData }) => {
    const { toast } = useToast();
    const [formState, setFormState] = useState({
        nomClient: '',
        adresse: '',
        anneeCreation: '',
        revenuAnnuel: '',
        siteWeb: '',
        descriptionActivites: '',
        pctConsultation: 0,
        pctDeveloppement: 0,
        pctVenteLogiciel: 0,
        pctSaas: 0,
        pctHebergement: 0,
        pctAutre: 0,
        contratsStandards: 'non',
        limitationResponsabilite: 'non',
        montantLimitation: '',
        sousTraitants: 'non',
        pctSousTraitants: '',
        preuveAssuranceSousTraitants: 'non',
        clientsEtrangers: 'non',
        mfa: 'non',
        sauvegardes: 'non',
        politiqueCyber: 'non',
        incidentAnterieur: 'non',
        detailsIncident: '',
        limiteEo: '1M',
        limiteCyber: '250k',
        franchise: '2500',
        faitPourDemande: 'non',
        detailsFaitPourDemande: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormState(prev => ({ ...prev, nomClient: initialData.nomClient || prev.nomClient, adresse: initialData.adresse || prev.adresse, }));
            toast({ title: "Données appliquées", description: "Les informations de base ont été chargées." });
        }
    }, [initialData, toast]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormState(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
    };

    const handleRadioChange = (name: keyof typeof formState, value: string) => {
        setFormState(prev => ({ ...prev, [name]: value as any }));
    };

    const generateSummary = () => {
        return `
## PROPOSITION - ASSURANCE ERREURS ET OMISSIONS TECHNOLOGIE (LONGUE)

### 1. INFORMATIONS SUR LE PROPOSANT
- **Nom de l'entreprise:** ${formState.nomClient || '[À compléter]'}
- **Adresse:** ${formState.adresse || '[À compléter]'}
- **Site Web:** ${formState.siteWeb || '[À compléter]'}
- **Année de création:** ${formState.anneeCreation || '[À compléter]'}
- **Revenu annuel:** ${formState.revenuAnnuel ? formState.revenuAnnuel + ' $' : '[À compléter]'}

### 2. DESCRIPTION DES ACTIVITÉS
- **Description générale:** ${formState.descriptionActivites || '[À compléter]'}
- **Répartition des revenus:**
    - Consultation / Conseil: ${formState.pctConsultation}%
    - Développement de logiciels sur mesure: ${formState.pctDeveloppement}%
    - Vente de logiciels préconçus: ${formState.pctVenteLogiciel}%
    - Logiciel en tant que service (SaaS): ${formState.pctSaas}%
    - Hébergement de données / Cloud: ${formState.pctHebergement}%
    - Autre: ${formState.pctAutre}%

### 3. GESTION DES RISQUES
- **Procédures contractuelles standards:** ${formState.contratsStandards}
- **Clause de limitation de responsabilité:** ${formState.limitationResponsabilite} ${formState.limitationResponsabilite === 'oui' ? `(Montant: ${formState.montantLimitation}$)` : ''}
- **Recours à des sous-traitants:** ${formState.sousTraitants} ${formState.sousTraitants === 'oui' ? `(% des revenus: ${formState.pctSousTraitants}%, Preuve d'assurance E&O exigée: ${formState.preuveAssuranceSousTraitants})` : ''}
- **Clients principalement à l'étranger:** ${formState.clientsEtrangers}

### 4. GESTION DES RISQUES CYBER
- **Authentification multifacteur (MFA):** ${formState.mfa}
- **Sauvegardes de données régulières et testées:** ${formState.sauvegardes}
- **Politique de cybersécurité écrite:** ${formState.politiqueCyber}

### 5. HISTORIQUE DE SINISTRES
- **Incident ou réclamation cyber (3 dernières années):** ${formState.incidentAnterieur}
- **Détails:** ${formState.incidentAnterieur === 'oui' ? formState.detailsIncident : 'N/A'}
- **Connaissance d'un fait pouvant mener à une réclamation:** ${formState.faitPourDemande}
- **Détails:** ${formState.faitPourDemande === 'oui' ? formState.detailsFaitPourDemande : 'N/A'}

### 6. GARANTIES DEMANDÉES
- **Limite E&O Technologie:** ${formState.limiteEo}
- **Limite Cyber-Risques:** ${formState.limiteCyber}
- **Franchise:** ${formState.franchise} $
        `.trim();
    };

    const handleCopy = () => {
        const summary = generateSummary();
        navigator.clipboard.writeText(summary);
        toast({ title: "Copié !", description: "Le résumé de la proposition a été copié." });
    };

    return (
        <Card id="nouvelle-affaire-cyber" className="w-full shadow-md scroll-mt-24">
            <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2"><Bot /> Assurance Solutions spécialisées proposition longue</CardTitle>
                <CardDescription>Solutions visant les technologies de l'information – Proposition pour petites entreprises - Assurance erreurs et omissions Technologie</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="multiple" defaultValue={['proposant', 'activites', 'historique-reclamations', 'declaration']} className="w-full">
                    <AccordionItem value="proposant">
                        <AccordionTrigger><User className="mr-2"/>1. Informations sur le Proposant</AccordionTrigger>
                        <AccordionContent className="pt-4 space-y-4">
                            <QuestionBlock label="Nom de l'entreprise"><Input name="nomClient" value={formState.nomClient} onChange={handleInputChange} /></QuestionBlock>
                            <QuestionBlock label="Adresse principale"><Input name="adresse" value={formState.adresse} onChange={handleInputChange} /></QuestionBlock>
                            <QuestionBlock label="Site Web"><Input name="siteWeb" value={formState.siteWeb} onChange={handleInputChange} /></QuestionBlock>
                            <div className="grid md:grid-cols-2 gap-4">
                                <QuestionBlock label="Année de création"><Input name="anneeCreation" type="number" value={formState.anneeCreation} onChange={handleInputChange} /></QuestionBlock>
                                <QuestionBlock label="Revenu annuel ($)"><Input name="revenuAnnuel" type="number" value={formState.revenuAnnuel} onChange={handleInputChange} /></QuestionBlock>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="activites">
                        <AccordionTrigger><Radio className="mr-2"/>2. Description des Activités</AccordionTrigger>
                        <AccordionContent className="pt-4 space-y-4">
                            <QuestionBlock label="Décrivez en détail vos services et produits."><Textarea name="descriptionActivites" value={formState.descriptionActivites} onChange={handleInputChange} /></QuestionBlock>
                            <QuestionBlock label="Répartition de vos revenus annuels (%)">
                                <div className="space-y-2">
                                    <div className="grid grid-cols-3 items-center gap-2"><Label>Consultation / Conseil en TI</Label><Input className="col-span-2" name="pctConsultation" type="number" value={formState.pctConsultation} onChange={handleInputChange} /></div>
                                    <div className="grid grid-cols-3 items-center gap-2"><Label>Développement de logiciels sur mesure</Label><Input className="col-span-2" name="pctDeveloppement" type="number" value={formState.pctDeveloppement} onChange={handleInputChange} /></div>
                                    <div className="grid grid-cols-3 items-center gap-2"><Label>Vente et licence de logiciels préconçus</Label><Input className="col-span-2" name="pctVenteLogiciel" type="number" value={formState.pctVenteLogiciel} onChange={handleInputChange} /></div>
                                    <div className="grid grid-cols-3 items-center gap-2"><Label>Logiciel en tant que service (SaaS)</Label><Input className="col-span-2" name="pctSaas" type="number" value={formState.pctSaas} onChange={handleInputChange} /></div>
                                    <div className="grid grid-cols-3 items-center gap-2"><Label>Hébergement de données / Fournisseur de services Cloud</Label><Input className="col-span-2" name="pctHebergement" type="number" value={formState.pctHebergement} onChange={handleInputChange} /></div>
                                    <div className="grid grid-cols-3 items-center gap-2"><Label>Autre (précisez)</Label><Input className="col-span-2" name="pctAutre" type="number" value={formState.pctAutre} onChange={handleInputChange} /></div>
                                </div>
                            </QuestionBlock>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="gestion-risques">
                        <AccordionTrigger><Briefcase className="mr-2"/>3. Gestion des Risques</AccordionTrigger>
                        <AccordionContent className="pt-4 space-y-4">
                            <QuestionBlock label="Avez-vous des procédures contractuelles standards que vous faites signer par tous vos clients?"><RadioGroup onValueChange={(v) => handleRadioChange('contratsStandards', v)} value={formState.contratsStandards} className="flex gap-4"><RadioGroupItem value="oui"/><Label>Oui</Label><RadioGroupItem value="non"/><Label>Non</Label></RadioGroup></QuestionBlock>
                            <QuestionBlock label="Vos contrats incluent-ils une clause de limitation de responsabilité?">
                                <RadioGroup onValueChange={(v) => handleRadioChange('limitationResponsabilite', v)} value={formState.limitationResponsabilite} className="flex gap-4"><RadioGroupItem value="oui"/><Label>Oui</Label><RadioGroupItem value="non"/><Label>Non</Label></RadioGroup>
                                {formState.limitationResponsabilite === 'oui' && <Input name="montantLimitation" value={formState.montantLimitation} onChange={handleInputChange} placeholder="Si oui, quel est le montant?" className="mt-2"/>}
                            </QuestionBlock>
                            <QuestionBlock label="Avez-vous recours à des sous-traitants?">
                                <RadioGroup onValueChange={(v) => handleRadioChange('sousTraitants', v)} value={formState.sousTraitants} className="flex gap-4"><RadioGroupItem value="oui"/><Label>Oui</Label><RadioGroupItem value="non"/><Label>Non</Label></RadioGroup>
                                {formState.sousTraitants === 'oui' &&
                                    <div className="mt-2 space-y-2">
                                        <Input name="pctSousTraitants" value={formState.pctSousTraitants} onChange={handleInputChange} placeholder="% des revenus annuels"/>
                                        <div className="flex items-center gap-4"><Label>Exigez-vous une preuve d'assurance E&O?</Label><RadioGroup onValueChange={(v) => handleRadioChange('preuveAssuranceSousTraitants', v)} value={formState.preuveAssuranceSousTraitants} className="flex gap-4"><RadioGroupItem value="oui"/><Label>Oui</Label><RadioGroupItem value="non"/><Label>Non</Label></RadioGroup></div>
                                    </div>
                                }
                            </QuestionBlock>
                            <QuestionBlock label="Vos clients sont-ils principalement situés à l'extérieur du Canada?"><RadioGroup onValueChange={(v) => handleRadioChange('clientsEtrangers', v)} value={formState.clientsEtrangers} className="flex gap-4"><RadioGroupItem value="oui"/><Label>Oui</Label><RadioGroupItem value="non"/><Label>Non</Label></RadioGroup></QuestionBlock>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="gestion-risques-cyber">
                        <AccordionTrigger><Shield className="mr-2"/>4. Gestion des Risques Cyber</AccordionTrigger>
                        <AccordionContent className="pt-4 space-y-4">
                            <QuestionBlock label="Utilisez-vous l'authentification multifacteur (MFA) pour tous les accès distants et les services de courriel ?"><RadioGroup onValueChange={(v) => handleRadioChange('mfa', v)} value={formState.mfa} className="flex gap-4"><RadioGroupItem value="oui"/><Label>Oui</Label><RadioGroupItem value="non"/><Label>Non</Label></RadioGroup></QuestionBlock>
                            <QuestionBlock label="Effectuez-vous des sauvegardes régulières (au moins hebdomadaires) de vos données critiques, stockées hors ligne ou sur un réseau séparé ?"><RadioGroup onValueChange={(v) => handleRadioChange('sauvegardes', v)} value={formState.sauvegardes} className="flex gap-4"><RadioGroupItem value="oui"/><Label>Oui</Label><RadioGroupItem value="non"/><Label>Non</Label></RadioGroup></QuestionBlock>
                            <QuestionBlock label="Avez-vous une politique de cybersécurité écrite et communiquée à tous les employés ?"><RadioGroup onValueChange={(v) => handleRadioChange('politiqueCyber', v)} value={formState.politiqueCyber} className="flex gap-4"><RadioGroupItem value="oui"/><Label>Oui</Label><RadioGroupItem value="non"/><Label>Non</Label></RadioGroup></QuestionBlock>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="historique-reclamations">
                        <AccordionTrigger><History className="mr-2"/>5. Historique des réclamations</AccordionTrigger>
                        <AccordionContent className="pt-4 space-y-4">
                            <QuestionBlock label="Avez-vous subi un incident ou une réclamation cybernétique au cours des 3 dernières années ?"><RadioGroup onValueChange={(v) => handleRadioChange('incidentAnterieur', v)} value={formState.incidentAnterieur} className="flex gap-4"><RadioGroupItem value="oui"/><Label>Oui</Label><RadioGroupItem value="non"/><Label>Non</Label></RadioGroup></QuestionBlock>
                            {formState.incidentAnterieur === 'oui' && <QuestionBlock label="Veuillez décrire la nature de l'incident, la date et les coûts engagés."><Textarea name="detailsIncident" value={formState.detailsIncident} onChange={handleInputChange} /></QuestionBlock>}
                            <div className="p-4 border rounded-lg bg-background mt-4">
                                <Label className="font-semibold">3. Est-ce que le proposant, ou toute personne ou entité faisant l'objet d'une proposition de couverture, est au courant d'un fait, d'une circonstance,
d'une situation, d'une transaction, d'un événement, d'un acte, d'une erreur ou d'une omission pour lesquels il y aurait lieu de croire vraisemblablement à la possibilité d'une demande d'indemnisation susceptible d'être comprise dans la portée de la proposition d'assurance?</Label>
                                <div className="mt-2">
                                    <RadioGroup onValueChange={(v) => handleRadioChange('faitPourDemande', v)} value={formState.faitPourDemande} className="flex gap-4">
                                        <RadioGroupItem value="oui" id="fait-oui" /><Label htmlFor="fait-oui">Oui</Label>
                                        <RadioGroupItem value="non" id="fait-non" /><Label htmlFor="fait-non">Non</Label>
                                    </RadioGroup>
                                </div>
                                {formState.faitPourDemande === 'oui' && <Textarea name="detailsFaitPourDemande" value={formState.detailsFaitPourDemande} onChange={handleInputChange} placeholder="Si « OUI », précisez :" className="mt-2"/>}
                                <div className="mt-2 text-xs text-muted-foreground p-2 bg-secondary rounded-md">REMARQUE : SANS PORTER ATTEINTE À TOUT AUTRE DROIT OU RECOURS DU SOUSCRIPTEUR, TOUTE INDEMNISATION DONT LA DIVULGATION EST REQUISE EN RÉPONSE À LA PRÉSENTE QUESTION EST EXCLUE DE LA PROPOSITION D'ASSURANCE.</div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="garanties">
                        <AccordionTrigger><DollarSign className="mr-2"/>6. Garanties Demandées</AccordionTrigger>
                        <AccordionContent className="pt-4 space-y-4">
                            <div className="grid md:grid-cols-3 gap-4">
                                <QuestionBlock label="Limite E&O Tech"><RadioGroup onValueChange={(v) => handleRadioChange('limiteEo', v)} value={formState.limiteEo}><div className="flex items-center space-x-2"><RadioGroupItem value="1M" id="eo-1m"/><Label htmlFor="eo-1m">1 000 000 $</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="2M" id="eo-2m"/><Label htmlFor="eo-2m">2 000 000 $</Label></div></RadioGroup></QuestionBlock>
                                <QuestionBlock label="Limite Cyber"><RadioGroup onValueChange={(v) => handleRadioChange('limiteCyber', v)} value={formState.limiteCyber}><div className="flex items-center space-x-2"><RadioGroupItem value="250k" id="cyb-250"/><Label htmlFor="cyb-250">250 000 $</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="500k" id="cyb-500"/><Label htmlFor="cyb-500">500 000 $</Label></div></RadioGroup></QuestionBlock>
                                <QuestionBlock label="Franchise"><RadioGroup onValueChange={(v) => handleRadioChange('franchise', v)} value={formState.franchise}><div className="flex items-center space-x-2"><RadioGroupItem value="2500" id="fr-2500"/><Label htmlFor="fr-2500">2 500 $</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="5000" id="fr-5000"/><Label htmlFor="fr-5000">5 000 $</Label></div></RadioGroup></QuestionBlock>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="declaration">
                        <AccordionTrigger>Déclaration pour la proposition d'assurance</AccordionTrigger>
                        <AccordionContent className="pt-4 space-y-4 text-sm">
                            <p>Le ou la soussigné(e) déclare :</p>
                            <ul className="list-alpha pl-6 space-y-2">
                                <li>qu'il ou elle est dûment autorisé(e) par l'entreprise à remplir la présente proposition et que toutes les déclarations aux fins de la présente sont véridiques et complètes;</li>
                                <li>que tout effort raisonnable a été fait pour obtenir des renseignements suffisants de la part de chaque personne visée par la présente proposition d'assurance aux fins de la remplir de manière adéquate et précise;</li>
                                <li>les états financiers soumis aux fins de cette proposition tiennent compte de la situation financière actuelle de l'entreprise et de ses filiales (si ce n'est pas le cas, veuillez fournir des précisions sur une feuille distincte).</li>
                            </ul>
                            <p className="pt-2">Le ou la soussigné(e) convient de ce qui suit :</p>
                            <ul className="list-alpha pl-6 space-y-2">
                                <li>si entre la date de la présente proposition et la date d'entrée en vigueur du contrat, les déclarations et les renseignements que renferme la présente proposition changent de quelque façon que ce soit, il ou elle doit aviser immédiatement Intact Assurance par écrit et, sans porter atteinte à tout autre recours juridique s'y rattachant, Intact Assurance peut modifier ou retirer toute soumission non confirmée ou toute autorisation ou convention liant les parties;</li>
                                <li>la présente proposition et les documents qui y sont annexés font partie intégrante du contrat, s'il doit être établi.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className="mt-6"><Label className="font-semibold">Résumé pour Copier</Label><Textarea readOnly value={generateSummary()} className="mt-2 h-48 font-mono text-xs" /></div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleCopy} className="w-full"><Copy className="mr-2 h-4 w-4"/>Copier le Résumé de la Proposition</Button>
            </CardFooter>
        </Card>
    );
};
