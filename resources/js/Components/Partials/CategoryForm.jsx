import React, { useState, useEffect } from 'react';

function formatDate(isoStr) {
    if (!isoStr) {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }
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

export default function CategoryForm({ category, onSubmit, onCancel, onDeleteRequest }) {
    const [name, setName] = useState('');
    const [saving, setSaving] = useState(false);

    const isEditMode = Boolean(category);

    useEffect(() => {
        setName(category ? category.name : '');
    }, [category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        setSaving(true);
        try {
            await onSubmit({ name: name.trim() });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="bg-surface-container-lowest rounded-lg shadow-sm p-3 flex flex-col gap-3">
                {/* رأس النموذج */}
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-xl">
                            {isEditMode ? 'edit_note' : 'add_circle'}
                        </span>
                        <span className="text-[15px] font-bold text-on-surface">
                            {isEditMode ? 'تعديل الفئة الحالية' : 'إضافة فئة جديدة'}
                        </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[11px] bg-surface-container text-primary font-bold">
                        {isEditMode ? `معرف الفئة: ${category.id}` : 'سجل جديد'}
                    </span>
                </div>

                {/* حقول النموذج */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-semibold text-on-surface flex items-center justify-between">
                            <span>
                                اسم الفئة <span className="text-error">*</span>
                            </span>
                            <span className="text-[11px] text-outline font-normal">نص</span>
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            type="text"
                            placeholder="اسم الفئة..."
                            className="h-9 px-3 bg-surface-container-lowest border border-outline-variant/60 rounded text-[13px] text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-all"
                        />
                        <span className="text-[12px] text-outline">
                            يجب أن يكون اسم الفئة فريداً وواضحاً لفرق المستودع.
                        </span>
                    </div>

                    {/* بيان المنتجات المرتبطة */}
                    <div className="p-2 bg-surface-container-low rounded flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary-container text-lg">
                                inventory
                            </span>
                            <div className="flex flex-col">
                                <span className="text-[11px] text-outline">المنتجات المرتبطة بهذه الفئة</span>
                                <span className="text-[15px] font-bold text-on-surface">
                                    {isEditMode
                                        ? `${category.products_count || 0} منتجاً في المخزون`
                                        : '0 منتجات (جديدة)'}
                                </span>
                            </div>
                        </div>
                        {isEditMode && (category.products_count || 0) > 0 && (
                            <button
                                type="button"
                                className="text-[11px] text-secondary hover:underline flex items-center gap-0.5"
                            >
                                <span>استعراض</span>
                                <span className="material-symbols-outlined text-xs">arrow_back</span>
                            </button>
                        )}
                    </div>

                    {/* قسم التواريخ */}
                    <div className="grid grid-cols-2 gap-1 p-2 bg-surface-container-low/40 rounded text-[12px]">
                        <div className="flex flex-col">
                            <span className="text-[11px] text-outline">تاريخ الإنشاء</span>
                            <span className="text-on-surface-variant font-medium mt-0.5">
                                {isEditMode ? formatDate(category.created_at) : formatDate()}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] text-outline">آخر تحديث</span>
                            <span className="text-on-surface-variant font-medium mt-0.5">
                                {isEditMode ? formatDate(category.updated_at) : formatDate()}
                            </span>
                        </div>
                    </div>

                    {/* شريط أزرار الإجراءات */}
                    <div className="flex items-center justify-between gap-1 pt-1 border-t border-surface-container mt-1">
                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                disabled={saving || !name.trim()}
                                className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-tertiary-container text-on-primary rounded text-[13px] font-semibold transition-colors shadow-xs disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-base">save</span>
                                <span>
                                    {saving
                                        ? 'جارٍ الحفظ...'
                                        : isEditMode
                                        ? 'حفظ التعديلات'
                                        : 'حفظ الفئة الجديدة'}
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-3 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface-variant rounded text-[13px] font-medium transition-colors"
                            >
                                إلغاء
                            </button>
                        </div>

                        {/* زر الحذف في وضع التعديل */}
                        {isEditMode && (
                            <button
                                type="button"
                                onClick={() => onDeleteRequest(category)}
                                className="flex items-center gap-1 p-2 text-error hover:bg-error-container/60 rounded text-[13px] transition-colors"
                                title="حذف الفئة المحددة"
                            >
                                <span className="material-symbols-outlined text-base">delete</span>
                                <span className="hidden sm:inline">حذف</span>
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* إرشاد تشغيلي */}
            <div className="p-2 bg-surface-container-low/60 rounded-lg flex items-start gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-outline text-lg mt-0.5">info</span>
                <div className="flex flex-col text-[12px] leading-snug">
                    <span className="font-semibold text-on-surface">قواعد تكامل البيانات</span>
                    <span className="text-outline mt-0.5">
                        لا يمكن حذف أي فئة ترتبط بمنتجات نشطة لمنع حدوث أخطاء الربط المرجعي. يجب نقل المنتجات أولاً.
                    </span>
                </div>
            </div>
        </div>
    );
}