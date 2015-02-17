var Canvas = require('canvas'),
     Image = Canvas.Image,
        fs = require('fs'),
      wrap = require('./wrap.js'),
	 memelog = require('./memelog.js');

function makeMeme (ip, realname, randname, toptext, bottext, fontcolor, fontbordercolor, fontsize, inputpic, callback) {
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

    function fontsizer(tob) {
      var text;
      if (tob === true) {
        text = toptext;
      } else {
        text = bottext;
      }

      if (fontsize === 'auto') {
        return -(text.length) + 80;
      } else {
        return Number(fontsize);
      }
    }

    ctx.drawImage(img, 0, 0, w, h, 0, 0, w, h);

    wrap.wrapText(canvas, ctx, toptext.toUpperCase(), x, y * (canvas.height / fontsizer(true)) / (canvas.height / 50), canvas.width - (canvas.width * 0.1), fontsizer(true) + 10, fontcolor, fontbordercolor, fontsize, true);
    wrap.wrapText(canvas, ctx, bottext.toUpperCase(), x, y * 10, canvas.width - (canvas.width * 0.1), fontsizer(false) + 10, fontcolor, fontbordercolor, fontsize, false, function (i) {
      wrap.wrapText(canvas, ctx, bottext.toUpperCase(), x, y * (3.87 - ((i-1) * 0.5)), canvas.width - (canvas.width * 0.1),  fontsizer(false) + 10, fontcolor, fontbordercolor, fontsize, false);
    });

    var out = fs.createWriteStream(__dirname + '/images/outputPics/' + inputpic);
    var stream = canvas.createPNGStream({
      bufsize: 2048,
      quality: 100
    });
    stream.pipe(out);

    callback(inputpic);
    console.log('hahaha the meme worked');
  };
  img.src = __dirname + '/images/inputPics/' + inputpic;

  memelog.log(ip, realname, randname, toptext, bottext);
}

module.exports = {
  makeMeme: makeMeme
};
