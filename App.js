import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './src/screen/LoginScreen';
import HomePageScreen from './src/screen/HomepageScreen';
import ProductScreen from './src/screen/ProductScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider style={{ flexGrow: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomepageScreen" component={HomePageScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
