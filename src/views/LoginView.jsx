import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { HomeHeader } from "../components/Header";
import appFirebase from "../../credenciales";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
const auth = getAuth(appFirebase)

const RegisterView = ({ navigation }) => {
    const [userValue, setUserValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleUserChange = (text) => setUserValue(text);
    const handlePasswordChange = (text) => setPasswordValue(text);

    const submitHandler = async() => {
      try {
        await signInWithEmailAndPassword(auth, userValue, passwordValue)
        Alert.alert('Has iniciado sesion!');
        setUserValue('');
        setPasswordValue('');
        } catch(error) {
            Alert.alert('Error', error.message);
        };
      }
    return (
        <View style={{ flexGrow: 1, backgroundColor:'#666' }}>
            <HomeHeader />
            <Text style={{ color:'#eee' }}>Inicio de Sesion</Text>
            <TextInput
                placeholder="Usuario"
                onChangeText={handleUserChange}
                value={userValue}
                placeholderTextColor="#fff"
                style={{ color: '#fff' }}
            />
            <TextInput
                placeholder="Contraseña"
                onChangeText={handlePasswordChange}
                value={passwordValue}
                placeholderTextColor="#fff"
                style={{ color: '#fff' }}
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={submitHandler}>
                <Text style={{ color: '#0ff' }}>Inicio de Sesion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text>Iniciar sesión</Text>
            </TouchableOpacity>
        </View>
    )}
export default RegisterView;