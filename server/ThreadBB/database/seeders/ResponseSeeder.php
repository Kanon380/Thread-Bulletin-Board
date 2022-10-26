<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResponseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 1; $i <= 4; $i++){
            \App\Models\Response::create([
                'user_id' => $i,
                'thread_id' => $i,
                'content' => 'response_'.$i,
            ]);
        }
    }
}
