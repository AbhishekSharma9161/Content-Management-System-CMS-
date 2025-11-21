<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\CommentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Authentication routes
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

// Protected API routes
Route::middleware('auth:sanctum')->group(function () {
    // Posts routes
    Route::apiResource('posts', PostController::class);
    Route::patch('posts/{post}/publish', [PostController::class, 'publish']);
    
    // Pages routes
    Route::apiResource('pages', PageController::class);
    
    // Media routes
    Route::get('media', [MediaController::class, 'index']);
    Route::post('media/upload', [MediaController::class, 'upload']);
    Route::get('media/{media}', [MediaController::class, 'show']);
    Route::delete('media/{media}', [MediaController::class, 'destroy']);
    
    // Categories routes
    Route::apiResource('categories', CategoryController::class);
    
    // Tags routes
    Route::apiResource('tags', TagController::class);
    
    // Comments management routes (admin)
    Route::get('posts/{post}/comments', [CommentController::class, 'index']);
    Route::patch('comments/{comment}/approve', [CommentController::class, 'approve']);
    Route::delete('comments/{comment}', [CommentController::class, 'destroy']);
});

// Public comment submission
Route::post('posts/{post}/comments', [CommentController::class, 'store']);

// Dashboard stats route with caching
Route::middleware('auth:sanctum')->get('/dashboard/stats', function (Request $request) {
    // Cache stats for 5 minutes
    $stats = Cache::remember('dashboard_stats', 300, function () {
        return [
            'posts' => [
                'total' => \App\Models\Post::count(),
                'published' => \App\Models\Post::where('published', true)->count(),
                'draft' => \App\Models\Post::where('published', false)->count(),
            ],
            'pages' => [
                'total' => \App\Models\Page::count(),
                'published' => \App\Models\Page::where('published', true)->count(),
                'draft' => \App\Models\Page::where('published', false)->count(),
            ],
            'media' => [
                'total' => \App\Models\Media::count(),
            ],
            'categories' => [
                'total' => \App\Models\Category::count(),
            ],
            'tags' => [
                'total' => \App\Models\Tag::count(),
            ],
            'comments' => [
                'total' => \App\Models\Comment::count(),
                'pending' => \App\Models\Comment::where('approved', false)->count(),
                'approved' => \App\Models\Comment::where('approved', true)->count(),
            ],
        ];
    });

    return response()->json($stats);
});