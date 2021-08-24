const https = require('http');

const options = {
    hostname: 'localhost',
    port: 8082,
    path: '/fill',
    method: 'GET'
};
const req = https.request(options, res =>{
    res.on('data', d =>{
        process.stdout.write(d)
    });
});
req.on('error',error =>{
    console.error(error)
});
req.end();