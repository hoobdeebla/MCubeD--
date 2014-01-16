module.exports.wrapText = function (canvas, ctx, text, x, y, maxWidth, lineHeight, fontcolor, fontbordercolor, fontsize, tob, callback) {
    var words = text.split(' ');
    var line = '';
    var fontSize;

    var i = 0;

    if (fontsize == 'auto') {

      fontSize = -(text.length) + 74

    } else {

      fontSize = Number(fontsize)

    }

    ctx.fillStyle = fontcolor || 'white';
    ctx.strokeStyle = fontbordercolor || 'black';
    ctx.textAlign = 'center'

    ctx.font = (fontSize).toString() + 'pt impact';
    ctx.lineWidth = fontSize / 25
    if (tob == false) {
        ctx.lineWidth = fontSize / 20
    }


    for (var n=0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
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
    };

    ctx.fillText(line, x, y);
    ctx.strokeText(line, x, y);
    i++;
    
    if (typeof(callback) == 'function') callback(i)
}