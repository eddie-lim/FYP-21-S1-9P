import React, { useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, Text, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';

const ScreenUniversity = (props) => {
  const { navigate, goBack } = useNavigation();

  useEffect(() => {
    console.log("ScreenUniversity")
    props.navigation.setParams({"navOptions":{
      headerShown: false
    }});
    return function cleanup() { } 
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Pressable style={{}} onPress={() => navigate("screenCourseListing")}>
          <ImageBackground resizeMode={'cover'} style={{width: 300, height: 200, justifyContent: 'center', alignItems: 'center'}} source={require('@assets/img/bg-orange.jpg')} >
            <LottieView style={{height: 150, position:'absolute', top:0}} source={require('@assets/animation/courselisting-45241.json')} autoPlay={true} loop={true} />
            <Text style={{ position:'absolute', color:"black", bottom:10}}>Courses Available</Text>
          </ImageBackground>
        </Pressable>
        <Pressable style={{marginTop:15}} onPress={() => navigate("screenSchoolListing")}>
          <ImageBackground resizeMode={'cover'} style={{width: 300, height: 200, justifyContent: 'center', alignItems: 'center'}} source={require('@assets/img/bg-orange.jpg')} >
            <LottieView style={{height: 150, position:'absolute', top:0}} source={require('@assets/animation/schoollisting-22472.json')} autoPlay={true} loop={true} />
            <Text style={{ position:'absolute', color:"black", bottom:10}}>University Partners</Text>
          </ImageBackground>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

navigationOptions = ({navigation}) => ({
  headerShown: false
});

export default withScreenBase(ScreenUniversity, ScreenBaseType.MAIN, navigationOptions);

const styles = StyleSheet.create({
  viewHolder: { flex: 1, alignItems: 'stretch', flexDirection: 'column', backgroundColor: '#ffffff' },
  seperator: {width: '90%', height: 1.5, backgroundColor: 'gray', alignSelf: 'center', marginTop: 30},
  imgBg: {width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'},
  topHolder: {flexDirection: 'row', position: 'absolute', right: 10, top: 10},
  logoHolder: {width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'},
  logo: {width: (Dimensions.get('window').width) * 0.8, height: ((Dimensions.get('window').width) * 0.8)/3},
  centerContent: {width: '100%', height: (Dimensions.get('window').height) * 0.55, justifyContent: 'space-between'}
});
