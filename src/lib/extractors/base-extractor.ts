import { generate } from '@genkit-ai/ai';
import { DEFAULT_MODEL_NAME } from '@/ai/genkit';
import { z } from 'zod';

/**
 * Configuration pour un extracteur de données
 */
export interface ExtractorConfig {
    sourceName: string; // Nom de la source (ex: "RBQ", "REQ")
    schema: z.ZodObject<any>; // Schéma Zod pour validation
    promptTemplate: string; // Template du prompt pour l'IA
    temperature?: number; // Température de l'IA (0.0 = déterministe)
    maxRetries?: number; // Nombre de tentatives maximum
}

/**
 * Classe de base pour tous les extracteurs
 * Gère le retry, la validation et les logs
 */
export class BaseExtractor {
    private config: ExtractorConfig;

    constructor(config: ExtractorConfig) {
        this.config = {
            ...config,
            temperature: config.temperature ?? 0.0, // Déterministe par défaut
            maxRetries: config.maxRetries ?? 3, // 3 tentatives par défaut
        };
    }

    /**
     * Extrait les données depuis le contenu fourni
     * @param content Texte brut OU objet media pour PDF/image
     * @returns Données extraites validées
     */
    async extract(content: string | { media: { url: string } }): Promise<any> {
        const maxRetries = this.config.maxRetries!;
        let lastError: Error | null = null;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`[${this.config.sourceName}] 🔄 Tentative ${attempt}/${maxRetries}...`);

                // Appel à l'IA
                const { output } = await generate({
                    model: DEFAULT_MODEL_NAME,
                    config: { temperature: this.config.temperature },
                    prompt: [
                        { text: this.config.promptTemplate },
                        typeof content === 'string' ? { text: content } : content
                    ],
                    output: { schema: this.config.schema }
                });

                // Validation des données
                const validated = this.validate(output);

                console.log(`[${this.config.sourceName}] ✅ Extraction réussie`);
                return validated;

            } catch (error: any) {
                lastError = error;
                console.error(`[${this.config.sourceName}] ❌ Tentative ${attempt} échouée:`, error.message);

                // Attendre avant de réessayer (backoff exponentiel)
                if (attempt < maxRetries) {
                    const waitTime = 1000 * attempt; // 1s, 2s, 3s
                    console.log(`[${this.config.sourceName}] ⏳ Attente de ${waitTime}ms avant nouvelle tentative...`);
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                }
            }
        }

        // Toutes les tentatives ont échoué
        throw new Error(
            `[${this.config.sourceName}] 💥 Échec après ${maxRetries} tentatives. ` +
            `Dernière erreur: ${lastError?.message || 'Inconnue'}`
        );
    }

    /**
     * Valide que les données extraites ne sont pas vides
     * @param data Données à valider
     * @returns Données validées
     */
    private validate(data: any): any {
        // Vérification basique
        if (!data || typeof data !== 'object') {
            throw new Error('Données extraites invalides (pas un objet)');
        }

        // Compter les champs non-vides
        const nonEmptyFields = Object.entries(data).filter(([key, value]) => {
            if (value === null || value === undefined || value === '') return false;
            if (Array.isArray(value) && value.length === 0) return false;
            return true;
        });

        if (nonEmptyFields.length === 0) {
            throw new Error('Aucune donnée extraite (tous les champs sont vides)');
        }

        console.log(
            `[${this.config.sourceName}] 📊 ${nonEmptyFields.length} champs extraits:`,
            nonEmptyFields.map(([key]) => key).join(', ')
        );

        return data;
    }
}
