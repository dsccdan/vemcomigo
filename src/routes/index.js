import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from '../pages/Welcome'
import SignIn from '../pages/SignIn'
import Main from "../pages/Main"; 
import CreateRide from "../pages/CreateRide";
import EditProfile from "../pages/EditProfile";
import MyRides from "../pages/MyRides";    


const Stack = createNativeStackNavigator(); 

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
            />

            <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
            /> 

            <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
            /> 

            <Stack.Screen
            name="CreateRide"
            component={CreateRide}
            options={{headerShown: false}}
            /> 

            <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{headerShown: false}}
            /> 

            <Stack.Screen
            name="MyRides"
            component={MyRides}
            options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}
