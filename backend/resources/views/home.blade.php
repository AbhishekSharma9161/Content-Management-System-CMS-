@extends('layouts.app')

@section('title', 'Home - ' . config('app.name'))
@section('description', 'Welcome to our blog. Discover the latest posts and insights.')

@section('content')
<div class="container">
    <!-- Hero Section -->
    <div class="row mb-5">
        <div class="col-12">
            <div class="jumbotron bg-primary text-white p-5 rounded">
                <h1 class="display-4">Welcome to {{ config('app.name') }}</h1>
                <p class="lead">Discover amazing content, insights, and stories from our community.</p>
                <a class="btn btn-light btn-lg" href="{{ route('blog.index') }}" role="button">
                    Explore All Posts
                </a>
            </div>
        </div>
    </div>

    <!-- Latest Posts Section -->
    <div class="row mb-5">
        <div class="col-12">
            <h2 class="mb-4">Latest Posts</h2>
        </div>
    </div>

    @if($posts->count() > 0)
        <div class="row">
            @foreach($posts as $post)
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card post-card h-100 shadow-sm">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">
                                <a href="{{ route('blog.show', $post->slug) }}" class="text-decoration-none">
                                    {{ $post->title }}
                                </a>
                            </h5>
                            <p class="card-text text-muted flex-grow-1">
                                {{ Str::limit(strip_tags($post->content), 120) }}
                            </p>
                            <div class="mt-auto">
                                <small class="text-muted">
                                    By {{ $post->user->name }} • {{ $post->created_at->format('M j, Y') }}
                                </small>
                                <div class="mt-2">
                                    <a href="{{ route('blog.show', $post->slug) }}" class="btn btn-primary btn-sm">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="row mt-4">
            <div class="col-12 text-center">
                <a href="{{ route('blog.index') }}" class="btn btn-outline-primary">
                    View All Posts
                </a>
            </div>
        </div>
    @else
        <div class="row">
            <div class="col-12">
                <div class="alert alert-info text-center">
                    <h4>No posts yet!</h4>
                    <p>Check back soon for new content.</p>
                </div>
            </div>
        </div>
    @endif
</div>

@push('styles')
<style>
    .jumbotron {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .post-card {
        border: none;
        transition: all 0.3s ease;
    }
    .post-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
    }
</style>
@endpush
@endsection