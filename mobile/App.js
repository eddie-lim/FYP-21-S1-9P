import React, { useEffect, useRef } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { View, Text, Image } from 'react-native';
import { StyleConstant } from '@assets/MyStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenAppLoading from '@screens/ScreenAppLoading';
import ScreenLanding from '@screens/ScreenLanding';
import ScreenEventListing from '@screens/ScreenEventListing';
import ScreenEventDetail from '@screens/ScreenEventDetail';
import ScreenUniversity from '@screens/ScreenUniversity';
import ScreenCourseListing from '@screens/ScreenCourseListing';
import ScreenCourseDetail from '@screens/ScreenCourseDetail';
import ScreenSchoolListing from '@screens/ScreenSchoolListing';
import ScreenSchoolDetail from '@screens/ScreenSchoolDetail';
import ScreenMap from '@screens/ScreenMap';
import ScreenQuestions from '@screens/ScreenQuestions';
import ScreenApplicationProcess from '@screens/ScreenApplicationProcess';
import ScreenFaq from '@screens/ScreenFaq';
import ScreenFaqDetail from '@screens/ScreenFaqDetail';
import ScreenLogin from '@screens/ScreenLogin';
import ScreenRegister from '@screens/ScreenRegister';
import ScreenSettings from '@screens/ScreenSettings';
import ScreenProfile from '@screens/ScreenProfile';
import ScreenForgetPassword from '@screens/ScreenForgetPassword';
import ScreenWebview from '@screens/ScreenWebview';
import ScreenEnquiryForm from '@screens/ScreenEnquiryForm';
import ScreenChangePassword from '@screens/ScreenChangePassword';
import ScreenEventRegistration from '@screens/ScreenEventRegistration';

//##############################################

const LandingStack = createStackNavigator({
  screenLanding: ScreenLanding,
  screenLogin: ScreenLogin,
  screenRegister: ScreenRegister,
  screenForgetPassword: ScreenForgetPassword,
  screenChangePassword: ScreenChangePassword,
  screenProfile: ScreenProfile,
  screenSettings: ScreenSettings,


  screenEventListing: ScreenEventListing,
  screenEventDetail: ScreenEventDetail,
  screenEventRegistration: ScreenEventRegistration,

  // screenUniversity: ScreenUniversity,
  screenCourseListing: ScreenCourseListing,
  screenSchoolListing: ScreenSchoolListing,
  screenCourseDetail: ScreenCourseDetail,
  screenSchoolDetail: ScreenSchoolDetail,
}, { initialRouteName: 'screenLanding', defaultNavigationOptions:{headerShown:false} });

LandingStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName == "screenLogin" || navigation.state.routes[i].routeName == "screenRegister" || navigation.state.routes[i].routeName == "screenForgetPassword" || navigation.state.routes[i].routeName == "screenProfile" || navigation.state.routes[i].routeName == "screenSettings") { tabBarVisible = false; }
  }
  return { tabBarVisible };
};

//##############################################

const EventStack = createStackNavigator({
  screenEventListing: ScreenEventListing,
  screenEventDetail: ScreenEventDetail,
  screenEventRegistration: ScreenEventRegistration,
}, { initialRouteName: 'screenEventListing', defaultNavigationOptions:{headerShown:false} });

//##############################################

const UniversityStack = createStackNavigator({
  screenUniversity: ScreenUniversity,
  screenCourseListing: ScreenCourseListing,
  screenSchoolListing: ScreenSchoolListing,
  screenCourseDetail: ScreenCourseDetail,
  screenSchoolDetail: ScreenSchoolDetail,
}, { initialRouteName: 'screenUniversity', defaultNavigationOptions:{headerShown:false} });

//##############################################

const MapStack = createStackNavigator({
  screenMap: ScreenMap,
}, { initialRouteName: 'screenMap', defaultNavigationOptions:{headerShown:false} });

//##############################################

const WebviewStack = createStackNavigator({
  screenWebview: ScreenWebview,
}, { initialRouteName: 'screenWebview'});

//##############################################

const QuestionsStack = createStackNavigator({
  screenQuestions: ScreenQuestions,
  screenApplicationProcess: ScreenApplicationProcess,
  screenFaq: ScreenFaq,
  screenFaqDetail: ScreenFaqDetail,
  screenEnquiryForm: ScreenEnquiryForm,
}, { initialRouteName: 'screenQuestions'});

//##############################################

const MainBottomTab= createBottomTabNavigator({
  // university: {
  //   screen: UniversityStack,
  //   navigationOptions:{
  //     tabBarLabel: ({ focused }) =>(<Text style={{fontSize: 9, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>University</Text>),
  //     tabBarIcon: ({ focused }) =>(
  //       <View style={{alignItems: 'center', justifyContent: 'center'}}>
  //         <Icon name={'school'} color={focused ? StyleConstant.primaryColor : StyleConstant.mutedText} size={24} />
  //         <Text style={{fontSize: 12, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>University</Text>
  //       </View>
  //     ),
  //   }
  // },
  map: {
    screen: MapStack,
    navigationOptions:{
      tabBarLabel: ({ focused }) =>(<Text style={{fontSize: 9, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>Map</Text>),
      tabBarIcon: ({ focused }) =>(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={'map'} color={focused ? StyleConstant.primaryColor : StyleConstant.mutedText} size={24} />
          <Text style={{fontSize: 12, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>Map</Text>
        </View>
      ),
    }
  },
  landing: {
    screen: LandingStack,
    navigationOptions:{
      tabBarLabel: ({ focused }) =>(<Text style={{fontSize: 9, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>Home</Text>),
      tabBarIcon: ({ focused }) =>{
        return(
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('@assets/img/sim-global-education-logo-sm.png')} style={{width:44,height: 17, marginTop:4}}/>
            <Text style={{fontSize: 12, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center', paddingTop:3}}>Open House</Text>
          </View>
        )
      },
    }
  },
  // event: {
  //   screen: EventStack,
  //   navigationOptions:{
  //     tabBarLabel: ({ focused }) =>(<Text style={{fontSize: 9, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>Events</Text>),
  //     tabBarIcon: ({ focused }) =>(
  //       <View style={{alignItems: 'center', justifyContent: 'center'}}>
  //         <Icon name={'calendar'} color={focused ? StyleConstant.primaryColor : StyleConstant.mutedText} size={24} />
  //         <Text style={{fontSize: 12, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>Events</Text>
  //       </View>
  //     ),
  //   }
  // },
  questions: {
    screen: QuestionsStack,
    navigationOptions:{
      tabBarLabel: ({ focused }) =>(<Text style={{fontSize: 9, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>Information</Text>),
      tabBarIcon: ({ focused }) =>(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={'information'} color={focused ? StyleConstant.primaryColor : StyleConstant.mutedText} size={24} />
          <Text style={{fontSize: 12, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>Information</Text>
        </View>
      ),
    }
  },
}, { initialRouteName: 'landing', resetOnBlur:true, tabBarOptions: {showLabel: false, style: {height: 60}} });

//##############################################

const RootSwitch = createSwitchNavigator({
  appLoading: ScreenAppLoading,
  mainBottomTab: MainBottomTab,
  webviewStack: WebviewStack,
}, { initialRouteName: 'appLoading'});

export default createAppContainer(RootSwitch);