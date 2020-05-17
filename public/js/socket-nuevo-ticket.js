// Comando para establecer la conexion
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log('Conectado al servidor')
});

socket.on('disconnect', function () {
    console.log('Desconectado del servidor')
});

socket.on('estadoActual', function (resp) {
    console.log(resp);
    label.text(resp.actual)
})

// Listener para el nuevo ticket
$('button').on('click', function () {
    socket.emit('siguienteT', null, function (siguienteT) {
        label.text(siguienteT);
    });
});