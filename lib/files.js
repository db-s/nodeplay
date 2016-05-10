var fs = require('fs');

// Function to get a list of files recursively
// through given directory and it's sub directories
exports.getFilesRecursive = function(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            this.getFilesRecursive(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}