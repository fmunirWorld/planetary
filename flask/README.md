# planetary API written in Flask
A simple demo REST API written in Python's Flask, managing record of planets and their satellites.

## Database Schema
![ERD Diagram](https://www.lucidchart.com/publicSegments/view/b25ff479-b681-4d91-bfd3-b73a6f9dc3ab/image.png)

## Available Endpoints
planetary API comes with only two endpoints `/planets` and `/satellites` to perform basic CRUD operations.

### planets Endpoint
__1. List all the planets__
```HTTP
GET /planets
```
__2. Create a single planet__
```HTTP
POST /planets

Content-type: application/json
```
```JSON
{
	"planet_name": "Earth",
	"home_star": "Sol",
	"mass": 3.254e23,
	"radius": 2164,
	"distance": 354.98e6
}
```
__3. Get a single planet__
```HTTP
GET /planets/{planet_id}
```
__4. Get satellites of a single planet__
```HTTP
GET /planets/{planet_id}/satellites
```
__5. Update a single planet__
```HTTP
PUT /planets/{planet_id}

Content-type: application/json
```
```JSON
{
	"planet_name": "Earth",
	"home_star": "Sol",
	"mass": 3.254e23,
	"radius": 2164,
	"distance": 354.98e6
}
```
__6. Delete a single planet__
```HTTP
DELETE /planets/{planet_id}
```


### satellites Endpoint
__1. List all the satellites__
```HTTP
GET /satellites
```
__2. Create a single satellite__
```HTTP
POST /satellites

Content-type: application/json
```
```JSON
{
	"satellite_name": "Moon",
	"is_regular": true,
	"radius": 2.33e+32,
	"discovery_year": 1912,
	"planet": "/planets/{planet_id}"
}
```
__3. Get a single satellite__
```HTTP
GET /satellites/{satellite_id}
```
__4. Update a single satellite__
```HTTP
PUT /satellites/{satellite_id}

Content-type: application/json
```
```JSON
{
	"satellite_name": "Moon",
	"is_regular": true,
	"radius": 2.33e+32,
	"discovery_year": 1912,
	"planet": "/planets/{planet_id}"
}
```
__5. Delete a single satellite__
```HTTP
DELETE /satellites/{satellite_id}
```
