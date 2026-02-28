import { z } from 'zod';
import { BaseExtractor, ExtractorConfig } from './base-extractor';
import { createDataPoint, FicheDataV2 } from '../types-v2';

/**
 * Schéma Zod pour l'extraction GCR
 */
const gcrSchema = z.object({
    numeroLicence: z.string().optional(),
    nomEntreprise: z.string().optional(),
    statut: z.string().optional(),
    dateObtention: z.string().optional(),
    dateExpiration: z.string().optional(),
    typeGarantie: z.string().optional(),

    // Adresse
    adresseComplete: z.string().optional(),
    ville: z.string().optional(),
    province: z.string().optional(),
    codePostal: z.string().optional(),

    // Contact
    telephone: z.string().optional(),
    courriel: z.string().optional()
});

/**
 * Prompt optimisé pour l'extraction GCR
 */
const gcrPrompt = `Tu es un expert en extraction de données du GCR (Garantie de construction résidentielle).

OBJECTIF: Extraire TOUTES les informations structurées du texte fourni.

RÈGLES STRICTES:
1. Extrait UNIQUEMENT les données présentes dans le texte
2. Ne jamais inventer ou déduire des informations
3. Si une donnée n'est pas présente, retourne null pour ce champ
4. Respecte les formats exacts

CHAMPS À EXTRAIRE:
- numeroLicence: Numéro de licence GCR
- nomEntreprise: Nom de l'entreprise détentrice
- statut: Statut de la licence (ex: "Active", "Suspendue", "Expirée")
- dateObtention: Date d'obtention de la licence (format: YYYY-MM-DD)
- dateExpiration: Date d'expiration (format: YYYY-MM-DD)
- typeGarantie: Type de garantie (ex: "Bâtiment neuf", "Rénovation majeure")

ADRESSE:
- adresseComplete: Adresse complète
- ville: Ville
- province: Province
- codePostal: Code postal

CONTACT:
- telephone: Numéro de téléphone
- courriel: Adresse courriel

EXEMPLE DE SORTIE:
{
    "numeroLicence": "GCR-12345",
    "nomEntreprise": "Construction ABC Inc.",
    "statut": "Active",
    "dateObtention": "2020-01-15",
    "dateExpiration": "2025-01-15",
    "typeGarantie": "Bâtiment neuf",
    "ville": "Montréal"
}

Maintenant, extrait les données du texte suivant:`;

/**
 * Extracteur spécialisé pour les données GCR
 */
export class GCRExtractor extends BaseExtractor {
    constructor() {
        const config: ExtractorConfig = {
            sourceName: 'GCR',
            schema: gcrSchema,
            promptTemplate: gcrPrompt,
            temperature: 0.0,
            maxRetries: 3
        };
        super(config);
    }

    /**
     * Transforme les données GCR brutes en FicheDataV2
     */
    async extractToFiche(content: string): Promise<Partial<FicheDataV2>> {
        const rawData = await this.extract(content);

        const fiche: Partial<FicheDataV2> = {};

        // Nom entreprise
        if (rawData.nomEntreprise) {
            fiche.nomEntreprise = createDataPoint(
                rawData.nomEntreprise,
                'GCR',
                ['SUBMISSION', 'COMPLIANCE'],
                1.0
            );
        }

        // Informations GCR
        if (rawData.numeroLicence || rawData.statut) {
            fiche.infoGCR = {
                numeroLicence: rawData.numeroLicence ? createDataPoint(
                    rawData.numeroLicence,
                    'GCR',
                    ['COMPLIANCE', 'UNDERWRITING'],
                    1.0
                ) : undefined,
                statut: rawData.statut ? createDataPoint(
                    rawData.statut,
                    'GCR',
                    ['COMPLIANCE', 'UNDERWRITING'],
                    1.0
                ) : undefined,
                dateObtention: rawData.dateObtention ? createDataPoint(
                    rawData.dateObtention,
                    'GCR',
                    ['UNDERWRITING', 'AUDIT'],
                    1.0
                ) : undefined,
                dateExpiration: rawData.dateExpiration ? createDataPoint(
                    rawData.dateExpiration,
                    'GCR',
                    ['COMPLIANCE', 'UNDERWRITING'],
                    1.0
                ) : undefined,
                typeGarantie: rawData.typeGarantie ? createDataPoint(
                    rawData.typeGarantie,
                    'GCR',
                    ['UNDERWRITING', 'MARKETING'],
                    0.9
                ) : undefined
            };
        }

        // Adresse
        if (rawData.adresseComplete || rawData.ville) {
            fiche.adressePrincipale = {
                adresseComplete: rawData.adresseComplete ? createDataPoint(
                    rawData.adresseComplete,
                    'GCR',
                    ['SUBMISSION'],
                    0.9
                ) : undefined,
                ville: rawData.ville ? createDataPoint(
                    rawData.ville,
                    'GCR',
                    ['SUBMISSION', 'MARKETING'],
                    1.0
                ) : undefined,
                province: rawData.province ? createDataPoint(
                    rawData.province,
                    'GCR',
                    ['SUBMISSION'],
                    1.0
                ) : undefined,
                codePostal: rawData.codePostal ? createDataPoint(
                    rawData.codePostal,
                    'GCR',
                    ['SUBMISSION', 'MARKETING'],
                    1.0
                ) : undefined
            };
        }

        // Contact
        if (rawData.telephone || rawData.courriel) {
            fiche.contact = {
                telephone: rawData.telephone ? createDataPoint(
                    rawData.telephone,
                    'GCR',
                    ['SUBMISSION', 'MARKETING'],
                    0.9
                ) : undefined,
                courriel: rawData.courriel ? createDataPoint(
                    rawData.courriel,
                    'GCR',
                    ['SUBMISSION', 'MARKETING'],
                    0.9
                ) : undefined
            };
        }

        return fiche;
    }
}
