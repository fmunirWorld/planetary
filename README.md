# planetary Project
Bench-marking popular Web Frameworks for Microservices. planetary demonstration project is comprised of:
* a NGINX reverse proxy server
* Microservices written in Django, Flask and Spring Boot
* MS SQL Server databases for each Microservice
## Setup

### Pre-requisites
Install [Docker CE](https://docs.docker.com/install/) on your favourite platform. [Docker Compose](https://docs.docker.com/compose/) will be installed automatically. Make sure you have the latest version of [Compose](https://docs.docker.com/compose/install/).
### Building and Running planetary
Run in this directory:
```
docker-compose up --build -d
```
It will build the image for each service and run their containers.
