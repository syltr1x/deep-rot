import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ServerItem from '../components/ServerItem.jsx';
import { getServers } from '../backend/ServerFunctions.js';
import ChatView from './ChatView.jsx'
import AddServerView from './AddServerView.jsx';

const ServersView = ({ navigation }) => {
  const [servers, setServers] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedServers = getServers();
      setServers(fetchedServers);
    };

    if (isFocused) {
      fetchData();
    }

    return () => {}; // Limpia el efecto al desmontar el componente
  }, [isFocused]);

  return (
    <View style={{ flexGrow: 1, backgroundColor: '#111'}}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => {navigation.navigate("addserver")}}>
          <Icon 
            size={32}
            name="add-circle-outline"
            style={styles.headerButton}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Servidores</Text>   
        <TouchableOpacity onPress={() => {navigation.navigate("chat")}}>
          <Icon 
            size={32}
            name="chatbox-ellipses-outline"
            style={styles.headerButton}
          />
        </TouchableOpacity>   
      </View>
      <FlatList
        data={servers}
        renderItem={({item: server}) => (
          <ServerItem {...server}/>
        )}
      />
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
    marginVertical: '20%',
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
    padding: 3,
    flexDirection: 'row',
    marginTop : 30,
    backgroundColor: '#077',
    borderRadius: 9,
    width:'70%'
  }
})

const Stack = createNativeStackNavigator();

const ServerFrame = () => {
  return(
    <NavigationContainer
    independent={true}
    >
      <Stack.Navigator
      screenOptions={{
        tabBarShowLabel:false,
        headerShown:false
      }}>
        <Stack.Screen name="listserver" component={ServersView}/>
        <Stack.Screen name="addserver" component={AddServerView}/>
        <Stack.Screen name="chat" component={ChatView}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export {
  ServerFrame,
}