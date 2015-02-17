var path = require('path'),
      fs = require('fs');

function log (ip, realname, randname, toptext, bottext) {
  fs.readFile(path.join(__dirname, 'images/outputPics/memelog.txt'), 'utf8', function (err, str) {
    if(err) {
      console.error(err);
    }

    str = String(str) + '\nMeme file ' + randname + ' is an alias to ' + realname + ' and was written by the ip ' + ip + '. The top text of the meme is: ' + toptext + ', the bottom is: ' + bottext + '.\n---------------------------------------';
    fs.writeFile(path.join(__dirname, 'images/outputPics/memelog.txt'), str);
  });
}

module.exports = {
  log: log
};
