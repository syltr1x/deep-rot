import React from "react";
import Constants from 'expo-constants';
import { View, Text, StyleSheet, Alert, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const HomeView = () => {
    return (
        <View style={{flexGrow: 1, backgroundColor:'#111'}}>
           <View style={styles.headerBar}>
            <TouchableOpacity  onPress={() => Alert.alert("TENDRIA QUE IR MI ISOTIPO")}>
            <Icon
                size={32}
                name="bug"
                style={styles.headerButton}
            />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Vista Principal</Text>   
            <TouchableOpacity onPress={() => Alert.alert("EXPLICACION DE APP")}>
            <Icon
                size={32}
                name="help-circle-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>         
        </View>
          <Text>Deprot App Test</Text>
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

export default HomeView