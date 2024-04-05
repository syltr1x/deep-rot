import React, { useState } from "react";
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import appFirebase from "../backend/credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import {doc, setDoc, getFirestore} from 'firebase/firestore'
const auth = getAuth(appFirebase)
const firestore = getFirestore(appFirebase)

const RegisterView = ({ navigation }) => {
    const [userValue, setUserValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [emailValue, setEmailValue] = useState('');

    const handleUserChange = (text) => setUserValue(text);
    const handlePasswordChange = (text) => setPasswordValue(text);
    const handleEmailChange = (text) => setEmailValue(text);

    const submitHandler = async() => {
      try {
        userInfo = await createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        Alert.alert('Registro Exitoso', '¡Tu cuenta ha sido creada exitosamente!');
        docuRef = doc(firestore, `users/${userInfo.user.uid}`)
        setDoc(docuRef, {user:userValue, mail:emailValue, password:passwordValue})
        setUserValue('');   
        setPasswordValue('');
        setEmailValue('');
        } catch(error) {
            Alert.alert('Error', error.message);
        };
      }
    return (
        <View style={{ flexGrow: 1, backgroundColor:'#111' }}>
            <View style={styles.headerBar}>
                <TouchableOpacity  onPress={() => {navigation.navigate('users')}}>
                <Icon
                    size={32}
                    name="arrow-back-outline"
                    style={styles.headerButton}
                />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Crear Cuenta</Text>   
                <TouchableOpacity>
                <Icon
                    size={32}
                    name="list-outline"
                    style={[styles.headerButton, {color:'#111'}]}
                />
                </TouchableOpacity>         
            </View>
            <View style={styles.boxForm}>
                <TextInput
                    placeholder="Usuario"
                    onChangeText={handleUserChange}
                    value={userValue}
                    placeholderTextColor="#888"
                    color="#aaa"
                    style={styles.inputForm}
                />
                <TextInput
                    placeholder="Correo Electronico"
                    onChangeText={handleEmailChange}
                    value={emailValue}
                    placeholderTextColor="#888"
                    color='#aaa'
                    style={styles.inputForm}
                />
                <TextInput
                    placeholder="Contraseña"
                    onChangeText={handlePasswordChange}
                    value={passwordValue}
                    placeholderTextColor="#888"
                    color="#aaa"
                    style={styles.inputForm}
                    secureTextEntry={true}
                />
                <TouchableOpacity 
                    onPress={userValue != '' && emailValue != '' && passwordValue.length > 8 ? submitHandler: () => {Alert.alert("Porfavor Completa todos los campos!", "* contraseña de 8 o más caracteres")}}
                    style={[styles.inputButton, userValue != '' && passwordValue.length >= 8 ? {backgroundColor:'#448f44'}: {backgroundColor:'#446044'}]}
                ><Text>Registrarse</Text>
                </TouchableOpacity>
                <View style={{marginTop:'15%',paddingBottom: 15, justifyContent:'center', flexDirection: 'row'}}>
                    <Text style={{ display: 'flex', color:'#ddd'}}>¿Tienes una cuenta?   </Text>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('login', {origen:'register'})}
                        ><Text style={{ display: 'flex', color: '#999', textDecorationLine: 'underline'}}>Inicia sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )}

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
    boxForm:{
        backgroundColor:'#151515',
        marginHorizontal: '10%',
        marginVertical: '10%',
        alignItems: 'center',
        borderRadius: 15,
        shadowColor: '#eee',
        elevation: 4
    },
    inputForm:{
        padding: 6,
        marginTop: 22,
        backgroundColor: '#111',
        borderColor: '#4f4f4f',
        borderWidth: 1,
        borderRadius: 9,
        width: '70%',
    },
    inputButton:{
        alignItems: 'center',
        justifyContent:'center',
        padding: 3,
        height: 38,
        flexDirection: 'row',
        marginTop : 28,
        borderRadius: 9,
        width:'70%'
    }
})
export default RegisterView;