@extends('layouts.app')

@section('title', $page->title . ' - ' . config('app.name'))
@section('description', Str::limit(strip_tags($page->content), 160))
@section('keywords', 'page, ' . Str::slug($page->title))

@section('og_title', $page->title)
@section('og_description', Str::limit(strip_tags($page->content), 160))
@section('og_type', 'website')

@section('content')
<div class="container">
    <div class="row">
        <!-- Main Content -->
        <div class="col-lg-8 mx-auto">
            <article class="mb-5">
                <!-- Page Header -->
                <header class="mb-4 text-center">
                    <h1 class="display-4 fw-bold">{{ $page->title }}</h1>
                    @if($page->created_at != $page->updated_at)
                        <p class="text-muted">
                            Last updated: {{ $page->updated_at->format('F j, Y') }}
                        </p>
                    @endif
                </header>

                <!-- Page Content -->
                <div class="page-content">
                    {!! $page->content !!}
                </div>

                <!-- Page Footer -->
                <footer class="mt-5 pt-4 border-top">
                    <div class="row">
                        <div class="col-md-6">
                            <a href="{{ route('home') }}" class="btn btn-outline-primary">
                                ← Back to Home
                            </a>
                        </div>
                        <div class="col-md-6 text-md-end">
                            <p class="text-muted mb-0">
                                <strong>Last updated:</strong> {{ $page->updated_at->format('F j, Y') }}
                            </p>
                        </div>
                    </div>
                </footer>
            </article>
        </div>
    </div>
</div>

@push('styles')
<style>
    .page-content {
        font-size: 1.1rem;
        line-height: 1.7;
    }
    .page-content h1, .page-content h2, .page-content h3, 
    .page-content h4, .page-content h5, .page-content h6 {
        margin-top: 2rem;
        margin-bottom: 1rem;
        color: #333;
    }
    .page-content h2 {
        border-bottom: 2px solid #e9ecef;
        padding-bottom: 0.5rem;
    }
    .page-content p {
        margin-bottom: 1.5rem;
        text-align: justify;
    }
    .page-content img {
        max-width: 100%;
        height: auto;
        border-radius: 0.375rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 1rem 0;
    }
    .page-content blockquote {
        border-left: 4px solid #0d6efd;
        padding-left: 1.5rem;
        margin: 2rem 0;
        font-style: italic;
        color: #6c757d;
        background-color: #f8f9fa;
        padding: 1rem 1.5rem;
        border-radius: 0.375rem;
    }
    .page-content ul, .page-content ol {
        margin-bottom: 1.5rem;
        padding-left: 2rem;
    }
    .page-content li {
        margin-bottom: 0.5rem;
    }
    .page-content code {
        background-color: #f8f9fa;
        padding: 0.2rem 0.4rem;
        border-radius: 0.25rem;
        font-size: 0.9em;
        color: #e83e8c;
    }
    .page-content pre {
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 0.375rem;
        overflow-x: auto;
        border: 1px solid #dee2e6;
    }
    .page-content table {
        width: 100%;
        margin-bottom: 1.5rem;
        border-collapse: collapse;
    }
    .page-content table th,
    .page-content table td {
        padding: 0.75rem;
        border: 1px solid #dee2e6;
    }
    .page-content table th {
        background-color: #f8f9fa;
        font-weight: 600;
    }
</style>
@endpush
@endsection