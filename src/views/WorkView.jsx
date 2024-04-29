// React-Native Imports
import React from "react";
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons'
import { Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
// Firebase Imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import appFirebase from "../backend/credenciales.js";
// Componentes Import
import Repository from '../components/Repository.jsx'

const auth = getAuth(appFirebase)
const firestore = getFirestore(appFirebase)

const WorkView = () => {
  const [user, setUser] = React.useState('')
  const [repos, setRepos] = React.useState([])

  const getUser = async(uid) => {
    docuRef = doc(firestore, `users/${uid}`)
    docuCi = await getDoc(docuRef)
    userInfo = docuCi.data()
    return userInfo
  }

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      getUser(firebaseUser.uid).then((info) => {
        setUser(info.user)
        setRepos(info.repos)
      })
    } else {setUser('')}
  })

    return (
      <View style={{flexGrow: 1, backgroundColor:'#111'}}>
          <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => Alert.alert("EXPLICACION DE TRABAJOS")}>
            <Icon
                size={32}
                name="add-circle-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{user != '' ? `Trabajos de ${user}` : 'No hay trabajos'}</Text>   
            <TouchableOpacity onPress={() => Alert.alert("EXPLICACION DE TRABAJOS")}>
            <Icon
                size={32}
                name="help-circle-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>         
        </View>
          {repos != [] ? 
          <FlatList
          data={repos}
          renderItem={({item: repo}) => (
            <Repository {...repo}/>
          )}
          />: <Text>HOLA NENO</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
  headerBar:{
      alignSelf:'stretch',
      backgroundColor: '#111',
      display: 'flex',
      paddingTop: Constants.statusBarHeight+8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between'
  },
  headerTitle:{
      padding: 14,
      paddingTop: 7,
      paddingBottom: 7,
      color:'#eee',
  },
  headerButton:{ 
      padding: 14,
      paddingTop: 7,
      paddingBottom: 7,
      color: '#eee',
  },
})
export default WorkView