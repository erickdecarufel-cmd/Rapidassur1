import { BaseExtractor, ExtractorConfig } from './base-extractor';
import { z } from 'zod';
import { createDataPoint, FicheDataV2 } from '../types-v2';

const racjSchema = z.object({
    nomTitulaire: z.string().describe("Nom du titulaire de permis"),
    numeroPermis: z.string().describe("Numéro de permis RACJ"),
    typePermis: z.string().optional().describe("Type de permis (Bar, Restaurant, Épicerie)"),
    statut: z.string().describe("Statut du permis (En vigueur, Suspendu)"),
    capacite: z.number().optional().describe("Capacité d'accueil (personnes)")
});

const racjPrompt = `
Tu es un expert en extraction de données pour la RACJ (Régie des alcools, des courses et des jeux).
Extrais les informations de permis d'alcool.

RÈGLES :
- Cherche le "Numéro de permis".
- Identifie le "Type de permis".
- Cherche la capacité d'accueil si mentionnée.
`;

export class RACJExtractor extends BaseExtractor {
    constructor() {
        const config: ExtractorConfig = {
            sourceName: 'RACJ',
            schema: racjSchema,
            promptTemplate: racjPrompt,
            temperature: 0.0,
            maxRetries: 3
        };
        super(config);
    }

    async extractToFiche(content: string): Promise<Partial<FicheDataV2>> {
        const rawData = await this.extract(content);
        return {
            nomEntreprise: rawData.nomTitulaire ? createDataPoint(rawData.nomTitulaire, 'RACJ', ['COMPLIANCE'], 0.9) : undefined,
            // TODO: Ajouter champs spécifiques RACJ
        };
    }
}
