import React, { useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, Text } from 'react-native';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';

const ScreenEventDetail = (props) => {
  const { navigate, goBack } = useNavigation();

  useEffect(() => {
    console.log("ScreenEventDetail")
    props.navigation.setParams({"navOptions":{
      header:()=> HeaderWithBack("Event Detail", navigate, "screenEventListing")
    }});
    return function cleanup() { } 
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color:"black"}}>event detail</Text>
        <Text style={{color:"black"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut aliquam massa. Vivamus posuere tellus augue, ut condimentum sapien semper a. Vivamus cursus vehicula leo, et posuere nunc aliquam at. Maecenas convallis est sed arcu rhoncus, sed finibus dolor vestibulum. Praesent porta varius molestie. In quis quam faucibus nisi aliquam sodales at dapibus dui. Mauris pulvinar quis sem at pellentesque. Donec molestie erat vitae nisl dictum ornare.</Text>
      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenEventDetail, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  viewHolder: { flex: 1, alignItems: 'stretch', flexDirection: 'column', backgroundColor: '#ffffff' },
  seperator: {width: '90%', height: 1.5, backgroundColor: 'gray', alignSelf: 'center', marginTop: 30},
  imgBg: {width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'},
  topHolder: {flexDirection: 'row', position: 'absolute', right: 10, top: 10},
  logoHolder: {width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'},
  logo: {width: (Dimensions.get('window').width) * 0.8, height: ((Dimensions.get('window').width) * 0.8)/3},
  centerContent: {width: '100%', height: (Dimensions.get('window').height) * 0.55, justifyContent: 'space-between'}
});
