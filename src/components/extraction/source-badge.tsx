import React from 'react';
import { DataSource } from '@/lib/types-v2';

interface SourceBadgeProps {
    source: DataSource;
    className?: string;
    showIcon?: boolean;
}

const sourceConfig: Record<DataSource, { color: string; label: string; icon: string }> = {
    'RBQ':      { color: 'bg-blue-100 text-blue-800 border-blue-200',     label: 'RBQ',    icon: '🏗️' },
    'REQ':      { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'REQ',   icon: '🏢' },
    'GCR':      { color: 'bg-green-100 text-green-800 border-green-200',   label: 'GCR',    icon: '🏠' },
    'APCHQ':    { color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'APCHQ', icon: '🔨' },
    'CTQ':      { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'CTQ',   icon: '⚡' },
    'MAPAQ':    { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: 'MAPAQ', icon: '🥦' },
    'RACJ':     { color: 'bg-red-100 text-red-800 border-red-200',         label: 'RACJ',   icon: '⚖️' },
    'MANUAL':   { color: 'bg-gray-100 text-gray-800 border-gray-200',      label: 'Manuel', icon: '✍️' },
    'INFERRED': { color: 'bg-indigo-100 text-indigo-800 border-indigo-200', label: 'IA',    icon: '🤖' },
};

export function SourceBadge({ source, className = '', showIcon = true }: SourceBadgeProps) {
    const config = sourceConfig[source] || sourceConfig['MANUAL'];

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${config.color} ${className}`}>
            {showIcon && <span className="mr-1">{config.icon}</span>}
            {config.label}
        </span>
    );
}
