<?php

namespace App\Http\Resources\Settings;

use Illuminate\Http\Resources\Json\ResourceCollection;

class SettingCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $results = [];
        
        return [
            'results' => $this->collection,
            'errors'  => [],
            'status'  => 1000
        ];
    }
}
