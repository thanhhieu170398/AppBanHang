import React, {useCallback, useState} from 'react';
import {FlatList, View, Text, StyleSheet, Pressable} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import FastImage from 'react-native-fast-image';
import {formatNumber} from '../commons/format';
import firebase from 'react-native-firebase';
import LoadingComponent from '../components/LoadingComponent';

export default function CategoryScreen({navigation, route}) {
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    const removeListener = firebase
      .firestore()
      .collection('products')
      .where('categoryId', '==', route.params.category.id)
      .onSnapshot((querySnapshot) => {
        if (!querySnapshot.docs.length) {
          setIsLoading(false);
        }
        querySnapshot.docChanges.forEach((change) => {
          console.log(change);
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
  }, [route.params.category.id]);
  //Add Product in Firebase.
  // const[product,addProduct]=React.useState([]);
  // React.useEffect(()=>{
  //   const res= await firebase.firestore().collection('products').add({

  //   });
  // })

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
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000000',
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
