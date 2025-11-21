<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the posts.
     */
    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Post::class);

        $query = Post::with('user')->latest();

        // Filter by published status if requested
        if ($request->has('published')) {
            $query->where('published', $request->boolean('published'));
        }

        // Search functionality
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $posts = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'data' => PostResource::collection($posts->items()),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ]
        ]);
    }

    /**
     * Store a newly created post.
     */
    public function store(StorePostRequest $request): JsonResponse
    {
        $this->authorize('create', Post::class);

        $validated = $request->validated();
        
        // Extract categories and tags
        $categories = $validated['categories'] ?? [];
        $tags = $validated['tags'] ?? [];
        unset($validated['categories'], $validated['tags']);

        $post = $request->user()->posts()->create($validated);

        // Attach categories and tags
        if (!empty($categories)) {
            $post->categories()->sync($categories);
        }
        if (!empty($tags)) {
            $post->tags()->sync($tags);
        }

        // Clear cache
        \Cache::forget('dashboard_stats');

        return response()->json([
            'data' => new PostResource($post->load(['user', 'categories', 'tags'])),
            'message' => 'Post created successfully'
        ], 201);
    }

    /**
     * Display the specified post.
     */
    public function show(Post $post): JsonResponse
    {
        $this->authorize('view', $post);

        return response()->json([
            'data' => new PostResource($post->load('user'))
        ]);
    }

    /**
     * Update the specified post.
     */
    public function update(UpdatePostRequest $request, Post $post): JsonResponse
    {
        $this->authorize('update', $post);

        $validated = $request->validated();
        
        // Extract categories and tags
        $categories = $validated['categories'] ?? [];
        $tags = $validated['tags'] ?? [];
        unset($validated['categories'], $validated['tags']);

        $post->update($validated);

        // Sync categories and tags
        if (isset($request->categories)) {
            $post->categories()->sync($categories);
        }
        if (isset($request->tags)) {
            $post->tags()->sync($tags);
        }

        // Clear cache
        \Cache::forget('dashboard_stats');

        return response()->json([
            'data' => new PostResource($post->load(['user', 'categories', 'tags'])),
            'message' => 'Post updated successfully'
        ]);
    }

    /**
     * Remove the specified post.
     */
    public function destroy(Post $post): JsonResponse
    {
        $this->authorize('delete', $post);

        $post->delete();

        // Clear cache
        \Cache::forget('dashboard_stats');

        return response()->json([
            'message' => 'Post deleted successfully'
        ]);
    }

    /**
     * Toggle the published status of the post.
     */
    public function publish(Post $post): JsonResponse
    {
        $this->authorize('publish', $post);

        $post->update(['published' => !$post->published]);

        return response()->json([
            'data' => new PostResource($post->load('user')),
            'message' => $post->published ? 'Post published successfully' : 'Post unpublished successfully'
        ]);
    }
}