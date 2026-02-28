import {
    FicheDataV2,
    DataPoint,
    mergeDataPoint,
    ContactInfo,
    Address,
    LicenceRBQ,
    RepondantRBQ,
    InfoREQ,
    InfoAPCHQ,
    InfoGCR
} from './types-v2';

/**
 * Fusionne deux fiches de données de manière intelligente
 * Garde les données avec la meilleure confiance ou les plus récentes
 */
export function mergeFiches(
    existing: FicheDataV2 | null,
    incoming: Partial<FicheDataV2>
): FicheDataV2 {
    // Si pas de fiche existante, créer une nouvelle
    if (!existing) {
        return {
            ...incoming,
            metadata: {
                createdAt: new Date().toISOString(),
                lastUpdatedAt: new Date().toISOString(),
                sources: extractSources(incoming),
                completeness: 0 // Sera calculé après
            }
        } as FicheDataV2;
    }

    // Fusionner les champs simples
    const merged: FicheDataV2 = {
        nomEntreprise: mergeDataPoint(existing.nomEntreprise, incoming.nomEntreprise),
        neq: mergeDataPoint(existing.neq, incoming.neq),

        // Fusionner les objets complexes
        contact: mergeContactInfo(existing.contact, incoming.contact),
        adressePrincipale: mergeAddress(existing.adressePrincipale, incoming.adressePrincipale),
        adressePostale: mergeAddress(existing.adressePostale, incoming.adressePostale),

        licenceRBQ: mergeLicenceRBQ(existing.licenceRBQ, incoming.licenceRBQ),
        repondantRBQ: mergeRepondantRBQ(existing.repondantRBQ, incoming.repondantRBQ),
        infoREQ: mergeInfoREQ(existing.infoREQ, incoming.infoREQ),
        infoAPCHQ: mergeInfoAPCHQ(existing.infoAPCHQ, incoming.infoAPCHQ),
        infoGCR: mergeInfoGCR(existing.infoGCR, incoming.infoGCR),

        // Mettre à jour les métadonnées
        metadata: {
            createdAt: existing.metadata?.createdAt || new Date().toISOString(),
            lastUpdatedAt: new Date().toISOString(),
            sources: Array.from(new Set([
                ...(existing.metadata?.sources || []),
                ...extractSources(incoming)
            ])),
            completeness: 0 // Sera calculé après
        }
    };

    return merged;
}

/**
 * Fusionne les informations de contact
 */
function mergeContactInfo(
    existing?: ContactInfo,
    incoming?: ContactInfo
): ContactInfo | undefined {
    if (!existing && !incoming) return undefined;
    if (!existing) return incoming;
    if (!incoming) return existing;

    return {
        telephone: mergeDataPoint(existing.telephone, incoming.telephone),
        telecopieur: mergeDataPoint(existing.telecopieur, incoming.telecopieur),
        courriel: mergeDataPoint(existing.courriel, incoming.courriel),
        siteWeb: mergeDataPoint(existing.siteWeb, incoming.siteWeb)
    };
}

/**
 * Fusionne les adresses
 */
function mergeAddress(
    existing?: Address,
    incoming?: Address
): Address | undefined {
    if (!existing && !incoming) return undefined;
    if (!existing) return incoming;
    if (!incoming) return existing;

    return {
        adresseComplete: mergeDataPoint(existing.adresseComplete, incoming.adresseComplete),
        noCivique: mergeDataPoint(existing.noCivique, incoming.noCivique),
        rue: mergeDataPoint(existing.rue, incoming.rue),
        ville: mergeDataPoint(existing.ville, incoming.ville),
        province: mergeDataPoint(existing.province, incoming.province),
        codePostal: mergeDataPoint(existing.codePostal, incoming.codePostal),
        pays: mergeDataPoint(existing.pays, incoming.pays)
    };
}

/**
 * Fusionne les licences RBQ
 */
function mergeLicenceRBQ(
    existing?: LicenceRBQ,
    incoming?: LicenceRBQ
): LicenceRBQ | undefined {
    if (!existing && !incoming) return undefined;
    if (!existing) return incoming;
    if (!incoming) return existing;

    return {
        numero: mergeDataPoint(existing.numero, incoming.numero),
        statut: mergeDataPoint(existing.statut, incoming.statut),
        dateObtention: mergeDataPoint(existing.dateObtention, incoming.dateObtention),
        dateExpiration: mergeDataPoint(existing.dateExpiration, incoming.dateExpiration),
        sousCategories: mergeDataPoint(existing.sousCategories, incoming.sousCategories),
        restrictions: mergeDataPoint(existing.restrictions, incoming.restrictions)
    };
}

