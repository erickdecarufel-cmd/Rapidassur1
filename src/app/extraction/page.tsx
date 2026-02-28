'use client';

import React, { useState } from 'react';
import { analyzeTextAction } from '@/app/actions/analyze-text';
import { FicheDataV2, createDataPoint } from '@/lib/types-v2';
import { FicheDisplay } from '@/components/extraction/fiche-display';
import { CompletenessBar } from '@/components/extraction/completeness-bar';
import { Toaster, toast } from 'sonner';

export default function ExtractionPage() {
    const [fiche, setFiche] = useState<FicheDataV2 | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Fonction de conversion Simple -> V2
    const convertToV2 = (simpleData: any): FicheDataV2 => {
        const v2: FicheDataV2 = {};
        const source = 'RBQ'; // Source par défaut pour l'instant

        if (simpleData.nomEntreprise) v2.nomEntreprise = createDataPoint(simpleData.nomEntreprise, source);
        if (simpleData.neq) v2.neq = createDataPoint(simpleData.neq, source);

        // RBQ
        if (simpleData.rbq) {
            v2.licenceRBQ = {
                numero: createDataPoint(simpleData.rbq, source),
                statut: simpleData.statut ? createDataPoint(simpleData.statut, source) : undefined
            };
        }

        // Adresse
        if (simpleData.adresse) {
            v2.adressePrincipale = {
                adresseComplete: createDataPoint(simpleData.adresse, source),
                ville: simpleData.ville ? createDataPoint(simpleData.ville, source) : undefined,
                codePostal: simpleData.codePostal ? createDataPoint(simpleData.codePostal, source) : undefined
            };
        }

        // Contact
        if (simpleData.courriel || simpleData.telephone) {
            v2.contact = {
                courriel: simpleData.courriel ? createDataPoint(simpleData.courriel, source) : undefined,
                telephone: simpleData.telephone ? createDataPoint(simpleData.telephone, source) : undefined
            };
        }

        return v2;
    };

    const handleRBQPaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (!text) {
                toast.error("Presse-papier vide");
                return;
            }

            setIsAnalyzing(true);
            toast.info("Analyse RBQ en cours...");

            const result = await analyzeTextAction(text);

            if (result.success && result.data) {
                const newDataV2 = convertToV2(result.data);

                // Fusion naïve pour l'instant (écrase l'existant)
                setFiche(prev => ({ ...prev, ...newDataV2 }));

                toast.success("Données RBQ injectées avec succès !");
            } else {
                toast.error(result.error || "Échec de l'extraction");
            }

        } catch (err) {
            console.error(err);
            toast.error("Erreur lors de la lecture du presse-papier");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        if (confirm("Voulez-vous vraiment effacer toutes les données extraites ?")) {
            setFiche(null);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-poppins">
            <div className="max-w-7xl mx-auto">

                {/* En-tête */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                        Extraction Intelligente <span className="text-ra-blue">Gemini</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Copiez les données brutes (RBQ, REQ, GCR) et laissez l'IA structurer la fiche client parfaite.
                        Approche &quot;Small Bites&quot; incrémentale.
                    </p>
                </div>

                <div className="flex flex-col gap-8">

                    {/* Zone 1: La Fiche Unifiée (Le Résultat En Haut) */}
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800">🏛️ Fiche Nominative Unifiée</h2>
                            {fiche && (
                                <button onClick={handleReset} className="text-xs text-ra-red hover:text-red-700 font-medium px-3 py-1 rounded hover:bg-red-50">
                                    🗑️ Réinitialiser
                                </button>
                            )}
                        </div>

                        <div className="p-6 min-h-[200px]">
                            {/* Barre de complétude globale */}
                            {fiche && (
                                <div className="mb-6">
                                    <CompletenessBar score={fiche.metadata?.completeness || 0} />
                                </div>
                            )}

                            {/* Affichage des données */}
                            <div className={`transition-opacity duration-300 ${isAnalyzing ? 'opacity-50' : 'opacity-100'}`}>
                                <FicheDisplay fiche={fiche} />
                            </div>
                        </div>
                    </div>

                    {/* Zone 2: Les Cartes Sources (Les Intrants En Bas) */}
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4 px-2">Sources de Données</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* CARTE RBQ */}
                            <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">🛡️</span>
                                        <h4 className="font-bold text-slate-700">RBQ</h4>
                                    </div>
                                    <span className="text-xs font-mono bg-blue-50 text-ra-blue px-2 py-1 rounded">QC</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-6 min-h-[40px]">
                                    Licence, Cautionnement et Catégories.
                                </p>
                                <button
                                    onClick={handleRBQPaste}
                                    disabled={isAnalyzing}
                                    className="w-full py-3 px-4 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-ra-blue font-medium rounded-lg border border-dashed border-slate-300 hover:border-ra-blue transition-all flex items-center justify-center gap-2"
                                >
                                    {isAnalyzing ? (
                                        <span className="animate-spin">⌛</span>
                                    ) : (
                                        <span>📋</span>
                                    )}
                                    Coller le contenu
                                </button>
                            </div>

                            {/* CARTE REQ (Placeholder) */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 opacity-60">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">🏢</span>
                                        <h4 className="font-bold text-slate-700">REQ</h4>
                                    </div>
                                    <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded">QC</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-6 min-h-[40px]">
                                    Constitution, Actionnaires et Adresse.
                                </p>
                                <button disabled className="w-full py-3 px-4 bg-slate-50 text-slate-400 font-medium rounded-lg border border-dashed border-slate-200 cursor-not-allowed text-sm">
                                    Bientôt disponible
                                </button>
                            </div>

                            {/* CARTE APCHQ (Placeholder) */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 opacity-60">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">👷</span>
                                        <h4 className="font-bold text-slate-700">APCHQ</h4>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 mb-6 min-h-[40px]">
                                    Certifications et Assurance.
                                </p>
                                <button disabled className="w-full py-3 px-4 bg-slate-50 text-slate-400 font-medium rounded-lg border border-dashed border-slate-200 cursor-not-allowed text-sm">
                                    Bientôt disponible
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
                <Toaster position="top-center" />
            </div>
        </main>
    );
}
