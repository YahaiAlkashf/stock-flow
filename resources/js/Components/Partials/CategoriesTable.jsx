import React from 'react';

function formatDate(isoStr) {
    if (!isoStr) return '—';
    try {
        const d = new Date(isoStr);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    } catch {
        return isoStr;
    }
}

export default function CategoriesTable({
    categories,
    loading,
    searchQuery,
    setSearchQuery,
    onSelect,
    onDelete,
    selectedId,
    totalCount,
}) {
    const handleExportCSV = () => {
        if (!categories.length) return;
        const headers = ['# المعرف', 'اسم الفئة', 'عدد المنتجات المرتبطة', 'تاريخ الإنشاء', 'آخر تحديث'];
        const rows = categories.map((c) => [
            c.id,
            `"${c.name}"`,
            c.products_count || 0,
            `"${formatDate(c.created_at)}"`,
            `"${formatDate(c.updated_at)}"`,
        ]);
        const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `categories_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="lg:col-span-8 flex flex-col bg-surface-container-lowest rounded-lg shadow-sm">
            {/* شريط الفلتر والبحث */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-surface-container-low/50">
                <div className="relative flex-1 min-w-[240px]">
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                        search
                    </span>
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-9 pr-9 pl-3 bg-surface-container-lowest rounded text-[12px] text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary placeholder:text-outline border-none"
                        placeholder="البحث باسم الفئة أو المعرف..."
                        type="text"
                    />
                </div>
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        className="flex items-center gap-1 px-3 py-1.5 bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant rounded text-[11px] font-semibold shadow-xs transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">filter_list</span>
                        <span>الأحدث تحديثاً</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleExportCSV}
                        className="flex items-center gap-1 px-3 py-1.5 bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant rounded text-[11px] font-semibold shadow-xs transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">file_download</span>
                        <span>تصدير ملف</span>
                    </button>
                </div>
            </div>

            {/* جدول الفئات */}
            <div className="overflow-x-auto w-full">
                <table className="w-full text-right border-collapse">
                    <thead>
                        <tr className="bg-surface-container-low text-on-surface-variant text-[11px] font-semibold">
                            <th className="py-2.5 px-3"># المعرف</th>
                            <th className="py-2.5 px-3">اسم الفئة</th>
                            <th className="py-2.5 px-3 text-center">عدد المنتجات المرتبطة</th>
                            <th className="py-2.5 px-3">تاريخ الإنشاء</th>
                            <th className="py-2.5 px-3">آخر تحديث</th>
                            <th className="py-2.5 px-3 text-left">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container text-[12px]">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-outline">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                                        <span>جارٍ تحميل الفئات...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : categories.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-outline">
                                    لا توجد فئات مطابقة للبحث
                                </td>
                            </tr>
                        ) : (
                            categories.map((cat, idx) => {
                                const isSelected = selectedId === cat.id;
                                const count = cat.products_count || 0;

                                return (
                                    <tr
                                        key={cat.id}
                                        onClick={() => onSelect(cat)}
                                        className={`cursor-pointer hover:bg-surface-container-low transition-colors ${
                                            isSelected
                                                ? 'bg-surface-container-low/60'
                                                : idx === 0 && !selectedId
                                                ? 'bg-surface-container-low/30'
                                                : ''
                                        }`}
                                    >
                                        <td className="py-2.5 px-3 font-semibold text-outline">
                                            {cat.id}
                                        </td>
                                        <td className="py-2.5 px-3">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`w-2 h-2 rounded-full ${
                                                        count > 400
                                                            ? 'bg-secondary'
                                                            : count > 0
                                                            ? 'bg-secondary-container'
                                                            : 'bg-outline-variant'
                                                    }`}
                                                ></span>
                                                <span className="font-semibold text-on-surface text-[15px]">
                                                    {cat.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-2.5 px-3 text-center">
                                            {count > 400 ? (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] bg-secondary-fixed text-on-secondary-fixed font-bold">
                                                    {count} منتج
                                                </span>
                                            ) : count > 0 ? (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] bg-surface-container-high text-on-surface font-semibold">
                                                    {count} منتج
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] bg-surface-container text-outline font-semibold">
                                                    0 منتج
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-2.5 px-3 text-outline">
                                            {formatDate(cat.created_at)}
                                        </td>
                                        <td className="py-2.5 px-3 text-on-surface-variant">
                                            {formatDate(cat.updated_at)}
                                        </td>
                                        <td className="py-2.5 px-3 text-left">
                                            <div
                                                className="inline-flex items-center gap-1"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <button
                                                    onClick={() => onSelect(cat)}
                                                    className="p-1 hover:bg-surface-container text-on-surface-variant hover:text-primary rounded transition-colors"
                                                    title="تعديل السجل"
                                                >
                                                    <span className="material-symbols-outlined text-base">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => onDelete(cat)}
                                                    className="p-1 hover:bg-error-container text-error rounded transition-colors"
                                                    title="حذف الفئة"
                                                >
                                                    <span className="material-symbols-outlined text-base">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* الترقيم والعدد */}
            <div className="flex items-center justify-between px-3 py-2.5 bg-surface-container-low/40 text-[11px] font-semibold text-on-surface-variant">
                <span>
                    عرض 1 إلى {categories.length} من أصل {totalCount || categories.length} سجلات
                </span>
                <div className="flex items-center gap-1">
                    <span className="px-2 py-0.5 bg-surface-container rounded text-primary font-bold">
                        الصفحة 1 من 1
                    </span>
                </div>
            </div>
        </div>
    );
}