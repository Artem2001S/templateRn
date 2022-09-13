import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackRoutes} from './routes';
import MainScreen from '../../screens/MainScreen/MainScreen';

const RootStack = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name={RootStackRoutes.Main} component={MainScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
