import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, ScrollView, Dimensions, StyleSheet, BackHandler, Pressable, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import { Settings, GlobalContext } from '@helpers/Settings';
import Utils from '@helpers/Utils';
import WebApi from '@helpers/WebApi';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import { InputOutline } from 'react-native-input-outline';
import { isArray } from 'lodash';
import HelperFunctions from '@helpers/HelperFunctions';

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
      header:()=> HeaderWithBack("My Profile", navigate, "screenLanding",
      <Pressable style={{position: 'absolute', right: 15, justifyContent: 'center'}} onPress={() => handleUpdate()}>
        <Icon name={'content-save'} color={'white'} size={30} />
      </Pressable>)
    }});
    BackHandler.addEventListener('hardwareBackPress', handleBackHandler);

    var profile = Settings.get(Settings.USER_PROFILE);
    setEmail(profile.email);
    setFirstName(profile.userProfile.firstname);
    setLastName(profile.userProfile.lastname);
    setCountryCode(profile.userProfile.country_code);
    setMobileNumber(profile.userProfile.mobile);
    setHighestQualification(profile.userProfile.highest_qualification);
    setNationality(profile.userProfile.nationality);
    setHighestQualificationInstitute(profile.userProfile.awarding_institute);
    setYearOfGraduation(profile.userProfile.year_of_graduation);

    return function cleanup() {
      BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
    } 
  }, []);

  handleBackHandler = ()=>{
    BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
    navigate("screenLanding");
    return true;
  }

  handleUpdate = () =>{
    toggleActivityIndicator(true, "Updating...");
    var data = { 'userProfile':{} };
    var profile = Settings.get(Settings.USER_PROFILE);
    if(profile.email != email){
      data['email'] = email;
    }

    if(profile.userProfile.firstname != firstName) { data.userProfile['firstname'] = firstName }
    if(profile.userProfile.lastname != lastName) { data.userProfile['lastname'] = lastName }
    if(profile.userProfile.mobile != mobileNumber) { data.userProfile['mobile'] = mobileNumber }
    if(profile.userProfile.highest_qualification != highestQualification) { data.userProfile['highest_qualification'] = highestQualification }
    if(profile.userProfile.country_code != countryCode) { data.userProfile['country_code'] = countryCode }
    if(profile.userProfile.nationality != nationality) { data.userProfile['nationality'] = nationality }
    if(profile.userProfile.year_of_graduation != yearOfGraduation) { data.userProfile['year_of_graduation'] = yearOfGraduation }
    if(profile.userProfile.awarding_institute != highestQualificationInstitute) { data.userProfile['awarding_institute'] = highestQualificationInstitute }

    WebApi.patchProfile(data).then((profile_res)=>{
      // console.log("patchProfile(data)",profile_res.data[0]);
      Settings.store(Settings.USER_PROFILE, profile_res.data[0]);
      navigate("screenLanding");
    }).catch((err)=>{
      var error = err.data;
      if(isArray(error)){
        HelperFunctions.showToast(error[0].message)
      } else {
        HelperFunctions.showToast(error)
      }
      // console.log('patchProfile', err)
      return
    }).finally(()=>{
      toggleActivityIndicator(false)
    })
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View onTouchStart={Keyboard.dismiss} style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <LottieView style={{height: 175}} source={require('@assets/animation/user-profile-50124.json')} autoPlay={true} loop={true} />

          <View style={[styles.container]}>
            <InputOutline
              value={firstName}
              onChangeText={(e) => setFirstName(e)}
              placeholder="First Name"
              // activeValueColor="#6c63fe"
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
              // activeValueColor="#6c63fe"
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
              // activeValueColor="#6c63fe"
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
              // activeValueColor="#6c63fe"
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
              // activeValueColor="#6c63fe"
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
              // activeValueColor="#6c63fe"
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
              // activeValueColor="#6c63fe"
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
              // activeValueColor="#6c63fe"
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
              // activeValueColor="#6c63fe"
              activeBorderColor="#6c63fe"
              activeLabelColor="#6c63fe"
              passiveBorderColor="#bbb7ff"
              passiveLabelColor="#bbb7ff"
              passiveValueColor="#bbb7ff"
            />
          </View>

          {<Button style={{width:'80%', marginBottom:20, height:60, justifyContent:'center', backgroundColor:"green" }} icon="account-plus" mode="contained" onPress={() => handleUpdate()}>
            Update
          </Button>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenProfile, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  container: { width:"80%",  marginTop: 10, marginBottom: 10 },
});
