var path = require('path'),
      fs = require('fs');

function log (ip, realName, randName, topText, botText) {
  fs.readFile(path.join(__dirname, 'images/outputPics/memelog.txt'), 'utf8', function (err, str) {
    if (err) {throw err;}

    str = String(str) + '\nMeme file ' + randName + ' is an alias to ' + realName + ' and was written by the ip ' + ip + '. The top text of the meme is: ' + topText + ', the bottom is: ' + botText;
    fs.writeFile(path.join(__dirname, 'images/outputPics/memelog.txt'), str);
  });
}

module.exports = {
  log: log
};
