# planetary Project
Bench-marking popular Web Frameworks for Microservices. planetary demonstration project is comprised of:
* a NGINX reverse proxy server
* Microservices written in Django, Flask and Spring Boot
* MS SQL Server databases for each Microservice
## Setup

### Pre-requisites
Install [Docker CE](https://docs.docker.com/install/) on your favourite platform. [Docker Compose](https://docs.docker.com/compose/) will be installed automatically. Make sure you have the latest version of [Compose](https://docs.docker.com/compose/install/).
### Building and Running
Run in this directory:
```
docker-compose up --build -d
```
It will build the image for each service mentioned in `docker-compose.yml` file and run their containers in detached mode.
### Create databases
Once Docker build images completes and services are up & running, you need to create database for each application.
1. List all the running containers
```
docker ps
```
2. Attach to the container running MS SQL Server
```
docker exec -ti <container_id|container_name> bash
```
3. Connect to the SQL Server instance using `sqlcmd` utility
```
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Alizar457
```
4. From the **sqlcmd** command prompt, paste the following Transact-SQL command to create all three databases
```SQL
CREATE DATABASE fl_planetary;
CREATE DATABASE dj_planetary;
CREATE DATABASE sb_planetary;
GO
```
5. `QUIT` from **sqlcmd** command prompt and then `exit` SQL Server container.
### Run database migrations
1. Attach to the container running Flask app
```
docker exec -ti <container_id|container_name> bash
```
2. Run database migrations
```
flask db_create
```
3. `exit` Flask app container
4. Attach to the container running Django app
```
docker exec -ti <container_id|container_name> bash
```
5. Run database migrations
```
python manage.py makemigrations
python manage.py migrate
```
6. Collect static files
```
python manage.py collectstatic --noinput
```
7. `exit` Django app container
> Migrations for Spring Boot app will be initialized automatically by Hibernate/JPA.

## REST APIs
1. The URL for Flask app is: `http://localhost/flask`. Documentation for REST calls: [planetary API in Flask](flask/README.md)
2. The URL for Django app is: `http://localhost/django`. Documentation for REST calls: [planetary API in Django](django/README.md)
3. The URL for Spring Boot app is: `http://localhost/springboot`. Documentation for REST calls: [planetary API in Spring Boot](springboot/README.md)
