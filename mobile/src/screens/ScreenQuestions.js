import React, { useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, Text, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';

const ScreenQuestions = (props) => {
  const { navigate, goBack } = useNavigation();

  useEffect(() => {
    console.log("ScreenQuestions")
    props.navigation.setParams({"navOptions":{
      headerShown: false
    }});
    return function cleanup() { } 
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Pressable style={{}} onPress={() => navigate("screenFaq")}>
          <View elevation={5} style={[styles.cardContainer]}>
            <Text style={{ position:'absolute', color:"black", top:10}}>Frequently Asked Questions</Text>
            <LottieView style={{height: 175, position:'absolute', bottom:0}} source={require('@assets/animation/faq-25920.json')} autoPlay={true} loop={true} />
          </View>
        </Pressable>
        <Pressable style={{marginTop:15}} onPress={() => navigate("screenApplicationProcess")}>
          <View elevation={5} style={[styles.cardContainer]}>
            <Text style={{ position:'absolute', color:"black", top:10}}>Application Process</Text>
            <LottieView style={{height: 160, position:'absolute', bottom:0}} source={require('@assets/animation/appprocess-28321.json')} autoPlay={true} loop={true} />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenQuestions, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  cardContainer: {width: (Dimensions.get('window').width) * 0.90, height: 200, justifyContent: 'center', alignItems: 'center', borderWidth:1, borderRadius:15, padding:20, backgroundColor:'#fff', shadowColor: "#fff", shadowOpacity: 0.8, shadowRadius: 2, shadowOffset: {
    height: 1,
    width: 1
  }},
});
