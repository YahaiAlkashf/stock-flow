import React from 'react';

export default function CategoryHeader({ categoriesCount, totalProductsCount, onAddNew }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
                {/* <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[#1d2b3e]">
                    <span className="material-symbols-outlined text-2xl">category</span>
                </div> */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">فئات وأقسام المنتجات</span>
                        <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 font-medium">
                            جدول الفئات
                        </span>
                    </div>
                    <p className="text-xs text-gray-500">إدارة وتصنيف الأصناف المخزنية وربطها بسجلات المنتجات</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-4 px-4 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex flex-col text-right">
                        <span className="text-xs text-gray-500">إجمالي الفئات المسجلة</span>
                        <span className="text-sm font-bold text-[#1d2b3e]">{categoriesCount} فئات</span>
                    </div>
                    <div className="w-px h-6 bg-gray-200"></div>
                    <div className="flex flex-col text-right">
                        <span className="text-xs text-gray-500">إجمالي المنتجات المصنفة</span>
                        <span className="text-sm font-bold text-blue-600">{totalProductsCount} صنف</span>
                    </div>
                </div>
                <button
                    onClick={onAddNew}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#1d2b3e] hover:bg-[#314156] text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
                >
                    <span>إضافة فئة جديدة</span>
                </button>
            </div>
        </div>
    );
}