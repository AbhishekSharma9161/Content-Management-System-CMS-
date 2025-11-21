<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            ['name' => 'Laravel', 'slug' => 'laravel'],
            ['name' => 'React', 'slug' => 'react'],
            ['name' => 'PHP', 'slug' => 'php'],
            ['name' => 'JavaScript', 'slug' => 'javascript'],
            ['name' => 'Tutorial', 'slug' => 'tutorial'],
            ['name' => 'Guide', 'slug' => 'guide'],
            ['name' => 'Tips', 'slug' => 'tips'],
            ['name' => 'News', 'slug' => 'news'],
        ];

        foreach ($tags as $tag) {
            Tag::create($tag);
        }
    }
}
