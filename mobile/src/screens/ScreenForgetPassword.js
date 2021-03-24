import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, Text, TextInput, Pressable, Keyboard } from 'react-native';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { StoreSettings, GlobalContext } from '@helpers/Settings';
import Utils from '@helpers/Utils';
import WebApi from '@helpers/WebApi';
import { Button } from 'react-native-paper';
import OutlineInput from 'react-native-outline-input';
import LottieView from 'lottie-react-native';

const ScreenForgetPassword = (props) => {
  const { navigate, goBack } = useNavigation();
  const { toggleActivityIndicator } = useContext(GlobalContext);

  const [ email, setEmail ] = useState("");

  const [ emailErrorMsg, setEmailErrorMsg ] = useState("");

  useEffect(() => {
    console.log("ScreenForgetPassword")
    props.navigation.setParams({"navOptions":{
      header:()=> HeaderWithBack("Reset Password", navigate, "screenLogin", null, goBack)
    }});
    return function cleanup() { } 
  }, []);

  handleReset = () =>{
    console.log("Reset!!")
    setEmailErrorMsg('');

    if (email.trim() == '' || email == null || email == '') {
      setEmailErrorMsg("Please enter your email");
      return;
    }
    if (!Utils.isEmail(email.trim())) {
      setEmailErrorMsg("Email is not valid");
      return;
    }
    toggleActivityIndicator(true, "Reseting...");
    setTimeout(() => {
      toggleActivityIndicator(false)
    }, 1000);
    // WebApi.resetPassword(email).then((res)=>{
    //   toggleActivityIndicator(true, "Logging in...");
    // }).catch((err)=>{
    //   console.log(err)
    //   toggleActivityIndicator(false)
    //   return
    // })
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View onTouchStart={Keyboard.dismiss} style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        
        <LottieView style={{height: 250}} source={require('@assets/animation/forget-password-16766.json')} autoPlay={true} loop={true} />

        <View style={[styles.container]}>
          <OutlineInput
            value={email}
            onChangeText={(e) => setEmail(e)}
            label="Email"
            activeValueColor="#6c63fe"
            activeBorderColor="#6c63fe"
            activeLabelColor="#6c63fe"
            passiveBorderColor="#bbb7ff"
            passiveLabelColor="#bbb7ff"
            passiveValueColor="#bbb7ff"
          />
          <Text style={styles.errorText}>{emailErrorMsg}</Text>
        </View>
        
        <Button style={{width:'80%', marginBottom:20, height:60, justifyContent:'center', backgroundColor:"green" }} icon="lock-reset" mode="contained" onPress={() => handleReset()}>
          Reset!
        </Button>

      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenForgetPassword, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  container: { width:"80%",  marginTop: 10, marginBottom: 10 },
  errorText:{color:'red'},
});
