FROM php:8.0.2-apache

COPY ./php/php.ini /usr/local/etc/php/
COPY ./apache/*.conf /etc/apache2/sites-enabled/

#Composer install
RUN apt-get update \
	&& apt-get install -y zlib1g-dev libpq-dev unzip libzip-dev make bash gcc libpng-dev vim \
	&& docker-php-ext-install zip pdo_mysql mysqli \
	&& rm -rf /var/lib/apt/lists/* \
	&& rm -rf /etc/apt/sources.list.d/* \
	&& apt-get update \
	&& apt-get remove cmdtest \
	&& apt-get update \
	&& curl -sL https://deb.nodesource.com/setup_14.x | bash - \
	&& apt-get install -y nodejs \
	&& npm install n -g \
	&& n 16.16.0 \
	&& echo 'alias ll="ls -l"' >> ~/.bashrc \
	&& php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
	&& php -r "if (hash_file('sha384', 'composer-setup.php') === 'a5c698ffe4b8e849a443b120cd5ba38043260d5c4023dbf93e1558871f1f07f58274fc6f4c93bcfd858c6bd0775cd8d1') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('    composer-setup.php'); } echo PHP_EOL;" \
	&& php composer-setup.php \
	&& php -r "unlink('composer-setup.php');" \
	&& mv composer.phar /usr/local/bin/composer \
	&& a2enmod rewrite \
	&& composer global require "laravel/installer"

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]

ENV COMPOSER_ALLOW_SUPERUSER 1

ENV COMPOSER_HOME /composer

ENV PATH $PATH:/composer/vendor/bin

WORKDIR /var/www/html
