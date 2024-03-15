import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTab } from './src/components/BottomBar';
import { setStatusBarStyle } from 'expo-status-bar';
setStatusBarStyle('light')

const App = () => {
  return (
    <NavigationContainer>
      <BottomTab/>
    </NavigationContainer>
  )
}

export default App