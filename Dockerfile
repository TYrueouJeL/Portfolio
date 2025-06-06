# Dockrfile
FROM php:8-alpine

# Installation des extensions PHP nécessaires pour Symfony
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    oniguruma-dev \
    icu-dev \
    && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    xml \
    gd \
    curl \
    intl \
    bcmath \
    opcache

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configuration PHP
RUN echo "memory_limit=512M" > /usr/local/etc/php/conf.d/memory-limit.ini \
    && echo "upload_max_filesize=64M" > /usr/local/etc/php/conf.d/upload.ini \
    && echo "post_max_size=64M" > /usr/local/etc/php/conf.d/upload.ini

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
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Configuration des permissions
RUN chown -R www-data:www-data /var/www/remiguerin.fr \
    && chmod -R 755 /var/www/remiguerin.fr \
    && chmod -R 775 /var/www/remiguerin.fr/var

# Nettoyage du cache Symfony
RUN php bin/console cache:clear --env=prod --no-debug

EXPOSE 9000

CMD ["php-fpm"]