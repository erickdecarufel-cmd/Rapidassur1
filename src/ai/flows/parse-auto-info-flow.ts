'use server';

import { z } from 'zod';
import { ai } from '@/ai/genkit';

const ParseAutoInfoOutputSchema = z.object({
    nomClient: z.string().optional(),
    autresNoms: z.string().optional(),
    adresseClient: z.string().optional(),
    courriel: z.string().optional(),
    telephone: z.string().optional(),
    annee: z.string().optional(),
    marqueModele: z.string().optional(),
    valeurVehicule: z.string().optional(),
    datePossession: z.string().optional(),
    etatVehicule: z.enum(['neuf', 'usage']).optional(),
    kilometrage: z.string().optional(),
    financement: z.string().optional(),
    numeroSerie: z.string().optional(),
    refusAnterieur: z.enum(['oui', 'non']).optional(),
    faillite: z.enum(['oui', 'non']).optional(),
    nomVendeur: z.string().optional(),
    systemeTag: z.enum(['oui', 'non']).optional(),
    assureurActuel: z.string().optional(),
    usageVehicule: z.string().optional(),
    usageChantier: z.string().optional(),
    usagePersonnel: z.string().optional(),
    anneeIncorporation: z.string().optional(),
    noReq: z.string().optional(),
    contactPrincipal: z.string().optional(),
    rayonOperation: z.string().optional(),
    vehiculePrete: z.enum(['oui', 'non']).optional(),
    sinistres: z.enum(['oui', 'non']).optional(),
    descriptionSinistres: z.string().optional(),
    telephoneRepresentant: z.string().optional(),
    noRbq: z.string().optional(),
    dateDelivrance: z.string().optional(),
    datePaiementAnnuel: z.string().optional(),
    adresseRepondant: z.string().optional(),
    cautionnement: z.string().optional(),
    limitations: z.string().optional(),
    categoriesGeneral: z.array(z.string()).optional(),
    categoriesSpecialise: z.array(z.string()).optional(),
});

export type ParseAutoInfoOutput = z.infer<typeof ParseAutoInfoOutputSchema>;

