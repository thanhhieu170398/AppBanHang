import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const DATA = [
  {
    id: '1',
    title: 'Quản lý đơn hàng',
    icon: 'file-text-o',
    screen: 'InvoidScreen',
  },
  {
    id: '2',
    title: 'Đơn hàng của tôi',
    icon: 'shopping-cart',
    screen: 'MyOrderScreen',
  },
  {
    id: '3',
    title: 'Sản phẩm của tôi',
    icon: 'shopping-bag',
    screen: 'ShoppingBagScreen',
  },
];
// const Item = ({ title, onPress, style }) => (
//   <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
//     <Text style={styles.title}>{title}</Text>
//   </TouchableOpacity>
// );
const handleScreen = (user, navigation, screen) => {
  if (!user) {
    return navigation.navigate('LoginScreen');
  }
  navigation.navigate(screen);
  // console.log(screen)
};

export default function SettingScreen({navigation}) {
  const [user, setUser] = useState(firebase.auth().currentUser);
  const Item = ({title, icon, screen}) => (
    <TouchableOpacity
      onPress={() => handleScreen(user, navigation, screen)}
      style={[styles.item]}>
      <Icon style={styles.iconSetting} name={icon} size={25} color={'#000'} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const unsubscriber = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      if (user){
        firebase.messaging().subscribeToTopic(user.uid);
      }
    });
    return () => unsubscriber();
  }, [user]);

  const renderItem = ({item}) => (
    <Item title={item.title} icon={item.icon} screen={item.screen} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Image
          style={styles.imageLogo}
          source={{
            uri:
              'https://cdn1.iconfinder.com/data/icons/shopping-and-ecommerce-1-2/512/25-512.png',
          }}
        />
        <View>
          <Text>Chào mừng {user ? user.email : 'bạn đến với chúng tôi'}</Text>
          <Pressable
            onPress={() => {
              if (!user) {
                return navigation.navigate('LoginScreen');
              }
              firebase.messaging().unsubscribeFromTopic(firebase.auth().currentUser.uid);
              return firebase.auth().signOut();
            }}>
            <Text style={styles.textTitle}>
              {user ? 'Đăng xuất' : 'Đăng nhập/Đăng ký'}
            </Text>
          </Pressable>
        </View>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    //   marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  topView: {
    padding: 30,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
    color: 'tomato',
    fontSize: 20,
  },
  imageLogo: {
    height: 64,
    width: 64,
    marginRight: 20,
  },
  iconSetting: {
    marginRight: 10,
  },
});
