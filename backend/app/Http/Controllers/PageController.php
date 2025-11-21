<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\View\View;

class PageController extends Controller
{
    /**
     * Display the specified page by slug.
     */
    public function show(string $slug): View
    {
        $page = Page::where('slug', $slug)->published()->firstOrFail();

        return view('page.show', compact('page'));
    }
}