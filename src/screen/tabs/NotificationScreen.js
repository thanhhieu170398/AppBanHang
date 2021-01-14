import React, { useEffect } from 'react';
import firebase from 'react-native-firebase';
import FastImage from 'react-native-fast-image';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import EmptyComponent from '../../components/EmptyComponent';
import {formatNumber} from '../../commons/format';

export default function NotificationScreen() {
  const [notifications,setNotifications]= React.useState([]);
  useEffect(() => {
    if (firebase.auth().currentUser){
      return firebase
      .firestore()
      .collection('notifications')
      .where('ownerId', '==', firebase.auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges.forEach((change) => {
          if (change.type === 'added') {
            setNotifications((prevState) =>
              prevState.findIndex((i) => i.id === change.doc.id) > -1
                ? prevState
                : [...prevState, {id: change.doc.id, ...change.doc.data()}],
            );
          }
          if (change.type === 'modified') {
            setNotifications((prevState) =>
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
            setNotifications((prevState) =>
              prevState.filter((product) => product.id !== change.doc.id),
            );
          }
        });
      });
    }
    
  }, [firebase.auth().currentUser]);
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <View style={styles.hasBackGroundWhite}>
              <EmptyComponent title="Không có thông báo nào." />
            </View>
          )}
          renderItem={({item}) => (
            <View style={[styles.hasBackGroundWhite]}>
              <View style={styles.itemContainerCate}>
                <FastImage
                  style={styles.img}
                  source={{
                    uri: item.image
                  }}
                />
                <View style={styles.invoid}>
                  <View style={styles.invoidText}>
                    <Text style={styles.itemNameCate}>{item.title}</Text>
                    <Text numberOfLines={1} style={styles.itemName}>{item.body}</Text>
                    {/*<Text numberOfLines={1}>{item.address}</Text>*/}
                    {/*<Text style={styles.itemTotal} >{formatNumber(item.total)} đ</Text>*/}
                    {/* <Text style={styles.itemCodeCate}>{item.code}</Text> */}
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25
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
    // fontWeight: 'bold'
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

