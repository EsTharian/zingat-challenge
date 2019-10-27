<?php

namespace App\Http\Controllers;

use App\Documents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function newApiToken() {
        $token = Str::random(60);
        auth()->user()->api_token = $token;
        auth()->user()->api_token_expires = now()->addMinutes(5);
        auth()->user()->save();
        return $token;
    }

    public function expireToken() {
        auth()->user()->api_token_expires = now()->subMinutes(5);
        auth()->user()->save();
    }

    public function getApiToken() {
        return auth()->user()->api_token;
    }

    public function getApiTokenExpires() {
        return auth()->user()->api_token_expires;
    }

    public function getTokenizedFile($doc_id, Documents $documents) {
        $doc = $documents->select('name')->where('id', $doc_id)->first();
        $response = response(File::get(storage_path('app/docs/'.$doc->name)));
        $response->header("Content-Type", File::mimeType(storage_path('app/docs/'.$doc->name)));
        return $response;
    }

    public function getFileNames(Documents $documents) {
        $doc = $documents->all()->toArray();
        return response()->json($doc);
    }
}
