import React from "react";
import { Text, View, StyleSheet, FlatList} from 'react-native';
import { WorkHeader } from "../components/Header";
import Repository from '../components/Repository.jsx'
import repos from "../data/data";

const WorkView = () => {
    return (
      <View style={{flexGrow: 1 }}>
          <WorkHeader></WorkHeader>
          <FlatList
          data={repos}
          ItemSeparatorComponent={() => <Text></Text>}
          renderItem={({item: repo}) => (
            // <Text>{repo.title}</Text>
            <Repository {...repo}/>
          )}
          />
        </View>
    )
}
export default WorkView