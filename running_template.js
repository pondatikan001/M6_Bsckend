var http = require('http');
var url = require('url');

const { loadStock, saveStock, fill, sell, check, clear, remove } = require('./inventory_template');

loadStock();

http.createServer(function(req, res) {

    var request_path = url.parse(req.url, true);
    var message = '';
    

    switch (request_path.pathname) {
        case '/fill':
            try {
                fill(request_path.query.item, parseInt(request_path.query.quantity))
                message += `${request_path.query.item} ${request_path.query.quantity}`
            } catch (err) {
                message += err
                console.log(err)
            }
            break;

        case '/sell':
            try {
                sell(request_path.query.item, parseInt(request_path.query.quantity))
                message += 'sell' + request_path.query.quantity + ' ' + request_path.query.item;
            } catch (err) {
                message += err
                console.log(err)
            }
            break;

        case '/check':
            try {
                let qtt = check(request_path.query.item)
                message += 'We have' + qtt + 'of' + request_path.query.item
            } catch (err) {
                message += err
                console.log(err)
            }
            break;

        case '/clear':
            try {
                clear(request_path.query.item)
                message += 'We Clear' + request_path.query.item
            } catch (err) {
                message += err
                console.log(err)
            }
            break;

        case '/remove':
            try {
                remove(request_path.query.item)
                message += `${request_path.query.item} Removed`
            } catch (err) {
                status = 400;
                message += err
                console.log(err)
            }
            break;
        default:
            status = 404;
            message = 'path not found!';
            break;

    }

    let response_object ={
        status: status, 
        message: message
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response_object));

}).listen(8082);
console.log('Inventory system is running on port 8082.');