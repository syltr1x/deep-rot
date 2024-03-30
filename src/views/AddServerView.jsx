// AddServerView.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddServerView = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Añadir un servidor</Text>
      {/* Botón de regreso al chat */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="close-outline" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default AddServerView;