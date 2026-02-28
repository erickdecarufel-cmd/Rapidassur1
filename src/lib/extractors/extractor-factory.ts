import { RBQExtractor } from './rbq-extractor';
import { REQExtractor } from './req-extractor';
import { GCRExtractor } from './gcr-extractor';
import { APCHQExtractor } from './apchq-extractor';
import { CTQExtractor } from './ctq-extractor';
import { MAPAQExtractor } from './mapaq-extractor';
import { RACJExtractor } from './racj-extractor';
import { DataSource } from '../types-v2';

/**
 * Factory pour créer et gérer les extracteurs
 * Pattern Singleton pour éviter de recréer les extracteurs à chaque appel
 */
export class ExtractorFactory {
    private static instances: Map<DataSource, any> = new Map();

    /**
     * Obtient un extracteur pour une source donnée
     * @param source Source de données (RBQ, REQ, GCR, etc.)
     * @returns Instance de l'extracteur approprié
     */
    static getExtractor(source: DataSource): any {
        // Vérifier si l'instance existe déjà (singleton)
        if (this.instances.has(source)) {
            return this.instances.get(source);
        }

        // Créer une nouvelle instance selon la source
        let extractor;
        switch (source) {
            case 'RBQ':
                extractor = new RBQExtractor();
                break;
            case 'REQ':
                extractor = new REQExtractor();
                break;
            case 'GCR':
                extractor = new GCRExtractor();
                break;
            case 'APCHQ':
                extractor = new APCHQExtractor();
                break;
            case 'CTQ':
                extractor = new CTQExtractor();
                break;
            case 'MAPAQ':
                extractor = new MAPAQExtractor();
                break;
            case 'RACJ':
                extractor = new RACJExtractor();
                break;
            default:
                throw new Error(`Extracteur non disponible pour la source: ${source}`);
        }

        // Sauvegarder l'instance
        this.instances.set(source, extractor);
        return extractor;
    }

    /**
     * Vérifie si un extracteur existe pour une source
     */
    static hasExtractor(source: DataSource): boolean {
        return ['RBQ', 'REQ', 'GCR', 'APCHQ', 'CTQ', 'MAPAQ', 'RACJ'].includes(source);
    }

    /**
     * Liste toutes les sources supportées
     */
    static getSupportedSources(): DataSource[] {
        return ['RBQ', 'REQ', 'GCR', 'APCHQ', 'CTQ', 'MAPAQ', 'RACJ'];
    }

    /**
     * Réinitialise tous les extracteurs (utile pour les tests)
     */
    static reset(): void {
        this.instances.clear();
    }
}
