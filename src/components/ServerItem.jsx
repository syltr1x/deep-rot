import React from "react"
import { View, StyleSheet, Text, TouchableOpacity} from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import { connect, delServer } from "../views/ChatView";

const ServerItem = (props) => (
    <View key={props.name} style={ServerStyles.serverBox}>
        <View>
            <Text style={ServerStyles.serverName}>{props.name}</Text>
            <Text style={ServerStyles.serverText}>Direccion: {props.ip}:{props.port}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity
            onPress={() => {delServer(props.name, props.ip, props.port)}}
                style={[ServerStyles.ServerBtn, {backgroundColor: '#944'}]}
                ><Icon
                size={28}
                name='trash-outline'
                ></Icon>
            </TouchableOpacity>
            <TouchableOpacity
                style={[ServerStyles.ServerBtn, {backgroundColor: '#288'}]}
                ><Icon
                size={28}
                name='pencil'
                ></Icon>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {connect(props.ip, props.port)}}
                style={[ServerStyles.ServerBtn, {backgroundColor: '#494'}]}
            ><Icon
                size={28}
                name='checkmark-outline'
                ></Icon>
            </TouchableOpacity>
        </View>
    </View>
)

const ServerStyles = StyleSheet.create({
    serverBox:{
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        backgroundColor:'#222',
        margin: 15,
        overflow: 'hidden',
        padding: 7,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#444',
        borderStyle:'solid',
    },
    serverName: {
        color: '#fff',
        fontWeight:'bold'
    },
    serverText:{
        fontSize: 12,
        color: '#a0a0a0'
    },
    ServerBtn:{
        padding: 6,
        marginLeft: 8,
        marginRight: 4,
        borderColor: '#666',
        borderWidth: 1,
        borderRadius: 7,
    }
})

export default ServerItem