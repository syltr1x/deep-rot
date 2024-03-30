import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/Ionicons';
import { ChatHeader } from "../components/Header";
import { io } from 'socket.io-client';
import AddServerView from './AddServerView';

const ChatView = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    const socket = io.connect('http://192.168.0.26:3000');
    if (inputValue != '') {
      socket.emit('message', { user: "martin", msg: inputValue });
      setInputValue('');
    }
  };

  useEffect(() => {
    const socket = io.connect('http://192.168.0.26:3000');
    socket.on('message', (data) => {
      setMessages(prevMessages => [...prevMessages, data.msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={{ flexGrow: 1, backgroundColor: '#111' }}>
      <ChatHeader />
      <ScrollView style={ChatStyles.chatBox} zIndex={0}>
        {messages.map((message, index) => (
          <View key={index} style={ChatStyles.msgBox}>
            <Text style={ChatStyles.msgText}>{message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={ChatStyles.msgEntry}
          placeholder="Ingresa el mensaje"
          placeholderTextColor={'#fff'}
          onChangeText={handleInputChange}
          value={inputValue}
        />
        <TouchableOpacity onPress={() => {navigation.navigate("addserver")}}>
        {/* <TouchableOpacity onPress={handleSubmit}> */}
          <Icon 
            size={32}
            name="arrow-redo-outline"
            style={ChatStyles.sendBtn}
          />
      </TouchableOpacity>
      </View>
    </View>
  );
};

const ChatStyles = StyleSheet.create({
  chatBox: {
    marginHorizontal: '1%',
    flex: 1,
    padding: 12,
    paddingTop: 4,
    paddingBottom: 4,
    marginBottom: 8,
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 1.2,
    borderRadius: 10,
    zIndex: 0,
  },
  msgBox: {
    backgroundColor: '#030',
    borderRadius: 4,
    marginTop: 10,
    padding: 8
  },
  msgText: {
    color: '#eee',
  },
  msgEntry: {
    flex: 1,
    padding: 18,
    paddingTop: 4,
    marginBottom: 6,
    paddingBottom: 4,
    marginHorizontal: '1%',
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 1.2,
    borderRadius: 14,
    borderStyle: 'solid'
  },
  sendBtn: {
    top: -3.5,
    color: '#fff',
    padding: 8,
    marginRight: 6,
    marginLeft: 2,
    borderRadius: 1
  }
});

const Stack = createNativeStackNavigator();

const ChatFrame = () => {
  return(
    <NavigationContainer
    independent={true}
    >
      <Stack.Navigator>
        <Stack.Screen name="chat" component={ChatView}/>
        <Stack.Screen name="addserver" component={AddServerView}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default ChatFrame;