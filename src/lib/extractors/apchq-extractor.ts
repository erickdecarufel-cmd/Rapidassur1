import { BaseExtractor, ExtractorConfig } from './base-extractor';
import { z } from 'zod';
import { createDataPoint, FicheDataV2 } from '../types-v2';

// Schéma étendu pour capturer toute la richesse de la fiche APCHQ
const apchqSchema = z.object({
    nomEntreprise: z.string().describe("Nom de l'entreprise (ex: Les Habitations Roussillon inc.)"),
    numeroMembre: z.string().optional().describe("Numéro de membre APCHQ"),
    statut: z.string().optional().describe("Statut de l'adhésion (ex: Une entreprise membre...)"),

    // Contact étendu
    adresse: z.string().optional(),
    telephone: z.string().optional(),
    telecopieur: z.string().optional(),
    courriel: z.string().optional(),
    siteWeb: z.string().optional(),

    // Listes riches
    autresContacts: z.array(z.string()).optional().describe("Liste des noms sous 'Joindre cet entrepreneur' (ex: Brigitte Ledoux, Francois Jacobs)"),
    typesTravaux: z.array(z.string()).optional().describe("Liste complète des 'TYPES DE TRAVAUX' (ex: Maisons neuves, Rénovation)"),

    // Liaison RBQ si présente
    rbq: z.string().optional().describe("Numéro de licence RBQ trouvé sur la fiche")
});

const apchqPrompt = `
Tu es un expert en extraction de données pour l'APCHQ.
Analyse le texte de la fiche membre et extrais toutes les informations disponibles.

RÈGLES SPÉCIFIQUES:
1. "Joindre cet entrepreneur": Extrais tous les noms de personnes (ex: Brigitte Ledoux). Ignore les mentions comme "Service à la clientèle" ou les doublons.
2. "TYPES DE TRAVAUX": Extrais la liste complète des travaux listés (ex: "Maisons neuves et RBQ").
3. Contacts: Extrais le téléphone, le fax (si présent), l'adresse complète, et les courriels.
4. Identifiants: Le numéro RBQ est souvent mentionné (ex: "Licence RBQ : 56941479"). Extrais-le.
`;

export class APCHQExtractor extends BaseExtractor {
    constructor() {
        const config: ExtractorConfig = {
            sourceName: 'APCHQ',
            schema: apchqSchema,
            promptTemplate: apchqPrompt,
            temperature: 0.0,
            maxRetries: 3
        };
        super(config);
    }

    async extractToFiche(content: string): Promise<Partial<FicheDataV2>> {
        const rawData = await this.extract(content);

        const fiche: Partial<FicheDataV2> = {
            nomEntreprise: rawData.nomEntreprise ? createDataPoint(rawData.nomEntreprise, 'APCHQ', ['COMPLIANCE'], 0.9) : undefined,

            // Enrichissement global
            activites: rawData.typesTravaux ? createDataPoint(rawData.typesTravaux, 'APCHQ', ['UNDERWRITING', 'MARKETING'], 1.0) : undefined,
            autresContacts: rawData.autresContacts ? createDataPoint(rawData.autresContacts, 'APCHQ', ['MARKETING'], 0.8) : undefined,

            // Liaison RBQ
            licenceRBQ: rawData.rbq ? { numero: createDataPoint(rawData.rbq, 'APCHQ', ['COMPLIANCE'], 0.8) } : undefined,

            // Contact
            contact: {
                telephone: rawData.telephone ? createDataPoint(rawData.telephone, 'APCHQ', ['MARKETING'], 1.0) : undefined,
                telecopieur: rawData.telecopieur ? createDataPoint(rawData.telecopieur, 'APCHQ', ['MARKETING'], 1.0) : undefined,
                courriel: rawData.courriel ? createDataPoint(rawData.courriel, 'APCHQ', ['MARKETING'], 1.0) : undefined,
                siteWeb: rawData.siteWeb ? createDataPoint(rawData.siteWeb, 'APCHQ', ['MARKETING'], 1.0) : undefined
            },

            // Adresse
            adressePrincipale: rawData.adresse ? {
                adresseComplete: createDataPoint(rawData.adresse, 'APCHQ', ['SUBMISSION'], 0.9)
            } : undefined,

            // Info spécifique APCHQ
            infoAPCHQ: {
                numeroMembre: rawData.numeroMembre ? createDataPoint(rawData.numeroMembre, 'APCHQ', ['COMPLIANCE'], 1.0) : undefined,
                statut: rawData.statut ? createDataPoint(rawData.statut, 'APCHQ', ['COMPLIANCE'], 0.9) : undefined,
                activites: rawData.typesTravaux ? createDataPoint(rawData.typesTravaux, 'APCHQ', ['UNDERWRITING'], 1.0) : undefined
            }
        };

        return fiche;
    }
}
