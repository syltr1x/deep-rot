import React, { useState } from "react";
import Constants from 'expo-constants';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
        <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => Alert.alert("CAMBIO DE CUENTA")}>
        <Icon
            size={32}
            name="chevron-down"
            style={styles.headerButton}
        />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>USUARIO ACTUAL: {user != '' ? user : 'Anonimo'}</Text>   
        <TouchableOpacity
        onPress={() => {user != '' ? signOut(auth) : navigation.navigate("login", {origen:'users'})}}
        ><Icon
            size={32}
            name={user != '' ? "log-out-outline": "log-in-outline"}
            style={styles.headerButton}
        />
        </TouchableOpacity>         
        </View>
        <View>

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
})
export default UsersFrame