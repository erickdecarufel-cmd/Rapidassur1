import React from 'react';

interface CompletenessBarProps {
    score: number; // 0 à 1
    className?: string;
}

export function CompletenessBar({ score, className = '' }: CompletenessBarProps) {
    const percentage = Math.min(Math.max(score * 100, 0), 100);

    // Couleur dynamique selon le score
    let colorClass = 'bg-red-500';
    if (percentage >= 80) colorClass = 'bg-green-500';
    else if (percentage >= 50) colorClass = 'bg-yellow-500';
    else if (percentage >= 30) colorClass = 'bg-orange-500';

    return (
        <div className={`w-full flex flex-col gap-1 ${className}`}>
            <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                <span>Complétude de la fiche</span>
                <span>{percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                <div
                    className={`h-2.5 rounded-full transition-all duration-500 ease-out ${colorClass}`}
                    style={{ width: `${percentage}%` }}
                >
                    {/* Effet de brillance animé */}
                    <div className="w-full h-full opacity-30 animate-pulse bg-white/30"></div>
                </div>
            </div>
            {percentage < 30 && (
                <p className="text-xs text-red-500 mt-1">
                    ⚠️ Données insuffisantes pour une soumission
                </p>
            )}
        </div>
    );
}
