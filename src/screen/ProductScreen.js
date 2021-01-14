import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  useState,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {formatNumber} from '../commons/format';
import FastImage from 'react-native-fast-image';
import firebase from 'react-native-firebase';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {addToCart} from '../store/cartAction';
import {Button} from 'react-native-paper';

const EditButton = ({isOwner, navigation, product}) => {
  const navigateToEditProduct = () =>
    navigation.navigate('EditProductScreen', {product});
  if (!isOwner) {
    return null;
  }
  return (
    <Button
      onPress={() => navigateToEditProduct()}
      style={styles.buttonNew}
      color="#FFF">
      Sửa sản phẩm
    </Button>
  );
};
const AddCartButton = ({isOwner, navigation, product}) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //     const unsubscriber = firebase.auth().onAuthStateChanged(setUser);
  //     console.log(user)
  //     return () => unsubscriber();
  // }, [])

  const navigateAddCart = useCallback(() => {
    const user = firebase.auth().currentUser;
    if (!user) {
      return navigation.navigate('LoginScreen');
    }
    return navigation.navigate('ShoppingCartScreen');
  }, [navigation]);
  if (!isOwner) {
    return (
      <Button
        onPress={() => {
          dispatch(addToCart(product));
          navigateAddCart();
        }}
        style={styles.buttonNew}
        color="#FFF">
        Thêm vào giỏ hàng
      </Button>
    );
  }
  return null;
};
export default function ProductScreen({route, navigation}) {
  return (
    <ScrollView>
      <SliderBox
        ImageComponentStyle={styles.albumItem}
        ImageComponent={FastImage}
        images={route.params.product.album}
        sliderBoxHeight={256}
        autoplay={true}
        resizeMode="center"
        parentWidth={Dimensions.get('window').width}
      />
      <View style={styles.hasBackGroundWhite}>
        <Text style={styles.itemName}>{route.params.product.name}</Text>
        <Text numberOfLines={1} style={styles.itemPrice}>
          {formatNumber(route.params.product.price)} đ
        </Text>
        <EditButton
          product={route.params.product}
          navigation={navigation}
          isOwner={
            firebase.auth().currentUser &&
            route.params.product.ownerId === firebase.auth().currentUser.uid
          }
        />
        <AddCartButton
          product={route.params.product}
          navigation={navigation}
          isOwner={
            firebase.auth().currentUser &&
            route.params.product.ownerId === firebase.auth().currentUser.uid
          }
        />
      </View>
      <View style={styles.hasBackGroundWhite}>
        <Text style={styles.itemMT}>Mô tả sản phẩm: </Text>
        <Text style={styles.itemTextMT}>
          {route.params.product.description || 'Sản phẩm chưa có mô tả'}
        </Text>
      </View>
      <View style={styles.hasBackGroundWhite}>
        <View style={styles.rowSpace}>
          <Text style={styles.itemMT}>Người đăng:</Text>
          <Text>
            {route.params.product.email || 'hieunguyen1998@gmail.com'}
          </Text>
        </View>
      </View>
      <View style={{height: 10}} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  itemPrice: {
    fontSize: 20,
    color: 'tomato',
    fontWeight: 'bold',
  },
  itemName: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  itemMT: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemTextMT: {
    fontSize: 14,
  },
  text: {
    fontSize: 20,
    color: '#FFF',
  },
  buttonNew: {
    borderColor: 'tomato',
    backgroundColor: 'tomato',
    paddingVertical: 2,
    fontSize: 18,
    marginTop: 5,
  },
  albumItem: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  hasBackGroundWhite: {
    backgroundColor: '#FFF',
    marginTop: 5,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  rowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
