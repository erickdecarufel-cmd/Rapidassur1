/**
 * Script de test pour le système d'extraction
 * Teste chaque extracteur avec des données d'exemple
 */

import { analyzeUniversalDoc, analyzeMultipleDocs } from '../src/app/actions/analyze-universal-doc';

// Données de test RBQ
const rbqSample = `
RÉGIE DU BÂTIMENT DU QUÉBEC
Fiche d'entreprise

Nom de l'entreprise: Construction ABC Inc.
Numéro de licence: 8234-5678-01
Statut: Valide
Date d'obtention: 2015-03-15
Date d'expiration: 2026-03-15

Sous-catégories:
- 1.1.1 - Entrepreneur général
- 1.1.2 - Entrepreneur spécialisé en structure de bois

Répondant:
Nom: Tremblay
Prénom: Jean
Numéro de licence: 5678-9012-01

Adresse:
123 Rue Principale
Montréal, QC H1A 1A1

Contact:
Téléphone: 514-555-1234
Télécopieur: 514-555-1235
Courriel: info@constructionabc.com
Site web: www.constructionabc.com
`;

// Données de test REQ
const reqSample = `
REGISTRE DES ENTREPRISES DU QUÉBEC

NEQ: 1234567890
Raison sociale: Construction ABC Inc.
Forme juridique: Société par actions
Date d'immatriculation: 2015-01-20
Statut: Immatriculée
Activité principale: Construction résidentielle et commerciale

Siège social:
123 Rue Principale
Montréal, QC H1A 1A1

Téléphone: 514-555-1234
Courriel: info@constructionabc.com
`;

// Données de test GCR
const gcrSample = `
GARANTIE DE CONSTRUCTION RÉSIDENTIELLE

Numéro de licence: GCR-12345
Entreprise: Construction ABC Inc.
Statut: Active
Date d'obtention: 2020-01-15
Date d'expiration: 2025-01-15
Type de garantie: Bâtiment neuf

Adresse:
Montréal, QC H1A 1A1

Téléphone: 514-555-1234
`;

/**
 * Test 1: Extraction RBQ seule
 */
async function testRBQExtraction() {
    console.log('\n🧪 TEST 1: Extraction RBQ');
    console.log('='.repeat(50));

    const result = await analyzeUniversalDoc(rbqSample);

    if (result.success) {
        console.log('✅ Succès!');
        console.log('Source détectée:', result.source);
        console.log('Complétude:', (result.completeness! * 100).toFixed(1) + '%');
        console.log('Nom entreprise:', result.fiche?.nomEntreprise?.value);
        console.log('Licence RBQ:', result.fiche?.licenceRBQ?.numero?.value);
        console.log('Téléphone:', result.fiche?.contact?.telephone?.value);
    } else {
        console.log('❌ Échec:', result.message);
    }
}

/**
 * Test 2: Enrichissement incrémental (RBQ → REQ)
 */
async function testIncrementalEnrichment() {
    console.log('\n🧪 TEST 2: Enrichissement incrémental');
    console.log('='.repeat(50));

    // Étape 1: RBQ
    console.log('\n📄 Étape 1: Extraction RBQ');
    const rbqResult = await analyzeUniversalDoc(rbqSample);
    console.log('Complétude après RBQ:', (rbqResult.completeness! * 100).toFixed(1) + '%');

    // Étape 2: REQ
    console.log('\n📄 Étape 2: Enrichissement avec REQ');
    const reqResult = await analyzeUniversalDoc(reqSample, rbqResult.fiche);
    console.log('Complétude après REQ:', (reqResult.completeness! * 100).toFixed(1) + '%');

    // Étape 3: GCR
    console.log('\n📄 Étape 3: Enrichissement avec GCR');
    const gcrResult = await analyzeUniversalDoc(gcrSample, reqResult.fiche);
    console.log('Complétude finale:', (gcrResult.completeness! * 100).toFixed(1) + '%');

    if (gcrResult.success) {
        console.log('\n✅ Enrichissement réussi!');
        console.log('Sources utilisées:', gcrResult.fiche?.metadata?.sources.join(', '));
        console.log('NEQ:', gcrResult.fiche?.neq?.value);
        console.log('Licence RBQ:', gcrResult.fiche?.licenceRBQ?.numero?.value);
        console.log('Licence GCR:', gcrResult.fiche?.infoGCR?.numeroLicence?.value);
    }
}

/**
 * Test 3: Analyse multiple
 */
async function testMultipleAnalysis() {
    console.log('\n🧪 TEST 3: Analyse multiple');
    console.log('='.repeat(50));

    const result = await analyzeMultipleDocs([
        { text: rbqSample, source: 'RBQ' },
        { text: reqSample, source: 'REQ' },
        { text: gcrSample, source: 'GCR' }
    ]);

    if (result.success) {
        console.log('✅ Succès!');
        console.log('Complétude:', (result.completeness! * 100).toFixed(1) + '%');
        console.log('Sources:', result.fiche?.metadata?.sources.join(', '));

        if (result.warnings) {
            console.log('\n⚠️ Warnings:');
            result.warnings.forEach(w => console.log('  -', w));
        }
    } else {
        console.log('❌ Échec:', result.message);
    }
}

/**
 * Test 4: Détection automatique de source
 */
async function testAutoDetection() {
    console.log('\n🧪 TEST 4: Détection automatique');
    console.log('='.repeat(50));

    const samples = [
        { name: 'RBQ', text: rbqSample },
        { name: 'REQ', text: reqSample },
        { name: 'GCR', text: gcrSample }
    ];

    for (const sample of samples) {
        const result = await analyzeUniversalDoc(sample.text);
        console.log(`\n${sample.name}:`);
        console.log('  Détecté:', result.source);
        console.log('  Correct:', result.source === sample.name ? '✅' : '❌');
    }
}

/**
 * Exécuter tous les tests
 */
async function runAllTests() {
    console.log('\n🚀 DÉBUT DES TESTS DU SYSTÈME D\'EXTRACTION');
    console.log('='.repeat(50));

    try {
        await testRBQExtraction();
        await testIncrementalEnrichment();
        await testMultipleAnalysis();
        await testAutoDetection();

        console.log('\n✅ TOUS LES TESTS TERMINÉS');
    } catch (error) {
        console.error('\n❌ ERREUR FATALE:', error);
    }
}

// Exécuter si appelé directement
if (require.main === module) {
    runAllTests();
}

export { runAllTests };
