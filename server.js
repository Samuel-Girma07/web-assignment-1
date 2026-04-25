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
        if (req.method === 'POST' && req.url === '/api/movies') {
            await addMovie(req, res, body);
        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Route not found' }));
        }
    });
});

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

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
