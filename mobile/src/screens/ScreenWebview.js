import React, { useEffect, useContext } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderWithBack } from '@assets/MyStyle';
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import { WebView } from 'react-native-webview';
import { GlobalContext } from '@helpers/Settings';

const ScreenWebview = (props) => {
  const { navigate, goBack } = useNavigation();
  const headerName = useNavigationParam('headerName');
  const url = useNavigationParam('url');
  const source = useNavigationParam('source');
  const { toggleActivityIndicator } = useContext(GlobalContext);

  useEffect(() => {
    toggleActivityIndicator(true)
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack(headerName, ()=>{
        navigate(source)
      })
    }});
    BackHandler.addEventListener('hardwareBackPress', handleBackHandler);
    return function cleanup() {
      BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
     } 
  }, []);

  handleBackHandler = ()=>{
    BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
    navigate(source);
    return true;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <WebView
        onLoadEnd={()=>{
          toggleActivityIndicator(false)
        }}
        source={{ uri: url }}
        // style={{ marginTop: 20 }}
      />
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenWebview, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  
});
