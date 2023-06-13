import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'

const Stack = createNativeStackNavigator()

export default function App() {
    return (    
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerStyle: { backgroundColor: '#2196f3' },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerBackVisible: false,
                    animation: 'slide_from_right',
                    presentation: 'card',
                }}
            >
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Detail' component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}