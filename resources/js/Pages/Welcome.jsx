import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ appName = 'My Desktop App', phpVersion, laravelVersion }) {
    const [count, setCount] = useState(0);

    return (
        <>
            <Head title="الرئيسية" />
            <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center p-6 select-none" dir="rtl">
                <div className="max-w-xl w-full bg-slate-800/80 border border-slate-700/60 rounded-2xl p-8 shadow-2xl backdrop-blur-sm text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        NativePHP + Inertia + React
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                        {appName}
                    </h1>
                    <p className="text-slate-400 text-sm mb-8">
                        تطبيق ديسكتوب يعمل بنجاح باستخدام Laravel و React مع Inertia.js!
                    </p>

                    <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-700/40 mb-6">
                        <p className="text-xs text-slate-400 mb-2">مكون React تفاعلي تجريبي:</p>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => setCount(c => c - 1)}
                                className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 active:scale-95 text-white font-bold text-lg transition flex items-center justify-center cursor-pointer"
                            >
                                -
                            </button>
                            <span className="text-2xl font-mono font-bold text-indigo-400 min-w-[3rem]">
                                {count}
                            </span>
                            <button
                                onClick={() => setCount(c => c + 1)}
                                className="w-10 h-10 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-lg transition flex items-center justify-center cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-right text-xs text-slate-300">
                        <div className="bg-slate-700/30 p-3 rounded-lg border border-slate-700/40">
                            <span className="text-slate-400 block font-mono">Backend:</span>
                            <span className="font-semibold text-emerald-400">Laravel v{laravelVersion || '13'}</span>
                        </div>
                        <div className="bg-slate-700/30 p-3 rounded-lg border border-slate-700/40">
                            <span className="text-slate-400 block font-mono">PHP Runtime:</span>
                            <span className="font-semibold text-sky-400">PHP v{phpVersion || '8.3'}</span>
                        </div>
                        <div className="bg-slate-700/30 p-3 rounded-lg border border-slate-700/40">
                            <span className="text-slate-400 block font-mono">Frontend:</span>
                            <span className="font-semibold text-cyan-400">React + Inertia</span>
                        </div>
                        <div className="bg-slate-700/30 p-3 rounded-lg border border-slate-700/40">
                            <span className="text-slate-400 block font-mono">Desktop Shell:</span>
                            <span className="font-semibold text-purple-400">NativePHP Electron</span>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-slate-500 mt-6 font-mono">
                    مكان كتابة صفحات React هو: resources/js/Pages/
                </p>
            </div>
        </>
    );
}
