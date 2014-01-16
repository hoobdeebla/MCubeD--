var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server, {
        "log level": 0
    }),
    fs = require('fs'),
    meme = require('./meme.js'),
    path = require('path'),
    banned = {};

server.listen(3125);

app.use(express.static(__dirname + ('/public')))

app.use('/images', express.directory(__dirname + '/images/'));
app.use('/images', express.static(__dirname + '/images'));


io.sockets.on('connection', function (socket) {

    socket.on('upload', function (data) {

        var cli_ip = socket.handshake.address.address;

        if (banned[cli_ip]) {
            socket.emit("nopost")
            return;
        } else {
            banned[cli_ip] = true;
        }

        setTimeout(function () {
            banned[cli_ip] = false;
        }, 3000);

        var randname = Math.random().toString().split(".")[1] + path.extname(data.filename);

        if (data.base64) {

            var str = data.base64.split('base64,')[1];

            var buf = new Buffer(str, 'base64');

            fs.writeFile(__dirname + '/images/inputpics/' + randname, buf, function (err) {

                console.log(err || data.filename, "was successfully added...it was named", randname);
                meme.makememe(cli_ip, data.filename, randname, data.toptext, data.bottext, data.fontcolor, data.fontbordercolor, data.fontsize, randname, function () {
                    console.log('Meme has been written!');
                    socket.emit("uploadedpicinfo", {
                        filename: randname
                    })
                })

            });

        }


    });


});
