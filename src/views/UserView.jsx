import React, { useState } from "react";
import Constants from 'expo-constants';
import { Text, View, TouchableOpacity } from 'react-native';
import { UserHeader } from "../components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import LoginView from "./LoginView";
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
    userInfo = docuCi.data().user
    return userInfo
  }

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      getUser(firebaseUser.uid).then((user) => {
        setUser(user)
      })
    } else {setUser('')}
  })

  return (
      <View style={{flexGrow: 1 , backgroundColor: '#111'}}>
        <UserHeader></UserHeader>
        <Text style={{color: '#eee'}}>USUARIO ACTUAL: {user != '' ? user : 'Anonimo'}</Text>
        <TouchableOpacity
        onPress={() => {navigation.navigate("login", {origen:'users'})}}>
          <Text style={{color: '#eee'}}>IR A LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("register")}>
          <Text style={{ color: '#eee' }}>Ir a Registro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {signOut(auth)}}
          ><Text style={{color: '#fff'}}>Cerrar Sesion</Text></TouchableOpacity>
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
export default UsersFrame