var http = require('http');
var url = require('url');

const { loadStock, saveStock, fill, sell, check, clear, remove, search } = require('./inventory_template');

loadStock();

http.createServer(function(req, res) {

    var request_path = url.parse(req.url, true);
    var message = '';
    var status = 200
    var data = ''

    switch (request_path.pathname) {
        case '/fill':
            try {
                fill(request_path.query.item, parseInt(request_path.query.quantity))
                message += `${request_path.query.item} ${request_path.query.quantity}`
                console.log(`เติมสินค้าชื่อ = ${request_path.query.item} จำนวน = ${request_path.query.quantity}`) 
            } catch (err) {
                status = 400;
                message += err
                console.log(err)
            }
            break;

        case '/sell':
            try {
                sell(request_path.query.item, parseInt(request_path.query.quantity))
                message += 'sell' + request_path.query.quantity + ' ' + request_path.query.item;
                console.log(`ขายสินค้าชื่อ = ${request_path.query.item} จำนวน = ${request_path.query.quantity}`)
            } catch (err) {
                status = 400;
                message += err
                console.log(err)
            }
            break;

        case '/check':
            try {
                let qtt = check(request_path.query.item)
                message += 'We have' + qtt + 'of' + request_path.query.item
                console.log(`มีสินค้า ${request_path.query.item} ใน stock จำนวน = ${qtt}`) 
            } catch (err) {
                status = 400;
                message += err
                console.log(err)
            }
            break;

        case '/clear':
            try {
                clear(request_path.query.item)
                message += 'We Clear' + request_path.query.item
                console.log(`We Clear ${request_path.query.item}`) 
            } catch (err) {
                status = 400;
                message += err
                console.log(err)
            }
            break;

        case '/remove':
            try {
                remove(request_path.query.item)
                message += `${request_path.query.item} Removed`
                console.log(`${request_path.query.item} ลบสำเร็จ`)
            } catch (err) {
                status = 400;
                message += err
                console.log(err)
            }
            break;
        case '/search': 
            try{
            let show =  search(request_path.query.name)
            message += `found ${show[0]} item(s) `
            data += JSON.stringify(show[1])
            }catch(err){
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
    let access_log = (new Date()).toISOString() + `${request_path.path}\n`;

    fs.appendFile('access.log',access_log, (err) => {
        if(err) {
            throw err;
            console.log(err)
    
        }
      
    })

    let response_object ={
        status: status, 
        message: message
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response_object));

}).listen(8082);
console.log('Inventory system is running on port 8082.');