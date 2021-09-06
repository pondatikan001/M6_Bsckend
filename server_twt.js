var http = require('http');
var url = require('url');

const {loadData, timeline, feed, create_tweet, follow} = require('./twt');

loadData();

http.createServer(function (req, res) {
    
    var request_path = url.parse(req.url, true);
    var message = '';
    var data;
    var status = 200;

    let response_object = {
        statusCode: status,
        message: message,
        data: data
    };


    switch(request_path.pathname) {
        case '/timeline': 
            try {
                data = timeline(request_path.query.user_id);
            } catch(err) {
                message += err;
                console.log(err);
            }
            break;

        case '/feed': 
            try {
                data = feed(request_path.query.user_id); // if NULL, return tweet of all users
            } catch(err) {
                message += err;
                console.log(err);
            }
            break;

        case '/create_tweet':
            let req_input =[];
            if(req.method == 'POST') {
            req.on('data', (chunk) =>{
                req_input.push(chunk);
                    }).on('end', () =>{
                        res.writeHead(200, {'Content-Type': 'application/json'});
	                    res.end(JSON.stringify(response_object));
                    })
                try {
                data = create_tweet(request_path.query.user_id, request_path.query.source_id, request_path.query.message);
                } catch(err) {
                message += err;
                console.log(err);
                }
            } else {
                throw 'method not match';
            }
            break;

        case '/follow': 
            try {
                data = follow(request_path.query.user_id, request_path.query.follow_user_id);
            } catch(err) {
                message += err;
                console.log(err);
            }
            break;
    }

 
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(response_object));
    
}).listen(8080);
console.log('Twt application is running on port 8080.');

