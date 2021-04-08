import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, Text, TextInput, Pressable, Keyboard, ScrollView } from 'react-native';
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

const ScreenRegister = (props) => {
  const { navigate, goBack } = useNavigation();
  const { toggleActivityIndicator } = useContext(GlobalContext);

  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordConfirm, setPasswordConfirm ] = useState("");

  const [ firstNameErrorMsg, setFirstNameErrorMsg ] = useState("");
  const [ lastNameErrorMsg, setLastNameErrorMsg ] = useState("");
  const [ emailErrorMsg, setEmailErrorMsg ] = useState("");
  const [ passwordErrorMsg, setPasswordErrorMsg ] = useState("");
  const [ passwordConfirmErrorMsg, setPasswordConfirmErrorMsg ] = useState("");

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack("Register", navigate, "screenLogin")
    }});
    return function cleanup() { } 
  }, []);

  handleRegister = () =>{
    setFirstNameErrorMsg('');
    setLastNameErrorMsg('');
    setEmailErrorMsg('');
    setPasswordErrorMsg('');
    setPasswordConfirmErrorMsg('');
    var hasError = false;

    if (firstName.trim() == '' || firstName == null || firstName == '') {
      setFirstNameErrorMsg("Please enter your first name");
      hasError = true;
    }
    if (lastName.trim() == '' || lastName == null || lastName == '') {
      setLastNameErrorMsg("Please enter your first name");
      hasError = true;
    }
    if (email.trim() == '' || email == null || email == '') {
      setEmailErrorMsg("Please enter your email");
      hasError = true;
    }
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
    if (!Utils.isEmail(email.trim())) {
      setEmailErrorMsg("Email is not valid");
      hasError = true;
    }
    if(hasError){
      return;
    }
    toggleActivityIndicator(true, "Registering...");
    WebApi.register(firstName, lastName, email, password, passwordConfirm).then((register_res)=>{
      toggleActivityIndicator(true, "Logging in...");
      WebApi.authorise(email, password).then((authorise_res)=>{
        var authorization_code = authorise_res.data.authorization_code;
        WebApi.accessToken(authorization_code).then((accessToken_res)=>{
          var access_token = accessToken_res.data.access_token;
          StoreSettings.store(StoreSettings.ACCESS_TOKEN, access_token)
          .then(()=>{
            StoreSettings.store(StoreSettings.IS_LOGGED_IN, "true")
            .then(()=>{
              toggleActivityIndicator(false)
              navigate("screenLanding");
            })
          })
        }).catch((err)=>{
          toggleActivityIndicator(false)
          return
        })
      }).catch((err)=>{
        toggleActivityIndicator(false)
        return
      })
    }).catch((err)=>{
      var msg = JSON.parse(err.message);
      HelperFunctions.showToast(msg.message)
      toggleActivityIndicator(false)
      return
    })
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View onTouchStart={Keyboard.dismiss} style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
  
        <LottieView style={{height: 250}} source={require('@assets/animation/register-53395.json')} autoPlay={true} loop={true} />

        <View style={[styles.container]}>
          <OutlineInput
            value={firstName}
            onChangeText={(e) => setFirstName(e)}
            label="First Name"
            activeValueColor="#6c63fe"
            activeBorderColor="#6c63fe"
            activeLabelColor="#6c63fe"
            passiveBorderColor="#bbb7ff"
            passiveLabelColor="#bbb7ff"
            passiveValueColor="#bbb7ff"
          />
          <Text style={styles.errorText}>{firstNameErrorMsg}</Text>
        </View>

        <View style={[styles.container]}>
          <OutlineInput
            value={lastName}
            onChangeText={(e) => setLastName(e)}
            label="Last Name"
            activeValueColor="#6c63fe"
            activeBorderColor="#6c63fe"
            activeLabelColor="#6c63fe"
            passiveBorderColor="#bbb7ff"
            passiveLabelColor="#bbb7ff"
            passiveValueColor="#bbb7ff"
          />
          <Text style={styles.errorText}>{lastNameErrorMsg}</Text>
        </View>

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

        <Button style={{width:'80%', marginBottom:20, height:60, justifyContent:'center', backgroundColor:"green" }} icon="account-plus" mode="contained" onPress={() => handleRegister()}>
          Create Account!
        </Button>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenRegister, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  container: { width:"80%", marginBottom: 10 },
  errorText:{color:'red'},
});
