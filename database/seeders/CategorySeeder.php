<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $cats = [
            ['name' => 'إلكترونيات ولوحات تحكم', 'count' => 428],
            ['name' => 'مستشعرات وقياس', 'count' => 184],
            ['name' => 'كابلات وتوصيلات', 'count' => 315],
            ['name' => 'قطع غيار ميكانيكية', 'count' => 390],
            ['name' => 'مواد تعبئة وتغليف', 'count' => 165],
            ['name' => 'هيدروليك وضغط', 'count' => 0],
        ];

        foreach ($cats as $c) {
            $cat = Category::firstOrCreate(['name' => $c['name']]);
            $needed = $c['count'] - $cat->products()->count();
            if ($needed > 0) {
                $now = now();
                $products = [];
                for ($i = 1; $i <= $needed; $i++) {
                    $products[] = [
                        'category_id' => $cat->id,
                        'name' => $cat->name.' صنف '.$i,
                        'barcode' => null,
                        'cost_price' => rand(10, 500),
                        'sale_price' => rand(15, 750),
                        'quantity' => rand(5, 100),
                        'min_quantity' => 5,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];
                    if (count($products) >= 100) {
                        Product::insert($products);
                        $products = [];
                    }
                }
                if (! empty($products)) {
                    Product::insert($products);
                }
            }
        }
    }
}
