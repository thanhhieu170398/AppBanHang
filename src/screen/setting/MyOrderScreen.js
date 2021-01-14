import React from 'react';
import firebase from 'react-native-firebase';
import {FlatGrid} from 'react-native-super-grid';
import FastImage from 'react-native-fast-image';
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
  ScrollView,
} from 'react-native';
import {formatNumber} from '../../commons/format';
import EmptyComponent from '../../components/EmptyComponent';

export default function MyOrderScreen() {
  const [receipts, setReceipts] = React.useState([]);
  // console.log(firebase.auth().currentUser.uid)
  React.useEffect(() => {
    firebase
      .firestore()
      .collection('receipts')
      .where('ownerId', '==', firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => data.push({id: doc.id, ...doc.data()}));
        setReceipts(data)
      });
  });
  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={receipts}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View style={styles.hasBackGroundWhite}>
            <EmptyComponent title="Không có hóa đơn nào." />
          </View>
        )}
        renderItem={({item}) => (
          <View style={[styles.hasBackGroundWhite]}>
            <View>
              <Text style={styles.itemNameCate}>Mã hóa đơn: {item.id}</Text>
            </View>
            <View style={styles.itemContainerCate}>
              <FastImage
                style={styles.img}
                source={{
                  uri: item.products[0].logo,
                }}
              />
              <View style={styles.invoid}>
                <View style={styles.invoidText}>
                  <Text numberOfLines={1} style={styles.itemName}>{item.products[0].name}</Text>
                  <Text numberOfLines={1}>{item.address}</Text>
                  <Text style={styles.itemTotal} >{formatNumber(item.total)} đ</Text>
                  {/* <Text style={styles.itemCodeCate}>{item.code}</Text> */}
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  invoid:{
    flexDirection:'row',
    flex:1,
    marginLeft:15
  },
  invoidText:{
    flex:1,
    // paddingHorizontal:5
  },
  itemPrice: {
    fontSize: 20,
    color: 'tomato',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5,
  },
  itemName: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold'
  },
  itemMT: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 5,
  },
  itemTextMT: {
    fontSize: 16,
    marginLeft: 5,
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 20,
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
  },
  buttonNew: {
    borderColor: 'tomato',
    backgroundColor: 'tomato',
    paddingVertical: 5,
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  gridView: {
    flex: 1,
  },
  img:{
    height:64,
    width:64
  },
  itemNameCate:{
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
    height: 36,
    textAlignVertical: 'bottom',
  },
  itemTotal: {
    fontSize: 17,
    color: 'tomato',
    fontWeight: 'bold',
  },
  hasBackGroundWhite: {
    backgroundColor: '#FFF',
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  itemContainerCate:{
    flexDirection: 'row',
  }
});
