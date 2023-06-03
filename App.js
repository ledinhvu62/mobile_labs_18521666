import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import HomeScreen from './screens/HomeScreen'

const Stack = createNativeStackNavigator()

export default function App() {
    return (    
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Login'
                screenOptions={{
                    headerStyle: { backgroundColor: '#2196f3' },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerBackVisible: false,
                    animation: 'slide_from_right',
                    presentation: 'card',
                }}
            >
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Sign Up' component={SignUpScreen} />
                <Stack.Screen name='Home' component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}