var http = require('http');

http.createServer(function (req, res) {
  var url = req.url.substr(1);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(url);
    res.end();
}).listen(8080);
