import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  View,
  Text,
  StyleSheet,
  Pressable,
  Picker,
} from 'react-native';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-crop-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {v4 as uuidv4} from 'uuid';
import FastImage from 'react-native-fast-image';
import {error, success} from '../store/notifyAction';
import {useDispatch} from 'react-redux';
import {Button, TextInput} from 'react-native-paper';

export default function AddProductScreen({navigation}) {
  const dispatch = useDispatch();
  const [name, onChangeName] = React.useState('');
  const [price, onChangePrice] = React.useState('');
  const [describe, onChangeDescribe] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(
    'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png',
  );
  const [uploadedImage, setUploadedImage] = useState('');
  const [category, setCategory] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const options = {
    title: 'Select Avatar',
  };
  const data = {
    album: [
      'https://source.unsplash.com/1024x768/?girl',
      'https://source.unsplash.com/1024x768/?nature',
      'https://source.unsplash.com/1024x768/?water',
    ],
  };
  const addProduct = useCallback(() => {
    if (!name) {
      return dispatch(
        error({title: 'Lỗi', description: 'Vui lòng nhập tên sản phẩm'}),
      );
    }
    if (!price) {
      return dispatch(
        error({title: 'Lỗi', description: 'Vui lòng nhập giá sản phẩm'}),
      );
    }
    setLoading(true);
    firebase
      .firestore()
      .collection('products')
      .doc()
      .set({
        ...data,
        name,
        price: parseInt(price),
        logo: uploadedImage,
        description: describe,
        categoryId: selectedCategory,
        ownerId: firebase.auth().currentUser.uid,
        email: firebase.auth().currentUser.email,
      })
      .then(() => {
        navigation.goBack();
        dispatch(success({title: 'Thông báo', description: 'Thêm thành công'}));
        setLoading(false);
      })
      .catch(() =>
        dispatch(
          error({title: 'Thông báo', description: 'Thêm không thành công'}),
        ),
      );
  }, [
    name,
    price,
    data,
    uploadedImage,
    describe,
    selectedCategory,
    dispatch,
    navigation,
  ]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('category')
      .get()
      .then((value) => {
        const data = [];
        value.forEach((snapshot) => {
          data.push({
            ...snapshot.data(),
            id: snapshot.id,
          });
        });
        setCategory(data);
      });
  }, []);

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
        mode="outlined"
        onChangeText={onChangeName}
        value={name}
        label="Nhập tên sản phẩm"
      />

      <Text style={styles.textaddproduct}>Đơn giá:</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangePrice}
        value={price}
        keyboardType="numeric"
        mode="outlined"
        label="Nhập giá sản phẩm"
      />

      <Text style={styles.textaddproduct}>Danh mục:</Text>

      <Picker
        selectedValue={selectedCategory}
        style={{height: 50, width: 150}}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedCategory(itemValue)
        }>
        {category.map((item) => (
          <Picker.Item key={item.id} label={item.name} value={item.id} />
        ))}
      </Picker>
      <Text style={styles.textaddproduct}>Mô tả sản phẩm:</Text>
      <TextInput
        style={styles.inputDescribe}
        multiline
        textAlignVertical="top"
        numberOfLines={10}
        onChangeText={onChangeDescribe}
        value={describe}
        mode="outlined"
        label="Nhập mô tả sản phẩm"
      />

      <Button
        loading={isLoading}
        disabled={isLoading}
        color="#FFF"
        onPress={addProduct}
        style={styles.buttonNew}>
        Thêm sản phẩm
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
    margin: 5,
    fontSize: 14,
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
});
