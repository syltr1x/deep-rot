import React from "react";
import { Text, View, FlatList } from 'react-native';
import { HomeHeader } from "../components/Header";
import Repository from '../components/Repository.jsx'
import repos from "../data/data";

const HomeView = () => {
    return (
        <View style={{flexGrow: 1, backgroundColor:'#111'}}>
          <HomeHeader></HomeHeader>
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

export default HomeView