var http = require('http');
var url = require('url');

const { loadStock, saveStock, fill, sell, check, clear, remove } = require('./inventory_template');

loadStock();

http.createServer(function(req, res) {

    var request_path = url.parse(req.url, true);
    var body = '';

    switch (request_path.pathname) {
        case '/fill':
            try {
                fill(request_path.query.item, parseInt(request_path.query.quantity))
                body += `${request_path.query.item} ${request_path.query.quantity}`
            } catch (err) {
                body += err
                console.log(err)
            }
            break;

        case '/sell':
            try {
                sell(request_path.query.item, parseInt(request_path.query.quantity))
                body += 'sell' + request_path.query.quantity + ' ' + request_path.query.item;
            } catch (err) {
                body += err
                console.log(err)
            }
            break;

        case '/check':
            try {
                let qtt = check(request_path.query.item)
                body += 'We have' + qtt + 'of' + request_path.query.item
            } catch (err) {
                body += err
                console.log(err)
            }
            break;

        case '/clear':
            try {
                clear(request_path.query.item)
                body += 'We Clear' + request_path.query.item
            } catch (err) {
                body += err
                console.log(err)
            }
            break;

        case '/remove':
            try {
                remove(request_path.query.item)
                body += `${request_path.query.item} Removed`
            } catch (err) {
                body += err
                console.log(err)
            }
            break;

    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(body);

}).listen(8082);
console.log('Inventory system is running on port 8082.');