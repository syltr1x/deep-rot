import { io } from "socket.io-client";
import appFirebase from './credenciales.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

// Firestore Variables
const auth = getAuth(appFirebase);
const firestore = getFirestore(appFirebase);
let userData = {'uid':'no-uid', 'user':'None', 'profile':'', repos:[], servers:[]}
let swpsv = {}
let server = {}
let socket = 'not-connected'

////////////////////////////////////
//// Obtencion de la DB y giver ////
////////////////////////////////////

// Stores the Data
const storeData = (param) => {
  userData = param
}
// Called to give data to components
const getData = () => {
  return userData
}

// Connection and Download data
const obtainData = async (uid) => {
  const docuRef = doc(firestore, `users/${uid}`);
  let userInfo;

  try {
    const docuCi = await getDoc(docuRef);

    if (docuCi.exists()) {
      userInfo = docuCi.data();
    } else {
      console.error("El documento no existe");
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }

  if (userInfo) {
    storeData({
      'uid': uid,
      'name': userInfo.user,
      'profile': userInfo.profile,
      'repos': userInfo.repos,
      'servers': userInfo.servers
    });
  }
}
////////////////////////////////////
///// Manejo de los servidores /////
////////////////////////////////////

async function addServer(name, ip, port) {
  var docuRef = doc(firestore, `users/${userData.uid}`);
  newServersData = [...userData.servers, {'name':name, 'ip':ip, 'port':port}]
  await updateDoc(docuRef, {servers: newServersData})
  storeData({'uid':userData.uid, 'user':userData.user, 'profile':userData.profile, 'repos':userData.repos, 'servers':newServersData})
  return newServersData
}

async function delServer(name, ip, port, man) {
  newServersData = userData.servers.filter(server => server.name !== name || server.ip !== ip || server.port !== port)
  var docuRef = doc(firestore, `users/${userData.uid}`);
  await updateDoc(docuRef, {servers: newServersData})
  storeData({'uid':userData.uid, 'user':userData.user, 'profile':userData.profile, 'repos':userData.repos, 'servers':newServersData})
  man(newServersData)
}

async function modServer(name, ip, port, nname, nip, nport, man) {
  newServersData = userData.servers.map(server => {
    if (server.name === name && server.ip === ip && server.port === port) {
      return { ...server, 
        name: nname != '' ? nname: name, 
        ip: nip != '' ? nip: ip,
        port: nport != '' ? nport: port
      }
    } else { return {...server}}
  });
  var docuRef = doc(firestore, `users/${userData.uid}`);
  await updateDoc(docuRef, {servers: newServersData})
  storeData({'uid':userData.uid, 'user':userData.user, 'profile':userData.profile, 'repos':userData.repos, 'servers':newServersData})
  man(newServersData)
}

function swapServer(name, ip, port) {swpsv = {'name':name, 'ip':ip, 'port':port}}
function getSwap() {return swpsv}
function getServer() {return server}
function getSocket() {return socket}

////////////////////////////////////
///// Conexion del Socket(MSG) /////
////////////////////////////////////

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

// Detection when login/logout
onAuthStateChanged(auth, (firebaseUser) => {
  if (firebaseUser) {
    obtainData(firebaseUser.uid)
  } else {storeData({'uid':'no-uid', 'user':'None', 'profile':'', repos:[], servers:[]})}
})

export { getData, addServer, delServer, modServer, swapServer, getSwap ,connect, disconnect, getSocket, getServer };