function normalizeDate(dateStr: string): string {
    if (!dateStr) return '';
    const moisMap: { [key: string]: string } = {
        'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
        'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
        'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
    };
    const d = new Date();
    dateStr = dateStr.toLowerCase().replace(/[\r\n]/g, ' ').trim();
    if (/aujourd'hui/i.test(dateStr)) { return d.toISOString().split('T')[0]; }
    if (/demain/i.test(dateStr)) { d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const dmyMatch = dateStr.match(/(\d{1,2})[\s\/-](\d{1,2})[\s\/-](\d{2,4})/);
    if (dmyMatch) {
        const day = dmyMatch[1].padStart(2, '0');
        const month = dmyMatch[2].padStart(2, '0');
        let year = dmyMatch[3];
        if (year.length === 2) { year = `20${year}`; }
        return `${year}-${month}-${day}`;
    }
    const frMatch = dateStr.match(/(?:lundi|mardi|mercredi|jeudi|vendredi|vendrerdi|samedi|dimanche)?\s*(?:(\d{1,2})(?:er)?)?\s*(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)(?:\s+(\d{4}))?/i);
    if (frMatch) {
        const day = (frMatch[1] || '01').padStart(2, '0');
        const month = moisMap[frMatch[2].toLowerCase()];
        const year = frMatch[3] || new Date().getFullYear().toString();
        return `${year}-${month}-${day}`;
    }
    return dateStr;
}

interface ExtractionRule {
    key?: string;
    regex: RegExp;
    value?: string;
    group?: number;
    multi?: string[];
    process?: (v: string, match: RegExpMatchArray) => string;
}

function extractWithRegex(text: string): ParseAutoInfoOutput {
    const result: Partial<ParseAutoInfoOutput> = { categoriesGeneral: [], categoriesSpecialise: [] };
    let cleanedText = text.replace(/[\r\n]+/g, '\n').replace(/\s{2,}/g, ' ').trim();
    const extractions: ExtractionRule[] = [
        { key: 'nomClient', regex: /Entrepreneurs Conseils de pros Certifié APCHQ Financer vos projets\n(.*?)\n/i },
        { key: 'nomClient', regex: /Accueil Rechercher par entreprise Résultats de recherche Fiche du détenteur de licence\n(.*?)\n/i },
        { key: 'nomClient', regex: /^([A-Z\.\s]+\s*Rénovations\s*inc\.)/im },
        { key: 'contactPrincipal', regex: /Joindre cet entrepreneur\n(.*?)\n/i, process: (v: string) => v.replace(/(Afficher|Masquer) l'information/gi, '').replace(/de tous les répondants/i, '').replace(/Prêt à conclure.*/, '').trim() },
        { key: 'telephone', regex: /(\d{3}\s\d{3}-\d{4})/im },
        { key: 'courriel', regex: /(\S+@\S+\.\S+)/im },
        { key: 'adresseClient', regex: /([A-Za-zÀ-ÿ\s]+? \([A-Z]{2}\) [A-Z]\d[A-Z]\s\d[A-Z]\d)/im },
        { key: 'noRbq', regex: /Licence RBQ\s*:\s*(\d{8,10})/i },
        { key: 'cautionnement', regex: /Une entreprise membre de l'APCHQ/i, value: 'APCHQ' },
        { key: 'nomClient', regex: /^([\d-]+\sQuébec\sInc\.)/im },
        { key: 'autresNoms', regex: /Autre\(s\)\snom\(s\)\s+([\s\S]*?)(?=Numéro de licence RBQ)/i, process: (v: string) => v.replace(/\n/g, ', ').replace(/,\s*$/, '').trim() },
        { key: 'noRbq', regex: /Numéro de licence RBQ\s+([\d-]+)/i },
        { key: 'dateDelivrance', regex: /Date de délivrance\s+(\d{4}-\d{2}-\d{2})/i, process: normalizeDate },
        { key: 'datePaiementAnnuel', regex: /Date du paiement annuel\s+(\d{4}-\d{2}-\d{2})/i, process: normalizeDate },
        { key: 'noReq', regex: /Numéro d'entreprise du Québec \(NEQ\)\s+(\d{10})/i },
        { key: 'adresseClient', regex: /Adresse\n([\s\S]*?)(?=Courriel|Téléphone)/i, process: (v: string) => v.replace(/\n/g, ' ').trim() },
        { key: 'courriel', regex: /Courriel\n(\S+@\S+\.\S+)/i },
        { key: 'telephone', regex: /Téléphone\n(\d{3}\s?[-\s]?\d{3}[-\s]?\d{4})/i },
        { key: 'contactPrincipal', regex: /(?:Afficher l'information|Masquer l'information)(?: de tous les répondants)?\s*([\w\sÀ-ÿ'-]+?)(?=\s*(Prêt à conclure|Adresse du répondant|Téléphone|Courriel|$))/i, process: (v: string) => v.replace(/(Afficher|Masquer) l'information/gi, '').replace(/de tous les répondants/i, '').replace(/Prêt à conclure.*/, '').trim() },
        { key: 'adresseRepondant', regex: /Adresse du répondant\n([\s\S]*?)(?=\n\n|\nCourriel|\nTéléphone)/i, process: (v: string) => v.replace(/\n/g, ' ').trim() },
        { key: 'cautionnement', regex: /Association ou compagnie fournissant le cautionnement\n([\s\S]*?)(?=\nRépondant\(s\))/i, process: (v: string) => v.replace(/\n/g, ' ').trim() },
        { key: 'limitations', regex: /Limitation à la licence ou projet unique\s+([\s\S]*?)(?=Catégorie entrepreneur)/i, process: (v: string) => v.trim() },
        { key: 'numeroSerie', regex: /\b([A-HJ-NPR-Z0-9]{17})\b/i },
        { key: 'vehicule', regex: /(\d{4})\s+([\w\sÀ-ÿ'-]{4,25}?)(?:\s+-\s*n\/s|\s+valeur|\s+coûté|\s+VIN|\s+km|\s*[,.\n]|$)/i, multi: ['annee', 'marqueModele'] },
        { key: 'valeurVehicule', regex: /(?:valeur de|valeur à neuf|coûté|payé|évalué à)\s*[:\-\s.]*(\d{1,3}(?:[,'\s]?\d{3})*)\s*\$?(\s*neuf)?/i, process: (v: string, match: RegExpMatchArray) => `${v.replace(/[,'\s]/g, '')}${match[2] ? ' neuf' : ''}` },
        { key: 'datePossession', regex: /(?:date d'effet|prise de possession|en vigueur le|commencer le|aller chercher|vendre.*le|possiioon de mon vehicule)\s*(?:le)?\s*((?:lundi|mardi|mercredi|jeudi|vendredi|vendrerdi|samedi|dimanche)?\s*(?:\d{1,2}[\s\/-]\d{1,2}[\s\/-]\d{2,4}|\d{1,2}(?:er)?\s*(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)[\w\s\d\/-]*|aujourd'hui|demain))/i, process: normalizeDate },
    ];
    const typesTravauxMatch = cleanedText.match(/TYPES DE TRAVAUX\s+([\s\S]+?)(?=RÉALISATIONS|PROGRAMMES)/i);
    if (typesTravauxMatch && typesTravauxMatch[1]) {
        result.categoriesGeneral = Array.from(new Set(typesTravauxMatch[1].split('\n').map((line: string) => line.trim()).filter((line: string) => line && !/joindre cet entrepreneur/i.test(line))));
    }
    const extractCategories = (sectionRegex: RegExp, existingCategories: string[] = []): string[] => {
        const sectionMatch = cleanedText.match(sectionRegex);
        if (sectionMatch && sectionMatch[1]) {
            const categories = sectionMatch[1].split('\n').map((line: string) => line.replace(/^\d[\d.]*\s*/, '').trim()).filter(Boolean);
            return Array.from(new Set([...existingCategories, ...categories]));
        }
        return existingCategories;
    };
    result.categoriesGeneral = extractCategories(/Catégorie entrepreneur général\s+([\s\S]*?)(?=Catégorie entrepreneur spécialisé|Réclamations au cautionnement|$)/i, result.categoriesGeneral);
    result.categoriesSpecialise = extractCategories(/Catégorie entrepreneur spécialisé\s+([\s\S]*?)(?=Réclamations au cautionnement|$)/i, result.categoriesSpecialise);
    extractions.forEach((extraction: ExtractionRule) => {
        const { key, regex, value, multi, process } = extraction;
        const group = extraction.group ?? 1;
        let processMatch = true;
        if (multi) { processMatch = !multi.some((k: string) => result[k as keyof ParseAutoInfoOutput]); }
        else if (key) { processMatch = !result[key as keyof ParseAutoInfoOutput]; }
        if (processMatch) {
            const match = cleanedText.match(regex);
            if (match) {
                if (multi) { multi.forEach((k: string, i: number) => { const multiValue = match[i + 1]?.trim(); if (multiValue) { (result as any)[k] = multiValue; } }); }
                else if (key) {
                    let extractedValue: string | undefined = value !== undefined ? value : match[group]?.trim();
                    if (process && extractedValue) { extractedValue = process(extractedValue, match); }
                    if (extractedValue) { (result as any)[key] = extractedValue; }
                }
            }
        }
    });
    return result as ParseAutoInfoOutput;
}

export async function parseAutoInfo(text: string): Promise<ParseAutoInfoOutput> {
    if (!text || text.trim().length < 10) { throw new Error("Texte d'entrée insuffisant pour l'analyse."); }
    return extractWithRegex(text);
}