<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('status');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->bigInteger('budget');
            $table->bigInteger('bid_amount');
            $table->string('title');
            $table->text('description');
            $table->binary('banner');
            $table->string('final_url');
            $table->integer('user_id');
            $table->boolean('soft_delete')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('campaigns');
    }
};
