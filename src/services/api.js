import firebase from 'react-native-firebase';

export function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function register(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}
