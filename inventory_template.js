var fs = require('fs');

/// สร้างตัวแปรเก็บ stock สินค้า
var stock = new Map();
var fs = require('fs');

const {loadStock, saveStock, fill, sell, check, clear, remove} = require('./inventory_template');
loadStock = () => {
    fs.readFile('stock.dat', function (err, filedata) {
        if(err) throw err;

        let stock_data = filedata.toString();
        let stock_lines = stock_data.split('\n');

        stock_lines.forEach((line) => {
            let dat = line.split(' ');
            stock.set(dat[0], parseInt(dat[1]));
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
        stock.set(item,stock.get(item) + quantity);
    }else{
        stock.set(item , quantity);
    }
    saveStock();
    console.table(stock);
    return stock.get(item);
}

sell = (item, quantity) => {
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

check = (item) => {
    if(stock.has(item)) {
        console.log('We have' + stock.get(item) + ' ' + item+ '(s).');
        return stock.get(item);
        }else{
            throw 'Our store has no' + item;
            return undefined;
    }
}

clear = (item) => {
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

remove = (item) => {
    if(stock.has(item)){
        stock.delete(item);
        saveStock();
        console.table(stock);
        console.log('Removed ' + item);
        }
}

module.exports = {
    loadStock: loadStock,
    saveStock: saveStock,
    fill: fill,
    sell: sell,
    check: check,
    clear: clear,
    remove: remove
};

console.log(stock)