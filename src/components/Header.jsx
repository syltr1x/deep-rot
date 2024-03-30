import React, { useState } from "react";
import Constants from 'expo-constants';
import { View, Text, StyleSheet, Alert, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

/*--------------------------------------------
------------ CONSTANTES DE ESTILO ------------
----------------------------------------------*/
const btnSize = 32
const HomeHeader = () => {
    return (
        <View style={styles.headerBar}>
            <TouchableOpacity  onPress={() => Alert.alert("TENDRIA QUE IR MI ISOTIPO")}>
            <Icon
                size={btnSize}
                name="bug"
                style={styles.headerButton}
            />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>(Deep-Rot Logotipo)</Text>   
            <TouchableOpacity onPress={() => Alert.alert("EXPLICACION DE APP")}>
            <Icon
                size={btnSize}
                name="help-circle-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>         
        </View>
    )
}
const WorkHeader = () => {
    return (
        <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => Alert.alert("EXPLICACION DE TRABAJOS")}>
            <Icon
                size={btnSize}
                name="add-circle-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>(Deep-Rot Logotipo)</Text>   
            <TouchableOpacity onPress={() => Alert.alert("EXPLICACION DE TRABAJOS")}>
            <Icon
                size={btnSize}
                name="help-circle-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>         
        </View>
    )
}
const ChatHeader = () => {
    return (
        <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => navigation.navigate('AddServer')}>
            <Icon 
                size={btnSize}
                name="add-circle-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>(Deep-Rot Logotipo)</Text>   
            <TouchableOpacity onPress={() => Alert.alert("LISTA DE SERVIDORES")}>
            <Icon 
                size={btnSize}
                name="list-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>   
               
        </View>
    )
}
const NewsHeader = () => {
    return (
        <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => Alert.alert("AÑADE UNA NOTICIA")}>
            <Icon
                size={btnSize}
                name="add-circle-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>(Deep-Rot Logotipo)</Text>   
            <TouchableOpacity onPress={() => Alert.alert("FILTROS")}>
            <Icon
                size={btnSize}
                name="filter-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>         
        </View>
    )
}
const UserHeader = () => {
    return (
        <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => Alert.alert("CAMBIO DE CUENTA")}>
            <Icon
                size={btnSize}
                name="chevron-down"
                style={styles.headerButton}
            />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>(Deep-Rot Logotipo)</Text>   
            <TouchableOpacity onPress={() => Alert.alert("AJUSTES")}>
            <Icon
                size={btnSize}
                name="cog-outline"
                style={styles.headerButton}
            />
            </TouchableOpacity>         
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

export {
    HomeHeader,
    WorkHeader,
    ChatHeader,
    NewsHeader,
    UserHeader
}