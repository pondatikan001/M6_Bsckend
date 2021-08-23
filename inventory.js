var http = require('http');
var url = require('url');
var stock = new Map();
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
    var body = ''; //+ request_path.query.quantity;
    switch(request_path.pathname){
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
    //res.end(JSON.stringify(stock));
    res.end(body);

}).listen(8082);

console.log('Sever running on port 8082.');


/*stock.forEach((value, key) => {
    console.log('We have' + value + ' ' + key+ '(s).');
})*/

saveStock = () =>{
    let buffer = '';
    stock.forEach((value, key) =>{
        buffer += key + " " + value + '\n';
    });
    fs.writeFile('stock.dat', buffer, function(err){
        if(err) throw err;
    });  
}


fill = (item,quantity) =>{
    if(stock.has(item)){
        stock.set(item,stock.get(item) + quantity);
    }else{
        stock.set(item , quantity);
    }
    saveStock();
    console.table(stock);
    return stock.get(item);
}

sell = (item, quantity) =>{
    if(stock.has(item)){
        if(stock.get(item) >= quantity)
        stock.set(item, stock.get(item)- quantity);
    else
        throw 'Error! Stock of' + item + 'is not enough!';
    }else{
        throw 'Error! there was no' + item + 'in our store!';
    }
    saveStock();
    console.table(stock);
    return stock.get(item);
}

   
check = (item) =>{
    if(stock.has(item)) {
        console.log('We have' + stock.get(item) + ' ' + item+ '(s).');
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
        saveStock();
        console.table(stock);
        console.log('Clear ' + item);
        return quantity;
    } else {
        console.error('Our store has no' + item);
        return undefined;
    }
}

remove = (item) =>{
if(stock.has(item)){
    stock.delete(item);
    saveStock();
    console.table(stock);
    console.log('Removed ' + item);
    }
}



console.log(stock)