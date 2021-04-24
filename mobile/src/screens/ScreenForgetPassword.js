import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Alert, StyleSheet, Text, TextInput, Pressable, Keyboard } from 'react-native';
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
import HelperFunctions from '@helpers/HelperFunctions';
import { isArray } from 'lodash';

const ScreenForgetPassword = (props) => {
  const { navigate, goBack } = useNavigation();
  const { toggleActivityIndicator } = useContext(GlobalContext);

  const [ email, setEmail ] = useState("");

  const [ emailErrorMsg, setEmailErrorMsg ] = useState("");

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack("Reset Password", ()=>{
        navigate("screenLogin")
      })
    }});
    return function cleanup() { } 
  }, []);

  handleReset = () =>{
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
    var data = {
      "email": email
    }
    console.log("postRequestResetPassword res", data)
    WebApi.postRequestResetPassword(data).then((res)=>{
      console.log("postRequestResetPassword res", res.data)
      toggleActivityIndicator(false);
      Alert.alert(
        "Success!",
        "You have successfully requested your password to be reset.\nPlease check your email for instructions.",
        [
          {
            text: 'OK', onPress: async () => {
              navigate("screenLogin")
            }
          },
        ]
      );
    }).catch((err)=>{
      console.log("postRequestResetPassword err", err)
      toggleActivityIndicator(false);
      var error = err.data;
      if(isArray(error)){
        HelperFunctions.showToast(error[0].message)
        setEmailErrorMsg(error[0].message);
      } else {
        HelperFunctions.showToast(error)
      }
      Alert.alert(
        "Failed",
        "Please try again.",
        [
          {
            text: 'OK', onPress:  () => {
              return true;
            }
          },
        ]
      );
      return;
    })
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
