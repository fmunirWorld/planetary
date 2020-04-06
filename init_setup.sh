#!/bin/sh 
#
# init_setup - DB Migrations Script
#
# The following script does:
#   o Create a database for each of the applications.
#   o Run database migrations.
# 
# Author: fmunirworld.github.io
#

#
# Create databases
#
C1=`(docker ps -qf "name=planetary_mssql-server_1")`
if [ ! -z "$C1" ]; then
    docker exec -i $C1 bash <<EOF
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Alizar457 -Q "
CREATE DATABASE fl_planetary;
CREATE DATABASE dj_planetary;
CREATE DATABASE sb_planetary;
CREATE DATABASE ex_planetary;
CREATE DATABASE lr_planetary;
GO"
echo 'SQL Server all databases created.'
EOF
else
    echo 'SQL Server service is not running...'
fi

#
# Run database migrations for Flask app
#
C2=`(docker ps -qf "name=planetary_flask_1")`
if [ ! -z "$C2" ]; then
    docker exec -i $C2 bash <<EOF
flask db_create
echo 'Flask database migrations success.'
EOF
else
    echo 'Flask service is not running...'
fi

#
# Run database migrations for Django app
#
C3=`(docker ps -qf "name=planetary_django_1")`
if [ ! -z "$C3" ]; then
    docker exec -i $C3 bash <<EOF
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
echo 'Django database migrations success.'
EOF
else
    echo 'Django service is not running...'
fi

#
# Run database migrations for Express app
#
C4=`(docker ps -qf "name=planetary_express_1")`
if [ ! -z "$C4" ]; then
    docker exec -i $C4 bash <<EOF
npx sequelize-cli db:migrate --env production
echo 'Express database migrations success.'
EOF
else
    echo 'Express service is not running...'
fi

#
# Run database migrations for Laravel app
#
C5=`(docker ps -qf "name=planetary_laravel_1")`
if [ ! -z "$C5" ]; then
    docker exec -i $C5 bash <<EOF
php artisan migrate
echo 'Laravel database migrations success.'
EOF
else
    echo 'Laravel service is not running...'
fi

#
# Note: Migrations for Spring Boot app will be initialized automatically by Hibernate/JPA.
#