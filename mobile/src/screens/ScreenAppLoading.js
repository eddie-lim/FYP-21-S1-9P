import React, { useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from 'react-navigation-hooks';
import { HeaderWithBack, StyleConstant } from '@assets/MyStyle';

const ScreenAppLoading = (props) => {
  const { navigate } = useNavigation();
  const opening_animation = useRef(null);

  useEffect(() => {
    console.log("ScreenAppLoading")
    // opening_animation.current.play();
    setTimeout(() => {
      navigate("mainBottomTab");
    }, 500);
    return function cleanup() { } 
  }, []);

  handleAnimationFinish=(e)=>{
    console.log("end")
    navigate("mainBottomTab");
  }

  return (
    <View style={styles.viewHolder}>
      {/* <ImageBackground
        resizeMode={'cover'}
        style={styles.imgBg}
        source={require('@assets/img/bg-orange.jpg')}
      > */}
        <LottieView
          ref={animation => {
            opening_animation.current = animation;
          }}
          source={require('@assets/animation/splashscreen.json')}
          autoPlay={true}
          // onAnimationFinish={handleAnimationFinish}
          loop={false}
        />
      {/* </ImageBackground> */}
    </View>
  );
}

//export default withScreenBase("main", ScreenAppLoading);
export default ScreenAppLoading;

const styles = StyleSheet.create({
  viewHolder: { flex: 1, alignItems: 'stretch', flexDirection: 'column', backgroundColor: 'white' },
});
