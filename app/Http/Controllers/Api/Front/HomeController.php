<?php

namespace App\Http\Controllers\Api\Front;

use App\Exceptions\HandlerMsgCommon;
use App\Http\Controllers\Api\Front\Base\ApiController as Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\Front\Services\Contracts\HomeModel as HomeSv;

class HomeController extends Controller
{
    /**
     * @var string
     */
    protected $resourceName = 'home';

    /**
     * @var HomeSv|null
     */
    private $homeSv = null;

    /**
     * @author : dtphi .
     * HomeController constructor.
     * @param HomeSv $homeSv
     * @param array $middleware
     */
    public function __construct(HomeSv $homeSv, array $middleware = [])
    {
        $this->homeSv = $homeSv;
        parent::__construct($middleware);
    }

    /**
     * [getServiceContext:  ]
     * @return [type] [description]
     */
    public function getServiceContext() {
        return $this->homeSv;
    }

    public function index()
    {
        $bannerPath = config('app.asset_url') . '/upload/home_banners';
        
        try {
            $pageLists = [
                [
                    'sort' => 0,
                    'img' => $bannerPath . '/news_banner.jpeg',
                    'href' => '/tin-tuc',
                    'title' => '>>>> XEM TIN TỨC'
                ],
                [
                    'sort' => 1,
                    'img' => $bannerPath . '/loi_chua_banner.jpeg',
                    'href' => '/',
                    'title' => '>>>> LỜI CHÚA'
                ],
                [
                    'sort' => 2,
                    'img' => $bannerPath . '/video_banner.jpg',
                    'href' => '/video',
                    'title' => '>>>> VIDEO'
                ],
                [
                    'sort' => 3,
                    'img' => $bannerPath . '/audio_podcast_banner.jpeg',
                    'href' => '/',
                    'title' => '>>>> AUDIO/PODCAST'
                ],
                [
                    'sort' => 4,
                    'img' => $bannerPath . '/linh_muc_banner.jpeg',
                    'href' => '/',
                    'title' => '>>>> DANH SÁCH LINH MỤC'
                ],
                [
                    'sort' => 5,
                    'img' => $bannerPath . '/gx_chanh_toa_banner.jpeg',
                    'href' => '/',
                    'title' => '>>>> GIÁO XỨ TRONG GIÁO PHẬN'
                ],
                [
                    'sort' => 6,
                    'img' => $bannerPath . '/thong_bao_banner.jpeg',
                    'href' => '/',
                    'title' => '>>>> THÔNG BÁO'
                ],
                [
                    'sort' => 7,
                    'img' => $bannerPath . '/phung_vu_banner.jpg',
                    'href' => '/',
                    'title' => '>>>> PHỤNG VỤ'
                ]      
            ];
        } catch (HandlerMsgCommon $e) {
            throw $e->render();
        }

        return response()->json([
            'pageLists' => $pageLists
        ]);
    }
}
