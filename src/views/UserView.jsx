import React from "react";
import Constants from 'expo-constants';
import { Text, View } from 'react-native';

const UserView = () => {
    return (
        <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
          <Text>ESTO ES EL USUARIO</Text>
        </View>
    )
}
export default UserView