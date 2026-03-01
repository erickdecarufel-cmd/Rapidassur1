'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Page() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12 text-center">
                <p>Page en construction.</p>
            </main>
            <Footer />
        </div>
    );
}
