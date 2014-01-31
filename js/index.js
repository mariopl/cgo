
var socket = io.connect('http://localhost:3000');

socket.on('connect', function () {
});

document.querySelector('#endpoint').addEventListener ('click', function () {

	alert('Tu endpoint es: ');

});

