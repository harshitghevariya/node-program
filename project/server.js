const http = require("http")
const fs = require("fs")
const path = require("path")

const publicDir = path.resolve("/node","project","public")
console.log(publicDir)

http.createServer((request,response)=>{
    let filePath = path.join(publicDir,request.url === '/' ? 'index.html' : request.url)
    
    const extname = path.extname(filePath)

    let contentType = 'text/html';
    if(extname === '.js')contentType = 'text/javascript';
    if (extname === '.css') contentType = 'text/css';
    if (extname === '.json') contentType = 'application/json';
    if (extname === '.png') contentType = 'image/png';
    if (extname === '.jpg') contentType = 'image/jpg';
    if (extname === '.txt') contentType = 'text/txt';

    fs.readFile(filePath,(error,content)=>{
        if(error){
            if(error.code === "ENOENT"){
                console.log(error.code)
                response.writeHead(404,{ 'Content-Type': contentType });
                response.end('<h1>404 not found</h1>','utf-8');
            }else{
                response.writeHead(500)
                response.end('Server error: '+error.code)
            }
        }else{
            response.writeHead(200, { 'Content-Type': contentType })
            response.end(content)
        }
    })
}).listen(4000,()=>console.log("server start!"))