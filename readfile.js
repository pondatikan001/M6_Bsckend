var fs = require('fs');
fs.readFile('data.txt', function (err, filedata) {
    if(err) throw err;
    var data_txt = filedata.toString();
    var person = [];
    data_line = data_txt.split('\n');
    data_line.forEach(function(line){
        let dat = line.split(' ');
        person.push({fistname: dat[0], lastname: dat[1]});
    });
    console.log(person);
});

fs.writeFile('output.txt', 'Success', function(err){
    if(err) throw err;
});

