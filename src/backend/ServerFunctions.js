import { io } from "socket.io-client";
let servers = [];
let server = {};
let socket = 'not-connected';

function getSocket() {
  return socket
}
function addServer(name, ip, port) {servers.push({'name':name, 'ip':ip, 'port':port})}
function getServers() {return servers}
function getServer() {return server}
function delServer(name, ip, port) {servers = servers.filter(server => server.name !== name || server.ip !== ip || server.port !== port)}
function modServer() {}

function connect(name, ip, port) {
  server = {'name':name, 'ip':ip, 'port':port}
  socket = io.connect(`http://${ip}:${port}`);
}

function disconnect(name, ip, port) {
  if (socket != 'not-connected') {
    socket.disconnect()
  }
  server = {}
}

export { addServer, getServers, getServer, delServer, modServer, connect, getSocket, disconnect };