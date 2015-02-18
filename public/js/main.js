$(document).ready(function () {
  var socket = io.connect();

  $('#makeMeme').click(function () {
    var fileInput = document.getElementById('userIMG');
    if ($('#topText').val() && $('#botText').val() && fileInput.files.length !== 0) {
      var fontSize = '';
      if ($('#fontSize').val() === '') {
        fontSize = 'auto';
      } else {
        fontSize = $('#fontSize').val();
      }
      var f         = fileInput.files[0];
      var reader    = new FileReader();
      reader.onload = function (e) {
        var options = {
          base64:          e.target.result,
          fileName:        f.name,
          topText:         $('#topText').val(),
          botText:         $('#botText').val(),
          fontColor:       $('#fontColor').val(),
          fontBorderColor: $('#fontBorderColor').val(),
          fontSize:        fontSize
        };
        socket.emit('upload', options);
      };
      reader.readAsDataURL(f);
    }

    socket.on('uploadedPicInfo', function (data) {
      setTimeout(function () {
        $('#tempic').attr('src', '/images/outputPics/' + data.fileName);
      }, 1000);
    });
  });

  document.getElementById('userIMG').onchange = function () {
    var fileinput = document.getElementById('userIMG');
    var f         = fileinput.files[0];
    var reader    = new FileReader();
    reader.onload = function (e) {
      $('#tempic').attr('src', e.target.result);
    };
    reader.readAsDataURL(f);
  };

  socket.on('nopost', function () {
    alert('You can only post once every 30 seconds. Sorry! This is to prevent malevolent button mashers :)');
  });
});
