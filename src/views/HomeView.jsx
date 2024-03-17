import React from "react";
import { Text, View } from 'react-native';
import { HomeHeader } from "../components/Header";

const HomeView = () => {
    return (
        <View style={{flexGrow: 1, backgroundColor:'#111'}}>
          <HomeHeader></HomeHeader>
          <Text>Deprot App Test</Text>
        </View>
    )
}

export default HomeView