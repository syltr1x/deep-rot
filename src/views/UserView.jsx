import React from "react";
import Constants from 'expo-constants';
import { Text, View, TouchableOpacity } from 'react-native';
import { UserHeader } from "../components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import LoginView from "./LoginView";
import RegisterView from "./RegisterView";

const UserView = ({ navigation}) => {
  const [user, setUser] = React.useState(null);

  // onAuthStateChanged(auth, (usuarioFirebase) => {
  //   if (usuarioFirebase) {
  //     setUser(usuarioFirebase);
  //   } else {
  //     setUser(null);
  //   }
  // });
  return (
      <View style={{flexGrow: 1 , backgroundColor: '#111'}}>
        <UserHeader></UserHeader>
        <Text style={{color: '#eee'}}>ESTO ES EL USUARIO</Text>
        <TouchableOpacity
        onPress={() => {navigation.navigate("login")}}>
          <Text style={{color: '#eee'}}>IR A LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("register")}>
          <Text style={{ color: '#eee' }}>Ir a Registro</Text>
        </TouchableOpacity>
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