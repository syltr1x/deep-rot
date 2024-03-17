import React from "react";
import Constants from 'expo-constants';
import { Text, View } from 'react-native';
import { UserHeader } from "../components/Header";

const UserView = () => {
    return (
        <View style={{flexGrow: 1 , backgroundColor: '#111'}}>
          <UserHeader></UserHeader>
          <Text>ESTO ES EL USUARIO</Text>
        </View>
    )
}
export default UserView