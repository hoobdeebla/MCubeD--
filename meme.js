var Canvas = require('canvas'),
     Image = Canvas.Image,
        fs = require('fs'),
      wrap = require('./wrap.js'),
   memelog = require('./memelog.js');

function makeMeme (ip, realName, randName, topText, botText, fontColor, fontBorderColor, fontSize, inputPic, callback) {
  var img = new Image;
  img.onerror = function (err) {
    throw err;
  };
  img.onload = function () {
    var w = img.width,
        h = img.height,
   canvas = new Canvas(w, h),
      ctx = canvas.getContext('2d'),
        x = canvas.width / 2,
        y = canvas.height / 4;

    function fontSizer(top) {
      var text;
      if (top === true) {
        text = topText;
      } else {
        text = botText;
      }

      if (fontSize === 'auto') {
        return -(text.length) + 80;
      } else {
        return Number(fontSize);
      }
    }

    ctx.drawImage(img, 0, 0, w, h, 0, 0, w, h);

    wrap.wrapText(canvas, ctx, topText.toUpperCase(), x, y * (canvas.height / fontSizer(true)) / (canvas.height / 50), canvas.width - (canvas.width * 0.1), fontSizer(true) + 10, fontColor, fontBorderColor, fontSize, true);
    wrap.wrapText(canvas, ctx, botText.toUpperCase(), x, y * 10, canvas.width - (canvas.width * 0.1), fontSizer(false) + 10, fontColor, fontBorderColor, fontSize, false, function (i) {
      wrap.wrapText(canvas, ctx, botText.toUpperCase(), x, y * (3.87 - ((i-1) * 0.5)), canvas.width - (canvas.width * 0.1),  fontSizer(false) + 10, fontColor, fontBorderColor, fontSize, false);
    });

    var out = fs.createWriteStream(__dirname + '/images/outputPics/' + inputPic);
    var stream = canvas.createPNGStream({
      bufsize: 2048,
      quality: 100
    });
    stream.pipe(out);

    callback(inputPic);
  };
  img.src = __dirname + '/images/inputPics/' + inputPic;

  memelog.log(ip, realName, randName, topText, botText);
}

module.exports = {
  makeMeme: makeMeme
};
