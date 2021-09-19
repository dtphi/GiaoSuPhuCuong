<?php

namespace App\Models;

use DB;
use App\Models\GiaoHat;
use App\Http\Common\Tables;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GiaoXu extends BaseModel
{
	public function giaoHat()
	{
		return $this->hasOne(GiaoHat::class, $this->primaryKey, 'giao_hat_id');
	}

  /**
   * @var string
   */
  protected $table = DB_PREFIX . 'giao_xus';
  protected $fillable = [
    'name',
    'giao_hat_id',
    'dia_chi',
    'dien_thoai',
    'email',
		'image',
    'active',
    'dan_so',
    'so_tin_huu',
    'gio_le',
    'viet',
    'latin',
    'noi_dung',
    'type',
    'update_user'
  ];

  public function getNoiDungAttribute($value)
  {
      return htmlspecialchars_decode($value);
  }
}
