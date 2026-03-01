/**
 * Orchestration de l'extraction de données universelle * Gère le flux complet: détection → extraction → validation → fusion */  'use server';  import { detectSource, validateContentForExtraction, detectMultipleSources } from '@/lib/source-detection'; import { ExtractorFactory } from '@/lib/extractors/extractor-factory'; import { mergeFiches, calculateFicheCompleteness } from '@/lib/data-merging'; import { FicheDataV2, DataSource } from '@/lib/types-v2';  /** * Résultat de l'analyse
 */
export interface AnalysisResult {
    success: boolean;
    fiche?: FicheDataV2;
    source?: DataSource;
    message?: string;
    warnings?: string[];
    completeness?: number;
}

/**
 * Analyse un document universel et extrait les données
 * 
 * @param content Contenu texte à analyser
 * @param existingFiche Fiche existante à enrichir (optionnel)
 * @param forceSource Forcer une source spécifique (optionnel)
 * @returns Résultat de l'analyse avec la fiche enrichie */ export async function analyzeUniversalDoc( content: string, existingFiche?: FicheDataV2 | null, forceSource?: DataSource ): Promise<AnalysisResult> { console.log('🚀 Début de l\'analyse universelle...');

    const warnings: string[] = [];

    try {
        // ÉTAPE 1: Validation du contenu
        console.log('📋 Étape 1/5: Validation du contenu...');
        const validation = validateContentForExtraction(content);
        if (!validation.isValid) {
            return {
                success: false,
                message: `Contenu invalide: ${validation.reason}`
            };
        }

        // ÉTAPE 2: Détection de la source
        console.log('🔍 Étape 2/5: Détection de la source...');

        // Vérifier s'il y a plusieurs sources const multipleSources = detectMultipleSources(content); if (multipleSources.length > 1) { warnings.push( `Plusieurs sources détectées (${multipleSources.join(', ')}). ` + `Il est recommandé de séparer les données pour une meilleure précision.` ); }  // Déterminer la source à utiliser const source = forceSource || detectSource(content); if (!source) { return { success: false, message: 'Impossible de détecter la source automatiquement. Veuillez spécifier la source manuellement.', warnings }; }  console.log(`✅ Source identifiée: ${source}`);  // ÉTAPE 3: Vérifier si un extracteur existe console.log('🔧 Étape 3/5: Vérification de l\'extracteur...');
        if (!ExtractorFactory.hasExtractor(source)) {
            return {
                success: false,
                message: `Extracteur non disponible pour la source: ${source}. Sources supportées: ${ExtractorFactory.getSupportedSources().join(', ')}`,
                warnings
            };
        }

        // ÉTAPE 4: Extraction des données
        console.log('⚙️ Étape 4/5: Extraction des données...');
        const extractor = ExtractorFactory.getExtractor(source);

        let extractedData: Partial<FicheDataV2>;
        try {
            extractedData = await extractor.extractToFiche(content);
            console.log('✅ Extraction réussie');
        } catch (extractionError: any) {
            console.error('❌ Erreur lors de l\'extraction:', extractionError);
            return {
                success: false,
                message: `Échec de l'extraction: ${extractionError.message}`,
                warnings
            };
        }

        // ÉTAPE 5: Fusion avec les données existantes
        console.log('🔀 Étape 5/5: Fusion des données...');
        const mergedFiche = mergeFiches(existingFiche || null, extractedData);

        // Calculer la complétude
        const completeness = calculateFicheCompleteness(mergedFiche);
        if (mergedFiche.metadata) {
            mergedFiche.metadata.completeness = completeness;
        }

        console.log(`✅ Fiche enrichie avec succès (complétude: ${(completeness * 100).toFixed(1)}%)`);

        // Ajouter des warnings si la complétude est faible
        if (completeness < 0.3) {
            warnings.push('Complétude faible. Essayez d\'ajouter des données d\'autres sources.');
        }

        return {
            success: true,
            fiche: mergedFiche,
            source,
            message: `Données extraites avec succès depuis ${source}`,
            warnings: warnings.length > 0 ? warnings : undefined,
            completeness
        };

    } catch (error: any) {
        console.error('💥 Erreur fatale lors de l\'analyse:', error);
        return {
            success: false,
            message: `Erreur inattendue: ${error.message}`,
            warnings
        };
    }
}

/**
 * Analyse multiple - traite plusieurs contenus en séquence
 * Utile pour enrichir une fiche avec plusieurs sources
 */
export async function analyzeMultipleDocs(
    contents: Array<{ text: string; source?: DataSource }>,
    existingFiche?: FicheDataV2 | null
): Promise<AnalysisResult> {
    console.log(`🚀 Analyse de ${contents.length} documents...`);

    let currentFiche = existingFiche || null;
    const warnings: string[] = [];
    const sources: DataSource[] = [];

    for (let i = 0; i < contents.length; i++) {
        const { text, source } = contents[i];
        console.log(`\n📄 Document ${i + 1}/${contents.length}`);

        const result = await analyzeUniversalDoc(text, currentFiche, source);

        if (result.success && result.fiche) {
            currentFiche = result.fiche;
            if (result.source) sources.push(result.source);
            if (result.warnings) warnings.push(...result.warnings);
        } else {
            warnings.push(`Document ${i + 1}: ${result.message}`);
        }
    }

    if (!currentFiche) {
        return {
            success: false,
            message: 'Aucune donnée n\'a pu être extraite',
            warnings
        };
    }

    const completeness = calculateFicheCompleteness(currentFiche);

    return {
        success: true,
        fiche: currentFiche,
        message: `${contents.length} documents analysés avec succès`,
        warnings: warnings.length > 0 ? warnings : undefined,
        completeness
    };
}
