<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    /**
     * عرض كل الفئات مع عدد المنتجات المرتبطة
     */
    public function index()
    {
        $categories = Category::withCount('products')
            ->orderBy('id', 'asc')
            ->get();

        $totalCategories = $categories->count();
        $totalProducts = $categories->sum('products_count');

        return response()->json([
            'categories' => $categories,
            'totalCategories' => $totalCategories,
            'totalProducts' => $totalProducts,
        ]);
    }

    /**
     * إضافة فئة جديدة
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name'],
        ], [
            'name.required' => 'اسم الفئة مطلوب.',
            'name.unique' => 'هذا الاسم موجود بالفعل.',
            'name.max' => 'الاسم طويل جداً.',
        ]);

        $category = Category::create($validated);

        return response()->json([
            'message' => 'تم إضافة الفئة بنجاح.',
            'category' => $category,
        ], 201);
    }

    /**
     * تعديل فئة موجودة
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories', 'name')->ignore($category->id),
            ],
        ], [
            'name.required' => 'اسم الفئة مطلوب.',
            'name.unique' => 'هذا الاسم موجود بالفعل.',
        ]);

        $category->update($validated);

        return response()->json([
            'message' => 'تم تحديث الفئة بنجاح.',
            'category' => $category->loadCount('products'),
        ]);
    }

    /**
     * حذف فئة
     */
    public function destroy(Category $category)
    {
        // منع الحذف لو فيه منتجات مرتبطة (Foreign Key Constraint)
        if ($category->products()->count() > 0) {
            return response()->json([
                'message' => 'لا يمكن حذف فئة مرتبطة بمنتجات نشطة.',
            ], 422);
        }

        $category->delete();

        return response()->json([
            'message' => 'تم حذف الفئة بنجاح.',
        ]);
    }
}
