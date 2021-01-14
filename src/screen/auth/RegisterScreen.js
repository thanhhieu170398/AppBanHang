import React from 'react';
import {View, Image, StyleSheet, Text, Alert, Pressable} from 'react-native';
import {register} from '../../services/api';
import {Button, TextInput} from 'react-native-paper';

const RegisterScreen = (props) => {
  const [email, onChangeEmail] = React.useState('hieune@gmail.com');
  const [password, onChangePassword] = React.useState('123456');

  const onPressLogin = () => {
    try {
      register(email, password);
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri:
            'https://cdn1.iconfinder.com/data/icons/shopping-and-ecommerce-1-2/512/25-512.png',
        }}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        mode="outlined"
        label="Nhập email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry={true}
        mode="outlined"
        label="Nhập password"
      />
      <Button onPress={onPressLogin} style={styles.button} color="#FFF">
        Đăng Ký
      </Button>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
  tinyLogo: {
    width: 128,
    height: 128,
    alignSelf: 'center',
  },
  logo: {
    width: 66,
    height: 58,
  },
  input: {
    margin:10,
  },
  buttonNew: {
    borderColor: '#0894ff',
    backgroundColor: '#0894ff',
    paddingVertical: 5,
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    marginHorizontal: 10,
    alignItems: 'center',
    fontSize: 18,
    backgroundColor: '#0894ff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#0894ff',
    paddingVertical: 10,
  },
  text: {
    fontSize: 20,
    color: '#FFF',
  },
});
