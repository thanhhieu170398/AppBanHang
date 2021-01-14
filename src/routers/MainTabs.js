import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from '../screen/tabs/MainScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingScreen from '../screen/tabs/SettingScreen';
import FeedScreen from '../screen/tabs/FeedScreen';
import NotificationScreen from '../screen/tabs/NotificationScreen';

const Tab = createBottomTabNavigator();

export default function MainStack() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;

          if (route.name === '1') {
            iconName = 'home';
          }
          if (route.name === '2') {
            iconName = 'newspaper-o';
          }
          if (route.name === '3') {
            iconName = 'bell-o';
          }
          if (route.name === '4') {
            iconName = 'cog';
          }

          return (
            <Icon name={iconName} size={25} color={focused ? '#900' : '#000'} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showLabel: false,
      }}>
      <Tab.Screen name="1" component={MainScreen} />
      <Tab.Screen name="2" component={FeedScreen} />
      <Tab.Screen name="3" component={NotificationScreen} />
      <Tab.Screen name="4" component={SettingScreen} />
    </Tab.Navigator>
  );
}
