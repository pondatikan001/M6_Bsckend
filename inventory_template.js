var fs = require('fs');

/// สร้างตัวแปรเก็บ stock สินค้า
var stock = new Map();

loadStock = () => {
    fs.readFile('stock.dat', function (err, filedata) {
        if(err) throw err;

        let stock_data = filedata.toString();
        let stock_lines = stock_data.split('\n');

        stock_lines.forEach((line) => {
            let dat = line.split(' ');
            if(dat[0]){
            stock.set(dat[0], parseInt(dat[1]));
            }
        })

        // โหลดเสร็จแล้ว แสดงผ่าน console ว่า stock มีอะไรบ้าง
        stock.forEach((value, key) => {
            console.log('We have ' + value + ' ' + key + '(s).');
        })
    });
};

saveStock = () => {
    let buffer = '';
    stock.forEach((value, key) => {
        if(key)
            buffer += key + " " + value + '\n';
    });
    fs.writeFile('stock.dat', buffer, function(err) {
        if(err) throw err;
    });
}

fill = (item, quantity) => {
    if(stock.has(item)){
        stock.set(item, stock.get(item) + quantity)
    } else {
        stock.set(item, quantity)
    }
    saveStock();
    return stock.get(item)
}

sell = (item,quantity) => {
    if(stock.has(item)){
        if(stock.get(item) >= quantity){
            stock.set(item, parseInt(stock.get(item)) - parseInt(quantity))
            
        }else{
            throw 'Error Stock of '+ item + 'is not enought'
        } 
    } else {
        throw 'Error There was no'+ item + 'is our store'
    }
    saveStock();
    return stock.get(item)
}

check = (item) => {
    if(stock.has(item)){
        return stock.get(item)    
    }else{
        throw 'Our store has no ' + item 
        return undefined
    }
}

clear = (item) => {
    let quantity = undefined
    if(stock.has(item)){
        quantity = stock.get(item)
        stock.set(item,0)
        saveStock();
        console.table(stock)
        return quantity
    }else{
        throw 'Our store has no' + item 
        return undefined
    }
}

remove = (item) => {
    if(stock.has(item)){
        stock.delete(item)
        saveStock();
        return stock.get(item)
    }else{
        throw 'Our store has no' + item 
        return undefined
    }
    
    
}

search = (name) => {
    let array = Array.from(stock, ([item, quantity]) => ({ item, quantity }));
    let answer=  array.filter(p => (p.item.includes(name)))
    console.table(answer)
    return [answer.length,answer]

   
}

odule.exports = {
    loadStock: loadStock,
    saveStock: saveStock,
    fill: fill,
    sell: sell,
    check: check,
    clear: clear,
    remove: remove,
    search:search
};