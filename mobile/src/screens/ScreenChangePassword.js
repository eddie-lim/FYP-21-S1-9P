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

const ScreenChangePassword = (props) => {
  const { navigate, goBack } = useNavigation();
  const { toggleActivityIndicator } = useContext(GlobalContext);

  const [ password, setPassword ] = useState("");
  const [ passwordConfirm, setPasswordConfirm ] = useState("");

  const [ passwordErrorMsg, setPasswordErrorMsg ] = useState("");
  const [ passwordConfirmErrorMsg, setPasswordConfirmErrorMsg ] = useState("");

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack("Change Password", navigate, "screenSettings")
    }});
    return function cleanup() { } 
  }, []);

  handleChange = () =>{
    setPasswordErrorMsg('');
    setPasswordConfirmErrorMsg('');
    var hasError = false;

    if (password == '') {
      setPasswordErrorMsg("Please enter your password");
      hasError = true;
    }
    if (passwordConfirm == '') {
      setPasswordConfirmErrorMsg("Please confirm your password");
      hasError = true;
    } else {
      if(password != passwordConfirm){
        setPasswordConfirmErrorMsg("Please make sure your passwords match");
        hasError = true;
      }
    }
    if(hasError){
      return;
    }
    toggleActivityIndicator(true, "Changing...");
    setTimeout(() => {
      toggleActivityIndicator(false)
    }, 1000);
    // WebApi.resetPassword(email).then((res)=>{
    //   toggleActivityIndicator(true, "Logging in...");
    // }).catch((err)=>{
    //   toggleActivityIndicator(false)
    //   return
    // })
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View onTouchStart={Keyboard.dismiss} style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        
        <LottieView style={{height: 200}} source={require('@assets/animation/change-pw-8654.json')} autoPlay={true} loop={true} />

        
        <View style={[styles.container]}>
          <OutlineInput
            value={password}
            onChangeText={(e) => setPassword(e)}
            label="Password"
            secureTextEntry={true}
            activeValueColor="#6c63fe"
            activeBorderColor="#6c63fe"
            activeLabelColor="#6c63fe"
            passiveBorderColor="#bbb7ff"
            passiveLabelColor="#bbb7ff"
            passiveValueColor="#bbb7ff"
          />
          <Text style={styles.errorText}>{passwordErrorMsg}</Text>
        </View>
        
        <View style={[styles.container]}>
          <OutlineInput
            value={passwordConfirm}
            onChangeText={(e) => setPasswordConfirm(e)}
            label="Confirm Password"
            secureTextEntry={true}
            activeValueColor="#6c63fe"
            activeBorderColor="#6c63fe"
            activeLabelColor="#6c63fe"
            passiveBorderColor="#bbb7ff"
            passiveLabelColor="#bbb7ff"
            passiveValueColor="#bbb7ff"
          />
          <Text style={styles.errorText}>{passwordConfirmErrorMsg}</Text>
        </View>

        <Button style={{width:'80%', marginBottom:20, height:60, justifyContent:'center', backgroundColor:"green" }} icon="lock-reset" mode="contained" onPress={() => handleChange()}>
          Change!
        </Button>

      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenChangePassword, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  container: { width:"80%",  marginTop: 10, marginBottom: 10 },
  errorText:{color:'red'},
});
