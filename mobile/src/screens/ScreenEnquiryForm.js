import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text, TextInput, Pressable, Keyboard } from 'react-native';
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
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

  const universityPartners_grenoble_ecole_de_management = "grenoble_ecole_de_management";
  const universityPartners_la_trobe_university = "la_trobe_university";
  const universityPartners_monash_college = "monash_college";
  const universityPartners_rmit_university = "rmit_university";
  const universityPartners_singapore_institute_of_management = "singapore_institute_of_management";
  const universityPartners_the_university_of_manchester = "the_university_of_manchester";
  const universityPartners_the_university_of_sydney = "the_university_of_sydney";
  const universityPartners_the_university_of_warwick = "the_university_of_warwick";
  const universityPartners_university_at_buffalo_the_state_university_of_new_york = "university_at_buffalo_the_state_university_of_new_york";
  const universityPartners_university_of_birmingham = "university_of_birmingham";
  const universityPartners_university_of_london = "university_of_london";
  const universityPartners_university_of_stirling = "university_of_stirling";
  const universityPartners_university_of_wollongong = "university_of_wollongong";
  const universityPartersIcons = {};
  const universityPartersRef = useRef(null);

  universityPartersIcons[universityPartners_grenoble_ecole_de_management] = "book-open-variant";
  universityPartersIcons[universityPartners_la_trobe_university] = "book-open-variant";
  universityPartersIcons[universityPartners_monash_college] = "book-open-variant";
  universityPartersIcons[universityPartners_rmit_university] = "book-open-variant";
  universityPartersIcons[universityPartners_singapore_institute_of_management] = "book-open-variant";
  universityPartersIcons[universityPartners_the_university_of_manchester] = "book-open-variant";
  universityPartersIcons[universityPartners_the_university_of_sydney] = "book-open-variant";
  universityPartersIcons[universityPartners_the_university_of_warwick] = "book-open-variant";
  universityPartersIcons[universityPartners_university_at_buffalo_the_state_university_of_new_york] = "book-open-variant";
  universityPartersIcons[universityPartners_university_of_birmingham] = "book-open-variant";
  universityPartersIcons[universityPartners_university_of_london] = "book-open-variant";
  universityPartersIcons[universityPartners_university_of_stirling] = "book-open-variant";
  universityPartersIcons[universityPartners_university_of_wollongong] = "book-open-variant";

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      header:()=> HeaderWithBack("Enquiry Form", navigate, "screenQuestions")
    }});
    return function cleanup() { } 
  }, []);

  handleSubmit = () =>{
    toggleActivityIndicator(true, "Submitting...");
    setTimeout(() => {
      toggleActivityIndicator(false)
    }, 1000);
    // WebApi.resetPassword(school).then((res)=>{
    //   toggleActivityIndicator(true, "Logging in...");
    // }).catch((err)=>{
    //   toggleActivityIndicator(false)
    //   return
    // })
  }

  renderDropdown = () => {
    var UniversityPartersItems = []; 
    for (const key in universityPartersIcons) {
      if (Object.hasOwnProperty.call(universityPartersIcons, key)) {
        const element = universityPartersIcons[key];
        UniversityPartersItems.push({
          label: key, // capitalise and remove underscore
          value: key,
          icon: () => <Icon name={element} size={18} color="#900" />,
        })
      }
    }

    return (
      <>
        <View style={[styles.container, (Platform.OS !== 'android' && {zIndex: 7000})]}>
          <Text>University Parters</Text>
          <DropDownPicker
            controller={instance => universityPartersRef.current = instance}
            placeholder="Attention to school"
            items={UniversityPartersItems}
            defaultValue={Object.keys(universityPartersIcons)}
            multiple={true}
            multipleText="%d schools have been selected."
            containerStyle={{height: 40}}
            style={[styles.DropDownPickerStyle]}
            itemStyle={[styles.DropDownPickerItemStyle]}
            dropDownStyle={[styles.DropDownPickerDropDownStyle]}
            onChangeItem={item => setSchool(item.value)}
          />
          <Text style={styles.errorText}>{schoolErrorMsg}</Text>
        </View>
      </>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View onTouchStart={Keyboard.dismiss} style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          
          <LottieView style={{height: 200}} source={require('@assets/animation/enquiry-33011.json')} autoPlay={true} loop={true} />

          {renderDropdown()}
          
          <View style={[styles.container]}>
            <OutlineInput
              value={name}
              onChangeText={(e) => setName(e)}
              label="Name"
              activeValueColor="#6c63fe"
              activeBorderColor="#6c63fe"
              activeLabelColor="#6c63fe"
              passiveBorderColor="#bbb7ff"
              passiveLabelColor="#bbb7ff"
              passiveValueColor="#bbb7ff"
            />
            <Text style={styles.errorText}>{nameErrorMsg}</Text>
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
              value={enquiry}
              onChangeText={(e) => setEnquiry(e)}
              label="Enquiry"
              activeValueColor="#6c63fe"
              activeBorderColor="#6c63fe"
              activeLabelColor="#6c63fe"
              passiveBorderColor="#bbb7ff"
              passiveLabelColor="#bbb7ff"
              passiveValueColor="#bbb7ff"
            />
            <Text style={styles.errorText}>{enquiryErrorMsg}</Text>
          </View>
          
          <Button style={{width:'80%', marginBottom:20, height:60, justifyContent:'center', backgroundColor:"green" }} icon="upload" mode="contained" onPress={() => handleSubmit()}>
            Submit!
          </Button>
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
