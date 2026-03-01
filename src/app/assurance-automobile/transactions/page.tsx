'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Breadcrumb } from '@/components/breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
from '@/components/ui/card';
import { Car, ArrowRight, Workflow, Copy, Sparkles, AlertTriangle, Send, Mail,
CheckCircle, FileText, CreditCard, Lightbulb, Edit, Truck as TruckIcon, HelpCircle }
from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from
'@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from
'@/components/ui/table';
import * as htmlToImage from 'html-to-image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from
'@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const formatDate = (dateString: string) => {


    if (!dateString) return '';
    try {
        const date = new Date(dateString + 'T00:00:00'); // Ensure it's parsed as local
time
        return new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
    } catch (e) {
        return dateString;
    }
};

const QuestionBlock: React.FC<{ label: string; children: React.ReactNode }> = ({
label, children }) => (
    <div className="p-4 border rounded-lg bg-background">
        <Label className="font-semibold">{label}</Label>
        <div className="mt-2">{children}</div>
    </div>
);


const DemandeClientAssuranceAutoRapideContent: React.FC = () => {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const [financement, setFinancement] = useState<'achat' | 'location' | null>(null);
    const [modePaiement, setModePaiement] = useState<'12_prelevements' |
'1_paiement' | 'autre'>('12_prelevements');
    const [showCopyable, setShowCopyable] = useState(false);
    const [showEpicNote, setShowEpicNote] = useState(false);
    const [generatedFilename, setGeneratedFilename] = useState('');
    const [noteFilename, setNoteFilename] = useState('');
    const [pinkCardFilename, setPinkCardFilename] = useState('');
    const [clientEmailSubject, setClientEmailSubject] = useState('');
    const [confirmationEmailSubject, setConfirmationEmailSubject] = useState('');
    const [underwriterEmailSubject, setUnderwriterEmailSubject] = useState('');
    const [dealerEmailSubject, setDealerEmailSubject] = useState('');
    const [modificationType, setModificationType] = useState('substitution');


    const cardRef = useRef<HTMLDivElement>(null);
    const noteRef = useRef<HTMLDivElement>(null);
    const noteRefAvenant = useRef<HTMLDivElement>(null);


    const [formState, setFormState] = useState({
        nomClient: '',
        adresseClient: '',
        courriel: '',
        telephone: '',
        anneeIncorporation: '',
        noReq: '',
        noPolice: '',
        creancierNom: '',
        creancierAdresse: '',
        locateurNom: '',
        locateurAdresse: '',
        plumitif: 'non',
        faillite: 'non',
        accordCredit: 'non',
        refusAnterieur: 'non',
        datePossession: '',
        proprietaireImmatricule: '',
        etatVehicule: 'neuf',
        kilometrage: '',
        annee: '',
        marqueModele: '',
        numeroSerie: '',
        valeurVehicule: '',
        valeurNeuf: '',
        equipementsAttaches: '',
        lettrage: 'non',
        sinistres: 'non',
        descriptionSinistres: '',
        antivol: 'non',
        conducteurPrincipal: '',
        permis: '',
        usageChantier: '',
        usagePersonnel: '',
        rayon: '80',
        adresseRemisage: '',
        vehiculePrete: 'non',
        assistanceRoutiere: 'non',
        faq20: 'non',
        faq27: 'non',
        faq34: 'non',
        faq8: 'non',
        faq8Amount: '',
        faq30: 'non',
        faq30Amount: '',
        valeurLettrage: '',
        franchiseB2: '1000',
        franchiseB3: '1000',
        paiementAutre: '',
        primeConfirmee: '',
        nomSouscripteur: '',
        compagnieAssurance: '',
        compagnieAssuranceAutre: '',
        dateConfirmation: '',
        moyenConfirmation: 'courriel',
        nomRepresentant: '',
        nomConcessionnaire: '',
        telephoneRepresentant: '',
        courrielRepresentant: '',
        assureurActuel: '',
        assureur: '',
        dateEffet: '',
        modificationDescription: '',
        infractions: 'non',
    });

    const handleCopyText = (textToCopy: string, title: string) => {
        if (!textToCopy) return;
        navigator.clipboard.writeText(textToCopy).then(() => {
            toast({
                title: "Copié !",
                description: `Le champ "${title}" a été copié.`,
            });
        }).catch(() => {
             toast({
                title: "Erreur",
                description: "La copie a échoué.",
                variant: "destructive",
            });
        });
    };

    const handleCopyHtml = (htmlContent: string, title: string) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        navigator.clipboard.write([
            new ClipboardItem({
                'text/html': new Blob([htmlContent], { type: 'text/html' }),
                'text/plain': new Blob([tempDiv.innerText], { type: 'text/plain' })
            })
        ]).then(() => {
            toast({
                title: "Copié !",
                description: `Le modèle de courriel "${title}" a été copié.`,
            });
        }).catch(() => {
             toast({
                title: "Erreur",
                description: "La copie a échoué.",
                variant: "destructive",
            });
        });
    };

    const clientDocsEmail = `
        <p>Bonjour ${formState.conducteurPrincipal || '[Nom du contact]'},</p>
        <p>Pour faire suite à notre conversation et finaliser votre demande de
soumission d'assurance automobile, pourriez-vous s'il vous plaît me faire parvenir
les documents suivants :</p>
        <ul>
            <li>Une copie de votre permis de conduire.</li>
            <li>Une copie du contrat d'achat ou de location du véhicule.</li>
            <li><strong>IMPORTANT : Si le conducteur a moins de 23 ans ou moins de 3
ans d'expérience, le dossier de la SAAQ est requis et le dossier doit être
référé.</strong></li>
            <li>Confirmation de vos modalités de paiement souhaitées.</li>
            <li>Afin de mieux vous servir, veuillez nous confirmer au besoin les
coordonnées de votre concessionnaire (nom du représentant, nom du
concessionnaire, courriel et téléphone).</li>
            <li>S'il vous plaît, veuillez nous fournir une confirmation de l'installation du
système TAG ou, s'il est déjà installé, le numéro de série de celui-ci.</li>
        </ul>
        <p>Merci de votre collaboration rapide !</p>
        <p>Cordialement,</p>
    `;

    const underwriterEmail = `
        <p>Bonjour Asma,</p>
        <p>Pourrais-tu me fournir une prime pour la nouvelle affaire suivante ?</p>
        <ul>
            <li><strong>Client :</strong> ${formState.nomClient || '[À compléter]'}</li>
            <li><strong>Contact :</strong> ${formState.conducteurPrincipal || '[À compléter]'}</li>
            <li><strong>Véhicule :</strong> ${formState.annee || '[Année]'} ${formState.marqueModele || '[Marque/Modèle]'}</li>
            <li><strong>Valeur :</strong> ${formState.valeurVehicule || '[À compléter]'}$</li>
            <li><strong>Usage :</strong> ${formState.usageChantier || 'N/A'}% Chantier, ${formState.usagePersonnel || 'N/A'}% Personnel</li>
            <li><strong>Date de possession :</strong> ${formState.datePossession || '[À compléter]'}</li>
        </ul>
        <p>Le client n'a pas de sinistres récents et un bon dossier. Merci de ton aide !</p>
    `;

    const getConfirmationEmail = () => {
        let paymentNote = '';
        if (modePaiement === '12_prelevements') {
            paymentNote = "<p><strong>Note :</strong> Pour finaliser la mise en place des paiements mensuels, veuillez nous faire parvenir un spécimen de chèque.</p>";
        }

        return `
            <p>Bonjour ${formState.conducteurPrincipal || '[Nom du contact]'}</p>
            <p>Excellente nouvelle ! J'ai le plaisir de vous confirmer votre nouvelle police d'assurance automobile avec ${formState.compagnieAssurance === 'Autre' ? formState.compagnieAssuranceAutre : formState.compagnieAssurance || '[Assureur]'}.</p>
            <p>La prime annuelle s'élève à <strong>${formState.primeConfirmee || '[Montant]'} $</strong>, taxes incluses, pour les garanties suivantes :</p>
            <ul>
                <li><strong>Chapitre A (RC) :</strong> 2,000,000$</li>
                <li><strong>Chapitre B2 (Collision) :</strong> Franchise de ${formState.franchiseB2}$</li>
                <li><strong>Chapitre B3 (Sans collision) :</strong> Franchise de ${formState.franchiseB3}$</li>
                <li><strong>Assistance routière :</strong> ${formState.assistanceRoutiere === 'oui' ? 'Oui' : 'Non'}</li>
            </ul>
            ${paymentNote}
            <p>Vous recevrez la note de couverture et la carte rose par courriel sous peu. N'hésitez pas si vous avez des questions.</p>
            <p>Cordialement,</p>
        `;
    };

    const dealerConfirmationEmail = `
        <p>Bonjour ${formState.nomRepresentant || '[Nom du représentant]'},</p>
        <p>Par la présente, nous désirons confirmer la mise en place d'une couverture d'assurance automobile pour votre client, <strong>${formState.nomClient || '[NOM DU CLIENT]'}</strong>.</p>
        <p>Veuillez trouver la note de couverture en pièce jointe.</p>
        <ul>
            <li><strong>Véhicule :</strong> ${formState.annee || '[Année]'} ${formState.marqueModele || '[Marque/Modèle]'}</li>
            <li><strong>Assureur :</strong> ${formState.compagnieAssurance === 'Autre' ? formState.compagnieAssuranceAutre : formState.compagnieAssurance || '[Assureur]'}</li>
            <li><strong>N° de Police :</strong> ${formState.noPolice || '[Numéro de police]'}</li>
            <li><strong>Date d'effet :</strong> ${formatDate(formState.datePossession) || '[Date]'}</li>
        </ul>
        <p>Le lien d'assurance est effectif. N'hésitez pas à nous contacter pour toute question.</p>
        <p>Cordialement,</p>
    `;

     const getBindRequestEmail = () => {
        const content = getCopyableContent();
        const htmlContent = content.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return `
            <p>Bonjour,</p>
            <p>SVP confirmer que la soumission est requise pour la date d'effet mentionnée ci-dessous.</p>
            <br/>
            <div style="font-family: monospace; white-space: pre-wrap;">${htmlContent}</div>
            <br/>
            <p>Merci !</p>
        `;
    };

    useEffect(() => {
        const data = searchParams.get('data');
        if (data) {
            try {
                const parsedData = JSON.parse(decodeURIComponent(data));
                setFormState(prev => ({
                    ...prev,
                    nomClient: parsedData.nomClient || prev.nomClient,
                    adresseClient: parsedData.adresseClient || prev.adresseClient,
                    courriel: parsedData.courriel || prev.courriel,
                    telephone: parsedData.telephone || prev.telephone,
                    annee: parsedData.annee || prev.annee,
                    marqueModele: parsedData.marqueModele || prev.marqueModele,
                    valeurVehicule: parsedData.valeurVehicule || prev.valeurVehicule,
                    datePossession: parsedData.datePossession || prev.datePossession,
                    etatVehicule: parsedData.etatVehicule || prev.etatVehicule,
                    kilometrage: parsedData.kilometrage || prev.kilometrage,
                    antivol: parsedData.systemeTag || prev.antivol,
                    numeroSerie: parsedData.numeroSerie || prev.numeroSerie,
                    conducteurPrincipal: parsedData.contactPrincipal || prev.conducteurPrincipal,
                    anneeIncorporation: parsedData.anneeIncorporation || prev.anneeIncorporation,
                    rayon: parsedData.rayonOperation || prev.rayon,
                    vehiculePrete: parsedData.vehiculePrete || prev.vehiculePrete,
                    usageChantier: parsedData.usageChantier || prev.usageChantier,
                    usagePersonnel: parsedData.usagePersonnel || prev.usagePersonnel,
                    faillite: parsedData.faillite || prev.faillite,
                    refusAnterieur: parsedData.refusAnterieur || prev.refusAnterieur,
                    nomRepresentant: parsedData.nomVendeur || prev.nomRepresentant,
                    telephoneRepresentant: parsedData.telephoneRepresentant || prev.telephoneRepresentant
                }));

                 if (parsedData.financement) {
                    if (parsedData.financement.toLowerCase().includes('location')) {
                        setFinancement('location');
                    } else if (parsedData.financement.toLowerCase().includes('achat')) {
                        setFinancement('achat');
                    }
                }
            } catch (e) {
                console.error("Failed to parse data from URL", e);
                toast({
                    title: "Erreur de données",
                    description: "Impossible de pré-remplir le formulaire avec les données de l'analyseur.",
                    variant: "destructive"
                });
            }
        }
    }, [searchParams, toast]);

    useEffect(() => {
        const { nomClient, datePossession, annee, marqueModele, nomSouscripteur } = formState;

        const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9-]/g, '_');

        const baseName = `${sanitize(nomClient) || 'NOCLIENT'}-${sanitize(annee) || 'NOANNEE'}-${sanitize(marqueModele) || 'NOMODELE'}-${formatDate(datePossession) || 'NODATE'}`;

        setGeneratedFilename(`PropositionNouvelleAffaireAuto-${baseName}.pdf`);
        setNoteFilename(`NoteCouvertureAuto-${baseName}.pdf`);
        setPinkCardFilename(`CarteRoseAuto-${baseName}.png`);

        setClientEmailSubject(`Assurance auto - Suivi - Demande de documents pour votre soumission - ${nomClient || ''} - Entrée en vigueur: ${formatDate(datePossession) || ''}`);
        setConfirmationEmailSubject(`Confirmation de la prime de votre police d'assurance auto - ${nomClient || ''}`);
        setUnderwriterEmailSubject(`Demande de prime - ${nomClient || ''} - ${marqueModele || ''}`);
        setDealerEmailSubject(`Confirmation d'assurance pour ${nomClient || ''}`);

    }, [formState]);


    const handleCopyFilename = (filename: string) => {
        navigator.clipboard.writeText(filename).then(() => {
            toast({
                title: "Copié !",
                description: "Le nom du fichier a été copié.",
            });
        });
    };

    const handleCopyImage = async (ref: React.RefObject<HTMLDivElement>, filename: string) => {
        if (!ref.current) return;
        try {
            const dataUrl = await htmlToImage.toPng(ref.current, {
                backgroundColor: '#ffffff',
                pixelRatio: 2
            });
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            toast({
                title: "Copié !",
                description: `Le document ${filename} a été copié en tant qu'image.`,
            });
        } catch (error) {
            console.error("Erreur lors de la copie de l'image:", error);
            toast({
                title: "Erreur",
                description: "La copie en image a échoué. Essayez de faire une capture d'écran manuellement.",
                variant: "destructive"
            });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleRadioChange = (name: string, value: string) => {
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const getCopyableContent = () => {
        let paiementInfo = '';
        if (modePaiement === '12_prelevements') {
            paiementInfo = "12 prélèvements. Un spécimen de chèque suivra pour mettre en place le plan de paiement.";
        } else if (modePaiement === '1_paiement') {
            paiementInfo = '1 paiement';
        } else {
            paiementInfo = formState.paiementAutre;
        }

        return `
### DEMANDE SOUMISSION RAPIDE - AUTOMOBILE

**A. PROPOSANT**
.1 Nom du proposant: ${formState.nomClient}
.2 Adresse du proposant: ${formState.adresseClient}
.3 Propriétaire/Contact: ${formState.conducteurPrincipal}
.4 Téléphone: ${formState.telephone}
.5 Courriel: ${formState.courriel}
.6 Description des activités: ${formState.usageChantier}% Chantier, ${formState.usagePersonnel}% Personnel
.7 Année d'incorporation: ${formState.anneeIncorporation}
.8 Emplacement de garage / Remisage: ${formState.adresseRemisage}

**B. RENSEIGNEMENTS SUR L'ASSURANCE DEMANDÉE**
.1 Date d'entrée en vigueur: ${formState.datePossession}
.2 Nom de l'assureur actuel: ${formState.assureurActuel || '[À COMPLÉTER]'}
.3 Un assureur a-t-il déjà refusé de souscrire ou annulé un contrat d'assurance au proposant?: ${formState.refusAnterieur}
.4 Avez-vous une assurance Responsabilité civile générale?: [OUI/NON, NOM ASSUREUR, DATE]
- Plumitif: ${formState.plumitif}
- Faillite: ${formState.faillite}
- Accord cote de crédit: ${formState.accordCredit}
- Sinistres (5 dernières années): ${formState.sinistres}${formState.sinistres === 'oui' ? `
- Description: ${formState.descriptionSinistres}` : ''}

**C. VEHICULES**
.1 Année/Marque/Modèle: ${formState.annee} ${formState.marqueModele}
.No. de série: ${formState.numeroSerie}
.Valeur: ${formState.valeurVehicule}$ (Valeur à neuf: ${formState.valeurNeuf}$)
.État: ${formState.etatVehicule} ${formState.etatVehicule === 'usage' ? `(${formState.kilometrage} km)` : ''}
.Propriétaire immatriculé: ${formState.proprietaireImmatricule}
.Financement: ${financement === 'achat' ? `Achat (Créancier - 23a: ${formState.creancierNom}, ${formState.creancierAdresse})` : ''}${financement === 'location' ? `Location (Locateur - 5a: ${formState.locateurNom}, ${formState.locateurAdresse})` : ''}
.Équipements attachés: ${formState.equipementsAttaches}
.Lettrage: ${formState.lettrage} (Valeur: ${formState.valeurLettrage}$)
.Système anti-vol (TAG): ${formState.antivol}

**D. CONDUCTEUR & USAGE**
- Conducteur principal: ${formState.conducteurPrincipal}
- No de permis: ${formState.permis}
- Rayon d'opération: ${formState.rayon} km
- Véhicule prêté à un employé: ${formState.vehiculePrete}

**E. PROTECTIONS DEMANDÉES**
- Chapitre A (RC): 2,000,000$
- Chapitre B2 (Collision): Franchise ${formState.franchiseB2}$
- Chapitre B3 (Sans collision): Franchise ${formState.franchiseB3}$
- Assistance routière: ${formState.assistanceRoutiere}
- F.A.Q. n° 20 (Location): ${formState.faq20}
- F.A.Q. n° 27 (Véhicule non-propriété): ${formState.faq27}
- F.A.Q. n° 34 (Assurance individuelle): ${formState.faq34}
- F.A.Q. n° 8 (Franchise dommages matériels): ${formState.faq8 === 'oui' ? `Oui, ${formState.faq8Amount}$` : 'Non'}
- F.A.Q. n° 30 (Restriction garanties équipements): ${formState.faq30 === 'oui' ? `Oui, ${formState.faq30Amount}$` : 'Non'}
- Lettrage et équipements/outils (valeur): ${formState.valeurLettrage}$

**F. PAIEMENT**
- Modalités: ${paiementInfo}
`;
    };

    const getEpicNoteContent = () => {
         const protectionsOffertes: string[] = [
            `Assistance routière: ${formState.assistanceRoutiere === 'oui' ? 'Offerte et acceptée' : 'Offerte et refusée'}`,
            `F.A.Q. n° 20 (Location): ${formState.faq20 === 'oui' ? 'Offerte et acceptée' : 'Offerte et refusée/non applicable'}`,
            `F.A.Q. n° 27 (Véhicule non-propriété): ${formState.faq27 === 'oui' ? 'Offerte et acceptée' : 'Offerte et refusée/non applicable'}`,
            `F.A.Q. n° 34 (Assurance individuelle): ${formState.faq34 === 'oui' ? 'Offerte et acceptée' : 'Offerte et refusée/non applicable'}`,
            `F.A.Q. n° 8 (Franchise dommages matériels): ${formState.faq8 === 'oui' ? `Offerte et acceptée (${formState.faq8Amount}$)` : 'Offerte et refusée/non applicable'}`,
            `F.A.Q. n° 30 (Restriction garanties équipements): ${formState.faq30 === 'oui' ? `Offerte et acceptée (${formState.faq30Amount}$)` : 'Offerte et refusée/non applicable'}`,
            `Lettrage et équipements/outils (valeur): ${formState.valeurLettrage ? `Couverture pour ${formState.valeurLettrage}$ acceptée` : 'Offerte et refusée/non applicable'}`
        ];

        const documentsDemandes = [
            "Une copie du contrat d'achat/location du nouveau véhicule (si applicable).",
            "Une confirmation du numéro de série du nouveau véhicule.",
            "Si un système TAG a été installé sur le nouveau véhicule, le certificat ou le numéro de série du TAG."
        ].join('\n- ');

        return `
NOTE D'ACTIVITÉ - AVENANT AUTOMOBILE
-------------------------------------
Date de l'activité: ${new Date().toLocaleDateString('fr-CA')}
Interlocuteur: ${formState.conducteurPrincipal || formState.nomClient}

Résumé de la transaction:
- Type: Avenant Automobile (${modificationType})
- Client: ${formState.nomClient}
- No de police: ${formState.noPolice} / Assureur: ${formState.assureur}
- Date d'effet: ${formState.dateEffet}
- Véhicule: ${formState.annee} ${formState.marqueModele}
- Prime additionnelle/crédit: ${formState.primeConfirmee}$

Actions déontologiques posées:
- Demande de modification documentée.
- Protections additionnelles offertes et discutées :
    - ${protectionsOffertes.join('\n    - ')}
- Avis (note de couverture, carte rose) envoyés au client et/ou concessionnaire.
- Avis important sur le conducteur (âge/expérience) rappelé si pertinent.
- Documents demandés au client: \n- ${documentsDemandes}

Points de vigilance discutés :
- Vérification de l'usage et du conducteur principal (${formState.conducteurPrincipal}).
- Obligation du système antivol (TAG) : ${formState.antivol === 'oui' ? 'Confirmée' : 'Refusée/Non applicable'}.
- Risques liés au prêt du véhicule (${formState.vehiculePrete === 'oui' ? 'Discuté' : 'Non applicable'}) et au territoire dortoir.
- Antécédents (Sinistres: ${formState.sinistres}, Infractions: ${formState.infractions}).

Prochaines étapes:
- Suivi de la réception des documents d'avenant officiels.
- Archivage des communications.
        `.trim();
    }

    const handleCopySummary = () => {
        const textToCopy = getCopyableContent();
        navigator.clipboard.writeText(textToCopy).then(() => {
            toast({
                title: "Copié !",
                description: "Le résumé de la demande a été copié dans le presse-papiers.",
            });
        });
    };

    const handleCopyEpicNote = () => {
        const textToCopy = getEpicNoteContent();
        navigator.clipboard.writeText(textToCopy).then(() => {
            toast({
                title: "Copié !",
                description: "La note pour EPIC a été copée dans le presse-papiers.",
            });
        });
    }

    const clientDocsEmailAvenant = `
        <p>Bonjour ${formState.conducteurPrincipal || '[Nom du contact]'},</p>
        <p>Pour faire suite à votre demande de modification, veuillez nous fournir les documents suivants :</p>
        <ul>
            <li>Une copie du contrat d'achat/location du nouveau véhicule (si applicable).</li>
            <li>Une confirmation du numéro de série du nouveau véhicule.</li>
            <li>Si un système TAG a été installé sur le nouveau véhicule, le certificat ou le numéro de série du TAG.</li>
        </ul>
        <p>Merci de votre collaboration.</p>
    `;
    const clientEmailSubjectAvenant = `Suivi de votre demande de modification d'assurance automobile - ${formState.nomClient}`;
    const confirmationEmailAvenant = "message de confirmation";
    const handleCopyTextAvenant = (text: string, title: string) => {};
    const handleCopyHtmlAvenant = (html: string, title: string) => {};

    return (
        <Card id="avenant" className="shadow-md w-full scroll-mt-24">
            <CardHeader>
                <CardTitle className="text-xl text-primary">Demande Client - Assurance Auto Avenant et ajout conducteur</CardTitle>
                <CardDescription>Outil interactif pour préparer une demande d'avenant (modification, ajout, retrait de véhicule).</CardDescription>

                 <div className="pt-4 space-y-2">
                    <Label htmlFor="filename-generator">Nom de fichier suggéré :</Label>
                    <div className="flex gap-2">
                        <Input id="filename-generator" readOnly value={generatedFilename} className="font-mono text-xs bg-muted" />
                        <Button variant="outline" size="icon" onClick={() => handleCopyFilename(generatedFilename)}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

            </CardHeader>
            <CardContent className="space-y-6">

                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-blue-900">
                    <p className="font-bold flex items-center gap-2"><Workflow className="h-5 w-5" /> Workflow de la Demande d'Avenant</p>
                    <div className="mt-4 space-y-4 text-sm">
                        <Card className="bg-white">
                             <CardHeader className="pb-2">
                                <CardTitle className="text-base text-primary">Étape 1 : Collecte & Communication</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Utilisez ce formulaire pour documenter la demande de modification. Demandez au client tous les documents nécessaires (ex: contrat du nouveau véhicule).</p>
                            </CardContent>
                            <CardFooter>
                                <Dialog>
                                    <DialogTrigger asChild><Button variant="secondary" size="sm"><Mail className="mr-2 h-4 w-4"/>Demander les documents</Button></DialogTrigger>
                                    <DialogContent className="sm:max-w-2xl">
                                        <DialogHeader><DialogTitle>Modèle de courriel pour le client</DialogTitle><DialogDescription>Copiez ce texte pour demander les documents nécessaires.</DialogDescription></DialogHeader>
                                        <div className="space-y-4">
                                            <div><Label htmlFor="client-email-subject-avenant">Sujet du courriel</Label><div className="flex gap-2"><Input id="client-email-subject-avenant" readOnly value={clientEmailSubjectAvenant} className="font-mono text-xs" /><Button variant="outline" size="icon" onClick={() => handleCopyTextAvenant(clientEmailSubjectAvenant, 'Sujet du courriel')}><Copy className="h-4 w-4"/></Button></div></div>
                                            <div><Label>Corps du courriel</Label><div className="p-4 border rounded-md bg-gray-50 text-sm" dangerouslySetInnerHTML={{ __html: clientDocsEmailAvenant }} /></div>
                                        </div>
                                        <DialogFooter><Button onClick={() => handleCopyHtmlAvenant(clientDocsEmailAvenant, "Demande de documents")}><Copy className="mr-2 h-4 w-4"/>Copier le corps</Button></DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                         <Card className="bg-white">
                             <CardHeader className="pb-2">
                                <CardTitle className="text-base text-primary">Étape 2 : Traitement de la Demande</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Envoyez la demande de modification à l'assureur. Si la prime doit être confirmée immédiatement, utilisez la section "Confirmation Prime".</p>
                            </CardContent>
                        </Card>
                         <Card className="bg-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base text-primary">Étape 3 : Finalisation</CardTitle>
                            </CardHeader>
                             <CardContent>
                               <p>1- Confirmez la prime et les garanties avec le client.<br/>2- Envoyez la carte rose.<br/>3- Envoyez la note de couverture au client et au concessionnaire si nécessaire.<br/>4- Confirmez à l'assureur que la soumission est requise.<br/>5- Archivez votre ou vos courriels dans EPIC.</p>
                            </CardContent>
                            <CardFooter className="flex-wrap gap-2">
                                <Dialog>
                                    <DialogTrigger asChild><Button variant="secondary" size="sm"><CheckCircle className="mr-2 h-4 w-4" /> Confirmer la prime au client</Button></DialogTrigger>
                                    <DialogContent className="sm:max-w-2xl">
                                        <DialogHeader><DialogTitle>Confirmation de la prime (Avenant)</DialogTitle><DialogDescription>Remplissez la prime additionnelle ou le crédit, puis copiez le contenu pour l'envoyer au client.</DialogDescription></DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2"><Label htmlFor="primeAnnuelleAvenant">Prime Additionnelle / Crédit (taxes incluses)</Label><Input id="primeAnnuelleAvenant" value={formState.primeConfirmee} onChange={(e) => handleInputChange({ target: { name: 'primeConfirmee', value: e.target.value } })} placeholder="ex: 250 ou -150" /></div>
                                            <div className="space-y-2"><Label htmlFor="confirmation-email-subject-avenant">Sujet du courriel</Label><div className="flex gap-2"><Input id="confirmation-email-subject-avenant" readOnly value={confirmationEmailSubject} className="font-mono text-xs" /><Button variant="outline" size="icon" onClick={() => handleCopyTextAvenant(confirmationEmailSubject, 'Sujet du courriel')}><Copy className="h-4 w-4"/></Button></div></div>
                                            <div><Label>Aperçu du corps du courriel</Label><div className="p-4 border rounded-md bg-gray-50 text-sm mt-2" dangerouslySetInnerHTML={{ __html: confirmationEmailAvenant }} /></div>
                                        </div>
                                        <DialogFooter><Button onClick={() => handleCopyHtmlAvenant(confirmationEmailAvenant, "Courriel de confirmation (Avenant)")}><Copy className="mr-2 h-4 w-4" /> Copier le corps</Button></DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Dialog>
                                    <DialogTrigger asChild><Button variant="secondary" size="sm"><FileText className="mr-2 h-4 w-4"/>Générer Note de Couverture</Button></DialogTrigger>
                                     <DialogContent className="sm:max-w-3xl">
                                        <DialogHeader>
                                            <DialogTitle>NOTE DE COUVERTURE - Assurance Automobile (Avenant)</DialogTitle>
                                            <DialogDescription>Vérifiez les informations et copiez la note pour l'envoyer.</DialogDescription>
                                        </DialogHeader>
                                        <div className="pt-4"><Label htmlFor="fn-note-ave">Nom de fichier :</Label><div className="flex gap-2"><Input id="fn-note-ave" readOnly value={noteFilename} className="font-mono text-xs bg-muted" /><Button variant="outline" size="icon" onClick={() => handleCopyFilename(noteFilename)}><Copy className="h-4 w-4"/></Button></div></div>
                                        <div ref={noteRefAvenant} className="p-6 bg-white border my-4 rounded-md text-sm font-sans">
                                            <h3 className="text-lg font-bold text-center text-primary border-b-2 border-accent pb-2 mb-4">NOTE DE COUVERTURE - AVENANT</h3>
                                            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
                                                <p><strong>Assuré :</strong></p><p>{formState.nomClient || '[À compléter]'}</p>
                                                <p><strong>Assureur :</strong></p><p>{formState.assureur || '[À compléter]'}</p>
                                                <p><strong>Police No :</strong></p><p>{formState.noPolice || '[À compléter]'}</p>
                                                <p><strong>Date d'effet de l'avenant:</strong></p><p>{formatDate(formState.dateEffet) || '[À compléter]'}</p>
                                            </div>
                                            <h4 className="font-bold text-primary mt-4 mb-2">Description de la Modification</h4>
                                            <p className="text-xs border p-2 rounded-md bg-gray-50">{formState.modificationDescription || 'Aucune description.'}</p>
                                        </div>
                                         <DialogFooter><Button onClick={() => handleCopyImage(noteRefAvenant, 'Note de Couverture Avenant')}><Copy className="mr-2 h-4 w-4"/>Copier la Note (Image)</Button></DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                 <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="secondary" size="sm"><CreditCard className="mr-2 h-4 w-4" /> Générer Carte Rose</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-2xl">
                                        <DialogHeader>
                                            <DialogTitle>CERTIFICAT D'ASSURANCE AUTOMOBILE (Avenant)</DialogTitle>
                                            <DialogDescription>Vérifiez les informations et copiez la carte pour l'envoyer au client.</DialogDescription>
                                        </DialogHeader>
                                        <div className="pt-4 space-y-2">
                                            <Label htmlFor="fn-card-ave">Nom de fichier :</Label>
                                            <div className="flex gap-2">
                                                <Input id="fn-card-ave" readOnly value={pinkCardFilename} className="font-mono text-xs bg-muted" /><Button variant="outline" size="icon" onClick={() => handleCopyFilename(pinkCardFilename)}><Copy className="h-4 w-4"/></Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

const DemandeClientAssuranceAutoRapide: React.FC = () => {
    return (
        <Suspense fallback={<div>Chargement des transactions...</div>}>
            <DemandeClientAssuranceAutoRapideContent />
        </Suspense>
    );
};

export default DemandeClientAssuranceAutoRapide;
