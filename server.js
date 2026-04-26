const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const filePath = path.join(__dirname, 'data', 'movies.json');

const server = http.createServer((req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        if (req.method === 'GET' && req.url === '/api/movies') {
            await getAllMovies(req, res);
        }
        else if (req.method === 'GET' && req.url.startsWith('/api/movies/')) {
            const id = req.url.split('/')[3];
            await getMovieById(req, res, id);
        }
        else if (req.method === 'POST' && req.url === '/api/movies') {
            await addMovie(req, res, body);
        }
        else if (req.method === 'PUT' && req.url === '/api/update-movie') {
            await updateMovie(req, res, body);
        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Route not found' }));
        }
    });
});

async function getAllMovies(req, res) {
    const data = fs.readFileSync(filePath, 'utf-8');
    const movies = JSON.parse(data);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(movies));
}

async function getMovieById(req, res, id) {
    const data = fs.readFileSync(filePath, 'utf-8');
    const movies = JSON.parse(data);
    const movie = movies.find(m => m.id === parseInt(id));

    if (movie) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(movie));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Movie not found' }));
    }
}

async function addMovie(req, res, body) {
    const newMovie = JSON.parse(body);
    const data = fs.readFileSync(filePath, 'utf-8');
    const movies = JSON.parse(data);

    newMovie.id = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
    movies.push(newMovie);

    fs.writeFileSync(filePath, JSON.stringify(movies, null, 2));

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newMovie));
}

async function updateMovie(req, res, body) {
    const updatedMovie = JSON.parse(body);
    const data = fs.readFileSync(filePath, 'utf-8');
    let movies = JSON.parse(data);

    const index = movies.findIndex(m => m.id === updatedMovie.id);

    if (index !== -1) {
        movies[index] = { ...movies[index], ...updatedMovie };
        fs.writeFileSync(filePath, JSON.stringify(movies, null, 2));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(movies[index]));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Movie not found' }));
    }
}

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
