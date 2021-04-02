import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, StyleSheet, BackHandler, Text, Pressable, FlatList, ScrollView, Switch } from 'react-native';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoreSettings} from '@helpers/Settings';

const ScreenSettings = (props) => {
  const { navigate, goBack } = useNavigation();

  const [isEnabledPushNotification, setIsEnabledPushNotification] = useState(false);
  const [isEnabledNewsletterSubscription, setIsEnabledNewsletterSubscription] = useState(false);
  const [settings, setSettings] = useState([
    {
      "title": "Push Notification",
      "icon": <Icon name={'bell'} size={24} color={StyleConstant.mutedTextColor}/>,
      "action" : ()=>{navigate('editProfile')},
      'type': "switch"
    },
    {
      "title": "Newsletter Subscription",
      "icon": <Icon name={'email-newsletter'} size={24} color={StyleConstant.mutedTextColor}/>,
      "action" : ()=>{navigate('changePw')},
      'type': "switch"
    },
  ]);

  toggleSwitch = (title) => {
     if(title == 'Push Notification'){
       setIsEnabledPushNotification(previousState => !previousState)
     } else {
       setIsEnabledNewsletterSubscription(previousState => !previousState)
     }
   };
 
  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack("Settings", navigate, "screenLanding")
    }});
    BackHandler.addEventListener('hardwareBackPress', handleBackHandler);

    StoreSettings.get(StoreSettings.IS_LOGGED_IN)
    .then((IS_LOGGED_IN)=>{
      if(IS_LOGGED_IN === "true" || IS_LOGGED_IN === true){
      setSettings(previousState => [...previousState, 
        {
          "title": "Logout",
          "icon": <Icon name={'logout'} size={24} color={StyleConstant.mutedTextColor}/>,
          "action" : ()=>{
            StoreSettings.store(StoreSettings.IS_LOGGED_IN, "false")
            .then(()=>{
              navigate("screenLanding")
            })
          },
          'type': "button"
        }]);
      }
    })
    return function cleanup() { } 
  }, []);

   handleBackHandler = ()=>{
    BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
    navigate("screenLanding");
    return true;
  }
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} style={{backgroundColor: 'white'}} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.flatlistHolder}>
            <Text style={styles.titleText}>Main</Text>
            <FlatList
              data={settings}
              renderItem={({item})=>{
                if(item.type == 'switch'){
                  return (
                  <Pressable activeOpacity={0.5} style={{backgroundColor: 'white', width: '100%', flexDirection: 'row', height: 45, alignItems: 'center', justifyContent: 'space-between'}} onPress={item.action}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {item.icon}
                      <Text style={{marginLeft: 10, color: 'black'}}>{item.title}</Text>
                    </View>
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={"#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={()=>toggleSwitch(item.title)}
                      value={item.title == 'Push Notification'? isEnabledPushNotification : isEnabledNewsletterSubscription}
                    />
                  </Pressable>
                  );
                } else {
                  return (
                    <Pressable activeOpacity={0.5} style={{backgroundColor: 'white', width: '100%', flexDirection: 'row', height: 45, alignItems: 'center', justifyContent: 'space-between'}} onPress={item.action}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {item.icon}
                        <Text style={{marginLeft: 10, color: 'black'}}>{item.title}</Text>
                      </View>
                    </Pressable>
                  );
                }
                
              }}
            />
          </View>
        </View>   
      </ScrollView>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenSettings, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  viewHolder: { flex: 1, alignItems: 'stretch', flexDirection: 'column', backgroundColor: '#ffffff' },
  seperator: {width: '90%', height: 1.5, backgroundColor: 'gray', alignSelf: 'center', marginTop: 30},
  imgBg: {width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'},
  topHolder: {flexDirection: 'row', position: 'absolute', right: 10, top: 10},
  logoHolder: {width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'},
  logo: {width: (Dimensions.get('window').width) * 0.8, height: ((Dimensions.get('window').width) * 0.8)/3},
  centerContent: {width: '100%', height: (Dimensions.get('window').height) * 0.55, justifyContent: 'space-between'},
  container: {flex: 1, backgroundColor: 'white'},
  flatlistHolder: {width: '95%', alignSelf: 'center'},
  titleText: {color: StyleConstant.primaryColorLight, fontSize: 13, marginTop: 20},
  lineSeperator: {width: '100%', height: 1, backgroundColor: StyleConstant.bgGray}
});
