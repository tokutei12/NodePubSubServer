$(function(){
    var socket = io.connect('http://localhost:3001');
    //grab username
    var username = window.location.href.split("/").slice(-1)[0]
    socket.emit('registerSelf', username);
    socket.on('message', function(msg){
        $('#msgs').append($('<li>').text(msg));
    });
});