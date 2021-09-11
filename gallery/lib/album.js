var path = require('path'),
    fs = require('fs');

function Album(album_path) {
    this.name = path.basename(album_path);
    this.path = album_path;
}

Album.prototype.name = null;
Album.prototype.path = null;
Album.prototype._photos = null;

Album.prototype.photos = function(callback) {
    if(this._photos != null) {
        callback(null, this._photos);
        return;
    }
    
    fs.readdir(this.path, (err, files) => {
        if(err) {
            if(err.code == "ENOENT") {
                return new Error('The specified album does not exist.');
            } else {
                throw err;
            }
        }

        var file_list = [];

        var loop_in = (index) => {
            if(index == files.length) {
                callback(null, file_list);
                return;
            }

            fs.stat(this.path + "/" + files[index], (err, stats) => {
                if(err) {
                    throw err;
                }
                if(stats.isFile()) {
                    file_list.push(files[index]);
                }
                loop_in(index + 1);
            });
        };
        loop_in(0);
    });
}

exports.createAlbum = (path) =>{
    return new Album(path);
}