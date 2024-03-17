import { io } from 'socket.io-client';
import readline from 'readline';

const serverUrl = 'http://localhost:3000';
const socket = io(serverUrl);

socket.on('chat message', (msg) => {
    console.log('\nReceived: ' + msg);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('Type your message: ');
rl.prompt();

rl.on('line', (input) => {
    if (input.trim() !== '') {
        socket.emit('chat message', input.trim());
    }
    rl.prompt();
});

rl.on('close', () => {
    console.log('Exited.');
    process.exit(0);
});
