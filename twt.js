var fs = require('fs');

/// สร้างตัวแปรเก็บ user, tweet, and follow
var users = new Map();
var tweets = new Map();
var follows = new Map();

loadData = () => {
    // load all users
        // user_id name
    fs.readFile('user.txt', function (err, filedata) {
        if(err) throw err;

        let user_data = filedata.toString();
        let user_lines = user_data.split('\n');

        user_lines.forEach((line) => {
            let dat = line.split(' ');
            users.set(dat[0], dat[1]);
        })
        users.forEach((value, key) => {
            console.log('User ' + key + ' name is ' + value);
        })
    });

    // load all tweets
        // tweet_id user_id source_tweet_id message


    // load following list
        // user_id follow_user_id


};

timeline = (user_id) => {
    // return ข้อความทั้งหมดที่ user_id นี้จะเห็น (ข้อความที่ tweet โดยเหล่าคนที่ user_id นี้ได้ follow อยู่)
}

feed = (user_id) => {
    // return ข้อความทั้งหมดที่ user_id นี้เคย tweet หรือถ้าไม่ใส่ user_id จะ return tweet ทั้งหมด
}

create_tweet = (user_id, source_id, message) => {
    ///

    // save
    // return ตัว tweet นั้นกลับไป
}

follow = (user_id, follow_user_id) => {
    ///


    // save
    // return ว่าใคร follow ใคร (ที่ได้ทำเรียบร้อยแล้วใน action นี้)

}

module.exports = {
    loadData: loadData,
    timeline: timeline,
    feed: feed,
    create_tweet: create_tweet,
    follow: follow,
};