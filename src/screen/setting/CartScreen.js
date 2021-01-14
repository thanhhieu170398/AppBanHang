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
import firebase from 'react-native-firebase';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {formatNumber} from '../../commons/format';
import FastImage from 'react-native-fast-image';
import {success, error} from '../../store/notifyAction';
import {removeAllCart} from '../../store/cartAction';
import EmptyComponent from '../../components/EmptyComponent';
import {groupByKey} from '../../commons/method';

export default function InvoidScreen({navigation}) {
  const navigatePay = () => navigation.navigate('PayScreen');
  const [isLoading, setLoading] = React.useState(false);
  const [fullname, onChangeName] = React.useState('');
  const [phone, onChangePhone] = React.useState('');
  const [address, onChangeAddress] = React.useState('');
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const total = cart.reduce((S, item) => S + item.price * item.amount, 0);
  const addPay = useCallback(() => {
    if (!fullname) {
      return dispatch(
        error({title: 'Thông báo', description: 'Vui lòng nhập họ tên'}),
      );
    }
    if (!phone) {
      return dispatch(
        error({
          title: 'Thông báo',
          description: 'Vui lòng nhập số điện thoại',
        }),
      );
    }
    if (!address) {
      return dispatch(
        error({title: 'Thông báo', description: 'Vui lòng nhập địa chỉ'}),
      );
    }
    setLoading(true);
    const batch = firebase.firestore().batch();
    const groupedCart = groupByKey(cart, 'ownerId');
    Object.keys(groupedCart).map((shopId) => {
      const receiptRef = firebase.firestore().collection('receipts').doc();
      batch.set(receiptRef, {
        shopId,
        products: groupedCart[shopId],
        total: groupedCart[shopId].reduce(
          (S, item) => S + item.price * item.amount,
          0,
        ),
        fullname,
        phone,
        address,
        ownerId: firebase.auth().currentUser.uid,
        email: firebase.auth().currentUser.email,
      });
    });
    batch
      .commit()
      .then(() => {
        navigation.goBack();
        dispatch(removeAllCart());
        dispatch(
          success({title: 'Thông báo', description: 'Đặt hàng thành công'}),
        );
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        dispatch(error({title: 'Thông báo', description: 'Đặt hàng thất bại'}));
      });
  }, [address, cart, dispatch, fullname, navigation, phone]);
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.text}>Nhập thông tin nhận hàng</Text>
        <View style={styles.hasBackGroundWhite}>
          <TextInput
            style={styles.textinput}
            mode="outlined"
            label="Tên người nhận"
            onChangeText={onChangeName}
            value={fullname}
          />
          <TextInput
            style={styles.textinput}
            mode="outlined"
            label="Số điện thoại"
            keyboardType={'phone-pad'}
            onChangeText={onChangePhone}
            value={phone}
          />
          <TextInput
            style={styles.textinput}
            mode="outlined"
            label="Địa chỉ nhận hàng"
            onChangeText={onChangeAddress}
            value={address}
          />
        </View>
      </View>
      <Text style={styles.text}>Sản phẩm</Text>
      <View>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <EmptyComponent title="Không có sản phẩm nào tron giỏ hàng" />
          )}
          renderItem={({item}) => (
            <View style={[styles.hasBackGroundWhite, styles.row]}>
              <FastImage style={styles.image} source={{uri: item.logo}} />
              <View style={styles.row1}>
                <View style={styles.row2}>
                  <Text numberOfLines={2} style={styles.itemtext}>
                    {item.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.itemPrice}>
                    {formatNumber(item.price)} đ{' '}
                    <Text style={styles.hasTextGreen}>x {item.amount}</Text>
                  </Text>
                  <View style={styles.rowSpace}>
                    <Text style={styles.font14}>Thành tiền:</Text>
                    <Text numberOfLines={1} style={styles.itemPrice}>
                      {formatNumber(item.price * item.amount)} đ{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.hasBackGroundWhite}>
        <View style={styles.priceContainer}>
          <Text style={styles.font16}>Thành tiền: </Text>
          <Text numberOfLines={1} style={styles.itemPrice}>
            {formatNumber(total)} đ
          </Text>
        </View>
        <View>
          <Button
            color={'#FFF'}
            style={styles.buttonNew}
            loading={isLoading}
            disabled={isLoading}
            onPress={addPay}>
            Đặt hàng
          </Button>
        </View>
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
    marginTop: 1,
    backgroundColor: '#FFF',
  },
  row2: {
    flex: 1,
  },
  row3: {
    flexDirection: 'row',
    backgroundColor: '#ebf0ec',
    width: 75,
  },

  itemPrice: {
    fontSize: 18,
    color: 'tomato',
    fontWeight: 'bold',
  },

  text1: {
    paddingHorizontal: 10,
  },
  itemtext: {
    // marginVertical: 5,
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
  textCart: {
    fontSize: 20,
    color: '#FFF',
  },
  text: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  textinput: {
    margin:5
  },
  hasTextGreen: {
    color: 'green',
  },
  rowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  font14: {
    fontSize: 14,
  },
});
