import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Homescreen from './src/screen/HomeScreen';


const Stack = createStackNavigator();


const App = () => {
  return (
    <SafeAreaProvider
      style={{
        flexGrow: 1,
      }}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Homescreen" 
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Homescreen" component={Homescreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};


export default App;