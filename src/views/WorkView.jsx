import React from "react";
import { Text, View, StyleSheet, FlatList} from 'react-native';
import { WorkHeader } from "../components/Header";
import Repository from '../components/Repository.jsx'
import repos from "../data/data";

const WorkView = () => {
    return (
      <View style={{flexGrow: 1, backgroundColor:'#111'}}>
          <WorkHeader></WorkHeader>
          <Text>Deprot App Test</Text>
          <FlatList
          data={repos}
          renderItem={({item: repo}) => (
            <Repository {...repo}/>
          )}
          />
        </View>
    )
}
export default WorkView