<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Permission::create([
        //     'user_id' => "99",
        //     'role_id' => "1",
        //     'role_type' => "admin",
        // ]);
        
        $permissions = [
            [   
                'id' => 1,
                'user_id' => 1,
                'role_id' => 1,
                'role_type' => 'admin',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'id' => 2,
                'user_id' => 2,
                'role_id' => 2,
                'role_type' => 'dac_member',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'id' => 3,
                'user_id' => 3,
                'role_id' => 3,
                'role_type' => 'advertiser',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        ];

        foreach($permissions as $permission){
            Permission::create($permission);
        }
       
    }
}
