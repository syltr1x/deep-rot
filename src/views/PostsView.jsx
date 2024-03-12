import React from "react";
import Constants from 'expo-constants';
import { Text, View } from 'react-native';

const PostsView = () => {
    return (
        <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
          <Text>ESTO ES Posts</Text>
        </View>
    )
}
export default PostsView