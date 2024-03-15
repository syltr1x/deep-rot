import React from "react";
import { Text, View } from 'react-native';
import { ChatHeader } from "../components/Header";

const ChatView = () => {
    return (
      <View style={{flexGrow: 1 }}>
          <ChatHeader></ChatHeader>
          <Text>ESTO ES CHAT</Text>
        </View>
    )
}
export default ChatView