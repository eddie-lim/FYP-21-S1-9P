import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Alert, StyleSheet, Text, Keyboard } from 'react-native';
import { HeaderWithBack } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { StoreSettings, GlobalContext } from '@helpers/Settings';
import WebApi from '@helpers/WebApi';
import { Button } from 'react-native-paper';
import OutlineInput from 'react-native-outline-input';
import LottieView from 'lottie-react-native';
import { forEach, isArray } from 'lodash';
import HelperFunctions from '@helpers/HelperFunctions';
import { isObject } from '@turf/helpers';
import Utils from '@helpers/Utils';

const ScreenChangePassword = (props) => {
  const { navigate, goBack } = useNavigation();
  const { toggleActivityIndicator } = useContext(GlobalContext);
  
  const [ currentPassword, setCurrentPassword ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordConfirm, setPasswordConfirm ] = useState("");

  const [ passwordErrorMsg, setPasswordErrorMsg ] = useState("");
  const [ passwordConfirmErrorMsg, setPasswordConfirmErrorMsg ] = useState("");
  const [ currentPasswordErrorMsg, setCurrentPasswordConfirm ] = useState("");

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack("Change Password", ()=>{
        navigate("screenSettings")
      })
    }});
    return function cleanup() { } 
  }, []);

  handleChange = () =>{
    setPasswordErrorMsg('');
    setPasswordConfirmErrorMsg('');
    setCurrentPasswordConfirm('');
    var hasError = false;

    if (currentPassword == '') {
      setCurrentPasswordConfirm("Please enter your current password");
      hasError = true;
    }
    if (password == '') {
      setPasswordErrorMsg("Please enter your password");
      hasError = true;
    }
    if (!Utils.testPasswordStrength(password)) {
      setPasswordErrorMsg("Password must contain 8 or more characters with at least 1 UPPER case character and 1 lower case character");
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
    var data = {
      "current_password": currentPassword,
      "password": password,
      "password_confirm": passwordConfirm
    }
    console.log("postChangePassword data", data)
    WebApi.postChangePassword(data).then((res)=>{
      console.log("postChangePassword res", res.data)
      toggleActivityIndicator(false);
      Alert.alert(
        "Success!",
        "You have successfully changed your password",
        [
          {
            text: 'OK', onPress: async () => {
              navigate("screenSettings")
            }
          },
        ]
      );
    }).catch((err)=>{
      // console.log("postChangePassword err", err)
      toggleActivityIndicator(false);
      var error = err.data;
      if(isArray(error) || isObject(error)){
        forEach(error, function(message, field){
          // console.log("forEach(field", field)
          // console.log("forEach(message", message)
          if (field == "password") {
            HelperFunctions.showToast(message)
            setPasswordErrorMsg(message);
          } else if (field == "password_confirm") {
            HelperFunctions.showToast(message)
            setPasswordConfirmErrorMsg(message);
          } else if (field == "current_password") {
            HelperFunctions.showToast(message)
            setCurrentPasswordConfirm(message);
          } else {
            HelperFunctions.showToast(message)
          }
        });
      } else {
        HelperFunctions.showToast(error)
      }
      // Alert.alert(
      //   "Failed",
      //   "Wrong password. Please try again.",
      //   [
      //     {
      //       text: 'OK', onPress:  () => {
      //         return true;
      //       }
      //     },
      //   ]
      // );
      return;
    })
  }

  return (
    <View onTouchStart={Keyboard.dismiss} style={{flex: 1, backgroundColor: '#fff'}}>
      <View onTouchStart={Keyboard.dismiss} style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        
        <LottieView style={{height: 200}} source={require('@assets/animation/change-pw-8654.json')} autoPlay={true} loop={true} />

        <View style={[styles.container]}>
          <OutlineInput
            value={currentPassword}
            onChangeText={(e) => setCurrentPassword(e)}
            label="Current Password"
            secureTextEntry={true}
            activeValueColor="#6c63fe"
            activeBorderColor="#6c63fe"
            activeLabelColor="#6c63fe"
            passiveBorderColor="#bbb7ff"
            passiveLabelColor="#bbb7ff"
            passiveValueColor="#bbb7ff"
          />
          <Text style={styles.errorText}>{currentPasswordErrorMsg}</Text>
        </View>
        
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
    </View>
  );
}

export default withScreenBase(ScreenChangePassword, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  container: { width:"80%",  marginTop: 10, marginBottom: 10 },
  errorText:{color:'red'},
});
