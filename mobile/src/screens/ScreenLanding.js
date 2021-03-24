import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, StyleSheet, Modal, Text, BackHandler, Pressable, ScrollView } from 'react-native';
import { HomeHeader, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import {StoreSettings} from '@helpers/Settings';
import { NavigationEvents } from 'react-navigation';

const ScreenLanding = (props) => {
  const { navigate } = useNavigation();
  const [ loggedIn, setLoggedIn ] = useState(null);

  useEffect(() => {
    console.log("ScreenLanding")
    // StoreSettings.store(StoreSettings.IS_LOGGED_IN, "false")
    StoreSettings.get(StoreSettings.IS_LOGGED_IN)
    .then((res)=>{
      setLoggedIn(res)
      console.log("res",res)
      props.navigation.setParams({"navOptions":{
        header:()=> HomeHeader(navigate,res)
      }});
    })
    return function cleanup() { } 
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#efefef'}}>
      <ScrollView>
        <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop:20, paddingTop:15, paddingBottom:15}}>
          <Pressable onPress={() => navigate("screenCourseDetail")}>
            <View elevation={5} style={[styles.cardContainer]}>
              <Text style={{ position:'absolute', color:"black", top:10}}>Featured Courses</Text>
              <LottieView style={{height: 150, position:'absolute', bottom:0}} source={require('@assets/animation/study-27637.json')} autoPlay={true} loop={true} />
            </View>
          </Pressable>
          <Pressable style={{marginTop:15}} onPress={() => navigate("screenEventDetail")}>
            <View elevation={5} style={[styles.cardContainer]}>
              <Text style={{ position:'absolute', color:"black", top:10}}>Featured Event</Text>
              <LottieView style={{height: 150, position:'absolute', bottom:0}} source={require('@assets/animation/questions-27636.json')} autoPlay={true} loop={true} />
            </View>
          </Pressable>
          <Pressable style={{marginTop:15}} onPress={() => navigate("screenSchoolDetail")}>
            <View elevation={5} style={[styles.cardContainer]}>
              <Text style={{ position:'absolute', color:"black", top:10}}>Featured University</Text>
              <LottieView style={{height: 150, position:'absolute', bottom:0}} source={require('@assets/animation/comms-27635.json')} autoPlay={true} loop={true} />
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenLanding, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  cardContainer: {width: (Dimensions.get('window').width) * 0.90, height: 200, justifyContent: 'center', alignItems: 'center', borderWidth:1, borderRadius:15, padding:20, backgroundColor:'#fff', shadowColor: "#fff", shadowOpacity: 0.8, shadowRadius: 2, shadowOffset: {
    height: 1,
    width: 1
  }},
});
