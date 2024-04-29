// React-Native Imports
import React from "react";
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const NewsView = () => {
    return (
        <View style={{flexGrow: 1, backgroundColor: '#111'}}>
          <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => Alert.alert("AÑADE UNA NOTICIA")}>
            <Icon
                size={32}
                name="add-circle-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Novedades</Text>   
            <TouchableOpacity onPress={() => Alert.alert("FILTROS")}>
            <Icon
                size={32}
                name="filter-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>         
        </View>
          <Text>ESTO ES Noticias</Text>
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
export default NewsView