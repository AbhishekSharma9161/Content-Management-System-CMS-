<?php

namespace Database\Seeders;

use App\Models\Media;
use Illuminate\Database\Seeder;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mediaFiles = [
            [
                'filename' => 'sample-image-1.jpg',
                'original_name' => 'Sample Image 1.jpg',
                'mime_type' => 'image/jpeg',
                'size' => 1024000,
                'path' => 'media/sample-image-1.jpg',
                'folder' => 'images',
            ],
            [
                'filename' => 'sample-image-2.jpg',
                'original_name' => 'Sample Image 2.jpg',
                'mime_type' => 'image/jpeg',
                'size' => 2048000,
                'path' => 'media/sample-image-2.jpg',
                'folder' => 'images',
            ],
            [
                'filename' => 'document-1.pdf',
                'original_name' => 'Document 1.pdf',
                'mime_type' => 'application/pdf',
                'size' => 512000,
                'path' => 'media/document-1.pdf',
                'folder' => 'documents',
            ],
        ];

        foreach ($mediaFiles as $media) {
            Media::create($media);
        }
    }
}
