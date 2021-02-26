import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, Text } from 'react-native';
import { HomeHeader, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color:"black"}}>landing</Text>
      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenLanding, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  viewHolder: { flex: 1, alignItems: 'stretch', flexDirection: 'column', backgroundColor: '#ffffff' },
  seperator: {width: '90%', height: 1.5, backgroundColor: 'gray', alignSelf: 'center', marginTop: 30},
  imgBg: {width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'},
  topHolder: {flexDirection: 'row', position: 'absolute', right: 10, top: 10},
  logoHolder: {width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'},
  logo: {width: (Dimensions.get('window').width) * 0.8, height: ((Dimensions.get('window').width) * 0.8)/3},
  centerContent: {width: '100%', height: (Dimensions.get('window').height) * 0.55, justifyContent: 'space-between'}
});
