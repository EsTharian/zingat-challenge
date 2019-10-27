<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Redirect;

class Token
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(! $request->user()) return abort(403, 'logged-out');
        elseif ($request->user()->api_token_expires < now()) return abort(403, 'token-expired');
        return $next($request);
    }
}
