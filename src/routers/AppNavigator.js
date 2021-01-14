import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import MainTabs from './MainTabs';
import LoginScreen from '../screen/auth/LoginScreen';
import RegisterScreen from '../screen/auth/RegisterScreen';
import ProductLikeScreen from '../screen/setting/ProductLikeScreen';
import ShoppingCartScreen from '../screen/setting/ShoppingCartScreen';
import ShoppingBagScreen from '../screen/setting/ShoppingBagScreen';
import ProductScreen from '../screen/ProductScreen';
import AddProductScreen from '../screen/AddProductScreen';
import EditProductScreen from '../screen/EditProductScreen';
import CartScreen from '../screen/setting/CartScreen';
import CategoryScreen from '../screen/CategoryScreen';
import InvoidScreen from '../screen/setting/InvoidScreen';
import MyOrderScreen from '../screen/setting/MyOrderScreen';
// import PayScreen from '../screen/PayScreen'
const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{headerTitle: 'Trang chủ', headerShown: false}}
      name="MainTabs"
      component={MainTabs}
    />
    <Stack.Screen
      options={{
        headerTitle: 'Đăng nhập',
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: 'tomato'},
        headerTitleStyle: {color: '#FFF'},
        headerTintColor: '#FFF',
        ...TransitionPresets.SlideFromRightIOS,
      }}
      name="LoginScreen"
      component={LoginScreen}
    />
    <Stack.Screen
      options={{
        headerTitle: 'Đăng ký',
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: 'tomato'},
        headerTitleStyle: {color: '#FFF'},
        headerTintColor: '#FFF',
        ...TransitionPresets.SlideFromRightIOS,
      }}
      name="RegisterScreen"
      component={RegisterScreen}
    />
    <Stack.Screen
      options={{
        headerTitle: 'Chi Tiết Sản Phẩm',
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: 'tomato'},
        headerTitleStyle: {color: '#FFF'},
        headerTintColor: '#FFF',
        ...TransitionPresets.SlideFromRightIOS,
      }}
      name="ProductScreen"
      component={ProductScreen}
    />
    <Stack.Screen
      options={{
        headerTitle: 'Thêm sản phẩm',
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: 'tomato'},
        headerTitleStyle: {color: '#FFF'},
        headerTintColor: '#FFF',
        ...TransitionPresets.SlideFromRightIOS,
      }}
      name="AddProductScreen"
      component={AddProductScreen}
    />
    <Stack.Screen
      options={{
        headerTitle: 'Sửa sản phẩm',
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: 'tomato'},
        headerTitleStyle: {color: '#FFF'},
        headerTintColor: '#FFF',
        ...TransitionPresets.SlideFromRightIOS,
      }}
      name="EditProductScreen"
      component={EditProductScreen}
    />
    <Stack.Screen
      options={{
        headerTitle: 'Thanh toán',
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: 'tomato'},
        headerTitleStyle: {color: '#FFF'},
        headerTintColor: '#FFF',
        ...TransitionPresets.SlideFromRightIOS,
      }}
      name="CartScreen"
      component={CartScreen}
    />
    <Stack.Screen
      options={{
        headerTitle: 'Sản phẩm',
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: 'tomato'},
        headerTitleStyle: {color: '#FFF'},
        headerTintColor: '#FFF',
        ...TransitionPresets.SlideFromRightIOS,
      }}
      name="CategoryScreen"
      component={CategoryScreen}
    />
    {/* <Stack.Screen options={{ headerTitle: "Thanh toán", ...TransitionPresets.SlideFromRightIOS }} name="PayScreen" component={PayScreen} /> */}
    <Stack.Screen
      name="ProductLikeScreen"
      options={{
        headerTitle: 'Sản phẩm yêu thích',
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: 'tomato'},
        headerTitleStyle: {color: '#FFF'},
        headerTintColor: '#FFF',
        ...TransitionPresets.SlideFromRightIOS,
      }}
      component={ProductLikeScreen}
    />
    <Stack.Screen
      options={{
        headerTitle: 'Danh sách đơn hàng',
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: 'tomato'},
        headerTitleStyle: {color: '#FFF'},
        headerTintColor: '#FFF',
        ...TransitionPresets.SlideFromRightIOS,
      }}
      name="InvoidScreen"
      component={InvoidScreen}
    />
      <Stack.Screen
        options={{
            headerTitle: 'Đơn hàng của tôi',
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: 'tomato'},
            headerTitleStyle: {color: '#FFF'},
            headerTintColor: '#FFF',
            ...TransitionPresets.SlideFromRightIOS,
        }}
        name="MyOrderScreen"
        component={MyOrderScreen}
      />
    <Stack.Screen
      options={{
        headerTitle: 'Giỏ hàng',
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: 'tomato'},
        headerTitleStyle: {color: '#FFF'},
        headerTintColor: '#FFF',
        ...TransitionPresets.SlideFromRightIOS,
      }}
      name="ShoppingCartScreen"
      component={ShoppingCartScreen}
    />
    <Stack.Screen
      name="ShoppingBagScreen"
      options={{
        headerTitle: 'Sản phẩm của tôi',
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: 'tomato'},
        headerTitleStyle: {color: '#FFF'},
        headerTintColor: '#FFF',
        ...TransitionPresets.SlideFromRightIOS,
      }}
      component={ShoppingBagScreen}
    />
  </Stack.Navigator>
);

export default AppNavigator;
