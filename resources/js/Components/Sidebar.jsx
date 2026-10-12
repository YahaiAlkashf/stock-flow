import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const { url } = usePage();

    const navItems = [
        { label: 'لوحة التحكم', path: '/dashboard' },
        { label: 'المنتجات', path: '/products' },
        { label: 'الفئات والأقسام', path: '/categories' },
        { label: 'حركات المخزن', path: '/stock-movements' },
        { label: 'الجرد والتسوية', path: '/audit' },
        { label: 'التقارير والإعدادات', path: '/reports' },
    ];

    return (
        <aside className="fixed right-0 top-0 h-screen w-64 bg-primary z-50 flex flex-col justify-between select-none shadow-[0_1px_8px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col">
                {/* رأس السايدبار */}
                <div className="h-12 px-3 flex items-center justify-between bg-primary border-b border-tertiary-container">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-tertiary-container flex items-center justify-center text-on-primary">
                            <span className="material-symbols-outlined text-secondary-fixed text-lg">inventory_2</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[15px] font-semibold text-on-primary leading-tight">راصد للمخزون</span>
                            <span className="text-[11px] font-semibold text-on-primary-container tracking-wider">الإصدار 4.2</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                    </div>
                </div>

                {/* اختيار المستودع */}
                <div className="px-3 py-2">
                    <div className="flex items-center justify-between px-2 py-1 bg-tertiary-container rounded text-on-primary-container text-[11px] font-semibold">
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">warehouse</span>
                            <span>المستودع الرئيسي - الرياض</span>
                        </div>
                        <span className="material-symbols-outlined text-xs">expand_more</span>
                    </div>
                </div>

                {/* القائمة الرئيسية */}
                <nav className="flex flex-col gap-1 px-2 mt-1">
                    {navItems.map((item) => {
                        const isActive = item.path === '/categories'
                            ? (url === '/' || url.startsWith('/categories'))
                            : url.startsWith(item.path);

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center px-3 py-2 rounded text-[13px] transition-colors ${
                                    isActive
                                        ? 'bg-primary-container text-on-primary font-bold'
                                        : 'text-on-primary-container hover:bg-tertiary-container hover:text-on-primary font-medium'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* بطاقة المستخدم في التذييل */}
            <div className="p-2 bg-primary border-t border-tertiary-container">
                <div className="flex items-center justify-between p-1 rounded bg-tertiary-container">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-on-primary text-[13px]">
                            <span className="material-symbols-outlined text-sm">person</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-medium text-on-primary leading-tight">م. أحمد السالم</span>
                            <span className="text-[11px] font-semibold text-on-primary-container">مدير المستودع</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-secondary-fixed" title="متصل محلياً"></span>
                    </div>
                </div>
                <div className="mt-1 flex items-center justify-between px-1 text-on-primary-container text-[11px] font-semibold">
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">wifi</span>
                        متصل بالشبكة المحلية
                    </span>
                    <span className="text-[11px] text-secondary-fixed font-semibold">نشط محلياً</span>
                </div>
            </div>
        </aside>
    );
}