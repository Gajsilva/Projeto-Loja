const http = require("http");

http
.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });

    if(request.url === "/produto");

    if(request.url === "/usuario");
    
})
.listen(4001, () => console.log("servidor na porta 4001"))