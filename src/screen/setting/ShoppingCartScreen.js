import React, {useCallback} from 'react';
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
  Alert,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {
  minusProduct,
  plusProduct,
  removeFromCart,
} from '../../store/cartAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import {formatNumber} from '../../commons/format';
import firebase from 'react-native-firebase';
import EmptyComponent from '../../components/EmptyComponent';
import {Button} from 'react-native-paper';

export default function ShoppingCartScreen({navigation}) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const total = cart.reduce((S, item) => S + item.price * item.amount, 0);
  const addPay = useCallback(() => {
    firebase
      .firestore()
      .collection('receipts')
      .doc()
      .set({
        products: cart,
        total,
        ownerId: firebase.auth().currentUser.uid,
        email: firebase.auth().currentUser.email,
      })
      .then(() => navigation.goBack())
      .catch((error) => Alert.alert('Lỗi rồi', error.message));
  }, [cart, navigation, total]);
  const navigateProductCart = () => navigation.navigate('CartScreen');
  return (
    <ScrollView style={styles.container}>
      <View>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <View style={styles.hasBackGroundWhite}>
              <EmptyComponent title="Không có sản phẩm nào trong giỏ hàng" />
            </View>
          )}
          renderItem={({item}) => (
            <View style={[styles.hasBackGroundWhite, styles.row]}>
              <FastImage style={styles.image} source={{uri: item.logo}} />
              <View style={styles.row1}>
                <View style={styles.row2}>
                  <View style={[styles.row, styles.spaceBetween]}>
                    <Text numberOfLines={2} style={styles.itemtext}>
                      {item.name}
                    </Text>
                    <View>
                      <Pressable
                        style={styles.text1}
                        onPress={() => dispatch(removeFromCart(item.id))}>
                        <Icon size={24} name="trash-o" />
                      </Pressable>
                    </View>
                  </View>
                  <View style={[styles.row, styles.spaceBetween]}>
                    <Text numberOfLines={1} style={[styles.hasColorBlack]}>
                      Đơn giá
                    </Text>
                    <Text style={[styles.itemPrice, styles.hasColorRed]}>
                      {formatNumber(item.price)} đ
                    </Text>
                  </View>
                  <View style={styles.rowSpace}>
                    <Text style={[styles.hasColorBlack]}>Số lượng</Text>
                    <View style={[styles.rowSpace, {marginTop: 5}]}>
                      <Pressable onPress={() => dispatch(minusProduct(item))}>
                        <Icon size={24} name="minus-square-o" />
                      </Pressable>
                      <Text style={styles.text}>{item.amount}</Text>
                      <Pressable onPress={() => dispatch(plusProduct(item))}>
                        <Icon size={24} name="plus-square-o" />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.hasBackGroundWhite}>
        <View style={styles.priceContainer}>
          <Text>Thành tiền:</Text>
          <Text numberOfLines={1} style={styles.itemPrice}>
            {formatNumber(total)} đ
          </Text>
        </View>
        <Button
          color="#FFF"
          disabled={!cart.length}
          onPress={navigateProductCart}
          style={styles.buttonNew}>
          Tiến hành đặt hàng
        </Button>
      </View>
      <View style={{height: 20}} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 92,
    width: 92,
  },
  row: {
    flexDirection: 'row',
  },
  row1: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row2: {
    flex: 1,
  },
  row3: {
    flexDirection: 'row',
    marginTop: 10,
    width: 75,
  },

  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'tomato',
  },

  hasColorRed: {
    color: 'tomato',
  },

  hasColorBlack: {
    color: '#000',
    fontSize: 14,
  },

  text: {
    paddingHorizontal: 10,
  },
  text1: {
    paddingHorizontal: 10,
  },
  itemtext: {
    fontSize: 15,
    fontWeight: 'bold',
    height: 40,
    flex: 1,
  },
  button: {
    marginBottom: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    fontSize: 18,
    backgroundColor: 'tomato',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'tomato',
    paddingVertical: 10,
  },
  textCart: {
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
  spaceBetween: {
    justifyContent: 'space-between',
  },
});
