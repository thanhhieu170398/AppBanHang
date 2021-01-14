import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

const EmptyComponent = ({title}) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{
          uri:
            'https://png.pngtree.com/png-vector/20190628/ourlarge/pngtree-empty-box-icon-for-your-project-png-image_1521417.jpg',
        }}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  image: {
    height: 126,
    width: 126,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default EmptyComponent;
