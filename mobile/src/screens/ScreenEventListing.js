import React, { useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, Text } from 'react-native';
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';

const ScreenEventListing = (props) => {

  useEffect(() => {
    console.log("hello world")
    // opening_animation.current.play();
    return function cleanup() { } 
  }, []);

  return (
    <View style={styles.viewHolder}>
      <ImageBackground
        resizeMode={'cover'}
        style={styles.imgBg}
        source={require('@assets/img/bg-orange.jpg')}
      >
        <Text>event listing</Text>
      </ImageBackground>
    </View>
  );
}

export default withScreenBase(ScreenEventListing, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  viewHolder: { flex: 1, alignItems: 'stretch', flexDirection: 'column', backgroundColor: '#ffffff' },
  seperator: {width: '90%', height: 1.5, backgroundColor: 'gray', alignSelf: 'center', marginTop: 30},
  imgBg: {width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'},
  topHolder: {flexDirection: 'row', position: 'absolute', right: 10, top: 10},
  logoHolder: {width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'},
  logo: {width: (Dimensions.get('window').width) * 0.8, height: ((Dimensions.get('window').width) * 0.8)/3},
  centerContent: {width: '100%', height: (Dimensions.get('window').height) * 0.55, justifyContent: 'space-between'}
});
