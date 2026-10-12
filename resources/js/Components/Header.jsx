import React from 'react';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-64 h-12 bg-surface-container-lowest z-40 flex items-center justify-between px-3 border-b border-surface-container shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-on-surface-variant">
                    <button className="w-3 h-3 rounded-full bg-error/70 hover:bg-error transition-colors"></button>
                    <button className="w-3 h-3 rounded-full bg-surface-container-highest hover:bg-surface-tint transition-colors"></button>
                    <button className="w-3 h-3 rounded-full bg-secondary-container/70 hover:bg-secondary-container transition-colors"></button>
                </div>
                <div className="h-4 w-px bg-surface-container-highest"></div>
                <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute right-2 text-outline text-lg">search</span>
                    <input
                        className="w-80 h-8 pr-8 pl-20 bg-surface-container-low rounded text-[12px] text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary border-none"
                        placeholder="بحث سريع عن صنف، كود باركود، أو أمر توريد..."
                        type="text"
                    />
                    <span className="absolute left-1 px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant text-[11px] font-semibold">
                        بحث سريع
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-surface-container rounded text-on-surface-variant text-[11px] font-semibold">
                    <span className="material-symbols-outlined text-sm text-secondary">swap_horiz</span>
                    <span>المستودع الرئيسي (الرياض)</span>
                </div>
                <button
                    className="relative w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                    title="التنبيهات"
                >
                    <span className="material-symbols-outlined text-lg">notifications</span>
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error"></span>
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                    title="تحديث الصفحة"
                >
                    <span className="material-symbols-outlined text-lg">refresh</span>
                </button>
                <div className="h-4 w-px bg-surface-container-highest"></div>
                <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">
                    أ س
                </div>
            </div>
        </header>
    );
}