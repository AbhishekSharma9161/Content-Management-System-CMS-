<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Technology', 'slug' => 'technology', 'description' => 'Tech news and tutorials'],
            ['name' => 'Business', 'slug' => 'business', 'description' => 'Business insights and strategies'],
            ['name' => 'Lifestyle', 'slug' => 'lifestyle', 'description' => 'Lifestyle tips and trends'],
            ['name' => 'Travel', 'slug' => 'travel', 'description' => 'Travel guides and experiences'],
            ['name' => 'Food', 'slug' => 'food', 'description' => 'Recipes and food reviews'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
