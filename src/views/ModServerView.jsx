// React-Native Imports
import React from 'react';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// Server Functions Imports
import { modServer, getSwap } from '../backend/userFunctions';

const ModServerView = ({ navigation, route }) => {
  const swap = getSwap()
  const [NameValue, setNameValue] = React.useState('');
  const [IpValue, setIpValue] = React.useState('');
  const [PortValue, setPortValue] = React.useState('');
  const handleNameChange = (text) => {setNameValue(text);}; 
  const handleIpChange = (text) => {setIpValue(text);}; 
  const handlePortChange = (text) => {setPortValue(text);};
  return (
    <View style={{ flexGrow: 1, backgroundColor: '#111'}}>
      <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => {navigation.navigate("listserver")}}>
            <Icon
                size={32}
                name="arrow-back-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Modificar un Servidor</Text>   
            <TouchableOpacity>
            <Icon 
                size={32}
                name="list-outline"
                style={[styles.headerButton, {color:'#111'}]}/>
            </TouchableOpacity>   
        </View>
      <View style={styles.boxForm}>
        <TextInput
        style={styles.inputForm}
        placeholder={swap.name}
        keyboardType='default'
        onChangeText={handleNameChange}
        ></TextInput>
        <TextInput
        style={styles.inputForm}
        placeholder={swap.ip}
        keyboardType='decimal-pad'
        onChangeText={handleIpChange}
        ></TextInput>
        <TextInput
        style={styles.inputForm}
        placeholder={swap.port}
        keyboardType='decimal-pad'
        onChangeText={handlePortChange}
        ></TextInput>
        <TouchableOpacity
        style={styles.inputButton}
        onPress={() => {
          modServer(swap.name, swap.ip, swap.port, NameValue, IpValue, PortValue, route.params.refresh)
          Alert.alert("Modificacion exitosa", `${swap.name} se ha modificado con exito`)
          navigation.navigate('listserver')
        }}
        >
          <Text style={{fontSize: 16}}
          >Modificar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
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
    flex: 1,
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
    marginTop: 30,
    backgroundColor: '#989898',
    borderRadius: 9,
    width: '70%',
  },
  inputButton:{
    alignItems: 'center',
    justifyContent:'center',
    padding: 7,
    flexDirection: 'row',
    marginTop : 30,
    backgroundColor: '#494',
    borderRadius: 9,
    width:'70%'
  }
})

export default ModServerView;