'use server';

import { ExtractorFactory } from '@/lib/extractors/extractor-factory';

export async function analyzeTextAction(rawText: string) {
    // Sécurité basique
    if (!rawText || rawText.trim().length < 10) {
        return { success: false, error: "Texte trop court ou vide." };
    }

    console.log('⚡ Action Serveur : Démarrage analyse...');

    try {
        // 1. L'usine choisit le bon outil (RBQ pour l'instant)
        const extractor = ExtractorFactory.getExtractor(rawText as any);

        // 2. L'outil extrait la donnée via l'IA
        const data = await extractor.extract(rawText);

        if (!data) {
            return { success: false, error: "L'IA n'a rien trouvé de probant." };
        }

        // 3. Succès ! On renvoie la data au navigateur
        return { success: true, data };

    } catch (error) {
        console.error('❌ Erreur Action Serveur :', error);
        return { success: false, error: "Erreur interne lors de l'extraction." };
    }
}
