import { BaseExtractor, ExtractorConfig } from './base-extractor';
import { z } from 'zod';
import { createDataPoint, FicheDataV2 } from '../types-v2';

const mapaqSchema = z.object({
    nomExploitant: z.string().describe("Nom de l'exploitant"),
    numeroPermis: z.string().describe("Numéro de permis MAPAQ"),
    categoriePermis: z.string().optional().describe("Catégorie (Restauration, Vente au détail, etc.)"),
    statut: z.string().describe("Statut du permis (Valide, Échu)"),
    dateEcheance: z.string().optional().describe("Date d'échéance AAAA-MM-JJ")
});

const mapaqPrompt = `
Tu es un expert en extraction de données pour le MAPAQ (Ministère de l'Agriculture, des Pêcheries et de l'Alimentation).
Extrais les informations de permis alimentaire.

RÈGLES :
- Cherche le "Numéro de permis".
- Identifie la "Catégorie" (ex: Restauration).
- Note la date d'échéance.
`;

export class MAPAQExtractor extends BaseExtractor {
    constructor() {
        const config: ExtractorConfig = {
            sourceName: 'MAPAQ',
            schema: mapaqSchema,
            promptTemplate: mapaqPrompt,
            temperature: 0.0,
            maxRetries: 3
        };
        super(config);
    }

    async extractToFiche(content: string): Promise<Partial<FicheDataV2>> {
        const rawData = await this.extract(content);
        return {
            nomEntreprise: rawData.nomExploitant ? createDataPoint(rawData.nomExploitant, 'MAPAQ', ['COMPLIANCE'], 0.9) : undefined,
            // TODO: Ajouter champs spécifiques MAPAQ
        };
    }
}
