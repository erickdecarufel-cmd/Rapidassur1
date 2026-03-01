'use client';
import { Breadcrumb } from '@/components/breadcrumb';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function AnalyseRenouvellements() {
    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="space-y-8">
                    <Breadcrumb items={[
                        { label: 'Portail Clic+Pro', href: '/internal' },
                        { label: 'Analyse des Renouvellements' },
                    ]} />
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-primary">Analyse des Renouvellements</h1>
                        <p className="text-lg text-muted-foreground mt-2">Fonctionnalité en cours de développement.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}