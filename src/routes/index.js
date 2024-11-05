import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';

import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import Main from "../pages/Main";
import CreateRide from "../pages/CreateRide";
import EditProfile from "../pages/EditProfile";
import MyRides from "../pages/MyRides";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Caronas Disponíveis') {
            iconName = 'car';
          } else if (route.name === 'Minhas Caronas') {
            iconName = 'list';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1c1c1c',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Caronas Disponíveis" component={Main} options={{ headerShown: false }} />
      <Tab.Screen name="Minhas Caronas" component={MyRides} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}  // Usa o BottomTabs como uma tela na pilha
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateRide"
        component={CreateRide}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
