import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
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
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import FastImage from 'react-native-fast-image';
import {formatNumber} from '../../commons/format';
import firebase from 'react-native-firebase';
import LoadingComponent from '../../components/LoadingComponent';
import {Button} from 'react-native-paper';

export default function ShoppingBagScreen({navigation}) {
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    const removeListener = firebase
      .firestore()
      .collection('products')
      .where('ownerId', '==', firebase.auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        if (!querySnapshot.docs.length) {
          setIsLoading(false);
        }
        querySnapshot.docChanges.forEach((change) => {
          setIsLoading(false);
          if (change.type === 'added') {
            setProducts((prevState) => [
              ...prevState,
              {id: change.doc.id, ...change.doc.data()},
            ]);
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
    return () => removeListener();
  }, []);
  //Add Product in Firebase.
  // const[product,addProduct]=React.useState([]);
  // React.useEffect(()=>{
  //   const res= await firebase.firestore().collection('products').add({

  //   });
  // })

  const navigateToAddProduct = () => navigation.navigate('AddProductScreen');
  const navigateToProduct = (product) =>
    navigation.navigate('ProductScreen', {product});
  return (
    <View style={styles.container}>
      <FlatGrid
        itemDimension={130}
        data={products}
        style={styles.gridView}
        ListEmptyComponent={() => <LoadingComponent isLoading={isLoading} />}
        spacing={5}
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
      <Button
        onPress={navigateToAddProduct}
        style={styles.buttonNew}
        color="#FFF">
        Thêm Sản Phẩm
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  gridView: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#FFF',
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
  img: {
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
  text: {
    fontSize: 20,
    color: '#FFF',
  },
  buttonNew: {
    borderColor: 'tomato',
    backgroundColor: 'tomato',
    paddingVertical: 5,
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
