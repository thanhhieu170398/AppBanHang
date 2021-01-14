import React, {useCallback, useState} from 'react';
import {
  PermissionsAndroid,
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-crop-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {v4 as uuidv4} from 'uuid';
import FastImage from 'react-native-fast-image';
import {error, success} from '../store/notifyAction';
import {useDispatch} from 'react-redux';
import {Button, TextInput} from 'react-native-paper';

export default function EditProductScreen({route, navigation}) {
  const dispatch = useDispatch();
  const [name, onChangeName] = React.useState(route.params.product.name);
  const [isLoading, setLoading] = React.useState(false);
  const [price, onChangePrice] = React.useState(
    route.params.product.price.toString(),
  );
  const [describe, onChangeDescribe] = React.useState(
    route.params.product.description,
  );
  const [image, setImage] = React.useState(route.params.product.logo);
  const [uploadedImage, setUploadedImage] = useState('');
  const editProduct = useCallback(() => {
    setLoading(true);
    firebase
      .firestore()
      .collection('products')
      .doc(route.params.product.id)
      .set({
        ...route.params.product,
        name,
        price: parseInt(price, 10),
        logo: uploadedImage || image,
        description: describe,
      })
      .then(() => {
        navigation.pop(2);
        dispatch(success({title: 'Thông báo', description: 'Sửa thành công'}));
        setLoading(false);
      })
      .catch(() =>
        dispatch(
          error({title: 'Thông báo', description: 'Sửa không thành công'}),
        ),
      );
  }, [
    route.params.product,
    name,
    price,
    uploadedImage,
    image,
    describe,
    navigation,
    dispatch,
  ]);
  const deleteProduct = useCallback(
    (id) => {
      setLoading(true);
      firebase
        .firestore()
        .collection('products')
        .doc(id)
        .delete()
        .then(() => {
          navigation.pop(2);
          dispatch(
            success({title: 'Thông báo', description: 'Xóa thành công'}),
          );
        })
        .catch(() =>
          dispatch(
            error({title: 'Thông báo', description: 'Xóa không thành công'}),
          ),
        )
        .finally(() => {
          setLoading(false);
        });
    },
    [dispatch, navigation],
  );
  const choosePhoto = useCallback(async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'We need your permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');

      ImagePicker.openPicker({
        width: 256,
        height: 256,
        cropping: true,
      }).then((image) => {
        setImage(image.path);
        firebase
          .storage()
          .ref()
          .child('images/' + uuidv4() + '.jpg')
          .putFile(image.path, {
            contentType: 'image/jpeg',
          })
          .on('state_changed', (snapshot) => {
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              setUploadedImage(snapshot.downloadURL);
            }
          });
      });
    } else {
      console.log('Camera permission denied');
    }
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textaddproduct}>Hình ảnh sản phẩm:</Text>
      <Pressable onPress={choosePhoto}>
        <FastImage source={{uri: image}} style={styles.productLogo} />
      </Pressable>
      <Text style={styles.textaddproduct}>Tên sản phẩm:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        mode="outlined"
        label="Nhập tên sản phẩm"
      />

      <Text style={styles.textaddproduct}>Đơn giá:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePrice}
        value={price}
        keyboardType="numeric"
        mode="outlined"
        label="Nhập đơn giá"
      />
      <Text style={styles.textaddproduct}>Mô tả sản phẩm:</Text>
      <TextInput
        style={styles.inputDescribe}
        multiline
        textAlignVertical="top"
        numberOfLines={10}
        onChangeText={onChangeDescribe}
        value={describe}
        mode="outlined"
        label="Nhập mô tả"
      />
      <Button
        onPress={editProduct}
        style={styles.buttonNew}
        loading={isLoading}
        disabled={isLoading}
        color="#FFF">
        Sửa sản phẩm
      </Button>
      <Button
        onPress={() => deleteProduct(route.params.product.id)}
        style={styles.buttonDelete}
        loading={isLoading}
        disabled={isLoading}
        color="#FFF">
        Xóa sản phẩm
      </Button>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginBottom: 20,
    marginTop: 10,
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
  textaddproduct: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  input: {
    margin: 10,
  },
  inputDescribe: {
    margin: 10,
  },
  iconSetting: {
    marginLeft: 5,
  },
  productLogo: {
    height: 256,
    width: 256,
    alignSelf: 'center',
  },
  buttonNew: {
    borderColor: 'tomato',
    backgroundColor: 'tomato',
    paddingVertical: 5,
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  buttonDelete: {
    borderColor: 'red',
    backgroundColor: 'red',
    paddingVertical: 5,
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  background:{
    backgroundColor:'#FFF'
  }
});
