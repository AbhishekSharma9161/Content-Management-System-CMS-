@extends('layouts.app')

@section('title', 'Blog - ' . config('app.name'))
@section('description', 'Browse all our blog posts and discover interesting content.')

@section('content')
<div class="container">
    <!-- Page Header -->
    <div class="row mb-4">
        <div class="col-md-8">
            <h1>Blog</h1>
            <p class="lead text-muted">Discover our latest posts and insights</p>
        </div>
        <div class="col-md-4">
            <!-- Search Form -->
            <form method="GET" action="{{ route('blog.index') }}" class="d-flex">
                <input 
                    type="search" 
                    name="search" 
                    class="form-control me-2" 
                    placeholder="Search posts..." 
                    value="{{ request('search') }}"
                >
                <button class="btn btn-outline-primary" type="submit">Search</button>
            </form>
        </div>
    </div>

    @if(request('search'))
        <div class="row mb-3">
            <div class="col-12">
                <div class="alert alert-info">
                    <strong>Search Results for:</strong> "{{ request('search') }}" 
                    ({{ $posts->total() }} {{ Str::plural('result', $posts->total()) }})
                    <a href="{{ route('blog.index') }}" class="btn btn-sm btn-outline-secondary ms-2">Clear Search</a>
                </div>
            </div>
        </div>
    @endif

    @if($posts->count() > 0)
        <!-- Posts Grid -->
        <div class="row">
            @foreach($posts as $post)
                <div class="col-md-6 col-lg-4 mb-4">
                    <article class="card post-card h-100 shadow-sm">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">
                                <a href="{{ route('blog.show', $post->slug) }}" class="text-decoration-none">
                                    {{ $post->title }}
                                </a>
                            </h5>
                            <p class="card-text text-muted flex-grow-1">
                                {{ Str::limit(strip_tags($post->content), 150) }}
                            </p>
                            <div class="mt-auto">
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">
                                        By {{ $post->user->name }}
                                    </small>
                                    <small class="text-muted">
                                        {{ $post->created_at->format('M j, Y') }}
                                    </small>
                                </div>
                                <div class="mt-2">
                                    <a href="{{ route('blog.show', $post->slug) }}" class="btn btn-primary btn-sm">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            @endforeach
        </div>

        <!-- Pagination -->
        @if($posts->hasPages())
            <div class="row mt-4">
                <div class="col-12">
                    <nav aria-label="Blog pagination">
                        {{ $posts->appends(request()->query())->links() }}
                    </nav>
                </div>
            </div>
        @endif
    @else
        <div class="row">
            <div class="col-12">
                <div class="alert alert-info text-center">
                    @if(request('search'))
                        <h4>No posts found</h4>
                        <p>No posts match your search criteria. Try different keywords or <a href="{{ route('blog.index') }}">browse all posts</a>.</p>
                    @else
                        <h4>No posts yet!</h4>
                        <p>Check back soon for new content.</p>
                    @endif
                </div>
            </div>
        </div>
    @endif
</div>

@push('styles')
<style>
    .post-card {
        border: none;
        transition: all 0.3s ease;
    }
    .post-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.15) !important;
    }
    .card-title a {
        color: #333;
    }
    .card-title a:hover {
        color: #0d6efd;
    }
</style>
@endpush
@endsection