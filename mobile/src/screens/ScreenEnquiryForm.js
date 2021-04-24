import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Alert, StyleSheet, ScrollView, Text, Platform, Pressable, Keyboard } from 'react-native';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { StoreSettings, GlobalContext, Settings } from '@helpers/Settings';
import WebApi from '@helpers/WebApi';
import { Button, TextInput } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { isArray, isEmpty, trim } from 'lodash';
import HelperFunctions from '@helpers/HelperFunctions';

const ScreenEnquiryForm = (props) => {
  const { navigate, goBack } = useNavigation();
  const { toggleActivityIndicator } = useContext(GlobalContext);

  const [ school, setSchool ] = useState("");
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ enquiry, setEnquiry ] = useState("");

  const [ schoolErrorMsg, setSchoolErrorMsg ] = useState("");
  const [ nameErrorMsg, setNameErrorMsg ] = useState("");
  const [ emailErrorMsg, setEmailErrorMsg ] = useState("");
  const [ enquiryErrorMsg, setEnquiryErrorMsg ] = useState("");
  const [ courseFilterValues, setCourseFilterValues ] = useState(null);

  const universityPartersRef = useRef(null);
  const [ loggedIn, setLoggedIn ] = useState(null);

  useEffect(() => {
    StoreSettings.get(StoreSettings.IS_LOGGED_IN)
    .then((res)=>{
      var right_button = null;
      if(res == true || res == "true"){
        setLoggedIn(true);
        right_button = <Pressable style={{position: 'absolute', right: 15, justifyContent: 'center'}} onPress={() => handleSubmit()}>
            <Icon name={'upload'} color={'white'} size={30} />
          </Pressable>;
      }

      if(res == false || res == "false"){
        setLoggedIn(false);
      }
      props.navigation.setParams({"navOptions":{
        headerShown:true,
        header:()=> HeaderWithBack("Enquiry Form", ()=>{
          navigate("screenQuestions")
        }, right_button)
      }});
    });
    WebApi.getCourseFilterValues().then((res)=>{
      setCourseFilterValues(res);
    })
    return function cleanup() { } 
  }, []);

  handleSubmit = () =>{
    setSchoolErrorMsg("")
    setEnquiryErrorMsg("")
    var hasError = false;
    if(isEmpty(school)){
      setSchoolErrorMsg("Please select an university")
      hasError = true;
    }
    if(isEmpty(trim(enquiry))){
      setEnquiryErrorMsg("Please write your enquiries")
      hasError = true;
    }
    if(hasError){
      return;
    }
    toggleActivityIndicator(true, "Submitting...");
    // setTimeout(() => {
    //   toggleActivityIndicator(false)
    // }, 1000);
    var user_id = (Settings.get(Settings.USER_PROFILE)).id;
    var data = {
      "user_id": user_id,
      "school_id": school,
      "enquiry": enquiry
    }
    // console.log("postEnquiries data", data)
    WebApi.postEnquiries(data).then((res)=>{
      // console.log("postEnquiries res", res.data)
      toggleActivityIndicator(false);
      Alert.alert(
        "Success!",
        "Your enquiry has been submitted successfully.\nOur friendly staff will get back to your via your registered email soon!\n\nThank you!",
        [
          {
            text: 'OK', onPress: async () => {
              navigate("screenQuestions")
            }
          },
        ]
      );
    }).catch((err)=>{
      var error = err.data;
      if(isArray(error)){
        HelperFunctions.showToast(error[0].message)
        setEnquiryErrorMsg(error[0].message)
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
      toggleActivityIndicator(false);
      return;
    })
  }

  renderForm = () => {
    if(loggedIn === true){
      if(courseFilterValues!=null){
        var res = courseFilterValues;
        // console.log(res.data)
        var UniversityPartersItems = [];
        // var UniversityPartersValues = []
        for (let index = 0; index < res.data.universityParters.length; index++) {
          const item = res.data.universityParters[index];
          var uni = JSON.parse(item);
          // UniversityPartersValues.push(uni.value)
          UniversityPartersItems.push({
            label: uni.label, // capitalise and remove underscore
            value: uni.value,
            icon: () => <Icon name={"book-open-variant"} size={18} color="#900" />,
          })
        }
        // setUniversityParters(UniversityPartersValues)
    
        return (
          <>
            <View style={[styles.container, (Platform.OS !== 'android' && {zIndex: 7000})]}>
              <Text>Attention to</Text>
              <DropDownPicker
                controller={instance => universityPartersRef.current = instance}
                placeholder="Pick an university"
                items={UniversityPartersItems}
                // defaultValue={Object.keys(universityPartersIcons)}
                // multiple={true}
                // multipleText="%d schools have been selected."
                containerStyle={{height: 40}}
                style={[styles.DropDownPickerStyle]}
                itemStyle={[styles.DropDownPickerItemStyle]}
                dropDownStyle={[styles.DropDownPickerDropDownStyle]}
                onChangeItem={item => setSchool(item.value)}
              />
              <Text style={styles.errorText}>{schoolErrorMsg}</Text>
            </View>
            
            <View style={[styles.container]}>
              <TextInput
                value={enquiry}
                onChangeText={(e) => setEnquiry(e)}
                label="Enquiry"
                activeValueColor="#6c63fe"
                activeBorderColor="#6c63fe"
                activeLabelColor="#6c63fe"
                passiveBorderColor="#bbb7ff"
                passiveLabelColor="#bbb7ff"
                passiveValueColor="#bbb7ff"
                multiline
                numberOfLines={6}
              />
              <Text style={styles.errorText}>{enquiryErrorMsg}</Text>
            </View>
            
            {<Button style={{width:'80%', marginBottom:20, height:60, justifyContent:'center', backgroundColor:"green" }} icon="upload" mode="contained" onPress={() => handleSubmit()}>
              Submit!
            </Button>}
          </>
        )
      }
    } else if(loggedIn === false) {
      return(
        <View style={{marginTop:100, }}>
          <Button style={{width:'80%', height:60, justifyContent:'center', backgroundColor:"orange" }} icon="login" mode="contained" onPress={() => navigate("screenLogin", {source:"screenEnquiryForm"})}>
            Please login first
          </Button>
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View onTouchStart={()=>{Keyboard.dismiss; }} style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          
          <LottieView style={{height: 175, marginTop:15}} source={require('@assets/animation/enquiry-33011.json')} autoPlay={true} loop={true} />

          { renderForm() }

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenEnquiryForm, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  container: { width:"80%",  marginTop: 10, marginBottom: 10 },
  errorText:{color:'red'},
  DropDownPickerStyle:{backgroundColor: '#fafafa'},
  DropDownPickerItemStyle:{justifyContent: 'flex-start'},
  DropDownPickerDropDownStyle:{backgroundColor: '#fafafa'},
});
