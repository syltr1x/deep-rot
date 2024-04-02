import { io } from "socket.io-client";
let servers = [];
let server = {'name':'not-connected'};
let socket = 'not-connected';
let swpsv = {}
function getSocket() {
  return socket
}
function getSwap() {return swpsv}
function swapServer(name, ip, port) {swpsv = {'name':name, 'ip':ip, 'port':port}}
function addServer(name, ip, port) {servers.push({'name':name, 'ip':ip, 'port':port})}
function getServers() {return servers}
function getServer() {return server}
function delServer(name, ip, port, man) {
  servers = servers.filter(server => server.name !== name || server.ip !== ip || server.port !== port)
  man(servers)
}
function modServer(name, ip, port, nname, nip, nport) {
  servers = servers.map(server => {
    if (server.name === name && server.ip === ip && server.port === port) {
      return { ...server, 
        name: nname != '' ? nname: name, 
        ip: nip != '' ? nip: ip,
        port: nport != '' ? nport: port
      }
    } else { return {...server}}
  });
}

function connect(name, ip, port, man) {
  server = {'name':name, 'ip':ip, 'port':port}
  socket = io.connect(`http://${ip}:${port}`);
  man(server)
}

function disconnect(man) {
  if (socket != 'not-connected') {
    socket.disconnect()
  }
  server = {'name':'not-connected'}
  man(server)
}

export { addServer, getServers, getServer, delServer, modServer, connect, getSocket, disconnect, swapServer, getSwap};