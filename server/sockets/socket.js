const { io } = require('../server');
const { TickerControl } = require('../clases/ticket-control')


const ticketControl = new TickerControl();

io.on('connection', (cliente) => {

    cliente.on('siguienteT', (data, callback) => {

        let siguienteTicket = ticketControl.siguienteTicket();

        console.log(siguienteTicket);
        callback(siguienteTicket)
    });

    // Emitir un evento que retorna el ultimo ticket

    cliente.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    cliente.on('atenderT', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderT = ticketControl.atenderTicket(data.escritorio);

        callback(atenderT);

        cliente.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
    });
});