import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native'
import  Routes from './src/routes/'

export default function App() {
  return (
    <NavigationContainer>
       <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#1c1c1c" barStyle="light-content"/>
      <Routes/>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
