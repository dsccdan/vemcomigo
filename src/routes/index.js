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
import UserRegister from '../pages/UserRegister';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Main') {
            iconName = 'car';
          } else if (route.name === 'MyRides') {
            iconName = 'list';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1c1c1c',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Main" component={Main} options={{ title: 'Caronas Disponíveis', headerShown: false }} />
      <Tab.Screen name="MyRides" component={MyRides} options={{ title: 'Minhas Caronas', headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
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
        name="UserRegister"
        component={UserRegister}
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
        options={{ title: 'Oferecer Carona' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: 'Editar Perfil' }}
      />
    </Stack.Navigator>
  );
}
