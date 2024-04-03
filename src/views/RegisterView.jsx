import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { HomeHeader } from "../components/Header";
import appFirebase from "../../credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
const auth = getAuth(appFirebase)

const RegisterView = ({ navigation }) => {
    const [userValue, setUserValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleUserChange = (text) => setUserValue(text);
    const handlePasswordChange = (text) => setPasswordValue(text);

    const submitHandler = async() => {
      try {
        await createUserWithEmailAndPassword(auth, userValue, passwordValue)
        Alert.alert('Registro Exitoso', '¡Tu cuenta ha sido creada exitosamente!');
        setUserValue('');
        setPasswordValue('');
        } catch(error) {
            Alert.alert('Error', error.message);
        };
      }
    return (
        <View style={{ flexGrow: 1, backgroundColor:'#666' }}>
            <HomeHeader />
            <Text style={{ color:'#eee' }}>Registro</Text>
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
                <Text style={{ color: '#0ff' }}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text>Iniciar sesión</Text>
            </TouchableOpacity>
        </View>
    )}
export default RegisterView;