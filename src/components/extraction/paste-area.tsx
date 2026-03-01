'use client';

import React, { useState } from 'react';
import { detectSource, detectMultipleSources } from '@/lib/source-detection';
import { DataSource } from '@/lib/types-v2';
import { SourceBadge } from './source-badge';

interface PasteAreaProps {
    onAnalyze: (text: string) => void;
    isAnalyzing: boolean;
}

export function PasteArea({ onAnalyze, isAnalyzing }: PasteAreaProps) {
    const [text, setText] = useState('');
    const [detectedSource, setDetectedSource] = useState<DataSource | null>(null);
    const [warnings, setWarnings] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);

        if (newText.length > 50) {
            const source = detectSource(newText);
            setDetectedSource(source);

            const multiples = detectMultipleSources(newText);
            if (multiples.length > 1) {
                setWarnings([`Attention: Plusieurs sources détectées (${multiples.join(', ')}). Essayez de coller une source à la fois.`]);
            } else {
                setWarnings([]);
            }
        } else {
            setDetectedSource(null);
            setWarnings([]);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    📄 Ajouter des données
                    {detectedSource && (
                        <span className="animate-in fade-in zoom-in duration-300">
                            <span className="text-xs font-normal text-slate-400 mx-2">source détectée:</span>
                            <SourceBadge source={detectedSource} />
                        </span>
                    )}
                </h3>
                <button
                    onClick={() => setText('')}
                    className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                    disabled={!text}
                >
                    Effacer
                </button>
            </div>

            <div className="relative">
                <textarea
                    value={text}
                    onChange={handleChange}
                    placeholder="Collez ici le texte depuis RBQ, REQ, GCR, etc..."
                    className="w-full h-32 p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none text-sm"
                    disabled={isAnalyzing}
                />

                {text.length > 20 && (
                    <div className="absolute bottom-3 right-3">
                        <button
                            onClick={() => onAnalyze(text)}
                            disabled={isAnalyzing}
                            className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-white shadow-lg transition-all
                ${isAnalyzing
                                ? 'bg-slate-400 cursor-not-allowed'
                                : 'bg-ra-blue hover:bg-blue-700 hover:scale-105 active:scale-95'
                            }
              `}
                        >
                            {isAnalyzing ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Analyse Gemini...</span>
                                </>
                            ) : (
                                <span>✨ Extraire</span>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {warnings.length > 0 && (
                <div className="mt-3 p-2 bg-yellow-50 text-yellow-700 text-xs rounded border border-yellow-100 flex items-start gap-2">
                    <span>⚠️</span>
                    <div>
                        {warnings.map((w, i) => (
                            <p key={i}>{w}</p>
                        ))}
                    </div>
                </div>
            )}

            <p className="mt-2 text-xs text-slate-400 text-center">
                L'IA détectera automatiquement la source et structurera les données. </p> </div> ); } 