<?php

namespace App\Models;

use App\Http\Common\Tables;
use DB;
use Illuminate\Database\Eloquent\SoftDeletes;

class Information extends BaseModel
{
    use SoftDeletes;

    /**
     * @var string
     */
    protected $table = DB_PREFIX . 'informations';

    /**
     * @var string
     */
    protected $primaryKey = 'information_id';

    /**
     * @author : dtphi .
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function infoDes()
    {
        return $this->hasOne(InformationDescription::class, $this->primaryKey);
    }

    /**
     * @author : dtphi .
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function relateds()
    {
        return $this->hasMany(InformationRelated::class, $this->primaryKey);
    }

    /**
     * @author : dtphi .
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function categories()
    {
        return $this->hasMany(InformationToCategory::class, $this->primaryKey);
    }

    /**
     * @author : dtphi .
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function images()
    {
        return $this->hasMany(InformationImage::class, $this->primaryKey);
    }

    /**
     * @author : dtphi .
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function downloads()
    {
        return $this->hasMany(InformationToDownload::class, $this->primaryKey);
    }

    /**
     * @author : dtphi .
     * @param $value
     * @return mixed
     */
    public function getImageAttribute($value)
    {
        return $value;
    }

    /**
     * @author : dtphi .
     * @param $value
     * @return mixed
     */
    public function getDateAvailableAttribute($value)
    {
        return $value;
    }

    /**
     * @author : dtphi .
     * @param $value
     * @return int
     */
    public function getSortOrderAttribute($value)
    {
        return (int)$value;
    }

    /**
     * @author : dtphi .
     * @param $value
     * @return int
     */
    public function getViewedAttribute($value)
    {
        return (int)$value;
    }

    /**
     * @author : dtphi .
     * @param $value
     * @return int
     */
    public function getStatusAttribute($value)
    {
        return (int)$value;
    }

    /**
     * @author : dtphi .
     * @param $value
     * @return string
     */
    public function getNameAttribute($value)
    {
        $value = ($this->infoDes) ? $this->infoDes->name : '';

        return $value;
    }

    /**
     * @author : dtphi .
     * @param $value
     * @return string
     */
    public function getDescriptionAttribute($value)
    {
        $value = ($this->infoDes) ? $this->infoDes->description : '';

        return $value;
    }

    /**
     * @author : dtphi .
     * @param $value
     * @return string
     */
    public function getMetaTitleAttribute($value)
    {
        $value = ($this->infoDes) ? $this->infoDes->meta_title : '';

        return $value;
    }

    /**
     * @author : dtphi .
     * @param $value
     * @return string
     */
    public function getMetaDescriptionAttribute($value)
    {
        $value = ($this->infoDes) ? $this->infoDes->meta_description : '';

        return $value;
    }

    /**
     * @author : dtphi .
     * @param $value
     * @return string
     */
    public function getTagAttribute($value)
    {
        $value = ($this->infoDes) ? $this->infoDes->tag : '';

        return $value;
    }

    /**
     * @author : dtphi .
     * @param $value
     * @return string
     */
    public function getMetaKeywordAttribute($value)
    {
        $value = ($this->infoDes) ? $this->infoDes->meta_keyword : '';

        return $value;
    }

    /**
     * @author : dtphi .
     * @param $value
     * @return array
     */
    public function getArrRelatedListAttribute($value)
    {
        $relateds = [];
        if ($this->relateds) {
            foreach ($this->relateds as $related) {
                $relateds[] = (int)$related->related_id;
            }
        }

        return $relateds;
    }

    /**
     * @author : dtphi .
     * @param $value
     * @return array
     */
    public function getArrImageListAttribute($value)
    {
        $value = [];
        if ($this->images) {
            foreach ($this->images as $image) {
                $value[] = [
                    'image'      => $image->image,
                    'sort_order' => (int)$image->sort_order
                ];
            }
        }

        return $value;
    }

    /**
     * @author : dtphi .
     * @param $value
     * @return array
     */
    public function getArrDownloadListAttribute($value)
    {
        $value = [];
        if ($this->downloads) {
            foreach ($this->downloads as $download) {
                $value[] = (int)$download->download_id;
            }
        }

        return $value;
    }

    /**
     * @author : dtphi .
     * @param $value
     * @return array
     */
    public function getArrCategoryListAttribute($value)
    {
        $value = [];
        if ($this->categories) {
            foreach ($this->categories as $category) {
                $value[] = (int)$category->category_id;
            }
        }

        return $value;
    }

    /**
     * @author : dtphi .
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'image',
        'date_available',
        'sort_order',
        'status',
        'viewed'
    ];

    /**
     * @author : dtphi .
     * @param $value
     * @return string
     */
    public function getGroupNameAttribute($value)
    {
        if (is_null($this->group)) {
            return ucfirst($value);
        }

        return ucfirst($this->group->newsgroupname);
    }

    /**
     * @author : dtphi .
     * @param $query
     * @param string $alias
     * @return mixed
     */
    public function scopeLjoinDescription($query, $alias = '')
    {
        if (empty($alias)) {
            $alias = Tables::$information_descriptions;
        }

        return $query->leftJoin(Tables::$information_descriptions . ' AS ' . $alias, $this->table . '.information_id',
            '=',
            $alias . '.information_id');
    }
}
