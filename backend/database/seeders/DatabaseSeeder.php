<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(1)->create();

        // \App\Models\User::factory()->create([
        //     'first_name' => 'Le',
        //     'last_name' => 'Le',
        //     'email' => 'test@example.com',
        //     'password' => 'test@example.com',
        // ]);
        $this->call([
            UserSeeder::class,
            PermissionSeeder::class,
        ]);
    }
}
