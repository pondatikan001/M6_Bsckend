var http = require('http');
var url = require('url');
var stock = new Map();

stock.set('milk', 10);
stock.set('apple_juice', 10);
stock.set('egg', 10);
stock.set('salad', 10);

var fs = require('fs');
//const { Http2ServerRequest } = require('http2');

fs.readFile('stock.dat', function (err, filedata) {
    if(err) throw err;
    let stock_data = filedata.toString();
    var stock_lines = stock_data.split('\n');

    stock_lines.forEach((line) =>{
        let dat = line.split(' ');
        stock.set(dat[0], parseInt(dat[1]));
    })

    console.table(stock);
});

http.createServer(function (req, res){
    
    var request_path = url.parse(req.url, true);
    var body = '' //+ request_path.query.quanilty;
    
    switch(request_path.pathname){
        case '/fill':
          fill(request_path.query.item, parseInt(request_path.query.quanilty));
          body += 'filled';
          break;
    }

    res.writeHead(200, {'Content-Type': 'text/plain'});
    //res.end(JSON.stringify(stock));
    res.end(body);

}).listen(8080);

console.log('Sever runnong on port 8080.');


stock.forEach((value, key) => {
    console.log('We have' + value + ' ' + key+ '(s).');
})

saveStock = () =>{
    let buffer = '';
    stock.forEach((value, key) =>{
        buffer += key + " " + value + '\n';
    });
    fs.writeFile('stock.dat', buffer, function(err){
        if(err) throw err;
    });  
}


fill = (item,quanilty) =>{
    if(stock.has(item)){
        stock.set(item,  stock.get('item') + quanilty);
    }else{
        stock.set[item] = quanilty;
    }
    saveStock();
    console.table(stock);
        return stock.get(item);
}

sell = (item, quanilty) =>{
    if(stock.has(item)){
        if(stock.get(item) >= quanilty)
        stock.set(item, stock.get(item)- quanilty);
    else
        throw 'Error! Stock of' + item + 'is not enough!';
    }else{
        throw 'Error! there was no' + item + 'in our store!';
    }
}
   
check = (item) =>{
    if(stock.has(item)) {
        return stock.get(item);
        }else{
            throw 'Our store has no' + item;
            return undefined;
        }
}

clear = (item) =>{
    let quantity = undefined;
    if(stock.has(item)){
        quantity = stock.get(item);
        stock.set(item, 0);
        return quantity;
    } else {
        console.error('Our store has no' + item);
        return undefined;
    }
}

remove = (item) =>{
if(stock.has(item)){
    stock.delete(item);
    }
}

console.log(stock)