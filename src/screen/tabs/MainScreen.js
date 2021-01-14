import * as React from 'react';
import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import FastImage from 'react-native-fast-image';
import {formatNumber} from '../../commons/format';
import {Fumi} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import LoadingComponent from '../../components/LoadingComponent';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {success} from '../../store/notifyAction';
import {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

function HomeScreen(props) {
  const cart = useSelector((state) => state.cart);
  const [products, setProducts] = React.useState([]);
  const [productsSearch, setProductsSearch] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const lastChange = React.useRef(new Date());
  const timeOutId = React.useRef(null);
  const navigateToProduct = (product) =>
    props.navigation.navigate('ProductScreen', {product});
  const navigateToProductCate = (category) =>
    props.navigation.navigate('CategoryScreen', {category});
  const [value, onChangeSearch] = React.useState('');
  React.useEffect(() => {
    if (timeOutId.current) {
      clearTimeout(timeOutId.current);
    }
    if (value) {
      timeOutId.current = setTimeout(() => {
        firebase
          .firestore()
          .collection('products')
          .orderBy('name')
          .where('name', '>=', value)
          .where('name', '<=', value + '\uf8ff')
          .get()
          .then((snapShot) => {
            const data = [];
            snapShot.forEach((doc) => data.push({id: doc.id, ...doc.data()}));
            setProductsSearch(data);
          });
      }, 300);
    }
  }, [value]);

  React.useEffect(() => {
    firebase.messaging().subscribeToTopic('ALL_NOTIFICATION');
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        console.log('Co quyen thong bao');

        // User has authorised
      })
      .catch((error) => {
        console.log('Khong co quyen thong bao');
        // User has rejected permissions
      });

    return firebase.notifications().onNotification(async (notification) => {
      notification.android.setChannelId('storeapp_default_channel');
      await firebase.notifications().displayNotification(notification);
    });
  }, []);

  useEffect(() => {
    return firebase
      .firestore()
      .collection('products')
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges.forEach((change) => {
          if (change.type === 'added') {
            setProducts((prevState) =>
              prevState.findIndex((i) => i.id === change.doc.id) > -1
                ? prevState
                : [...prevState, {id: change.doc.id, ...change.doc.data()}],
            );
          }
          if (change.type === 'modified') {
            setProducts((prevState) =>
              prevState.map((product) => {
                if (product.id === change.doc.id) {
                  return {
                    ...product,
                    ...change.doc.data(),
                  };
                }
                return product;
              }),
            );
          }
          if (change.type === 'removed') {
            setProducts((prevState) =>
              prevState.filter((product) => product.id !== change.doc.id),
            );
          }
        });
      });
  }, []);

  useEffect(() => {
    return firebase
      .firestore()
      .collection('category')
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges.forEach((change) => {
          if (change.type === 'added') {
            setCategory((prevState) =>
              prevState.findIndex((i) => i.id === change.doc.id) > -1
                ? prevState
                : [...prevState, {id: change.doc.id, ...change.doc.data()}],
            );
          }
          if (change.type === 'modified') {
            setCategory((prevState) =>
              prevState.map((category) => {
                if (category.id === change.doc.id) {
                  return {
                    ...category,
                    ...change.doc.data(),
                  };
                }
                return category;
              }),
            );
          }
          if (change.type === 'removed') {
            setCategory((prevState) =>
              prevState.filter((category) => category.id !== change.doc.id),
            );
          }
        });
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Fumi
          label={'Nhập sản phẩm muốn tìm kiếm'}
          iconClass={FontAwesomeIcon}
          iconName={'search'}
          style={styles.search}
          iconColor={'#f95a25'}
          Color={'tomato'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          onChangeText={(text) => onChangeSearch(text)}
          value={value}
        />
        <Pressable
          onPress={() => props.navigation.navigate('ShoppingCartScreen')}
          style={styles.cart}>
          <Icon size={24} name="shopping-cart" />
          <Text style={styles.badge}>{cart.length}</Text>
        </Pressable>
      </View>
      <ScrollView
        style={styles.container}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={'always'}>
        <Text style={styles.text}>Danh mục sản phẩm</Text>

        <FlatGrid
          data={category}
          itemDimension={80}
          style={styles.gridView}
          scrollEnabled={false}
          // staticDimension={300}
          // fixed
          spacing={5}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Pressable
              onPress={() => navigateToProductCate(item)}
              style={[styles.itemContainerCate]}>
              <FastImage
                style={styles.img}
                source={{
                  uri: item.image,
                }}
              />

              <Text style={styles.itemNameCate}>{item.name}</Text>
              {/* <Text style={styles.itemCodeCate}>{item.code}</Text> */}
            </Pressable>
          )}
        />
        <Text style={styles.text2}>Sản phẩm bán chạy</Text>
        <FlatGrid
          data={value ? productsSearch : products}
          itemDimension={130}
          style={styles.gridView}
          spacing={5}
          ListEmptyComponent={() => <LoadingComponent isLoading={true} />}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Pressable
              onPress={() => navigateToProduct(item)}
              style={styles.itemContainer}>
              <FastImage
                resizeMode={FastImage.resizeMode.center}
                style={styles.img}
                source={{
                  uri: item.logo,
                }}
              />
              <Text numberOfLines={2} style={styles.itemName}>
                {item.name}
              </Text>
              <Text numberOfLines={1} style={styles.itemPrice}>
                {formatNumber(item.price)} đ
              </Text>
            </Pressable>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridView: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    padding: 10,
    height: 200,
    borderRadius: 3,
  },
  itemName: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
    height: 36,
    textAlignVertical: 'bottom',
  },
  itemPrice: {
    fontSize: 17,
    color: 'tomato',
    fontWeight: 'bold',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000000',
  },
  img: {
    flex: 1,
    margin: 5,
  },
  text: {
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  text2: {
    marginTop: 0,
    marginBottom: 5,
    marginHorizontal: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemContainerCate: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    padding: 10,
    height: 80,
    borderRadius: 3,
  },
  itemNameCate: {
    textAlign: 'center',
    fontSize: 12,
    color: '#000000',
    fontWeight: '600',
  },
  itemCate: {
    fontSize: 20,
    color: 'tomato',
    fontWeight: 'bold',
  },
  itemCodeCate: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    flex: 1,
  },
  cart: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    height: '100%',
    paddingTop: 20,
  },
  badge: {
    height: 20,
    width: 20,
    backgroundColor: 'tomato',
    position: 'absolute',
    borderRadius: 10,
    fontSize: 12,
    paddingLeft: 7,
    paddingTop: 1,
    right: 7,
    top: 7,
    color: '#FFF',
  },
});

export default HomeScreen;
