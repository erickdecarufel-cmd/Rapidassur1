import React from 'react';
import { FicheDataV2, DataPoint } from '@/lib/types-v2';
import { SourceBadge } from './source-badge';

interface FicheDisplayProps {
    fiche: FicheDataV2 | null;
}

/**
 * Affiche un point de données avec sa source et sa confiance
 */
function DataRow({ label, data }: { label: string; data?: DataPoint<any> }) {
    if (!data || !data.value) return null;

    return (
        <div className="flex items-start justify-between py-2 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors px-2 rounded">
            <span className="text-sm font-medium text-slate-500 w-1/3">{label}</span>
            <div className="flex-1 flex flex-col items-end">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800 text-right break-words max-w-[200px] sm:max-w-none">
                        {Array.isArray(data.value) ? data.value.join(', ') : String(data.value)}
                    </span>
                    <SourceBadge source={data.source} showIcon={false} className="scale-75 origin-right opacity-70" />
                </div>
                {/* Métadonnées */}
                <div className="text-[10px] text-slate-400 mt-0.5 flex gap-2">
                    <span title={`Confiance: ${(data.confidence * 100).toFixed(0)}%`}>
                        {data.confidence < 0.8 ? '⚠️' : '✅'}
                    </span>
                    <span>{new Date(data.timestamp).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    const hasContent = React.Children.toArray(children).some(child => child !== null);
    if (!hasContent) return null;

    return (
        <div className="mb-6 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                <h3 className="font-semibold text-slate-700">{title}</h3>
            </div>
            <div className="p-4 space-y-1">
                {children}
            </div>
        </div>
    );
}

export function FicheDisplay({ fiche }: FicheDisplayProps) {
    if (!fiche) {
        return (
            <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-lg mb-2">👋 Aucune donnée extraite</p>
                <p className="text-sm">Collez du texte pour commencer l'analyse Gemini.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        {fiche.nomEntreprise?.value || 'Nouvelle Fiche'}
                    </h2>
                    <div className="flex gap-2 mt-2">
                        {fiche.metadata?.sources.map((source) => (
                            <SourceBadge key={source} source={source} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {/* Identité */}
                <Section title="Identité de l'entreprise">
                    <DataRow label="Nom de l'entreprise" data={fiche.nomEntreprise} />
                    <DataRow label="NEQ" data={fiche.neq} />
                    <DataRow label="Forme juridique" data={fiche.infoREQ?.formeJuridique} />
                    <DataRow label="Date d'immatriculation" data={fiche.infoREQ?.dateImmatriculation} />
                </Section>

                {/* Contact */}
                <Section title="Coordonnées">
                    <DataRow label="Téléphone" data={fiche.contact?.telephone} />
                    <DataRow label="Cellulaire / Fax" data={fiche.contact?.telecopieur} />
                    <DataRow label="Courriel" data={fiche.contact?.courriel} />
                    <DataRow label="Site Web" data={fiche.contact?.siteWeb} />
                    <DataRow label="Adresse principale" data={fiche.adressePrincipale?.adresseComplete} />
                    <DataRow label="Ville" data={fiche.adressePrincipale?.ville} />
                </Section>

                {/* Licence RBQ */}
                <Section title="Licence RBQ">
                    <DataRow label="Numéro de licence" data={fiche.licenceRBQ?.numero} />
                    <DataRow label="Statut" data={fiche.licenceRBQ?.statut} />
                    <DataRow label="Expiration" data={fiche.licenceRBQ?.dateExpiration} />
                    <DataRow label="Sous-catégories" data={fiche.licenceRBQ?.sousCategories} />
                    <DataRow label="Cautionnement" data={fiche.licenceRBQ?.restrictions} />
                </Section>

                {/* Répondant */}
                <Section title="Répondant">
                    <DataRow label="Nom" data={fiche.repondantRBQ?.nom} />
                    <DataRow label="Prénom" data={fiche.repondantRBQ?.prenom} />
                </Section>

                {/* GCR */}
                <Section title="Garantie GCR">
                    <DataRow label="Numéro GCR" data={fiche.infoGCR?.numeroLicence} />
                    <DataRow label="Statut" data={fiche.infoGCR?.statut} />
                    <DataRow label="Type de garantie" data={fiche.infoGCR?.typeGarantie} />
                </Section>
            </div>
        </div>
    );
}
