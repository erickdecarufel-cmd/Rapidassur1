import { DataSource } from './types-v2';

/**
 * Détecte automatiquement la source d'un texte
 * Utilise des patterns et mots-clés spécifiques à chaque source
 */
export function detectSource(content: string): DataSource | null {
    const normalizedContent = content.toLowerCase();

    // Patterns de détection pour chaque source
    const patterns: Record<DataSource, RegExp[]> = {
        'RBQ': [
            /r[ée]gie\s+du\s+b[âa]timent/i,
            /licence\s+rbq/i,
            /num[ée]ro\s+de\s+licence\s*:\s*\d{4}-\d{4}-\d{2}/i,
            /entrepreneur\s+g[ée]n[ée]ral/i,
            /sous-cat[ée]gorie/i,
            /r[ée]pondant/i
        ],
        'REQ': [
            /registre\s+des\s+entreprises/i,
            /neq\s*:\s*\d{10}/i,
            /num[ée]ro\s+d'entreprise\s+du\s+qu[ée]bec/i,
            /forme\s+juridique/i,
            /immatriculation/i,
            /raison\s+sociale/i
        ],
        'GCR': [
            /garantie\s+de\s+construction/i,
            /gcr/i,
            /licence\s+gcr/i,
            /garantie\s+r[ée]sidentielle/i,
            /plan\s+de\s+garantie/i
        ],
        'APCHQ': [
            /apchq/i,
            /association\s+provinciale\s+des\s+constructeurs/i,
            /membre\s+apchq/i,
            /certification\s+novoclimat/i
        ],
        'CTQ': [
            /commission\s+des\s+transports/i,
            /ctq/i,
            /nir\s*:/i,
            /pevl/i,
            /v[ée]hicules\s+lourds/i,
            /propri[ée]taires\s+et\s+exploitants/i
        ],
        'MAPAQ': [
            /mapaq/i,
            /minist[èe]re\s+de\s+l'agriculture/i,
            /permis\s+de\s+transformation/i,
            /salubrité\s+alimentaire/i
        ],
        'RACJ': [
            /racj/i,
            /registre\s+des\s+autorit[ée]s\s+de\s+certification/i,
            /certification\s+judiciaire/i
        ],
        'MANUAL': [],
        'INFERRED': []
    };

    // Compter les matches pour chaque source
    const scores: Partial<Record<DataSource, number>> = {};

    for (const [source, sourcePatterns] of Object.entries(patterns)) {
        let matchCount = 0;
        for (const pattern of sourcePatterns) {
            if (pattern.test(content)) {
                matchCount++;
            }
        }
        if (matchCount > 0) {
            scores[source as DataSource] = matchCount;
        }
    }

    // Retourner la source avec le plus de matches
    if (Object.keys(scores).length === 0) {
        console.log('⚠️ Aucune source détectée automatiquement');
        return null;
    }

    const detectedSource = Object.entries(scores).reduce((a, b) =>
        (b[1] > a[1] ? b : a)
    )[0] as DataSource;

    console.log(`✅ Source détectée: ${detectedSource} (score: ${scores[detectedSource]})`);
    return detectedSource;
}

/**
 * Détecte si le contenu contient plusieurs sources
 * Utile pour alerter l'utilisateur qu'il devrait séparer les données
 */
export function detectMultipleSources(content: string): DataSource[] {
    const normalizedContent = content.toLowerCase();
    const detectedSources: DataSource[] = [];

    // Patterns simplifiés pour détection rapide
    const quickPatterns: Record<DataSource, RegExp> = {
        'RBQ': /rbq|r[ée]gie\s+du\s+b[âa]timent/i,
        'REQ': /req|neq|registre\s+des\s+entreprises/i,
        'GCR': /gcr|garantie\s+de\s+construction/i,
        'APCHQ': /apchq/i,
        'CTQ': /ctq|nir|pevl|v[ée]hicules\s+lourds/i,
        'MAPAQ': /mapaq/i,
        'RACJ': /racj/i,
        'MANUAL': /^$/,
        'INFERRED': /^$/
    };

    for (const [source, pattern] of Object.entries(quickPatterns)) {
        if (pattern.test(content)) {
            detectedSources.push(source as DataSource);
        }
    }

    return detectedSources;
}

/**
 * Valide qu'un texte contient suffisamment de données pour extraction
 */
export function validateContentForExtraction(content: string): {
    isValid: boolean;
    reason?: string;
} {
    // Vérifications de base
    if (!content || content.trim().length === 0) {
        return { isValid: false, reason: 'Contenu vide' };
    }

    if (content.trim().length < 50) {
        return { isValid: false, reason: 'Contenu trop court (minimum 50 caractères)' };
    }

    // Vérifier qu'il y a au moins quelques mots
    const wordCount = content.trim().split(/\s+/).length;
    if (wordCount < 10) {
        return { isValid: false, reason: 'Pas assez de mots (minimum 10)' };
    }

    return { isValid: true };
}
