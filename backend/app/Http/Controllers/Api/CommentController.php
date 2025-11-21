<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    /**
     * Display comments for a post.
     */
    public function index(Post $post): JsonResponse
    {
        $comments = $post->comments()->latest()->paginate(20);

        return response()->json([
            'data' => $comments->items(),
            'meta' => [
                'current_page' => $comments->currentPage(),
                'last_page' => $comments->lastPage(),
                'per_page' => $comments->perPage(),
                'total' => $comments->total(),
            ]
        ]);
    }

    /**
     * Store a new comment (public endpoint).
     */
    public function store(Request $request, Post $post): JsonResponse
    {
        $validated = $request->validate([
            'author_name' => 'required|string|max:255',
            'author_email' => 'required|email|max:255',
            'content' => 'required|string',
        ]);

        $comment = $post->comments()->create($validated);

        return response()->json([
            'data' => $comment,
            'message' => 'Comment submitted successfully. It will be visible after approval.'
        ], 201);
    }

    /**
     * Approve a comment (admin only).
     */
    public function approve(Comment $comment): JsonResponse
    {
        $this->middleware('auth:sanctum');

        $comment->update(['approved' => true]);

        return response()->json([
            'data' => $comment,
            'message' => 'Comment approved successfully'
        ]);
    }

    /**
     * Delete a comment (admin only).
     */
    public function destroy(Comment $comment): JsonResponse
    {
        $this->middleware('auth:sanctum');

        $comment->delete();

        return response()->json([
            'message' => 'Comment deleted successfully'
        ]);
    }
}
