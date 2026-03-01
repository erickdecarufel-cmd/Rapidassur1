/**
 * Flow Genkit pour l'extraction de données RapidAssur
 * Ce flow permet de tester et d'exécuter la logique d'extraction via Firebase Studio
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { detectSource, validateContentForExtraction } from '@/lib/source-detection';
import { ExtractorFactory } from '@/lib/extractors/extractor-factory';
import { mergeFiches, calculateFicheCompleteness } from '@/lib/data-merging';
import { FicheDataV2, DataSource } from '@/lib/types-v2';

// Schéma d'entrée pour le flow
const ExtractInputSchema = z.object({
    text: z.string().describe("Le texte brut copié depuis RBQ, REQ, GCR, etc."),
    existingFiche: z.custom<FicheDataV2>().optional().describe("Fiche existante pour enrichissement (JSON)"),
    forceSource: z.enum(['RBQ', 'REQ', 'GCR', 'APCHQ', 'CTQ', 'MAPAQ', 'RACJ']).optional().describe("Forcer une source spécifique")
});

// Schéma de sortie
const ExtractOutputSchema = z.object({
    success: z.boolean(),
    source: z.string().optional(),
    completeness: z.number().optional(),
    fiche: z.custom<FicheDataV2>().optional(),
    warnings: z.array(z.string()).optional(),
    error: z.string().optional()
});

type ExtractInput = z.infer<typeof ExtractInputSchema>;

/**
 * Flow principal d'extraction
 * Invoquable depuis le code OU depuis l'interface Genkit (localhost:4000)
 */
export const extractionFlow = ai.defineFlow(
    {
        name: 'extractionFlow',
        inputSchema: ExtractInputSchema,
        outputSchema: ExtractOutputSchema,
    },
    async (input: ExtractInput) => {
        const { text, existingFiche, forceSource } = input;
        const warnings: string[] = [];

        console.log("🚀 [Genkit] Démarrage du flow d'extraction...");

        // 1. Validation
        const validation = validateContentForExtraction(text);
        if (!validation.isValid) {
            return { success: false, error: validation.reason };
        }

        // 2. Détection Source
        const source = forceSource || detectSource(text);
        if (!source) {
            return { success: false, error: "Source non détectée. Spécifiez-la manuellement." };
        }

        // 3. Extraction
        if (!ExtractorFactory.hasExtractor(source)) {
            return { success: false, error: `Extracteur non implémenté pour: ${source}` };
        }

        try {
            const extractor = ExtractorFactory.getExtractor(source as DataSource);
            const extractedData = await extractor.extractToFiche(text);

            // 4. Fusion
            const mergedFiche = mergeFiches(existingFiche || null, extractedData);
            const completeness = calculateFicheCompleteness(mergedFiche);

            // 5. Résultat
            return {
                success: true,
                source: source,
                completeness: completeness,
                fiche: mergedFiche,
                warnings: warnings
            };

        } catch (error: any) {
            console.error("💥 [Genkit] Erreur:", error);
            return { success: false, error: error.message };
        }
    }
);
