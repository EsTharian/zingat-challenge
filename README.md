# Zingat Challenge

<p>A simple app about tokenized file serving.</p>

## Requirements
It's a Docker project. So, you need Docker with CLI. If you are a Linux user, be sure about you are in `docker` user-group ([how-to](https://docs.docker.com/install/linux/linux-postinstall/)). Also, it's using `docker-compose`, be sure about you have this package in your system.

## Using
First, download and initialize the project with:
```bash
git clone https://github.com/EsTharian/zingat-challenge.git;
cd zingat-challenge/laradock-custom;
cp env-example .env;
docker-compose up -d nginx mariadb phpmyadmin redis workspace;
docker-compose exec --user=laradock workspace bash;
```
You are now in the container. You could execute below without errors:
```bash
composer install;
npm install && npm run dev;
cp .env-example .env
php artisan migrate:refresh --seed;
```

## Browsing
Now, everything should be ready. 

Go to http://localhost/home for browse with below:
```
Email: tahaayan@gmail.com
Password: password
```
You can look at `phpmyadmin` from http://localhost:8080 with below:
```
Server: mariadb
Username: default
Password: secret
```

## Testing
You can test the app with Postman. The Postman Collection and Postman Environment files are in the root directory of the project. 

For once, you must edit `api_token` environmental variable which you can take it from http://localhost/home after login.
