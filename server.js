var http = require('http');
//const { url, url } = require('inspector');
var url = require('url');


http.createServer(function (req, res){
    
    /*         
    var part = req.url.split('?');
    var url_path = part[0];
    var query_string = '';
    query_string = part[1];
    var parameter = query_string.split('&');
    */

var data = url.parse(req.url, true);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello CAMT\n' + data.query.id + data.query.item +'\n');
}).listen(8080);
console.log('Server running on port 8080.');

