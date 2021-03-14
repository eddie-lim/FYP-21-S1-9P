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

const ScreenRegister = (props) => {
  const { navigate, goBack } = useNavigation();
  const { toggleActivityIndicator } = useContext(GlobalContext);

  const [ firstName, setFirstName ] = useState("Eddie");
  const [ lastName, setLastName ] = useState("Lim");
  const [ email, setEmail ] = useState("eddielinoofficial@gmail.com");
  const [ password, setPassword ] = useState("P@ssw0rd");
  const [ passwordConfirm, setPasswordConfirm ] = useState("P@ssw0rd");

  const [ firstNameErrorMsg, setFirstNameErrorMsg ] = useState("");
  const [ lastNameErrorMsg, setLastNameErrorMsg ] = useState("");
  const [ emailErrorMsg, setEmailErrorMsg ] = useState("");
  const [ passwordErrorMsg, setPasswordErrorMsg ] = useState("");
  const [ passwordConfirmErrorMsg, setPasswordConfirmErrorMsg ] = useState("");

  useEffect(() => {
    console.log("ScreenRegister")
    props.navigation.setParams({"navOptions":{
      header:()=> HeaderWithBack("Register", navigate, "screenLogin")
    }});
    return function cleanup() { } 
  }, []);

  handleRegister = () =>{
    console.log("Register!!")
    setFirstNameErrorMsg('');
    setLastNameErrorMsg('');
    setEmailErrorMsg('');
    setPasswordErrorMsg('');
    setPasswordConfirmErrorMsg('');

    if (firstName.trim() == '' || firstName == null || firstName == '') {
      setFirstNameErrorMsg("Please enter your first name");
      return;
    }
    if (lastName.trim() == '' || lastName == null || lastName == '') {
      setLastNameErrorMsg("Please enter your first name");
      return;
    }
    if (email.trim() == '' || email == null || email == '') {
      setEmailErrorMsg("Please enter your email");
      return;
    }
    if (password == '') {
      setPasswordErrorMsg("Please enter your password");
      return;
    }
    if (passwordConfirm == '') {
      setPasswordConfirmErrorMsg("Please confirm your password");
      return;
    }
    if (!Utils.isEmail(email.trim())) {
      setEmailErrorMsg("Email is not valid");
      return;
    }
    toggleActivityIndicator(true, "Registering...");
    WebApi.register(firstName, lastName, email, password, passwordConfirm).then((register_res)=>{
      toggleActivityIndicator(true, "Logging in...");
      WebApi.authorise(email, password).then((authorise_res)=>{
        authorization_code = authorise_res.data.authorization_code;
        WebApi.accessToken(authorization_code).then((accessToken_res)=>{
          access_token = accessToken_res.data.access_token;
          StoreSettings.store(StoreSettings.ACCESS_TOKEN, access_token)
          .then(()=>{
            StoreSettings.store(StoreSettings.IS_LOGGED_IN, "true")
            .then(()=>{
              toggleActivityIndicator(false)
              navigate("mainBottomTab");
            })
          })
        }).catch((err)=>{
          console.log(err)
          toggleActivityIndicator(false)
          return
        })
      }).catch((err)=>{
        console.log(err)
        toggleActivityIndicator(false)
        return
      })
    }).catch((err)=>{
      console.log(err)
      toggleActivityIndicator(false)
      return
    })
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View onTouchStart={Keyboard.dismiss} style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

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
        </View>

        <Button style={{width:'80%', marginBottom:20, height:60, justifyContent:'center', backgroundColor:"green" }} icon="account-plus" mode="contained" onPress={() => handleRegister()}>
          Create Account!
        </Button>

        <Text>firstName: {firstName}</Text>
        <Text>lastName: {lastName}</Text>
        <Text>email: {email}</Text>
        <Text>password: {password}</Text>
        <Text>password confirm: {passwordConfirm}</Text>
      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenRegister, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  viewHolder: { flex: 1, alignItems: 'stretch', flexDirection: 'column', backgroundColor: '#ffffff' },
  seperator: {width: '90%', height: 1.5, backgroundColor: 'gray', alignSelf: 'center', marginTop: 30},
  imgBg: {width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'},
  topHolder: {flexDirection: 'row', position: 'absolute', right: 10, top: 10},
  logoHolder: {width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'},
  logo: {width: (Dimensions.get('window').width) * 0.8, height: ((Dimensions.get('window').width) * 0.8)/3},
  centerContent: {width: '100%', height: (Dimensions.get('window').height) * 0.55, justifyContent: 'space-between'},
  txt: { width: '80%', height: 40, borderRadius: 10, backgroundColor: '#ffffff', color: '#000000', textAlign: 'left', textAlignVertical: 'center', borderWidth: 1, borderColor: StyleConstant.bgGray, paddingLeft: 15 },
  container: { width:"80%",  marginTop: 10, marginBottom: 10 },
});
