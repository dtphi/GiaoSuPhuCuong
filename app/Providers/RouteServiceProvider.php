<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    protected $namespace = 'App\Http\Controllers';
    /**
     * The path to the "home" route for your application.
     *
     * This is used by Laravel authentication to redirect users after login.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * The controller namespace for the application.
     *
     * When present, controller route declarations will automatically be prefixed with this namespace.
     *
     * @var string|null
     */
    // protected $namespace = 'App\\Http\\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function (Request $request) {
            $rEnv = config('app.env');
            $rPath = 'rout' . 'es' . '/' . 'ap' . 'i.' . $rEnv . '.php';
            if ($request->is('ap' . 'i*')) {
                Route::prefix('ap' . 'i')
            
                    ->middleware('ap' . 'i')
                    ->namespace($this->namespace)
                    ->group(base_path($rPath));

                if ($request->is('ap' . 'i/m' . 'm' . 'edia*')) {
                    $this->configurationRouteMmUpload();
                }
            } else {
                if ($request->is('ad' . 'min' . '*')) {
                    $rPath = 'rout' . 'es' . '/' . 'ad' . 'min.' . $rEnv . '.php';
                    Route::middleware('ad' . 'min')
                        ->namespace($this->namespace)
                        ->group(base_path($rPath));
                } else {
                    $rPath = 'rout' . 'es' . '/' . 'we' . 'b.php';
                    Route::middleware('we' . 'b')
                        ->namespace($this->namespace)
                        ->group(base_path($rPath));
                }
            }
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('ap' . 'i', function (Request $request) {
            return Limit::perMinute(60)->by(optional($request->user())->id ?: $request->ip());
        });
    }

    /**
     * Configure the route upload file for the application.
     *
     * @return void
     */
    protected function configurationRouteMmUpload()
    {
        $rPath = 'rout' . 'es' . '/' . 'fil' . 'esy' . 'stem.php';
        Route::middleware('ap' . 'i')
            ->namespace($this->namespace)
            ->group(base_path($rPath));
    }
}
