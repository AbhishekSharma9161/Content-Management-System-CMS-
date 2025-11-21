<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', config('app.name', 'Laravel CMS'))</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="@yield('description', 'A modern content management system built with Laravel')">
    <meta name="keywords" content="@yield('keywords', 'cms, laravel, blog, content management')">
    <meta name="author" content="@yield('author', config('app.name'))">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="@yield('og_title', '@yield('title', config('app.name'))')">
    <meta property="og:description" content="@yield('og_description', '@yield('description', 'A modern content management system built with Laravel')')">
    <meta property="og:type" content="@yield('og_type', 'website')">
    <meta property="og:url" content="{{ url()->current() }}">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="@yield('twitter_title', '@yield('title', config('app.name'))')">
    <meta name="twitter:description" content="@yield('twitter_description', '@yield('description', 'A modern content management system built with Laravel')')">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Custom Styles -->
    <style>
        body {
            font-family: 'Figtree', sans-serif;
        }
        .navbar-brand {
            font-weight: 600;
        }
        .post-card {
            transition: transform 0.2s;
        }
        .post-card:hover {
            transform: translateY(-2px);
        }
        footer {
            background-color: #f8f9fa;
            margin-top: auto;
        }
        .min-vh-100 {
            display: flex;
            flex-direction: column;
        }
        main {
            flex: 1;
        }
    </style>
    
    @stack('styles')
</head>
<body class="min-vh-100">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="{{ route('home') }}">
                {{ config('app.name', 'Laravel CMS') }}
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('home') ? 'active' : '' }}" href="{{ route('home') }}">
                            Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('blog.*') ? 'active' : '' }}" href="{{ route('blog.index') }}">
                            Blog
                        </a>
                    </li>
                    @foreach(\App\Models\Page::published()->get() as $page)
                        <li class="nav-item">
                            <a class="nav-link {{ request()->is($page->slug) ? 'active' : '' }}" href="{{ route('page.show', $page->slug) }}">
                                {{ $page->title }}
                            </a>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="py-4">
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="py-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>{{ config('app.name', 'Laravel CMS') }}</h5>
                    <p class="text-muted">A modern content management system built with Laravel.</p>
                </div>
                <div class="col-md-6">
                    <h6>Quick Links</h6>
                    <ul class="list-unstyled">
                        <li><a href="{{ route('home') }}" class="text-decoration-none">Home</a></li>
                        <li><a href="{{ route('blog.index') }}" class="text-decoration-none">Blog</a></li>
                        @foreach(\App\Models\Page::published()->take(3)->get() as $page)
                            <li><a href="{{ route('page.show', $page->slug) }}" class="text-decoration-none">{{ $page->title }}</a></li>
                        @endforeach
                    </ul>
                </div>
            </div>
            <hr>
            <div class="text-center text-muted">
                <p>&copy; {{ date('Y') }} {{ config('app.name', 'Laravel CMS') }}. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    @stack('scripts')
</body>
</html>