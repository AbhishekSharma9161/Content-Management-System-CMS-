<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\Http\Resources\PageResource;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the pages.
     */
    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Page::class);

        $query = Page::latest();

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

        $pages = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'data' => PageResource::collection($pages->items()),
            'meta' => [
                'current_page' => $pages->currentPage(),
                'last_page' => $pages->lastPage(),
                'per_page' => $pages->perPage(),
                'total' => $pages->total(),
            ]
        ]);
    }

    /**
     * Store a newly created page.
     */
    public function store(StorePageRequest $request): JsonResponse
    {
        $this->authorize('create', Page::class);

        $page = Page::create($request->validated());

        return response()->json([
            'data' => new PageResource($page),
            'message' => 'Page created successfully'
        ], 201);
    }

    /**
     * Display the specified page.
     */
    public function show(Page $page): JsonResponse
    {
        $this->authorize('view', $page);

        return response()->json([
            'data' => new PageResource($page)
        ]);
    }

    /**
     * Update the specified page.
     */
    public function update(UpdatePageRequest $request, Page $page): JsonResponse
    {
        $this->authorize('update', $page);

        $page->update($request->validated());

        return response()->json([
            'data' => new PageResource($page),
            'message' => 'Page updated successfully'
        ]);
    }

    /**
     * Remove the specified page.
     */
    public function destroy(Page $page): JsonResponse
    {
        $this->authorize('delete', $page);

        $page->delete();

        return response()->json([
            'message' => 'Page deleted successfully'
        ]);
    }
}