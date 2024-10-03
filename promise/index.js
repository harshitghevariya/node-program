const http = require('http');

const getResponse = (path) => {
    return new Promise((resolve, reject) => {
        if (path === '/') {
            resolve('<h1>Welcome to http server<h1>')
        } else if (path === '/aboutt') {
            resolve('<h1>This is about page</h1>')
        }else if (path === '/contact'){
            resolve('<h1>This is a contact page</h1>')
        } else {
            reject(new Error('404 Not Found'));
        }
    });
};

http.createServer(async (req, res) => {
    try {
        const contactResponse = await getResponse(req.url);
        res.writeHead(200, { 'Content-Type': 'text/txt' });
        res.end(JSON.stringify(contactResponse), 'utf-8');
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/txt' });

        res.end("404 - Not Found");
    }
}).listen(3000);