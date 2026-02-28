import { z } from 'zod';
import { BaseExtractor, ExtractorConfig } from './base-extractor';
import { createDataPoint, FicheDataV2 } from '../types-v2';

const rbqSchema = z.object({
    nomEntreprise: z.string().optional(),
    numeroLicence: z.string().optional(),
    statutLicence: z.string().optional(),
    dateObtention: z.string().optional(),
    dateExpiration: z.string().optional(),
    datePaiement: z.string().optional().describe("Date du paiement annuel"),
    sousCategories: z.array(z.string()).optional(),
    restrictions: z.array(z.string()).optional(),

    // Cautionnement
    cautionnementMontant: z.string().optional().describe("Montant du cautionnement (ex: 40 000 $)"),
    cautionnementEmetteur: z.string().optional().describe("Association fournissant le cautionnement"),

    // Répondant
    nomRepondant: z.string().optional(),
    prenomRepondant: z.string().optional(),
    numeroLicenceRepondant: z.string().optional(),

    // Contact
    adresseComplete: z.string().optional(),
    telephone: z.string().optional(),
    courriel: z.string().optional()
});

const rbqPrompt = `Tu es un expert RBQ. Analyse la fiche détaillée.
CHAMPS SPÉCIFIQUES:
- Cautionnement: Cherche la section "Réclamations au cautionnement" ou "Association... fournissant le cautionnement". Extrais le montant (ex: 40 000 $) et le nom de l'association (ex: "Association des professionnels... (APCHQ)").
- Date de Paiement: Extrais la "Date du paiement annuel" si présente.
- Répondant: Extrais le nom du PREMIER répondant affiché.
- Catégories: Extrais la liste complète des sous-catégories (ex: "1.1.1 Bâtiments...").
`;

export class RBQExtractor extends BaseExtractor {
    constructor() {
        const config: ExtractorConfig = {
            sourceName: 'RBQ',
            schema: rbqSchema,
            promptTemplate: rbqPrompt,
            temperature: 0.0,
            maxRetries: 3
        };
        super(config);
    }

    async extractToFiche(content: string): Promise<Partial<FicheDataV2>> {
        const rawData = await this.extract(content);
        const fiche: Partial<FicheDataV2> = {};

        if (rawData.nomEntreprise) {
            fiche.nomEntreprise = createDataPoint(rawData.nomEntreprise, 'RBQ');
        }

        if (rawData.numeroLicence) {
            fiche.licenceRBQ = {
                numero: createDataPoint(rawData.numeroLicence, 'RBQ'),
                statut: rawData.statutLicence ? createDataPoint(rawData.statutLicence, 'RBQ') : undefined,
                dateObtention: rawData.dateObtention ? createDataPoint(rawData.dateObtention, 'RBQ') : undefined,
                dateExpiration: rawData.dateExpiration ? createDataPoint(rawData.dateExpiration, 'RBQ') : undefined,
                datePaiement: rawData.datePaiement ? createDataPoint(rawData.datePaiement, 'RBQ') : undefined,
                sousCategories: rawData.sousCategories ? createDataPoint(rawData.sousCategories, 'RBQ') : undefined,
                cautionnement: (rawData.cautionnementMontant || rawData.cautionnementEmetteur) ? {
                    montant: rawData.cautionnementMontant ? createDataPoint(rawData.cautionnementMontant, 'RBQ') : undefined,
                    emetteur: rawData.cautionnementEmetteur ? createDataPoint(rawData.cautionnementEmetteur, 'RBQ') : undefined
                } : undefined
            };
        }

        if (rawData.nomRepondant) {
            fiche.repondantRBQ = {
                nom: createDataPoint(rawData.nomRepondant, 'RBQ'),
                prenom: rawData.prenomRepondant ? createDataPoint(rawData.prenomRepondant, 'RBQ') : undefined
            };
        }

        if (rawData.adresseComplete) {
            fiche.adressePrincipale = { adresseComplete: createDataPoint(rawData.adresseComplete, 'RBQ') };
        }

        if (rawData.telephone || rawData.courriel) {
            fiche.contact = {
                telephone: rawData.telephone ? createDataPoint(rawData.telephone, 'RBQ') : undefined,
                courriel: rawData.courriel ? createDataPoint(rawData.courriel, 'RBQ') : undefined
            };
        }

        return fiche;
    }
}
