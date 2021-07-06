import React, { FC } from 'react'
import * as Screens from '../screens'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, useNavigation } from '@react-navigation/native'

const Router: FC = () => {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="home" component={Screens.Home} options={{ headerShown: false }} />
                <Stack.Screen name='detail' component={Screens.Detail} options={{ headerShown: false }} />
                <Stack.Screen name='add' component={Screens.Add} options={{ headerShown: false }} />
                <Stack.Screen name='edit' component={Screens.Edit} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router