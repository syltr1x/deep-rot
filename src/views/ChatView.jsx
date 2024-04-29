// React-Native Imports
import React from "react";
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
// Firebase Imports
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import appFirebase from '../backend/credenciales';
// Server Functions
import { getSocket, getServer } from '../backend/userFunctions';

const firestore = getFirestore(appFirebase)
const auth = getAuth(appFirebase)

let socket
let manMsg = false
let setMessages

const ChatView = ({ navigation }) => {

  // User Variables
  const [user, setUser] = React.useState('');
  const getUser = async(uid) => {
    docuRef = doc(firestore, `users/${uid}`)
    docuCi = await getDoc(docuRef)
    userInfo = docuCi.data()
    return userInfo
  }

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      getUser(firebaseUser.uid).then((info) => {
        setUser(info)
      })
    } else {setUser('')}
  })

  // Message Variables
  const [inputValue, setInputValue] = React.useState('');
  [messages, setMessages] = React.useState([]);
  const handleInputChange = (text) => { 
    setInputValue(text);
  };

  const handleSubmit = () => {
    if (typeof socket === 'undefined') {
      socket = getSocket()
    } if (typeof socket !== 'undefined') {
      if (inputValue != '') {
        socket.emit('message', { user: user.user, msg: inputValue });
        setInputValue('');
      }
    }
  };

  React.useEffect(() => {
    if (getServer().name != 'not-connected') {
      if (typeof socket === 'undefined') {
      socket = getSocket()
    
      if (!manMsg) {
        manMsg = true
        socket.on('message', (data) => {
          setMessages(prevMessages => [...prevMessages, data.msg]);
        })
      }}
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
            <Text style={ChatStyles.headerTitle}>{`${getServer().name} / ${getServer().ip}:${getServer().port}`}</Text>   
            <TouchableOpacity>
            <Icon 
                size={32}
                name="list-outline"
                style={[ChatStyles.headerButton, {color: '#111'}]}
            />
            </TouchableOpacity>                  
        </View>
      {getServer().name != 'not-connected' ?
      <View style={{flex: 1}}>
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
      </View></View> : <View></View>}
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

export default ChatView