@extends('layouts.app')

@section('title', $post->title . ' - ' . config('app.name'))
@section('description', Str::limit(strip_tags($post->content), 160))
@section('keywords', 'blog, post, ' . Str::slug($post->title))

@section('og_title', $post->title)
@section('og_description', Str::limit(strip_tags($post->content), 160))
@section('og_type', 'article')

@section('content')
<div class="container">
    <div class="row">
        <!-- Main Content -->
        <div class="col-lg-8">
            <article class="mb-5">
                <!-- Post Header -->
                <header class="mb-4">
                    <h1 class="display-5 fw-bold">{{ $post->title }}</h1>
                    <div class="text-muted mb-3">
                        <span>By <strong>{{ $post->user->name }}</strong></span>
                        <span class="mx-2">•</span>
                        <time datetime="{{ $post->created_at->toISOString() }}">
                            {{ $post->created_at->format('F j, Y') }}
                        </time>
                        @if($post->created_at != $post->updated_at)
                            <span class="mx-2">•</span>
                            <span>Updated {{ $post->updated_at->format('M j, Y') }}</span>
                        @endif
                    </div>
                </header>

                <!-- Post Content -->
                <div class="post-content">
                    {!! $post->content !!}
                </div>

                <!-- Post Footer -->
                <footer class="mt-5 pt-4 border-top">
                    <div class="row">
                        <div class="col-md-6">
                            <p class="text-muted mb-0">
                                <strong>Author:</strong> {{ $post->user->name }}
                            </p>
                        </div>
                        <div class="col-md-6 text-md-end">
                            <p class="text-muted mb-0">
                                <strong>Published:</strong> {{ $post->created_at->format('F j, Y') }}
                            </p>
                        </div>
                    </div>
                </footer>
            </article>

            <!-- Navigation -->
            <nav class="mb-5">
                <div class="row">
                    <div class="col-6">
                        <a href="{{ route('blog.index') }}" class="btn btn-outline-primary">
                            ← Back to Blog
                        </a>
                    </div>
                    <div class="col-6 text-end">
                        <a href="{{ route('home') }}" class="btn btn-outline-secondary">
                            Home
                        </a>
                    </div>
                </div>
            </nav>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4">
            <div class="sticky-top" style="top: 2rem;">
                <!-- Related Posts -->
                @if($relatedPosts->count() > 0)
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">Related Posts</h5>
                        </div>
                        <div class="card-body">
                            @foreach($relatedPosts as $relatedPost)
                                <div class="mb-3 {{ !$loop->last ? 'pb-3 border-bottom' : '' }}">
                                    <h6 class="mb-1">
                                        <a href="{{ route('blog.show', $relatedPost->slug) }}" class="text-decoration-none">
                                            {{ $relatedPost->title }}
                                        </a>
                                    </h6>
                                    <small class="text-muted">
                                        By {{ $relatedPost->user->name }} • {{ $relatedPost->created_at->format('M j, Y') }}
                                    </small>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endif

                <!-- Quick Links -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Quick Links</h5>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled mb-0">
                            <li class="mb-2">
                                <a href="{{ route('blog.index') }}" class="text-decoration-none">
                                    All Blog Posts
                                </a>
                            </li>
                            <li class="mb-2">
                                <a href="{{ route('home') }}" class="text-decoration-none">
                                    Home
                                </a>
                            </li>
                            @foreach(\App\Models\Page::published()->take(3)->get() as $page)
                                <li class="mb-2">
                                    <a href="{{ route('page.show', $page->slug) }}" class="text-decoration-none">
                                        {{ $page->title }}
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@push('styles')
<style>
    .post-content {
        font-size: 1.1rem;
        line-height: 1.7;
    }
    .post-content h1, .post-content h2, .post-content h3, 
    .post-content h4, .post-content h5, .post-content h6 {
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
    .post-content p {
        margin-bottom: 1.5rem;
    }
    .post-content img {
        max-width: 100%;
        height: auto;
        border-radius: 0.375rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .post-content blockquote {
        border-left: 4px solid #0d6efd;
        padding-left: 1rem;
        margin: 2rem 0;
        font-style: italic;
        color: #6c757d;
    }
    .post-content code {
        background-color: #f8f9fa;
        padding: 0.2rem 0.4rem;
        border-radius: 0.25rem;
        font-size: 0.9em;
    }
    .post-content pre {
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 0.375rem;
        overflow-x: auto;
    }
</style>
@endpush
@endsection