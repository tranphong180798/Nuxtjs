<?php

namespace Database\Factories;

use App\Models\Model;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
               'name' => $this->faker->name,
               'content' => $this->faker->sentence,
               'price' => $this->faker->numberBetween($min=100000,$max=800000),
               'store' => $this->faker->numberBetween($min=10,$max=80),
               'country' => $this->faker->city,
               'image' => $this->faker->unique()->imageUrl($width = 200, $height = 200),

        ];
    }
}
