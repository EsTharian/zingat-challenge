<?php

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
        factory(\App\User::class, 1)->create();
        foreach (\Illuminate\Support\Facades\File::allFiles(storage_path('app/docs')) as $key=>$doc) {
            DB::table('documents')->insert([
                'name' => $doc->getFilename(),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
