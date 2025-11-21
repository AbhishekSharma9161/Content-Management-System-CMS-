<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MediaUploadRequest;
use App\Http\Resources\MediaResource;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of media files.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Media::latest();

        // Filter by file type if requested
        if ($request->has('type')) {
            $type = $request->get('type');
            if ($type === 'image') {
                $query->where('mime_type', 'like', 'image/%');
            } elseif ($type === 'document') {
                $query->where('mime_type', 'not like', 'image/%');
            }
        }

        // Search functionality
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('original_name', 'like', "%{$search}%")
                  ->orWhere('filename', 'like', "%{$search}%");
            });
        }

        $media = $query->paginate($request->get('per_page', 20));

        return response()->json([
            'data' => MediaResource::collection($media->items()),
            'meta' => [
                'current_page' => $media->currentPage(),
                'last_page' => $media->lastPage(),
                'per_page' => $media->perPage(),
                'total' => $media->total(),
            ]
        ]);
    }

    /**
     * Upload a new media file.
     */
    public function upload(MediaUploadRequest $request): JsonResponse
    {
        $file = $request->file('file');
        
        // Generate unique filename
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        
        // Store file in public disk
        $path = $file->storeAs('media', $filename, 'public');
        
        // Create media record
        $media = Media::create([
            'filename' => $filename,
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'path' => $path,
        ]);

        return response()->json([
            'data' => new MediaResource($media),
            'message' => 'File uploaded successfully'
        ], 201);
    }

    /**
     * Display the specified media file.
     */
    public function show(Media $media): JsonResponse
    {
        return response()->json([
            'data' => new MediaResource($media)
        ]);
    }

    /**
     * Remove the specified media file.
     */
    public function destroy(Media $media): JsonResponse
    {
        // Delete the file from storage
        if (Storage::disk('public')->exists($media->path)) {
            Storage::disk('public')->delete($media->path);
        }

        // Delete the database record
        $media->delete();

        return response()->json([
            'message' => 'Media file deleted successfully'
        ]);
    }
}