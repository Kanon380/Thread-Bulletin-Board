<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ThreadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 1; $i <= 4; $i++){
            \App\Models\Thread::create([
                'user_id' => $i,
                'title' => 'thread_'.$i,
            ]);
        }
    }
}
