<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = Post::published()->get();

        $comments = [
            [
                'author_name' => 'Alice Johnson',
                'author_email' => 'alice@example.com',
                'content' => 'Great article! Very informative and well-written.',
                'approved' => true,
            ],
            [
                'author_name' => 'Bob Williams',
                'author_email' => 'bob@example.com',
                'content' => 'Thanks for sharing this. Looking forward to more content like this.',
                'approved' => true,
            ],
            [
                'author_name' => 'Charlie Brown',
                'author_email' => 'charlie@example.com',
                'content' => 'This needs approval before showing.',
                'approved' => false,
            ],
        ];

        foreach ($posts as $post) {
            foreach ($comments as $commentData) {
                Comment::create([
                    'post_id' => $post->id,
                    'author_name' => $commentData['author_name'],
                    'author_email' => $commentData['author_email'],
                    'content' => $commentData['content'],
                    'approved' => $commentData['approved'],
                ]);
            }
        }
    }
}
