import React from "react";
import Constants from 'expo-constants';
import { Text, View } from 'react-native';

const NewsView = () => {
    return (
        <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
          <Text>ESTO ES Noticias</Text>
        </View>
    )
}
export default NewsView