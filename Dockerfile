# Dockerfile
FROM php:8.2-fpm-alpine

# Installation des dépendances système nécessaires
RUN apk update && apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    oniguruma-dev \
    icu-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libzip-dev

# Configuration et installation des extensions PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    xml \
    gd \
    intl \
    bcmath \
    opcache \
    zip

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configuration PHP
RUN echo "memory_limit=512M" > /usr/local/etc/php/conf.d/memory-limit.ini \
    && echo "upload_max_filesize=64M" > /usr/local/etc/php/conf.d/upload.ini \
    && echo "post_max_size=64M" >> /usr/local/etc/php/conf.d/upload.ini

# Configuration OPCache pour la production
RUN echo "opcache.enable=1" > /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.memory_consumption=256" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.max_accelerated_files=20000" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.validate_timestamps=0" >> /usr/local/etc/php/conf.d/opcache.ini

# Définition du répertoire de travail
WORKDIR /var/www/remiguerin.fr

# Copie des fichiers du projet
COPY . /var/www/remiguerin.fr/

# Installation des dépendances Composer
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction

# Configuration des permissions
RUN chown -R www-data:www-data /var/www/remiguerin.fr \
    && chmod -R 755 /var/www/remiguerin.fr

# Création du répertoire var s'il n'existe pas et configuration des permissions
RUN mkdir -p /var/www/remiguerin.fr/var \
    && chmod -R 775 /var/www/remiguerin.fr/var \
    && chown -R www-data:www-data /var/www/remiguerin.fr/var

ENV APP_ENV=prod
ENV DATABASE_URL=mysql://temp:temp@db_host:3306/portfolio

EXPOSE 9000

CMD ["php-fpm"]