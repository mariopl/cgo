
var socket = io.connect('http://192.168.1.103:3000');

socket.on('connect', function () {
});

document.querySelector('#endpoint').addEventListener ('click', function () {

	alert('Tu endpoint es: ');

});

