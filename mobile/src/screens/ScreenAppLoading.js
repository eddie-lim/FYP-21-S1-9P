import React, { useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from 'react-navigation-hooks';

const ScreenAppLoading = (props) => {
  const { navigate } = useNavigation();
  const opening_animation = useRef(null);

  useEffect(() => {
    console.log("ScreenAppLoading")
    // opening_animation.current.play();
    return function cleanup() { } 
  }, []);

  handleAnimationFinish=(e)=>{
    console.log("end")
    navigate("mainBottomTab");
  }

  return (
    <View style={styles.viewHolder}>
      <ImageBackground
        resizeMode={'cover'}
        style={styles.imgBg}
        source={require('@assets/img/bg-orange.jpg')}
      >
        <LottieView
          ref={animation => {
            opening_animation.current = animation;
          }}
          source={require('@assets/animation/splashscreen.json')}
          autoPlay={true}
          onAnimationFinish={handleAnimationFinish}
          loop={false}
        />
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
