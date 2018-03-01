var http = require('http');

http
     .createServer(function(request, responce){
     	responce.writeHead(200, {"Content-Type":"text/plain"});
     	responce.write("hello");
     	responce.end();
     })
     .listener(2017)