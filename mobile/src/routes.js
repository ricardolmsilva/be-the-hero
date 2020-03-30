import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator()

import Incidents from './pages/Incidents/index'
import Detail from './pages/Detail'

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode={"none"}>
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer >
  )
}