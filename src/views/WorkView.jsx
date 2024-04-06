import React from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons'
import Repository from '../components/Repository.jsx'
import repos from "../data/data";

const WorkView = () => {
    return (
      <View style={{flexGrow: 1, backgroundColor:'#111'}}>
          <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => Alert.alert("EXPLICACION DE TRABAJOS")}>
            <Icon
                size={32}
                name="add-circle-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Trabajos</Text>   
            <TouchableOpacity onPress={() => Alert.alert("EXPLICACION DE TRABAJOS")}>
            <Icon
                size={32}
                name="help-circle-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>         
        </View>
          <Text>Deprot App Test</Text>
          <FlatList
          data={repos}
          renderItem={({item: repo}) => (
            <Repository {...repo}/>
          )}
          />
        </View>
    )
}
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
})
export default WorkView