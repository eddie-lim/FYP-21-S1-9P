import React, { useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, Text, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';

const ScreenUniversity = (props) => {
  const { navigate, goBack } = useNavigation();

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown: false
    }});
    return function cleanup() { } 
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#efefef'}}>
      <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Pressable onPress={() => navigate("screenCourseListing")}>
          <View elevation={5} style={[styles.cardContainer]}>
            <Text style={{ position:'absolute', color:"black", top:10}}>Courses Available</Text>
            <LottieView style={{height: 150, position:'absolute', bottom:0}} source={require('@assets/animation/courselisting-45241.json')} autoPlay={true} loop={true} />
          </View>
        </Pressable>
        <Pressable style={{marginTop:15}} onPress={() => navigate("screenSchoolListing")}>
          <View elevation={5} style={[styles.cardContainer]}>
            <Text style={{ position:'absolute', color:"black", top:10}}>University Partners</Text>
            <LottieView style={{height: 175, position:'absolute', bottom:0}} source={require('@assets/animation/schoollisting-22472.json')} autoPlay={true} loop={true} />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenUniversity, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  cardContainer: {width: (Dimensions.get('window').width) * 0.90, height: 200, justifyContent: 'center', alignItems: 'center', borderWidth:1, borderRadius:15, padding:20, backgroundColor:'#fff', shadowColor: "#fff", shadowOpacity: 0.8, shadowRadius: 2, shadowOffset: {
    height: 1,
    width: 1
  }},
});
