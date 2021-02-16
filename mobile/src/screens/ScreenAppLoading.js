import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, Dimensions, PermissionsAndroid, Alert, StyleSheet, ImageBackground } from 'react-native';

const ScreenAppLoading = (props) => {
  const w = (Dimensions.get('window').width) * 0.8;
  const h = w/3.14;

  useEffect(() => {
    console.log("hello world")
    return function cleanup() { } 
  }, []); 

  return (
    <View style={styles.viewHolder}>
      <ImageBackground
        resizeMode={'cover'}
        style={styles.imgBg}
        source={require('@assets/img/bg-orange.jpg')}
      >
        <Text style={{textAlign: 'center', fontSize: 20}}>FYP-21-S1-9P</Text>
        <Text style={{textAlign: 'center', fontSize: 20}}>Open House</Text>
      </ImageBackground>
    </View>
  );
}

//export default withScreenBase("main", ScreenAppLoading);
export default ScreenAppLoading;

const styles = StyleSheet.create({
  viewHolder: { flex: 1, alignItems: 'stretch', flexDirection: 'column', backgroundColor: '#ffffff' },
  seperator: {width: '90%', height: 1.5, backgroundColor: 'gray', alignSelf: 'center', marginTop: 30},
  imgBg: {width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'},
  topHolder: {flexDirection: 'row', position: 'absolute', right: 10, top: 10},
  logoHolder: {width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'},
  logo: {width: (Dimensions.get('window').width) * 0.8, height: ((Dimensions.get('window').width) * 0.8)/3},
  centerContent: {width: '100%', height: (Dimensions.get('window').height) * 0.55, justifyContent: 'space-between'}
});
