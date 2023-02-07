const http = require('http');

//Create local server with response message in JSON
http
    .createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });

        if (req.url === '/products') {
            res.end(JSON.stringify({
                message: 'Products route'
            }));
        }

        if (req.url === '/users') {
            res.end(JSON.stringify({
                message: 'Users route'
            }));
        }

        res.end(JSON.stringify({
            message: 'Another route'
        }));
    })
    .listen(4001, () => console.log("Servidor está rodando na porta 4001"));