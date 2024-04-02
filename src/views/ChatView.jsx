import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getSocket, getServer } from '../backend/ServerFunctions';

let socket
let manMsg = false
let setMessages

const ChatView = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');
  [messages, setMessages] = useState([]);
  const handleInputChange = (text) => { 
    setInputValue(text);
  };

  const handleSubmit = () => {
    if (typeof socket === 'undefined') {
      socket = getSocket()
    } if (typeof socket !== 'undefined') {
      if (inputValue != '') {
        socket.emit('message', { user: "martin", msg: inputValue });
        setInputValue('');
      }
    }
  };

  useEffect(() => {
    if (typeof socket === 'undefined') {
      socket = getSocket()
    } if (typeof socket !== 'undefined') {
      if (!manMsg) {
        manMsg = true
        socket.on('message', (data) => {
          setMessages(prevMessages => [...prevMessages, data.msg]);
        })
      }
  }}, []);

  return (
    <View style={{ flexGrow: 1, backgroundColor: '#111' }}>
              <View style={ChatStyles.headerBar}>
            <TouchableOpacity onPress={() => navigation.navigate('listserver')}>
            <Icon 
                size={32}
                name="arrow-back-outline"
                style={ChatStyles.headerButton}
            />
            </TouchableOpacity>
            <Text style={ChatStyles.headerTitle}>{getServer().name}</Text>   
            <TouchableOpacity>
            <Icon 
                size={32}
                name="list-outline"
                style={[ChatStyles.headerButton, {color: '#111'}]}
            />
            </TouchableOpacity>   
               
        </View>
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
        <TouchableOpacity onPress={handleSubmit}>
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
    backgroundColor: '#474',
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
  },
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
});

const Stack = createNativeStackNavigator();

const ChatFrame = () => {
  return(
    <NavigationContainer
    independent={true}
    >
      <Stack.Navigator
      screenOptions={{
        tabBarShowLabel:false,
        headerShown:false
      }}>
        <Stack.Screen name="chat" component={ChatView}/>
        <Stack.Screen name="addserver" component={AddServerView}/>
        <Stack.Screen name="listserver" component={ServersView}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ChatView