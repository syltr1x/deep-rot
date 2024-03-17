import React from "react"
import { View, StyleSheet, Text, Image} from "react-native"

const Repository = (props) => (
    <View key={props.id} style={RepoStyles.repository}>
        <Image
        style={RepoStyles.image}
        source={props.imageicon !== "" ? { uri: props.imageicon } : require('../data/block.png')}
        ></Image>
        <View style={RepoStyles.textView}>
            <Text style={RepoStyles.title}>{props.title}</Text>
            <Text style={RepoStyles.desc}>{props.description}</Text>
            <View style={RepoStyles.footer}>
                <Text style={RepoStyles.ftrText}>by: {props.author}</Text>
                <Text style={RepoStyles.ftrText}>{props.date}  </Text>
            </View>
        </View>    
    </View>
)

const RepoStyles = StyleSheet.create({
    repository:{
        // Estructura
        flexDirection: 'row',
        backgroundColor:'#222',
        margin: 15,
        padding: 4,
        // Bordes
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#444',
        borderStyle:'solid'
    },
    textView: {
        flex: 1,
        marginLeft: 12,
        flexDirection:'column',
    },  
    title:{
        color: '#f0f0f0',
        fontSize:16,
        fontWeight:'bold'
    },
    desc:{
        color: '#ccc',
        fontSize:13,
    },
    footer:{
        marginTop: 7,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    ftrText:{
        color: '#aaa',
        fontSize: 11
    },
    image:{
        height:70,
        width:70,
    }
})
export default Repository