function wrapText (canvas, ctx, text, x, y, maxWidth, lineHeight, fontColor, fontBorderColor, fontSize, top, callback) {
  var words = text.split(' ');
  var line  = '';


  var i = 0;

  if (fontSize === 'auto') {
    fontSize = -(text.length) + 74;
  } else {
    fontSize = Number(fontSize);
  }

  ctx.fillStyle   = fontColor || 'white';
  ctx.strokeStyle = fontBorderColor || 'black';
  ctx.textAlign   = 'center';
  ctx.font        = (fontSize).toString() + 'pt impact';
  ctx.lineWidth   = fontSize / 25;
  if (top === false) {
    ctx.lineWidth = fontSize / 20;
  }

  for (var n=0; n < words.length; n++) {
    var testLine  = line + words[n] + ' ';
    var metrics   = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      ctx.strokeText(line, x, y);
      i++;
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, x, y);
  ctx.strokeText(line, x, y);
  i++;

  if (typeof(callback) === 'function') {callback(i);}
};

module.exports = {
  wrapText: wrapText
}
