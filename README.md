# Movie API

A simple REST API for managing movies, built with Node.js core modules and JSON file storage.

## Description

This project is a basic CRUD (Create, Read, Update, Delete) API for movies.  
It is built using only Node.js built-in modules and a JSON file as the data source.  
No external libraries or frameworks (such as Express) are used.  
The project was made for the Web II assignment.

## Technologies Used

- Node.js (CommonJS)
- Built-in modules: `http`, `fs`, `path`
- JSON file for data storage

## Folder Structure

```
movie-api/
├── server.js
├── data/
│   └── movies.json
└── README.md
```

## How to Run the Server

1. Make sure Node.js is installed on your computer.
2. Open a terminal inside the `movie-api` folder.
3. Run the following command:

```
node server.js
```

4. The server will start on:

```
http://localhost:3000
```

## API Endpoints

| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| GET    | /api/movies             | Get all movies                       |
| GET    | /api/movies/:id         | Get a single movie by id             |
| POST   | /api/movies             | Add a new movie                      |
| PUT    | /api/update-movie       | Update a movie (id from request body)|
| DELETE | /api/delete-movie/:id   | Delete a movie by id                 |

## Sample Requests and Responses

### 1. Get All Movies

**Request:**
```
GET /api/movies
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Inception",
    "director": "Christopher Nolan",
    "year": 2010,
    "genre": "Sci-Fi",
    "rating": 8.8,
    "review": "Mind-bending and visually stunning."
  }
]
```

### 2. Get One Movie by ID

**Request:**
```
GET /api/movies/1
```

**Response:**
```json
{
  "id": 1,
  "title": "Inception",
  "director": "Christopher Nolan",
  "year": 2010,
  "genre": "Sci-Fi",
  "rating": 8.8,
  "review": "Mind-bending and visually stunning."
}
```

### 3. Add a New Movie

**Request:**
```
POST /api/movies
Content-Type: application/json

{
  "title": "The Dark Knight",
  "director": "Christopher Nolan",
  "year": 2008,
  "genre": "Action",
  "rating": 9.0,
  "review": "Heath Ledger's Joker is unforgettable."
}
```

**Response:**
```json
{
  "id": 4,
  "title": "The Dark Knight",
  "director": "Christopher Nolan",
  "year": 2008,
  "genre": "Action",
  "rating": 9.0,
  "review": "Heath Ledger's Joker is unforgettable."
}
```

### 4. Update a Movie

**Request:**
```
PUT /api/update-movie
Content-Type: application/json

{
  "id": 1,
  "rating": 9.2,
  "review": "Even better on a second watch."
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Inception",
  "director": "Christopher Nolan",
  "year": 2010,
  "genre": "Sci-Fi",
  "rating": 9.2,
  "review": "Even better on a second watch."
}
```

### 5. Delete a Movie

**Request:**
```
DELETE /api/delete-movie/1
```

**Response:**
```json
{
  "message": "Movie deleted",
  "movie": {
    "id": 1,
    "title": "Inception",
    "director": "Christopher Nolan",
    "year": 2010,
    "genre": "Sci-Fi",
    "rating": 8.8,
    "review": "Mind-bending and visually stunning."
  }
}
```
