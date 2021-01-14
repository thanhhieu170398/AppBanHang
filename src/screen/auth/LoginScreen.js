import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Alert,
  Pressable,
  ScrollView,
} from 'react-native';
import {login} from '../../services/api';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {success} from '../../store/notifyAction';
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
    margin: 10,
  },
  button: {
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    fontSize: 18,
    backgroundColor: '#0894ff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#0894ff',
    paddingVertical: 10,
  },
  buttonNew: {
    borderColor: 'tomato',
    backgroundColor: 'tomato',
    paddingVertical: 5,
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    color: '#FFF',
  },
  login: {
    marginTop: 60,
  },
  userPassword: {
    marginTop: 30,
  },
});

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = React.useState('hieune@gmail.com');
  const [isLoading, setLoading] = useState(false);
  const [password, onChangePassword] = React.useState('123456');

  const onPressLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      props.navigation.goBack();
      dispatch(success({title: 'Thông báo', description: 'Đăng nhập thành công'}));
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    } finally {
      setLoading(false);
    }
  };
  const navigateToRegister = () => props.navigation.navigate('RegisterScreen');
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri:
            'https://cdn1.iconfinder.com/data/icons/shopping-and-ecommerce-1-2/512/25-512.png',
        }}
      />
      <View style={styles.userPassword}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            mode="outlined"
            label="Nhập gmail"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry={true}
            mode="outlined"
            label="Nhập password"
          />
        </View>
        <View style={styles.login}>
          <Button
            onPress={onPressLogin}
            disabled={isLoading}
            loading={isLoading}
            style={styles.buttonNew}
            color="#FFF">
            Đăng Nhập
          </Button>
          <Button
            onPress={navigateToRegister}
            style={styles.buttonNew}
            color="#FFF">
            Đăng Ký
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
