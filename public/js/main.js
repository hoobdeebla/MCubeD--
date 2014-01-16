$(document).ready(function () {
  
  var socket = io.connect();
  
  $("#makememe").click(function () {
  
    var fileinput = document.getElementById('userIMG');
  
    if ($("#toptext").val() && $("#bottext").val() && fileinput.files.length != 0) {
    
      var f = fileinput.files[0];
    
      console.log(f.name);
  
      var reader = new FileReader();
  
      reader.onload = function (e) {
        socket.emit('upload', {
          base64: e.target.result, 
          filename: f.name,
          toptext: $("#toptext").val(), 
          bottext: $("#bottext").val(), 
          fontcolor: $("#fontcolor").val(), 
          fontbordercolor: $("#fontbordercolor").val(),
          fontsize: $("#fontsize").val()
        });
      }
  
      reader.readAsDataURL(f);
  
    }
    
    socket.on("uploadedpicinfo", function (data) {
      
      setTimeout(function () {
        $("#memeviewer").html('<img id="tempic" src="/images/outputpics/' + data.filename + '">');

        $("#tempic").attr("class", "centerer img-polaroid");
      }, 1000)
      
    })
  
  })
  
  document.getElementById('userIMG').onchange = function () {
        
    var fileinput = document.getElementById('userIMG');

    var f = fileinput.files[0];

    var reader = new FileReader();

    reader.onload = function (e) {
        
        $("#memeviewer").html('<img id="tempic" src="' + e.target.result + '">')
        
        $("#tempic").attr("class", "centerer img-polaroid")
        
    }
    
    reader.readAsDataURL(f);
    
  };
  
  socket.on("nopost", function () {
    alert("You can only post once every 30 seconds...sorry this is to prevent malevolent button mashers :).")
  })
  
})