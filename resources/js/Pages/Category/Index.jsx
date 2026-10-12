import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppLayout from '@/Layouts/AppLayout';
import CategoriesTable from '../../Components/Partials/CategoriesTable';
import CategoryForm from '../../Components/Partials/CategoryForm';
import DeleteModal from '../../Components/Partials/DeleteModal';

export default function Index() {
    const [categories, setCategories] = useState([]);
    const [totals, setTotals] = useState({ categories: 0, products: 0 });
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchCategories = async (keepSelection = false) => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/categories');
            const list = data.categories || [];
            setCategories(list);
            setTotals({
                categories: data.totalCategories ?? list.length,
                products: data.totalProducts ?? 0,
            });

            if (!keepSelection && list.length > 0) {
                // افتراضياً اختيار الفئة الأولى كما في الصورة
                setSelectedCategory(list[0]);
            } else if (keepSelection && selectedCategory) {
                const refreshed = list.find((c) => c.id === selectedCategory.id);
                setSelectedCategory(refreshed || list[0] || null);
            }
        } catch (error) {
            console.error('خطأ في جلب الفئات:', error);
            showToast('حدث خطأ أثناء تحميل الفئات', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const filteredCategories = categories.filter((cat) =>
        cat.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(cat.id).includes(searchQuery)
    );

    const handleSave = async (formData) => {
        try {
            if (selectedCategory && selectedCategory.id) {
                await axios.put(`/api/categories/${selectedCategory.id}`, formData);
                showToast('تم حفظ التعديلات بنجاح ✓');
            } else {
                await axios.post('/api/categories', formData);
                showToast('تمت إضافة الفئة بنجاح ✓');
            }
            await fetchCategories(true);
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'حدث خطأ أثناء حفظ الفئة';
            showToast(errorMsg, 'error');
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await axios.delete(`/api/categories/${deleteTarget.id}`);
            showToast(`تم حذف الفئة "${deleteTarget.name}" بنجاح ✓`);
            setDeleteTarget(null);
            await fetchCategories(false);
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'لا يمكن حذف هذه الفئة';
            showToast(errorMsg, 'error');
        }
    };

    return (
        <AppLayout>
            <div className="flex flex-col w-full font-['Cairo',sans-serif] p-3 gap-3 text-on-surface">
                {/* إشعار عائم Toast */}
                {toast && (
                    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-bounce">
                        <div
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-[13px] font-semibold text-white ${
                                toast.type === 'error' ? 'bg-error shadow-red-500/20' : 'bg-primary shadow-slate-900/20'
                            }`}
                        >
                            <span className="material-symbols-outlined text-base">
                                {toast.type === 'error' ? 'error' : 'check_circle'}
                            </span>
                            <span>{toast.message}</span>
                        </div>
                    </div>
                )}

                {/* ترويسة العمليات وشريط الإحصائيات */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-surface-container-lowest p-3 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-2xl">category</span>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-[18px] font-bold text-on-surface">
                                    فئات وأقسام المنتجات
                                </span>
                                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container text-on-surface-variant">
                                    الجدول الأساسي: الفئات
                                </span>
                            </div>
                            <p className="text-[12px] text-outline">
                                إدارة وتصنيف الأصناف المخزنية وربطها بسجلات المنتجات التشغيلية
                            </p>
                        </div>
                    </div>

                    {/* الإحصائيات العامة وزر الإضافة */}
                    <div className="flex items-center gap-2">
                        <div className="hidden md:flex items-center gap-4 px-3 py-1.5 bg-surface-container-low rounded-lg">
                            <div className="flex flex-col text-right">
                                <span className="text-[11px] font-semibold text-outline">
                                    إجمالي الفئات المسجلة
                                </span>
                                <span className="text-[15px] text-primary font-bold">
                                    {totals.categories} فئات
                                </span>
                            </div>
                            <div className="w-px h-6 bg-surface-container-highest"></div>
                            <div className="flex flex-col text-right">
                                <span className="text-[11px] font-semibold text-outline">
                                    إجمالي المنتجات المصنفة
                                </span>
                                <span className="text-[15px] text-secondary font-bold">
                                    {totals.products.toLocaleString()} صنف
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="flex items-center gap-1.5 px-3 py-2 bg-primary hover:bg-tertiary-container text-on-primary rounded-lg text-[13px] font-semibold transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined text-base">add_circle</span>
                            <span>إضافة فئة جديدة</span>
                        </button>
                    </div>
                </div>

                {/* تخطيط الصفحة: الجدول والنموذج */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                    {/* جدول الفئات (8 أعمدة) */}
                    <CategoriesTable
                        categories={filteredCategories}
                        loading={loading}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        onSelect={setSelectedCategory}
                        onDelete={setDeleteTarget}
                        selectedId={selectedCategory?.id}
                        totalCount={categories.length}
                    />

                    {/* نموذج الفئة والإرشادات (4 أعمدة) */}
                    <CategoryForm
                        category={selectedCategory}
                        onSubmit={handleSave}
                        onCancel={() => setSelectedCategory(null)}
                        onDeleteRequest={setDeleteTarget}
                    />
                </div>
            </div>

            {/* نافذة تأكيد الحذف */}
            {deleteTarget && (
                <DeleteModal
                    category={deleteTarget}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </AppLayout>
    );
}