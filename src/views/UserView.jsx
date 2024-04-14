import React, { useState } from "react";
import Constants from 'expo-constants';
import { Text, View, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import LoginView from "./LoginView";
import Icon from 'react-native-vector-icons/Ionicons';
import RegisterView from "./RegisterView";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"
import appFirebase from "../backend/credenciales";

const auth = getAuth(appFirebase)
const firestore = getFirestore(appFirebase)

const UserView = ({ navigation}) => {
  const [user, setUser] = useState('');

  const getUser = async(uid) => {
    docuRef = doc(firestore, `users/${uid}`)
    docuCi = await getDoc(docuRef)
    userInfo = docuCi.data()
    return userInfo
  }

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      getUser(firebaseUser.uid).then((info) => {
        setUser(info)
      })
    } else {setUser('')}
  })

  return (
      <View style={{flexGrow: 1 , backgroundColor: '#111'}}>
        <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => Alert.alert("Configuracion")}>
        <Icon
            size={32}
            name="cog-outline"
            style={styles.headerButton}
        />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Cuenta</Text>   
        <TouchableOpacity
        onPress={() => {user != '' ? signOut(auth) : navigation.navigate("login", {origen:'users'})}}
        ><Icon
            size={32}
            name={user != '' ? "log-out-outline": "log-in-outline"}
            style={styles.headerButton}
        />
        </TouchableOpacity>         
        </View>
        <View style={{flexDirection: 'row', marginTop: 20, marginHorizontal: 18}}>
          <View style={styles.profile}>
            <Image 
              style={{width: 110, height:110}}
              source={user.profile != '' && user.profile != undefined? { uri: user.profile } : require('../data/user.png')}
            ></Image>
          </View>
          <View style={{flexDirection:'column', flex:0.8, marginLeft:12}}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>{user.user != '' && user.user != undefined ? `Usuario Actual: ${user.user}` : 'Desconectado'}</Text>
            <View style={{flexDirection: 'row', justifyContent:'space-between', flex:1}}>
              <Text style={{color: '#fff', fontSize: 14}}>Repos: </Text>
              <Text style={{color: '#fff', fontSize: 14, paddingRight: 20}}>Stars: </Text>    
            </View> 
          </View>
        </View>
      </View>
  )
}
const Stack = createNativeStackNavigator();
const UsersFrame = () => {
  return(
    <NavigationContainer
    independent={true}
    >
      <Stack.Navigator
      screenOptions={{
        tabBarShowLabel:false,
        headerShown:false
      }}>
        <Stack.Screen name="users" component={UserView}/>
        <Stack.Screen name="login" component={LoginView}/>
        <Stack.Screen name="register" component={RegisterView}/>
      </Stack.Navigator>
    </NavigationContainer>
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
  profile:{
    margin: 10, 
    padding: 10,
    alignSelf: 'flex-start',
    borderColor: '#aaa',
    borderWidth: 2,
    borderRadius: 999,
    overflow: 'hidden',
    padding: 0,
    margin: 0,
  }
})
export default UsersFrame