/**
 * Fusionne les répondants RBQ
 */
function mergeRepondantRBQ(
    existing?: RepondantRBQ,
    incoming?: RepondantRBQ
): RepondantRBQ | undefined {
    if (!existing && !incoming) return undefined;
    if (!existing) return incoming;
    if (!incoming) return existing;

    return {
        nom: mergeDataPoint(existing.nom, incoming.nom),
        prenom: mergeDataPoint(existing.prenom, incoming.prenom),
        numeroLicence: mergeDataPoint(existing.numeroLicence, incoming.numeroLicence)
    };
}

/**
 * Fusionne les infos REQ
 */
function mergeInfoREQ(
    existing?: InfoREQ,
    incoming?: InfoREQ
): InfoREQ | undefined {
    if (!existing && !incoming) return undefined;
    if (!existing) return incoming;
    if (!incoming) return existing;

    return {
        neq: mergeDataPoint(existing.neq, incoming.neq),
        raisonSociale: mergeDataPoint(existing.raisonSociale, incoming.raisonSociale),
        formeJuridique: mergeDataPoint(existing.formeJuridique, incoming.formeJuridique),
        dateImmatriculation: mergeDataPoint(existing.dateImmatriculation, incoming.dateImmatriculation),
        statut: mergeDataPoint(existing.statut, incoming.statut),
        activitePrincipale: mergeDataPoint(existing.activitePrincipale, incoming.activitePrincipale)
    };
}

/**
 * Fusionne les infos APCHQ
 */
function mergeInfoAPCHQ(
    existing?: InfoAPCHQ,
    incoming?: InfoAPCHQ
): InfoAPCHQ | undefined {
    if (!existing && !incoming) return undefined;
    if (!existing) return incoming;
    if (!incoming) return existing;

    return {
        numeroMembre: mergeDataPoint(existing.numeroMembre, incoming.numeroMembre),
        dateAdhesion: mergeDataPoint(existing.dateAdhesion, incoming.dateAdhesion),
        statut: mergeDataPoint(existing.statut, incoming.statut),
        certifications: mergeDataPoint(existing.certifications, incoming.certifications)
    };
}

/**
 * Fusionne les infos GCR
 */
function mergeInfoGCR(
    existing?: InfoGCR,
    incoming?: InfoGCR
): InfoGCR | undefined {
    if (!existing && !incoming) return undefined;
    if (!existing) return incoming;
    if (!incoming) return existing;

    return {
        numeroLicence: mergeDataPoint(existing.numeroLicence, incoming.numeroLicence),
        statut: mergeDataPoint(existing.statut, incoming.statut),
        dateObtention: mergeDataPoint(existing.dateObtention, incoming.dateObtention),
        dateExpiration: mergeDataPoint(existing.dateExpiration, incoming.dateExpiration),
        typeGarantie: mergeDataPoint(existing.typeGarantie, incoming.typeGarantie)
    };
}

/**
 * Extrait toutes les sources d'une fiche partielle
 */
function extractSources(fiche: Partial<FicheDataV2>): string[] {
    const sources = new Set<string>();

    // Fonction récursive pour extraire les sources
    function extractFromObject(obj: any) {
        if (!obj) return;

        if (obj.source) {
            sources.add(obj.source);
        }

        if (typeof obj === 'object') {
            Object.values(obj).forEach(value => {
                if (value && typeof value === 'object') {
                    extractFromObject(value);
                }
            });
        }
    }

    extractFromObject(fiche);
    return Array.from(sources);
}

/**
 * Calcule le taux de complétude d'une fiche
 */
export function calculateFicheCompleteness(fiche: FicheDataV2): number {
    const criticalFields = [
        fiche.nomEntreprise,
        fiche.contact?.telephone,
        fiche.contact?.courriel,
        fiche.adressePrincipale?.ville,
        fiche.licenceRBQ?.numero || fiche.infoREQ?.neq
    ];

    const filledCritical = criticalFields.filter(f => f?.value).length;
    const criticalScore = filledCritical / criticalFields.length;

    const optionalFields = [
        fiche.neq,
        fiche.contact?.siteWeb,
        fiche.adressePrincipale?.codePostal,
        fiche.licenceRBQ?.statut,
        fiche.infoREQ?.formeJuridique
    ];

    const filledOptional = optionalFields.filter(f => f?.value).length;
    const optionalScore = filledOptional / optionalFields.length;

    // Pondération: 70% champs critiques, 30% champs optionnels
    return (criticalScore * 0.7) + (optionalScore * 0.3);
}
