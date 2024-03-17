import React from "react";
import Constants from 'expo-constants';
import { View, Text, StyleSheet, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

/*--------------------------------------------
------------ CONSTANTES DE ESTILO ------------
----------------------------------------------*/
const btnSize = 32
const HomeHeader = () => {
    return (
        <View style={styles.headerBar}>
            <Icon.Button
                size={btnSize}
                name="bug"
                style={styles.headerButton}
                onPress={() => Alert.alert("TENDRIA QUE IR MI ISOTIPO")}
            ></Icon.Button>
            <Text style={styles.headerTitle}>(Deep-Rot Logotipo)</Text>   
            <Icon.Button
                size={btnSize}
                name="help-circle-outline"
                style={styles.headerButton}
                onPress={() => Alert.alert("EXPLICACION DE APP")}
            ></Icon.Button>         
        </View>
    )
}
const WorkHeader = () => {
    return (
        <View style={styles.headerBar}>
            <Icon.Button
                size={btnSize}
                name="add-circle-outline"
                style={styles.headerButton}
            ></Icon.Button>
            <Text style={styles.headerTitle}>(Deep-Rot Logotipo)</Text>   
            <Icon.Button
                size={btnSize}
                name="help-circle-outline"
                style={styles.headerButton}
                onPress={() => Alert.alert("EXPLICACION DE TRABAJOS")}
            ></Icon.Button>         
        </View>
    )
}
const ChatHeader = () => {
    return (
        <View style={styles.headerBar}>
            <Icon.Button
                size={btnSize}
                name="add-circle-outline"
                style={styles.headerButton}
                onPress={() => Alert.alert("AÑADIRIA UN CHAT")}
            ></Icon.Button>
            <Text style={styles.headerTitle}>(Deep-Rot Logotipo)</Text>   
            <Icon.Button
                size={btnSize}
                name="help-circle-outline"
                style={styles.headerButton}
                onPress={() => Alert.alert("EXPLICACION DE CHAT")}
            ></Icon.Button>         
        </View>
    )
}
const NewsHeader = () => {
    return (
        <View style={styles.headerBar}>
            <Icon.Button
                size={btnSize}
                name="add-circle-outline"
                style={styles.headerButton}
                onPress={() => Alert.alert("AÑADE UNA NOTICIA")}
            ></Icon.Button>
            <Text style={styles.headerTitle}>(Deep-Rot Logotipo)</Text>   
            <Icon.Button
                size={btnSize}
                name="filter-outline"
                style={styles.headerButton}
                onPress={() => Alert.alert("FILTROS")}
            ></Icon.Button>         
        </View>
    )
}
const UserHeader = () => {
    return (
        <View style={styles.headerBar}>
            <Icon.Button
                size={btnSize}
                name="chevron-down"
                style={styles.headerButton}
                onPress={() => Alert.alert("CAMBIO DE CUENTA")}
            ></Icon.Button>
            <Text style={styles.headerTitle}>(Deep-Rot Logotipo)</Text>   
            <Icon.Button
                size={btnSize}
                name="cog-outline"
                style={styles.headerButton}
                onPress={() => Alert.alert("AJUSTES")}
            ></Icon.Button>         
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
        backgroundColor: '#111'
    }
})

export {
    HomeHeader,
    WorkHeader,
    ChatHeader,
    NewsHeader,
    UserHeader
}