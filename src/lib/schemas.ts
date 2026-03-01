
        import { z } from 'zod';

        /**
         * Schéma de données pour une entité Entreprise.
         * C'est le plan directeur qui fusionne les informations de plusieurs sources (RBQ, REQ, etc.).
         * Ce schéma sera utilisé pour valider les sorties de l'IA et les formulaires.
         */

        // Exemple basé sur req-extractor.ts
        export const EntrepriseSchema = z.object({
            neq: z.string().optional().describe("Numéro d'entreprise du Québec (NEQ)"),
            raisonSociale: z.string().optional().describe("Nom légal de l'entreprise"),
            formeJuridique: z.string().optional(),
            statut: z.string().optional().describe("Ex: Immatriculée, Radiée"),
            activitePrincipale: z.string().optional(),
            dateImmatriculation: z.string().optional(),
            
            // On peut déjà prévoir les champs d'autres sources
            numeroLicenceRBQ: z.string().optional().describe("Numéro de licence RBQ (8352-1927-44)"),
            statutLicenceRBQ: z.string().optional().describe("Ex: Valide"),

            // ... autres champs de types-v2.ts
        });

        export type Entreprise = z.infer<typeof EntrepriseSchema>;
        