const fs = require('fs');
fs.appendFile('test.log',(new Date()).toISOString()+ ' open\n', (err) =>{
    if(err) throw err;
    console.log(err);
});