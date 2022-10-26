<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 1; $i <= 4; $i++){
            \App\Models\User::create([
                'name' => 'user_'.$i,
                'email' => 'example+'.$i.'@example.com',
                'password' => Hash::make('password'),
            ]);
        }
    }
}
