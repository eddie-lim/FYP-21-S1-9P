import React, { useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import { WebView } from 'react-native-webview';

const ScreenWebview = (props) => {
  const { navigate, goBack } = useNavigation();
  const headerName = useNavigationParam('headerName');
  const url = useNavigationParam('url');

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      header:()=> HeaderWithBack(headerName, navigate, "screenLanding")
    }});
    return function cleanup() { } 
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <WebView
        source={{ uri: url }}
        // style={{ marginTop: 20 }}
      />
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenWebview, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  
});
