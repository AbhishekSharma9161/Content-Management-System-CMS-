<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\View\View;

class HomeController extends Controller
{
    /**
     * Show the home page with latest posts.
     */
    public function index(): View
    {
        $posts = Post::with('user')
            ->published()
            ->latest()
            ->take(6)
            ->get();

        return view('home', compact('posts'));
    }
}