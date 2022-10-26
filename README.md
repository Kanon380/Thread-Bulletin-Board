# Guide

## Docker command

### Build command
```sh
docker-compose build
```

### Start up command
```sh
docker-compose up -d
```

### Container command
```sh
docker-compose exec web bash
```

### Stop command
```sh
docker-compose down
```

### Check command
```sh
docker-compose ps
```

### Compose all delete command
```sh
docker-compose down --rmi all --volumes --remove-orphans
```

## Laravel command

### Laravel install
```sh
composer create-project --prefer-dist laravel/laravel _project_name_
exit
docker-compose down
docker-compose.yml→./server/_Folder_name_:/var/www/html
docker-compose up -d
docker-compose exec web bash
composer install
npm i
```

### env
```env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=root
```

### Laravel breeze
```sh
composer require laravel/breeze --dev
php artisan breeze:install react
npm install
npm run dev
php artisan migrate
```

### logger
```sh
chown www-data storage/ -R
```

### cache clear
```sh
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Migration, Factory, Seeder, Policy, Controller and FormRequest
```sh
php artisan make:model _ModelName_ --all
```

### Seeder
```sh
php artisan make:seeder UserSeeder
```
#### ModelSeeder.php
```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
  public function run(){
    DB::table('users')->insert([
      'name' => Str::random(10),
      'email' => Str::random(10).'@example.com',
      'password' => Hash::make('password'),
    ]);
  }
}
```
#### DatabaseSeeder.php
```php
<?php

public function run()
{
  $this->call([
    UserSeeder::class,
    PostSeeder::class,
  ]);
}
```
#### Execute seeder
```sh
php artisan db:seed
```
```sh
php artisan db:seed --class=UserSeeder
```
```sh
php artisan migrate:fresh --seed
```
