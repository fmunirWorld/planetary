FROM php:7.3-fpm-stretch

RUN apt-get update -y && apt-get install -y libmcrypt-dev openssl

RUN pecl install mcrypt && docker-php-ext-enable mcrypt

RUN docker-php-ext-install pdo mbstring

RUN apt-get install -y zip unzip gnupg gnupg2

RUN apt-get -y update && apt-get -y install apt-transport-https ca-certificates

# Begin of mandatory layers for Microsoft ODBC Driver 17 for Linux
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/9/prod.list > \
    /etc/apt/sources.list.d/mssql-release.list
RUN apt-get -y update && ACCEPT_EULA=Y apt-get install -y msodbcsql17 unixodbc-dev
# End of mandatory layers for Microsoft ODBC Driver 17 for Linux

RUN pecl install sqlsrv pdo_sqlsrv

RUN echo extension=pdo_sqlsrv.so >> `php --ini | \
    grep "Scan for additional .ini files" | \
    sed -e "s|.*:\s*||"`/30-pdo_sqlsrv.ini

RUN echo extension=sqlsrv.so >> `php --ini | \
    grep "Scan for additional .ini files" | \
    sed -e "s|.*:\s*||"`/20-sqlsrv.ini

RUN curl -sS https://getcomposer.org/installer | \
    php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

COPY . .

RUN composer install --optimize-autoloader --no-dev

ENTRYPOINT [ "php", "artisan", "serve", "--host=0.0.0.0", "--port=9000" ]
