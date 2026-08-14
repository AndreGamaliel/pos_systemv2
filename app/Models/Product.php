<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// #[FIllable('category_id', 'name', 'description', 'price', 'image', 'stock', 'is_active')]

class Product extends Model
{
    //
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'price',
        'image',
        'stock',
        'is_active',
    ];
    protected function castable(): array
    {
        return [
            'price' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }
    public function category() : BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

}