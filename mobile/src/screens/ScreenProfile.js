import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, ScrollView, Dimensions, StyleSheet, BackHandler, Text, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import { Settings, GlobalContext } from '@helpers/Settings';
import Utils from '@helpers/Utils';
import WebApi from '@helpers/WebApi';
import { Button } from 'react-native-paper';
// import InputOutline from 'react-native-outline-input';
import LottieView from 'lottie-react-native';
import { InputOutline } from 'react-native-input-outline';

const ScreenProfile = (props) => {
  const { toggleActivityIndicator } = useContext(GlobalContext);
  const { navigate, goBack } = useNavigation();

  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ countryCode, setCountryCode ] = useState("");
  const [ mobileNumber, setMobileNumber ] = useState("");
  const [ highestQualification, setHighestQualification ] = useState("");
  const [ nationality, setNationality ] = useState("");
  const [ highestQualificationInstitute, setHighestQualificationInstitute ] = useState("");
  const [ yearOfGraduation, setYearOfGraduation ] = useState("");

  const [ firstNameErrorMsg, setFirstNameErrorMsg ] = useState("");
  const [ lastNameErrorMsg, setLastNameErrorMsg ] = useState("");
  const [ emailErrorMsg, setEmailErrorMsg ] = useState("");
  const [ countryCodeErrorMsg, setCountryCodeErrorMsg ] = useState("");
  const [ mobileNumberErrorMsg, setMobileNumberErrorMsg ] = useState("");
  const [ nationalityErrorMsg, setNationalityErrorMsg ] = useState("");
  const [ highestQualificationErrorMsg, setHighestQualificationErrorMsg ] = useState("");
  const [ highestQualificationInstituteErrorMsg, setHighestQualificationInstituteErrorMsg ] = useState("");
  const [ yearOfGraduationErrorMsg, setYearOfGraduationErrorMsg ] = useState("");

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack("My Profile", navigate, "screenLanding")
    }});
    BackHandler.addEventListener('hardwareBackPress', handleBackHandler);

    var profile = Settings.get(Settings.USER_PROFILE);
    setFirstName(profile.userProfile.firstname);
    setLastName(profile.userProfile.lastname);
    setEmail(profile.email);
    setCountryCode(profile.userProfile.country_code);
    setMobileNumber(profile.userProfile.mobile);
    setHighestQualification(profile.userProfile.highest_qualification);
    setNationality(profile.userProfile.nationality);
    setHighestQualificationInstitute(profile.userProfile.awarding_institute);
    setYearOfGraduation(profile.userProfile.year_of_graduation);

    return function cleanup() { } 
  }, []);

  handleBackHandler = ()=>{
    BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
    navigate("screenLanding");
    return true;
  }

  handleUpdate = () =>{
    toggleActivityIndicator(true, "Updating...");
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
      <ScrollView>
        <View onTouchStart={Keyboard.dismiss} style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <LottieView style={{height: 250}} source={require('@assets/animation/user-profile-50124.json')} autoPlay={true} loop={true} />

          <View style={[styles.container]}>
            <InputOutline
              value={firstName}
              onChangeText={(e) => setFirstName(e)}
              placeholder="First Name"
              activeValueColor="#6c63fe"
              activeBorderColor="#6c63fe"
              activeLabelColor="#6c63fe"
              passiveBorderColor="#bbb7ff"
              passiveLabelColor="#bbb7ff"
              passiveValueColor="#bbb7ff"
            />
          </View>

          <View style={[styles.container]}>
            <InputOutline
              value={lastName}
              onChangeText={(e) => setLastName(e)}
              placeholder="Last Name"
              activeValueColor="#6c63fe"
              activeBorderColor="#6c63fe"
              activeLabelColor="#6c63fe"
              passiveBorderColor="#bbb7ff"
              passiveLabelColor="#bbb7ff"
              passiveValueColor="#bbb7ff"
            />
          </View>

          <View style={[styles.container]}>
            <InputOutline
              value={email}
              onChangeText={(e) => setEmail(e)}
              placeholder="Email"
              activeValueColor="#6c63fe"
              activeBorderColor="#6c63fe"
              activeLabelColor="#6c63fe"
              passiveBorderColor="#bbb7ff"
              passiveLabelColor="#bbb7ff"
              passiveValueColor="#bbb7ff"
            />
          </View>
          
          <View style={[styles.container]}>
            <InputOutline
              value={countryCode}
              onChangeText={(e) => setCountryCode(e)}
              placeholder="Country Code"
              activeValueColor="#6c63fe"
              activeBorderColor="#6c63fe"
              activeLabelColor="#6c63fe"
              passiveBorderColor="#bbb7ff"
              passiveLabelColor="#bbb7ff"
              passiveValueColor="#bbb7ff"
            />
          </View>
          
          <View style={[styles.container]}>
            <InputOutline
              value={mobileNumber}
              onChangeText={(e) => setMobileNumber(e)}
              placeholder="Mobile Number"
              activeValueColor="#6c63fe"
              activeBorderColor="#6c63fe"
              activeLabelColor="#6c63fe"
              passiveBorderColor="#bbb7ff"
              passiveLabelColor="#bbb7ff"
              passiveValueColor="#bbb7ff"
            />
          </View>
          
          <View style={[styles.container]}>
            <InputOutline
              value={nationality}
              onChangeText={(e) => setNationality(e)}
              placeholder="Nationality"
              activeValueColor="#6c63fe"
              activeBorderColor="#6c63fe"
              activeLabelColor="#6c63fe"
              passiveBorderColor="#bbb7ff"
              passiveLabelColor="#bbb7ff"
              passiveValueColor="#bbb7ff"
            />
          </View>
          
          <View style={[styles.container]}>
            <InputOutline
              value={highestQualification}
              onChangeText={(e) => setHighestQualification(e)}
              placeholder="Highest Qualification"
              activeValueColor="#6c63fe"
              activeBorderColor="#6c63fe"
              activeLabelColor="#6c63fe"
              passiveBorderColor="#bbb7ff"
              passiveLabelColor="#bbb7ff"
              passiveValueColor="#bbb7ff"
            />
          </View>
          
          <View style={[styles.container]}>
            <InputOutline
              value={highestQualificationInstitute}
              onChangeText={(e) => setHighestQualificationInstitute(e)}
              placeholder="Awarding Institute"
              activeValueColor="#6c63fe"
              activeBorderColor="#6c63fe"
              activeLabelColor="#6c63fe"
              passiveBorderColor="#bbb7ff"
              passiveLabelColor="#bbb7ff"
              passiveValueColor="#bbb7ff"
            />
          </View>
          
          <View style={[styles.container]}>
            <InputOutline
              value={yearOfGraduation}
              onChangeText={(e) => setYearOfGraduation(e)}
              placeholder="Year of Graduation"
              activeValueColor="#6c63fe"
              activeBorderColor="#6c63fe"
              activeLabelColor="#6c63fe"
              passiveBorderColor="#bbb7ff"
              passiveLabelColor="#bbb7ff"
              passiveValueColor="#bbb7ff"
            />
          </View>

          <Button style={{width:'80%', marginBottom:20, height:60, justifyContent:'center', backgroundColor:"green" }} icon="account-plus" mode="contained" onPress={() => handleUpdate()}>
            Update
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenProfile, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  container: { width:"80%",  marginTop: 10, marginBottom: 10 },
});
