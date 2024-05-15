// React-Native Imports
import React from "react";
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
// Firebase Imports
import appFirebase from "../backend/credenciales";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const auth = getAuth(appFirebase)

const RegisterView = ({ navigation, route }) => {
    const [passwordValue, setPasswordValue] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');

    const handlePasswordChange = (text) => setPasswordValue(text);
    const handleEmailChange = (text) => setEmailValue(text);

    const submitHandler = async() => {
      try {
        signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((cred) => {
            Alert.alert("Inicio de sesión", `Has iniciado sesión como: ${cred.user.displayName}`)
            setEmailValue('');
            setPasswordValue('');
        })
        .catch((e) => {
            let errors = {"Firebase: Error (auth/invalid-email).": ["Error: Invalid Email", "Porfavor revisa la direccion de correo proporcionada"],
                         "Firebase: Error (auth/invalid-credential).": ["Error: Invalid Credential", "Porfavor revisa las credenciales ingresadas"],
                         "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":["Error: many attempts", "Se ha deshabilitado temporalmente el Inicio de sesión debido a varios intentos fallidos.\nVuelva a intentarlo mas tarde"]}
            
            Alert.alert(errors[e.message][0], errors[e.message][1])            
            })
        } catch(error) {
            Alert.alert('Error', error.message);
        };
      }
    return (
        <View style={{ flexGrow: 1, backgroundColor:'#111' }}>
            <View style={styles.headerBar}>
            <TouchableOpacity  onPress={() => {navigation.navigate(typeof route.params !== 'undefined' ? route.params.origen : 'users')}}>
            <Icon
                size={32}
                name="arrow-back-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Iniciar Sesión</Text>   
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
                    placeholder="Correo Electronico"
                    onChangeText={handleEmailChange}
                    value={emailValue}
                    placeholderTextColor="#888"
                    color="#aaa"
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
                    onPress={emailValue != '' && passwordValue.length >= 8 ? submitHandler: () => {Alert.alert("Porfavor Completa todos los campos!", "* contraseña de 8 o más caracteres")}}
                    style={[styles.inputButton, passwordValue.length >= 8 ? {backgroundColor:'#448f44'}: {backgroundColor:'#446044'}]}                    
                    ><Text>Iniciar Sesión</Text>
                </TouchableOpacity>
                <View style={{marginTop:'15%',paddingBottom: 15, justifyContent:'center', flexDirection: 'row'}}>
                <Text style={{ display: 'flex', color:'#ddd'}}>¿No tienes una cuenta?   </Text>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('register', {origen:'login'})}
                        ><Text style={{ display: 'flex', color: '#999', textDecorationLine: 'underline'}}>Crea una</Text>
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