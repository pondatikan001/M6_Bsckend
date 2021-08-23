var http = require('http');
var url = require('url');

const {loadStock, saveStock, fill, sell, check, clear, remove} = require('./inventory');

loadStock();

http.createServer(function (req, res) {
    
    var request_path = url.parse(req.url, true);
    var body = '';

    switch(request_path.pathname) {
        case '/fill': 
            fill(request_path.query.item, parseInt(request_path.query.quantity));
            body += 'filled';
            break;

        case '/sell': 
            sell(request_path.query.item, parseInt(request_path.query.quantity));
            body += 'sell';
            break;

        case '/check':
            check(request_path.query.item);
            body += 'check';
            break;

        case '/clear': 
            clear(request_path.query.item);
            body += 'cleared!'
            break;

        case '/remove': 
            remove(request_path.query.item);
            body += 'remove'
            break;
    }

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(body);
    
}).listen(8080);
console.log('Inventory system is running on port 8080.');

