import React from "react"
import { View, StyleSheet, Text, TouchableOpacity} from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import { connect, delServer, getServer, disconnect, swapServer} from "../backend/ServerFunctions";

const ServerItem = (props) => {
    const [server, setServer] = React.useState([]);
    React.useEffect(() => {
        const fetchedServer = getServer();
        setServer(fetchedServer);
        return () => {};
        }, [])
    return (
        <View key={props.name} style={ServerStyles.serverBox}>
            <View>
                <Text style={ServerStyles.serverName}>{props.name}</Text>
                <Text style={ServerStyles.serverText}>Direccion: {props.ip}:{props.port}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                onPress={() => {delServer(props.name, props.ip, props.port, props.man)}}
                    style={[ServerStyles.ServerBtn, {backgroundColor: '#944'}]}
                    ><Icon
                    size={28}
                    name='trash-outline'
                    ></Icon>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {swapServer(props.name, props.ip, props.port); props.log.navigate("modserver")}}
                    style={[ServerStyles.ServerBtn, {backgroundColor: '#499'}]}
                    ><Icon
                    size={28}
                    name='pencil'
                    ></Icon>
                </TouchableOpacity>
                {server.name != props.name || server.ip != props.ip ?
                <TouchableOpacity
                    onPress={() => {connect(props.name, props.ip, props.port, setServer)}}
                    style={[ServerStyles.ServerBtn, {backgroundColor: '#494'}]}
                ><Icon
                    size={28}
                    name='checkmark-outline'
                    ></Icon>
                </TouchableOpacity>: 
                <TouchableOpacity
                    onPress={() => {disconnect(setServer)}}
                    style={[ServerStyles.ServerBtn, {backgroundColor: '#944'}]}
                ><Icon
                    size={28}
                    name='close-outline'
                    ></Icon>
                </TouchableOpacity>}
            </View>
        </View>
    )
}

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