import React from 'react';
import Constants from 'expo-constants';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getServer} from './ChatView.jsx'
import ServerItem from '../components/ServerItem.jsx';

const ServersView = ({ navigation }) => {
  const servers = getServer()
  return (
    <View style={{ flexGrow: 1, backgroundColor: '#111'}}>
      <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => {navigation.navigate("chat")}}>
            <Icon 
                size={32}
                name="arrow-back-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Lista de Servidores</Text>   
            <TouchableOpacity>
            <Icon 
                size={32}
                name="list-outline"
                style={[styles.headerButton, {color:'#111'}]}/>
            </TouchableOpacity>   
        </View>
        {servers != [] ? <FlatList
          data={servers}
          renderItem={({item: server}) => (
            <ServerItem {...server}/>
          )}
          />: <Text>NOOO</Text>}
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

export default ServersView;