import React from 'react';

export default function DeleteModal({ category, onConfirm, onCancel }) {
    const hasProducts = (category.products_count || 0) > 0;

    return (
        <div className="fixed inset-0 bg-inverse-surface/40 z-50 flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-xl max-w-md w-full p-4 shadow-xl flex flex-col gap-3 border border-outline-variant/30">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-2xl">warning</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-[18px] font-bold text-on-surface">تأكيد حذف الفئة</h3>
                        <p className="text-[12px] text-on-surface-variant">
                            هل أنت متأكد من رغبتك في حذف الفئة <strong>"{category.name}"</strong> (معرف الفئة: {category.id}) نهائياً من قاعدة البيانات؟
                        </p>
                    </div>
                </div>

                {hasProducts && (
                    <div className="p-2 bg-error-container/40 rounded flex items-center gap-1.5 text-on-error-container text-[11px] font-semibold">
                        <span className="material-symbols-outlined text-base shrink-0">block</span>
                        <span>
                            تحذير: هذه الفئة مرتبطة بـ <strong>{category.products_count}</strong> منتج نشط. لا يُسمح بالحذف المباشر حتى نقل المنتجات.
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-1 border-t border-surface-container">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface text-[13px] rounded transition-colors font-medium"
                    >
                        إلغاء العملية
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={hasProducts}
                        className="px-4 py-2 bg-error hover:bg-error/90 text-on-error text-[13px] rounded font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        نعم، حذف الفئة
                    </button>
                </div>
            </div>
        </div>
    );
}