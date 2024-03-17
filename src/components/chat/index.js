import { Server } from 'socket.io';
import http from 'http';

const port = process.env.PORT ?? 3000;

const server = http.createServer();

const io = new Server(server, {
    connectionStateRecovery: {}
});

io.on('connection', (socket) => {
    console.log('a user has connected!');

    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message received: ' + msg); // Mostrar el mensaje recibido en el servidor
        io.emit('chat message', msg);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
