/**
 * Types pour le système de données stratifiées RapidAssur
 * Chaque donnée inclut: valeur, source, timestamp, confiance, usage
 */

/**
 * Sources de données possibles
 */
export type DataSource =
    | 'RBQ'           // Régie du bâtiment du Québec
    | 'REQ'           // Registre des entreprises du Québec
    | 'APCHQ'         // Association provinciale des constructeurs d'habitations du Québec
    | 'CTQ'           // Corporation des maîtres électriciens du Québec
    | 'GCR'           // Garantie de construction résidentielle
    | 'MAPAQ'         // Ministère de l'Agriculture, des Pêcheries et de l'Alimentation
    | 'RACJ'          // Registre des autorités de certification judiciaire
    | 'MANUAL'        // Saisie manuelle par l'utilisateur
    | 'INFERRED';     // Déduit par l'IA

/**
 * Usages possibles d'une donnée
 */
export type DataUsage =
    | 'SUBMISSION'    // Qualification du prospect (soumission)
    | 'UNDERWRITING'  // Analyse de risque (tarification)
    | 'COMPLIANCE'    // Vérifications de conformité
    | 'AUDIT'         // Traçabilité et audit
    | 'MARKETING'     // Segmentation et ciblage
    | 'ALL';          // Tous les usages

/**
 * Point de données avec métadonnées
 */
export interface DataPoint<T = any> {
    value: T;                    // Valeur de la donnée
    source: DataSource;          // Provenance de la donnée
    timestamp: string;           // ISO 8601 timestamp
    confidence: number;          // 0-1, confiance dans l'extraction
    usage: DataUsage[];          // Usages prévus de cette donnée
    notes?: string;              // Notes manuelles optionnelles
}

/**
 * Informations de contact stratifiées
 */
export interface ContactInfo {
    telephone?: DataPoint<string>;
    telecopieur?: DataPoint<string>;
    courriel?: DataPoint<string>;
    siteWeb?: DataPoint<string>;
}

/**
 * Adresse stratifiée
 */
export interface Address {
    adresseComplete?: DataPoint<string>;
    noCivique?: DataPoint<string>;
    rue?: DataPoint<string>;
    ville?: DataPoint<string>;
    province?: DataPoint<string>;
    codePostal?: DataPoint<string>;
    pays?: DataPoint<string>;
}

/**
 * Licence RBQ stratifiée
 */
export interface LicenceRBQ {
    numero?: DataPoint<string>;
    statut?: DataPoint<string>;
    dateObtention?: DataPoint<string>;
    dateExpiration?: DataPoint<string>;
    datePaiement?: DataPoint<string>;
    sousCategories?: DataPoint<string[]>;
    restrictions?: DataPoint<string[]>;
    cautionnement?: {
        montant?: DataPoint<string>;
        emetteur?: DataPoint<string>;
    };
}

/**
 * Répondant RBQ stratifié
 */
export interface RepondantRBQ {
    nom?: DataPoint<string>;
    prenom?: DataPoint<string>;
    numeroLicence?: DataPoint<string>;
}

/**
 * Informations REQ stratifiées
 */
export interface InfoREQ {
    neq?: DataPoint<string>;
    raisonSociale?: DataPoint<string>;
    formeJuridique?: DataPoint<string>;
    dateImmatriculation?: DataPoint<string>;
    statut?: DataPoint<string>;
    activitePrincipale?: DataPoint<string>;
}

/**
 * Informations APCHQ stratifiées
 */
export interface InfoAPCHQ {
    numeroMembre?: DataPoint<string>;
    dateAdhesion?: DataPoint<string>;
    statut?: DataPoint<string>;
    certifications?: DataPoint<string[]>;
    activites?: DataPoint<string[]>; // "Types de travaux"
}

/**
 * Informations GCR stratifiées
 */
export interface InfoGCR {
    numeroLicence?: DataPoint<string>;
    statut?: DataPoint<string>;
    dateObtention?: DataPoint<string>;
    dateExpiration?: DataPoint<string>;
    typeGarantie?: DataPoint<string>;
}

/**
 * Fiche nominative complète V2 - Stratifiée
 */
export interface FicheDataV2 {
    // Identité de base
    nomEntreprise?: DataPoint<string>;
    neq?: DataPoint<string>;

    // Champs globaux enrichis
    activites?: DataPoint<string[]>; // Liste consolidée d'activités
    autresContacts?: DataPoint<string[]>; // Liste de contacts capturés (ex: "Joindre cet entrepreneur")

    // Contact
    contact?: ContactInfo;

    // Adresses
    adressePrincipale?: Address;
    adressePostale?: Address;

    // Licences et certifications
    licenceRBQ?: LicenceRBQ;
    repondantRBQ?: RepondantRBQ;
    infoREQ?: InfoREQ;
    infoAPCHQ?: InfoAPCHQ;
    infoGCR?: InfoGCR;

    // Métadonnées de la fiche
    metadata?: {
        createdAt: string;
        lastUpdatedAt: string;
        sources: DataSource[];
        completeness: number; // 0-1, % de champs remplis
    };
}

/**
 * Helper pour créer un DataPoint
 */
export function createDataPoint<T>(
    value: T,
    source: DataSource,
    usage: DataUsage[] = ['ALL'],
    confidence: number = 1.0,
    notes?: string
): DataPoint<T> {
    return {
        value,
        source,
        timestamp: new Date().toISOString(),
        confidence,
        usage,
        notes
    };
}

/**
 * Helper pour fusionner deux DataPoints
 * Garde celui avec la meilleure confiance, ou le plus récent
 */
export function mergeDataPoint<T>(
    existing: DataPoint<T> | undefined,
    incoming: DataPoint<T> | undefined
): DataPoint<T> | undefined {
    if (!existing && !incoming) return undefined;
    if (!existing) return incoming;
    if (!incoming) return existing;

    // Si confiance supérieure, remplacer
    if (incoming.confidence > existing.confidence) {
        return {
            ...incoming,
            usage: Array.from(new Set([...existing.usage, ...incoming.usage]))
        };
    }

    // Si même confiance, prendre le plus récent
    if (incoming.confidence === existing.confidence) {
        const existingTime = new Date(existing.timestamp).getTime();
        const incomingTime = new Date(incoming.timestamp).getTime();

        if (incomingTime > existingTime) {
            return {
                ...incoming,
                usage: Array.from(new Set([...existing.usage, ...incoming.usage]))
            };
        }
    }

    // Sinon, garder l'existant mais fusionner les usages
    return {
        ...existing,
        usage: Array.from(new Set([...existing.usage, ...incoming.usage]))
    };
}

/**
 * Calcule le taux de complétude d'une fiche
 */
export function calculateCompleteness(fiche: FicheDataV2): number {
    const allFields = [
        fiche.nomEntreprise,
        fiche.neq,
        fiche.contact?.telephone,
        fiche.contact?.courriel,
        fiche.adressePrincipale?.adresseComplete,
        fiche.licenceRBQ?.numero,
        fiche.infoREQ?.neq
    ];

    const filledFields = allFields.filter(field => field?.value).length;
    return filledFields / allFields.length;
}
