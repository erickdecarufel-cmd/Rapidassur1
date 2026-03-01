'use client';
import { Breadcrumb } from '@/components/breadcrumb';
import { CopeEvaluationTool } from '@/components/outils/cope-evaluation-tool';

export default function CopeEvaluationPage() {
    return (
        <div className="space-y-8">
            <Breadcrumb items={[
                { label: 'Portail Clic+Pro', href: '/internal' },
                { label: 'Outils', href: '#' },
                { label: 'Évaluation COPE' },
            ]} />
            <CopeEvaluationTool />
        </div>
    );
}