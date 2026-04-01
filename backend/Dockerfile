FROM php:8.2-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libpq-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql redis

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /var/www

RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage

EXPOSE 9000
CMD ["php-fpm"]
