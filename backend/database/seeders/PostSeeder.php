<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $categories = Category::all();
        $tags = Tag::all();

        $posts = [
            [
                'title' => 'Getting Started with Laravel 12',
                'slug' => 'getting-started-with-laravel-12',
                'content' => '<p>Laravel 12 brings exciting new features and improvements. In this comprehensive guide, we\'ll explore the latest additions to the framework and how you can leverage them in your projects.</p><p>From enhanced performance to new developer tools, Laravel 12 continues to be the PHP framework of choice for modern web applications.</p>',
                'published' => true,
            ],
            [
                'title' => 'Building Modern UIs with React 18',
                'slug' => 'building-modern-uis-with-react-18',
                'content' => '<p>React 18 introduces concurrent rendering and automatic batching, making your applications faster and more responsive. Learn how to build stunning user interfaces with the latest React features.</p><p>We\'ll cover hooks, context API, and best practices for component architecture.</p>',
                'published' => true,
            ],
            [
                'title' => 'The Future of Web Development',
                'slug' => 'the-future-of-web-development',
                'content' => '<p>Web development is evolving rapidly. From serverless architectures to edge computing, discover the trends shaping the future of how we build for the web.</p><p>Stay ahead of the curve with insights into emerging technologies and methodologies.</p>',
                'published' => true,
            ],
            [
                'title' => 'Draft: Upcoming Features',
                'slug' => 'draft-upcoming-features',
                'content' => '<p>This is a draft post about upcoming features we\'re working on. Stay tuned for more updates!</p>',
                'published' => false,
            ],
        ];

        foreach ($posts as $index => $postData) {
            $post = Post::create([
                'title' => $postData['title'],
                'slug' => $postData['slug'],
                'content' => $postData['content'],
                'published' => $postData['published'],
                'user_id' => $users->random()->id,
            ]);

            // Attach random categories (1-2 per post)
            $post->categories()->attach(
                $categories->random(rand(1, 2))->pluck('id')
            );

            // Attach random tags (2-4 per post)
            $post->tags()->attach(
                $tags->random(rand(2, 4))->pluck('id')
            );
        }
    }
}
