/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React from 'react';
import {AppRegistry, LogBox, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/routers/AppNavigator';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/store/store';
import Notify from './src/components/Notify';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews',
]);

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar translucent={true} backgroundColor="tomato" />
      <Notify />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
