import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ChatHeader } from "../components/Header";
import { io } from 'socket.io-client';

const ChatView = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(["hola", "koko"]); // Estado para almacenar los mensajes

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    const socket = io.connect('http://192.168.0.26:3000');
    socket.emit('message', { user: "martin", msg: inputValue });
    setInputValue('');
  };

  useEffect(() => {
    const socket = io.connect('http://192.168.0.26:3000');
    socket.on('message', (data) => {
      setMessages(prevMessages => [...prevMessages, `[${data.user}] > ${data.msg}`]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={{ flexGrow: 1, backgroundColor: '#111' }}>
      {/* Contenedor de mensajes */}
      <ChatHeader />
      <View style={ChatStyles.chatbox}>
        {messages.map((message, index) => (
          <View key={index} style={ChatStyles.msgbox}>
            <Text>{message}</Text>
          </View>
        ))}
      </View>
      
      {/* Entrada de mensaje */}
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={ChatStyles.msgentry}
          placeholder="HOLA"
          onChangeText={handleInputChange}
          value={inputValue} // Asignar el valor del input
        />
        <Icon.Button
          style={ChatStyles.sendbtn}
          name="arrow-redo-outline"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

const ChatStyles = StyleSheet.create({
  chatbox: {
    padding: 12,
    paddingTop: 4,
    paddingBottom: 4,
    marginBottom: 8,
    height: '70%',
    color: '#fff',
    backgroundColor: '#666',
    borderWidth: 2,
    borderRadius: 10,
  },
  msgbox: {
    backgroundColor: '#050',
    borderRadius: 4,
    marginBottom: 6,
    padding: 8
  },
  msgentry: {
    flex: 1,
    padding: 12,
    paddingTop: 4,
    paddingBottom: 4,
    color: '#fff',
    backgroundColor: '#666',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#f00',
    borderStyle: 'solid'
  },
  sendbtn: {
    padding: 8,
    borderRadius: 1
  }
});

export default ChatView;