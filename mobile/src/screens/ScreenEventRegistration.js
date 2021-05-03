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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { isArray } from 'lodash';
import HelperFunctions from '@helpers/HelperFunctions';
import Utils from '@helpers/Utils';

const ScreenEventRegistration = (props) => {
  const { navigate, goBack } = useNavigation();
  const { toggleActivityIndicator } = useContext(GlobalContext);
  const event_data = useNavigationParam('event_data');

  const [ loggedIn, setLoggedIn ] = useState(null);
  const [ hasRegistered, setHasRegistered ] = useState(null);
  const [ registeredData, setRegisteredData ] = useState(null);

  useEffect(() => {
    StoreSettings.get(StoreSettings.IS_LOGGED_IN)
    .then((res)=>{
      var right_button = null;
      if(res == true || res == "true"){
        WebApi.listEventsRegistration(event_data.id).then((reg_res)=>{
          setLoggedIn(true);
          if(reg_res.data.length > 0){
            // have record
            setHasRegistered(true);
            setRegisteredData(reg_res.data[0]);
          } else {
            // no record
            setHasRegistered(false);
            right_button = <Pressable style={{position: 'absolute', right: 15, justifyContent: 'center'}} onPress={() => handleSubmit()}>
                <Icon name={'upload'} color={'white'} size={30} />
              </Pressable>;
          }
            
        }).catch((err)=>{
          var error = err.data;
          if(isArray(error)){
            HelperFunctions.showToast(error[0].message)
          } else {
            HelperFunctions.showToast(error)
          }
          return
        })
      }

      if(res == false || res == "false"){
        setLoggedIn(false);
      }
      props.navigation.setParams({"navOptions":{
        headerShown:true,
        header:()=> HeaderWithBack("Register", ()=>{
          navigate("screenEventDetail")
        }, right_button)
      }});
    });
    return function cleanup() { } 
  }, []);

  handleRemove = () =>{
    toggleActivityIndicator(true, "Removing...");
    // console.log("deleteEventsRegistration data", registeredData.id)
    WebApi.deleteEventsRegistration(registeredData.id).then((res)=>{
      // console.log("deleteEventsRegistration res", res.data)
      toggleActivityIndicator(false);
      Alert.alert(
        "Success!",
        "You have successfully removed interest for this event.\nThank you!",
        [
          {
            text: 'OK', onPress: async () => {
              navigate("screenEventDetail")
            }
          },
        ]
      );
    }).catch((err)=>{
      // console.log("deleteEventsRegistration err", err)
      toggleActivityIndicator(false);
      var error = err.data;
      if(isArray(error)){
        HelperFunctions.showToast(error[0].message)
      } else {
        HelperFunctions.showToast(error)
      }
      return;
    })
  }

  handleSubmit = () =>{
    toggleActivityIndicator(true, "Registering...");
    var event_id = event_data.id;
    var data = {
      "event_id": event_id,
    }
    // console.log("postEventsRegistration data", data)
    WebApi.postEventsRegistration(data).then((res)=>{
      // console.log("postEventsRegistration res", res.data)
      toggleActivityIndicator(false);
      Alert.alert(
        "Success!",
        "You have successfully registered interest for this event.\nRemember to mark your calendar!",
        [
          {
            text: 'OK', onPress: async () => {
              navigate("screenEventDetail")
            }
          },
        ]
      );
    }).catch((err)=>{
      toggleActivityIndicator(false);
      var error = err.data;
      if(isArray(error)){
        HelperFunctions.showToast(error[0].message)
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

  renderForm = () => {
    if(loggedIn === true){
      if(hasRegistered === true && registeredData != null){
        return( 
          <View style={styles.container}>
            <Text>You have registered interest for {event_data.name} at {Utils.timestampToCalendarDateTime(registeredData.created_at)}</Text>
            <Text>We look forward seeing you!</Text>
            <Text> </Text>
            <Text>In the event if you could not make it for the event, you may remove interest for this event any time.</Text>
            <Text>Thank you!</Text>
            <Button style={{...styles.button, backgroundColor:"red" }} icon="calendar-remove" mode="contained" onPress={() => handleRemove()}>
              Remove Interest 
            </Button>
          </View>      
        )
      } else if(hasRegistered === false){
        return( 
          <View style={styles.container}>
            <Text>{event_data.name}</Text>
            <Text>{Utils.timestampToCalendarDateTime(event_data.start_at)} to {Utils.timestampToCalendarDateTime(event_data.end_at)}</Text>
            <Text>{event_data.venue}</Text>
            <Button style={{...styles.button, backgroundColor:"orange" }} icon="calendar-plus" mode="contained" onPress={() => handleSubmit()}>
              Register Interest
            </Button>
          </View>      
        )
      }
    } else if(loggedIn === false) {
      return(
        <View style={styles.container}>
          <Button style={{...styles.button, justifyContent:'center', backgroundColor:"orange" }} icon="login" mode="contained" onPress={() => navigate("screenLogin", {source:"screenEventDetail", event_data:event_data})}>
            Please login first
          </Button>
        </View>
        
      )
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View onTouchStart={()=>{Keyboard.dismiss; }} style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          
          <LottieView style={{height: 175, marginTop:15}} source={require('@assets/animation/events-registration-11067.json')} autoPlay={true} loop={true} />

          { renderForm() }

        </View>
      </ScrollView>
    </View>
  );
}

export default withScreenBase(ScreenEventRegistration, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  container: { marginTop:100, width:"80%",  marginTop: 15, marginBottom: 15 },
  button:{width:'100%', height:60, justifyContent:'center'}
});
