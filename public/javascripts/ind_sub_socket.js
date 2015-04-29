$(function(){
    var socket = io.connect('http://localhost:3001');
    socket.on('message', function(msg){
        $('#msgs').append($('<li>').text(msg));
    });
});