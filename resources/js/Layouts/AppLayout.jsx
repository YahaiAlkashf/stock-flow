import React from 'react';
import Sidebar from '@/Components/Sidebar';
import Header from '@/Components/Header';

export default function AppLayout({ children }) {
    return (
        <div dir="rtl" className="bg-background text-on-surface font-sans antialiased min-h-screen selection:bg-secondary-container selection:text-on-secondary-container">
            <Sidebar />
            <div className="pr-64">
                <Header />
                <main className="relative pt-12 min-h-screen bg-background">
                    {children}
                </main>
            </div>
        </div>
    );
}