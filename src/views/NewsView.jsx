import React from "react";
import Constants from 'expo-constants';
import { Text, View } from 'react-native';
import { NewsHeader } from "../components/Header";

const NewsView = () => {
    return (
        <View style={{flexGrow: 1, backgroundColor: '#111'}}>
          <NewsHeader></NewsHeader>
          <Text>ESTO ES Noticias</Text>
        </View>
    )
}
export default NewsView