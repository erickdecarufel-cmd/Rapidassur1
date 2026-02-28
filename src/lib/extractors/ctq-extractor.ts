import { BaseExtractor, ExtractorConfig } from './base-extractor';
import { z } from 'zod';
import { createDataPoint, FicheDataV2 } from '../types-v2';

const ctqSchema = z.object({
    nomExploitant: z.string().describe("Nom de l'exploitant (entreprise)"),
    nir: z.string().describe("Numéro d'identification au registre (NIR) - Format X-XXXXXX-X"),
    statutDossier: z.string().describe("Statut du dossier (Actif, Fermé)"),
    coteSecurite: z.string().optional().describe("Cote de sécurité (Satisfaisant, Conditionnel, etc.)"),
    nombreVehicules: z.number().optional().describe("Nombre de véhicules autorisés"),
    dateAttrib: z.string().optional().describe("Date d'attribution AAAA-MM-JJ")
});

const ctqPrompt = `
Tu es un expert en extraction de données pour la CTQ (Commission des transports du Québec).
Extrais les informations du Registre des propriétaires et exploitants de véhicules lourds (PEVL).

RÈGLES :
- Le NIR est crucial (Format X-XXXXXX-X ou similaire).
- La "Cote de sécurité" est l'information la plus importante pour l'assurance (Satisfaisant, etc.).
- Compte le nombre de véhicules si mentionné.
`;

export class CTQExtractor extends BaseExtractor {
    constructor() {
        const config: ExtractorConfig = {
            sourceName: 'CTQ',
            schema: ctqSchema,
            promptTemplate: ctqPrompt,
            temperature: 0.0,
            maxRetries: 3
        };
        super(config);
    }

    async extractToFiche(content: string): Promise<Partial<FicheDataV2>> {
        const rawData = await this.extract(content);

        return {
            // createDataPoint(value, source, usage[], confidence)
            nomEntreprise: rawData.nomExploitant ? createDataPoint(rawData.nomExploitant, 'CTQ', ['UNDERWRITING'], 0.9) : undefined,
            // TODO: Ajouter champs spécifiques CTQ à FicheDataV2 si nécessaire (NIR, Cote)
        };
    }
}
