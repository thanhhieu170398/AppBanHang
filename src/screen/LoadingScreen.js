import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default function LoadingScreen(){
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#000" animating={true} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
})