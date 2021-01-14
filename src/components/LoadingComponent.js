import React from 'react';
import {FlatGrid} from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {View, StyleSheet, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function LoadingComponent({isLoading}) {
  if (!isLoading) {
    return (
      <View style={styles.container}>
        <FastImage
          source={{
            uri:
              'https://png.pngtree.com/png-vector/20190628/ourlarge/pngtree-empty-box-icon-for-your-project-png-image_1521417.jpg',
          }}
          style={styles.productLogo}
        />
        <Text style={styles.text}>Rất tiếc, chưa có sản phẩm nào !!!</Text>
      </View>
    );
  }
  return (
    <FlatGrid
      data={[1, 2, 3, 4, 5, 6]}
      itemDimension={130}
      style={styles.gridView}
      renderItem={() => {
        return (
          <View style={styles.container}>
            <ShimmerPlaceHolder
              height={100}
              width={100}
              style={styles.logo}
              LinearGradient={LinearGradient}
            />
            <ShimmerPlaceHolder
              style={styles.name}
              width={150}
              LinearGradient={LinearGradient}
            />
            <ShimmerPlaceHolder width={120} LinearGradient={LinearGradient} />
          </View>
        );
      }}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 5,
  },
  logo: {
    alignSelf: 'center',
  },
  gridView: {
    flex: 1,
  },
  name: {
    marginVertical: 10,
  },
  productLogo: {
    height: 256,
    width: 256,
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
