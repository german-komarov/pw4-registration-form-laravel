<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Gender;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'first_name'=>'John',
            'last_name'=>'Doe',
            'email'=>'superuser@example.com',
            'phone'=>'123456789',
            'password'=>'superpassword',
            'region_id'=>8,
            'address'=>'Some super address',
            'gender'=>'MALE'
        ]);
        // \App\Models\User::factory(10)->create();
    }
}
