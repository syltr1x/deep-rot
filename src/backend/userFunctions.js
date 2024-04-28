import appFirebase from './credenciales.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const auth = getAuth(appFirebase);
const firestore = getFirestore(appFirebase);
let userData = {'uid':'no-uid', 'name':'None', 'profile':'', repos:[], servers:[]}

// Data Management
const storeData = (param) => {
  userData = param
}
const storeServer = async(server) => {
  var docuRef = doc(firestore, `users/${userData.uid}`);
  newServersData = [...userData.servers, server]
  await updateDoc(docuRef, {servers: newServersData})
  storeData({'uid':userData.uid, 'name':userData.user, 'profile':userData.profile, 'repos':userData.repos, 'servers':newServersData})
} 

// Connection and Download data
const obtainData = async(uid) => {
  docuRef = doc(firestore, `users/${uid}`)
  docuCi = await getDoc(docuRef)
  userInfo = docuCi.data()
  storeData({'uid':uid, 'name':userInfo.user, 'profile':userInfo.profile, 'repos':userInfo.repos, 'servers':userInfo.servers})
}
const getData = () => {
    return userData
}

onAuthStateChanged(auth, (firebaseUser) => {
  if (firebaseUser) {
    obtainData(firebaseUser.uid).then((info) => {
      obtainData(info)
    })
  } else {storeData({'name':'None', 'profile':'', repos:[], servers:[]})}
})

export { getData, storeServer };