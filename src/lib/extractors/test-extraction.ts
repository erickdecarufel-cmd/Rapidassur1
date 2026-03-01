/**
 * Test d'extraction de données via les actions Serverless
 * Permet de tester rapidement les extracteurs avec des données réelles
 */

import { analyzeUniversalDoc, analyzeMultipleDocs } from '@/app/actions/analyze-universal-doc';

// Données de test RBQ
const rbqSample = `
Page 1 de 1
# de licence : 8352-1927-44
Statut de la licence : Valide
Date de délivrance : 2008-01-21
Date d'expiration : 2024-03-31
Date de paiement : 2024-03-01
Sous-catégories de licence
1.3 Entrepreneur en bâtiments de tout genre
1.2 Entrepreneur en petits bâtiments
1.1.1 Entrepreneur en bâtiments neufs visés à un plan de garantie, classe I
1.1.2 Entrepreneur en bâtiments neufs visés à un plan de garantie, classe II
Restrictions de la licence
Aucune restriction
Coordonnées de l'entreprise
Adresse de l'entreprise :
3344, boul. de la Rive-Sud, bureau 200, Lévis (Québec) G6W 5M6
Adresse postale :
3344, boul. de la Rive-Sud, bureau 200, Lévis (Québec) G6W 5M6
Téléphone :
418 834-1111
Dirigeants de l'entreprise
Nom : JEAN-FRANÇOIS SIMONEAU
Fonction : DIRIGEANT
Nom : JEAN-MARC SIMARD
Fonction : DIRIGEANT
Nom : LOUIS-PHILIPPE GAGNON
Fonction : DIRIGEANT
`;

// Données de test REQ
const reqSample = `
# d'entreprise (NEQ) : 1164893796
Raison sociale : CONSTRUCTION SIMONEAU INC.
Forme juridique : Société par actions ou compagnie
Date d'immatriculation : 2008-01-18
Statut : Immatriculée
Activité principale : Construction de bâtiments résidentiels
`;

// Données de test GCR
const gcrSample = `
# de licence GCR : 8352-1927-44
Statut : Accrédité
Date de début : 2015-01-01
Date de fin : 2024-12-31
Type de garantie : Maisons neuves
`;

// Exécuter les tests
async function runTests() {
    console.log("🚀 Démarrage des tests d'extraction...");

    try {
        console.log("\n--- TEST 1: Extraction RBQ ---");
        const rbqResult = await analyzeUniversalDoc(rbqSample);
        console.log("Résultat RBQ:", JSON.stringify(rbqResult, null, 2));
    } catch (error) {
        console.error("Erreur RBQ:", error);
    }

    try {
        console.log("\n--- TEST 2: Extraction REQ ---");
        const reqResult = await analyzeUniversalDoc(reqSample);
        console.log("Résultat REQ:", JSON.stringify(reqResult, null, 2));
    } catch (error) {
        console.error("Erreur REQ:", error);
    }

    try {
        console.log("\n--- TEST 3: Extraction GCR ---");
        const gcrResult = await analyzeUniversalDoc(gcrSample);
        console.log("Résultat GCR:", JSON.stringify(gcrResult, null, 2));
    } catch (error) {
        console.error("Erreur GCR:", error);
    }

    try {
        console.log("\n--- TEST 4: Fusion multiple ---");
        const fusionResult = await analyzeMultipleDocs([
            { source: 'RBQ', text: rbqSample },
            { source: 'REQ', text: reqSample },
            { source: 'GCR', text: gcrSample },
        ]);
        console.log("Résultat Fusion:", JSON.stringify(fusionResult, null, 2));
    } catch (error) {
        console.error("Erreur Fusion:", error);
    }
}

// Lancer les tests
runTests();
