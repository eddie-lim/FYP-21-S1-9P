import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text, BackHandler, Pressable, Keyboard } from 'react-native';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { StoreSettings, GlobalContext, Settings } from '@helpers/Settings';
import Utils from '@helpers/Utils';
import WebApi from '@helpers/WebApi';
import { Button } from 'react-native-paper';
import OutlineInput from 'react-native-outline-input';
import LottieView from 'lottie-react-native';
import { forEach, isArray } from 'lodash';
import HelperFunctions from '@helpers/HelperFunctions';

const ScreenLogin = (props) => {
  const { navigate, goBack } = useNavigation();
  const { toggleActivityIndicator } = useContext(GlobalContext);

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ emailErrorMsg, setEmailErrorMsg ] = useState("");
  const [ passwordErrorMsg, setPasswordErrorMsg ] = useState("");
  
  const source = useNavigationParam('source');
  const event_data = useNavigationParam('event_data');

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack("Login", ()=>{
        navigate(source, {item:event_data})
      })
    }});
    BackHandler.addEventListener('hardwareBackPress', handleBackHandler);
    return function cleanup() {
      BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
    } 
  }, []);

  handleBackHandler = ()=>{
    BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
    navigate(source, {item:event_data});
    return true;
  }

  handleLogin = () =>{
    setEmailErrorMsg('');
    setPasswordErrorMsg('');
    var hasError = false;
    
    if (email.trim() == '' || email == null || email == '') {
      setEmailErrorMsg("Please enter your email");
      hasError = true;
    }
    if (password == '') {
      setPasswordErrorMsg("Please enter your password");
      hasError = true;
    }
    if (!Utils.isEmail(email.trim())) {
      setEmailErrorMsg("Email is not valid");
      hasError = true;
    }
    if(hasError){
      return;
    }
    toggleActivityIndicator(true, "Logging in...");
    WebApi.authorise(email, password).then((authorise_res)=>{
      var authorization_code = authorise_res.data.authorization_code;
      WebApi.accessToken(authorization_code).then((accessToken_res)=>{
        var access_token = accessToken_res.data.access_token;
        StoreSettings.store(StoreSettings.ACCESS_TOKEN, access_token)
        .then(()=>{
          WebApi.getProfile().then((profile_res)=>{
            Settings.store(Settings.USER_PROFILE, profile_res.data[0]); 
            StoreSettings.store(StoreSettings.IS_LOGGED_IN, "true")
            .then(()=>{
              toggleActivityIndicator(false)
              navigate("screenLanding")
            })
          }).catch((err)=>{
            // setPasswordErrorMsg("Incorrect email or password");
            toggleActivityIndicator(false);
            var error = err.data;
            if(isArray(error)){
              HelperFunctions.showToast(error[0].message)
            } else {
              HelperFunctions.showToast(error)
            }
            return
          })
        })
      }).catch((err)=>{
        // setPasswordErrorMsg("Incorrect email or password");
        toggleActivityIndicator(false);
        var error = err.data;
        if(isArray(error)){
          HelperFunctions.showToast(error[0].message)
        } else {
          HelperFunctions.showToast(error)
        }
        return
      })
    }).catch((err)=>{
      // setPasswordErrorMsg("Incorrect email or password");
      toggleActivityIndicator(false);
      var error = err.data;
      if(isArray(error)){
        forEach(error, function(item){
          console.log("item",item)
          var field = item.field;
          var message = item.message;
          if (field == "email") {
            HelperFunctions.showToast(message)
            setEmailErrorMsg(message);
          } else if (field == "password") {
            HelperFunctions.showToast(message)
            setPasswordErrorMsg(message);
          } else {
            HelperFunctions.showToast(message)
          }
        })
      } else {
        HelperFunctions.showToast(error)
      }
      return
    })
    
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View onTouchStart={Keyboard.dismiss} style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          
          <LottieView style={{height: 250}} source={require('@assets/animation/login-8590.json')} autoPlay={true} loop={true} />

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

          <Button style={{width:'80%', marginBottom:20, height:60, justifyContent:'center', backgroundColor:"green" }} icon="login" mode="contained" onPress={() => handleLogin()}>
            Log me in!
          </Button>

          <Button style={{width:'80%', marginBottom:20, height:60, justifyContent:'center', backgroundColor:"orange" }} icon="lock-reset" mode="contained" onPress={() => navigate("screenForgetPassword")}>
            Forgot password?
          </Button>

          <Button style={{width:'80%', marginBottom:20, height:60, justifyContent:'center', backgroundColor:"blue" }} icon="account-plus" mode="contained" onPress={() => navigate("screenRegister")}>
            Register here!
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenLogin, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  viewHolder: { flex: 1, alignItems: 'stretch', flexDirection: 'column', backgroundColor: '#ffffff' },
  seperator: {width: '90%', height: 1.5, backgroundColor: 'gray', alignSelf: 'center', marginTop: 30},
  imgBg: {width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'},
  topHolder: {flexDirection: 'row', position: 'absolute', right: 10, top: 10},
  logoHolder: {width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'},
  logo: {width: (Dimensions.get('window').width) * 0.8, height: ((Dimensions.get('window').width) * 0.8)/3},
  centerContent: {width: '100%', height: (Dimensions.get('window').height) * 0.55, justifyContent: 'space-between'},
  txt: { width: '80%', height: 40, borderRadius: 10, backgroundColor: '#ffffff', color: '#000000', textAlign: 'left', textAlignVertical: 'center', borderWidth: 1, borderColor: StyleConstant.bgGray, paddingLeft: 15 },
  container: { width:"80%", marginBottom: 10 },
  errorText:{color:'red'},
});
