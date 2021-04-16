<?php

namespace App\Models;

use App\Http\Common\Tables;
use DB;

class InformationImage extends BaseModel
{
    /**
     * @var string
     */
    protected $table = DB_PREFIX  . 'information_images';

    /**
     * @var string
     */
    protected $primaryKey = 'infomation_image_id';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'infomation_id',
        'image',
        'sort_order'
    ];

    public static function insertByInfoId($infoId = null, $image = '', $sortOrder = 0)
    {
        $infoId = (int)$infoId;

        if ($infoId && !empty($image)) {
            DB::insert('insert into ' . Tables::$information_images . ' (information_id, image, sort_order) values (?, ?, ?)', [
                $infoId, $image, $sortOrder
            ]);
        }
    }
}
