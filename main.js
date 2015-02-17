var express = require('express'),
    app     = express(),
    server  = require('http').createServer(app),
    io      = require('socket.io').listen(server, {'log level': 0}),
    fs      = require('fs'),
    meme    = require('./meme.js'),
    path    = require('path'),
    banned  = {};

var port = 6363; // meme in 10-key form
server.listen(port);
console.log('server listening on', port);

app.use(express.static(__dirname + ('/public')));
app.use('/images', express.directory(__dirname + '/images/'));
app.use('/images', express.static(__dirname + '/images'));


io.sockets.on('connection', function (socket) {
  socket.on('upload', function (data) {
    var cliIP = socket.handshake.address.address;

    if (banned[cliIP]) {
      socket.emit('nopost');
      return;
    } else {
      banned[cliIP] = true;
    }

    setTimeout(function () {
      banned[cliIP] = false;
    }, 3000);

    var randName = Math.random().toString().split('.')[1] + path.extname(data.filename);

    if (data.base64) {
      var str = data.base64.split('base64,')[1];
      var buf = new Buffer(str, 'base64');

      fs.writeFile(__dirname + '/images/inputPics/' + randName, buf, function (err) {
        console.log(err || data.filename, 'was successfully added. it was named', randName);
        meme.makeMeme(cliIP, data.filename, randName, data.toptext, data.bottext, data.fontcolor, data.fontbordercolor, data.fontsize, randName, function () {
          socket.emit('uploadedPicInfo', {
            filename: randName
          });
        });
      });
    }
  });
});
