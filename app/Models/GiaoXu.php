<?php

namespace App\Models;

use DB;
use App\Models\GiaoHat;
use App\Http\Common\Tables;
use App\Http\Controllers\Api\Admin\Services\Contracts\LinhMucThuyenChuyenModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GiaoXu extends BaseModel
{
  use SoftDeletes;
  
	public function giaoHat()
	{
		return $this->hasOne(GiaoHat::class, $this->primaryKey, 'giao_hat_id');
	}

  public function giaohats()
	{
		return $this->belongsTo(GiaoHat::class);
	}

  public function linhmucs()
	{
		  return $this->hasMany(LinhMuc::class, 'giao_xu_id');
	}

  public function linhmucthuyenchuyens() {
      return $this->hasMany(LinhMucThuyenChuyen::class, 'giao_xu_id');
  }


  /**
   * @var string
   */
  protected $table = DB_PREFIX . 'giao_xus';

  protected $fillable = [
    'name',
    'ngay_thanh_lap',
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

  public function getTenGiaoHatAttribute($value) 
  {
    $value = ($this->giaoHat) ? $this->giaoHat->name : '';

    return $value;
  }

  public function scopeName($query, $request) {
      return  $query->where('name', 'LIKE', '%' . $request->input('query') . '%');   
  }
  
}
