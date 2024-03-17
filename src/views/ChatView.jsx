import {React, useState } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { ChatHeader } from "../components/Header";

const ChatView = () => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (text) => {setInputValue(text)}
  const handleSubmit = () => {Alert.alert('Valor ingresado:', inputValue)}
  
  return (
    <View style={{flexGrow: 1, backgroundColor: '#111'}}>
        <ChatHeader></ChatHeader>
        <Text style={{color: '#fff'}}>ESTO ES CHAT</Text>
        <TextInput 
        style={ChatStyles.msgentry}
        placeholder="HOLA"
        onChangeText={handleInputChange}
        ></TextInput>
        <Button
        title="Send Message"
        onPress={handleSubmit}
        ></Button>
      </View>
  )
}


const ChatStyles = StyleSheet.create({
  msgentry:{
    padding: 12,
    paddingTop: 4,
    paddingBottom: 4,
    color:'#fff',
    backgroundColor:'#666',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#f00',
    borderStyle: 'solid'
  }
})

export default ChatView