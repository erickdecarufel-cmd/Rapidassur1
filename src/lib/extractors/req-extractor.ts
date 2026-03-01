import { z } from 'zod';
import { BaseExtractor, ExtractorConfig } from './base-extractor';
import { createDataPoint, FicheDataV2 } from '../types-v2';

/**
 * Schéma Zod pour l'extraction REQ
 */
const reqSchema = z.object({
    neq: z.string().optional(),
    raisonSociale: z.string().optional(),
    formeJuridique: z.string().optional(),
    dateImmatriculation: z.string().optional(),
    statut: z.string().optional(),
    activitePrincipale: z.string().optional(),
    // Adresse du siège social
    adresseComplete: z.string().optional(),
    noCivique: z.string().optional(),
    rue: z.string().optional(),
    ville: z.string().optional(),
    province: z.string().optional(),
    codePostal: z.string().optional(),
    // Contact (si disponible)
    telephone: z.string().optional(),
    courriel: z.string().optional(),
    siteWeb: z.string().optional()
});

/**
 * Prompt optimisé pour l'extraction REQ
 */
const reqPrompt = `Tu es un expert en extraction de données du REQ (Registre des entreprises du Québec).

OBJECTIF: Extraire TOUTES les informations structurées du texte fourni.

RÈGLES STRICTES:
1. Extrait UNIQUEMENT les données présentes dans le texte
2. Ne jamais inventer ou déduire des informations
3. Si une donnée n'est pas présente, retourne null pour ce champ
4. Le NEQ est un identifiant unique de 10 chiffres (format: 1234567890)
5. Respecte les formats exacts

CHAMPS À EXTRAIRE:
- neq: Numéro d'entreprise du Québec (10 chiffres)
- raisonSociale: Nom légal complet de l'entreprise
- formeJuridique: Forme juridique (ex: "Société par actions", "Entreprise individuelle", "SENC")
- dateImmatriculation: Date d'immatriculation au REQ (format: YYYY-MM-DD)
- statut: Statut de l'entreprise (ex: "Immatriculée", "Radiée", "En défaut")
- activitePrincipale: Description de l'activité principale

ADRESSE DU SIÈGE SOCIAL:
- adresseComplete: Adresse complète du siège social
- noCivique: Numéro civique
- rue: Nom de la rue
- ville: Ville
- province: Province
- codePostal: Code postal

CONTACT:
- telephone: Numéro de téléphone
- courriel: Adresse courriel
- siteWeb: URL du site web

EXEMPLE DE SORTIE:
{
    "neq": "1234567890",
    "raisonSociale": "Construction ABC Inc.",
    "formeJuridique": "Société par actions",
    "dateImmatriculation": "2015-03-15",
    "statut": "Immatriculée",
    "activitePrincipale": "Construction résidentielle et commerciale",
    "adresseComplete": "123 Rue Principale, Montréal, QC H1A 1A1",
    "ville": "Montréal"
}

Maintenant, extrait les données du texte suivant:`;

/**
 * Extracteur spécialisé pour les données REQ
 */
export class REQExtractor extends BaseExtractor {
    constructor() {
        const config: ExtractorConfig = {
            sourceName: 'REQ',
            schema: reqSchema,
            promptTemplate: reqPrompt,
            temperature: 0.0,
            maxRetries: 3
        };
        super(config);
    }

    /**
     * Transforme les données REQ brutes en FicheDataV2
     */
    async extractToFiche(content: string): Promise<Partial<FicheDataV2>> {
        const rawData = await this.extract(content);

        const fiche: Partial<FicheDataV2> = {};

        // NEQ (identifiant unique)
        if (rawData.neq) {
            fiche.neq = createDataPoint(
                rawData.neq,
                'REQ',
                ['COMPLIANCE', 'AUDIT', 'SUBMISSION'],
                1.0
            );
        }

        // Informations REQ
        if (rawData.raisonSociale || rawData.formeJuridique) {
            fiche.infoREQ = {
                neq: rawData.neq ? createDataPoint(
                    rawData.neq,
                    'REQ',
                    ['COMPLIANCE', 'AUDIT'],
                    1.0
                ) : undefined,
                raisonSociale: rawData.raisonSociale ? createDataPoint(
                    rawData.raisonSociale,
                    'REQ',
                    ['SUBMISSION', 'COMPLIANCE'],
                    1.0
                ) : undefined,
                formeJuridique: rawData.formeJuridique ? createDataPoint(
                    rawData.formeJuridique,
                    'REQ',
                    ['UNDERWRITING', 'COMPLIANCE'],
                    1.0
                ) : undefined,
                dateImmatriculation: rawData.dateImmatriculation ? createDataPoint(
                    rawData.dateImmatriculation,
                    'REQ',
                    ['UNDERWRITING', 'AUDIT'],
                    1.0
                ) : undefined,
                statut: rawData.statut ? createDataPoint(
                    rawData.statut,
                    'REQ',
                    ['COMPLIANCE', 'UNDERWRITING'],
                    1.0
                ) : undefined,
                activitePrincipale: rawData.activitePrincipale ? createDataPoint(
                    rawData.activitePrincipale,
                    'REQ',
                    ['UNDERWRITING', 'MARKETING'],
                    0.9
                ) : undefined
            };
        }

        // Nom entreprise (raison sociale)
        if (rawData.raisonSociale) {
            fiche.nomEntreprise = createDataPoint(
                rawData.raisonSociale,
                'REQ',
                ['SUBMISSION', 'COMPLIANCE'],
                1.0
            );
        }

        // Adresse du siège social
        if (rawData.adresseComplete || rawData.ville) {
            fiche.adressePrincipale = {
                adresseComplete: rawData.adresseComplete ? createDataPoint(
                    rawData.adresseComplete,
                    'REQ',
                    ['SUBMISSION', 'COMPLIANCE'],
                    1.0
                ) : undefined,
                noCivique: rawData.noCivique ? createDataPoint(
                    rawData.noCivique,
                    'REQ',
                    ['SUBMISSION'],
                    0.9
                ) : undefined,
                rue: rawData.rue ? createDataPoint(
                    rawData.rue,
                    'REQ',
                    ['SUBMISSION'],
                    0.9
                ) : undefined,
                ville: rawData.ville ? createDataPoint(
                    rawData.ville,
                    'REQ',
                    ['SUBMISSION', 'MARKETING'],
                    1.0
                ) : undefined,
                province: rawData.province ? createDataPoint(
                    rawData.province,
                    'REQ',
                    ['SUBMISSION'],
                    1.0
                ) : undefined,
                codePostal: rawData.codePostal ? createDataPoint(
                    rawData.codePostal,
                    'REQ',
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
                    'REQ',
                    ['SUBMISSION', 'MARKETING'],
                    0.9
                ) : undefined,
                courriel: rawData.courriel ? createDataPoint(
                    rawData.courriel,
                    'REQ',
                    ['SUBMISSION', 'MARKETING'],
                    0.9
                ) : undefined,
                siteWeb: rawData.siteWeb ? createDataPoint(
                    rawData.siteWeb,
                    'REQ',
                    ['MARKETING'],
                    0.9
                ) : undefined
            };
        }

        return fiche;
    }
}
