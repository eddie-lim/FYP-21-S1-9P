import React, { useEffect, useRef } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { View, Text } from 'react-native';
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


//##############################################

const LandingStack = createStackNavigator({
  screenLanding: ScreenLanding,
}, { initialRouteName: 'screenLanding'});

//##############################################

const LoginStack = createStackNavigator({
  screenLogin: ScreenLogin,
  screenRegister: ScreenRegister,
}, { initialRouteName: 'screenLogin'});

//##############################################

const ProfileStack = createStackNavigator({
  screenProfile: ScreenProfile,
}, { initialRouteName: 'screenProfile'});

//##############################################

const SettingsStack = createStackNavigator({
  screenSettings: ScreenSettings,
}, { initialRouteName: 'screenSettings'});

//##############################################

const EventStack = createStackNavigator({
  screenEventListing: ScreenEventListing,
  screenEventDetail: ScreenEventDetail,
}, { initialRouteName: 'screenEventListing'});

//##############################################

const UniversityStack = createStackNavigator({
  screenUniversity: ScreenUniversity,
  screenCourseListing: ScreenCourseListing,
  screenSchoolListing: ScreenSchoolListing,
  screenCourseDetail: ScreenCourseDetail,
  screenSchoolDetail: ScreenSchoolDetail,
}, { initialRouteName: 'screenUniversity'});

//##############################################

const MapStack = createStackNavigator({
  screenMap: ScreenMap,
}, { initialRouteName: 'screenMap'});

//##############################################

const QuestionsStack = createStackNavigator({
  screenQuestions: ScreenQuestions,
  screenApplicationProcess: ScreenApplicationProcess,
  screenFaq: ScreenFaq,
  screenFaqDetail: ScreenFaqDetail,
}, { initialRouteName: 'screenQuestions'});

//##############################################

const MainBottomTab= createBottomTabNavigator({
  university: {
    screen: UniversityStack,
    navigationOptions:{
      tabBarLabel: ({ focused }) =>(<Text style={{fontSize: 9, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>University</Text>),
      tabBarIcon: ({ focused }) =>(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={'school'} color={focused ? StyleConstant.primaryColor : StyleConstant.mutedText} size={24} />
          <Text style={{fontSize: 12, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>University</Text>
        </View>
      ),
    }
  },
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
      tabBarIcon: ({ focused }) =>(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={'home'} color={focused ? StyleConstant.primaryColor : StyleConstant.mutedText} size={24} />
          <Text style={{fontSize: 12, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>Home</Text>
        </View>
      ),
    }
  },
  event: {
    screen: EventStack,
    navigationOptions:{
      tabBarLabel: ({ focused }) =>(<Text style={{fontSize: 9, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>Events</Text>),
      tabBarIcon: ({ focused }) =>(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={'calendar'} color={focused ? StyleConstant.primaryColor : StyleConstant.mutedText} size={24} />
          <Text style={{fontSize: 12, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>Events</Text>
        </View>
      ),
    }
  },
  questions: {
    screen: QuestionsStack,
    navigationOptions:{
      tabBarLabel: ({ focused }) =>(<Text style={{fontSize: 9, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>Questions</Text>),
      tabBarIcon: ({ focused }) =>(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={'information'} color={focused ? StyleConstant.primaryColor : StyleConstant.mutedText} size={24} />
          <Text style={{fontSize: 12, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>Questions</Text>
        </View>
      ),
    }
  },
}, { initialRouteName: 'landing', resetOnBlur:true, tabBarOptions: {showLabel: false, style: {height: 60}} });

//##############################################

const RootSwitch = createSwitchNavigator({
  appLoading: ScreenAppLoading,
  mainBottomTab: MainBottomTab,
  loginStack: LoginStack,
  settingsStack: SettingsStack,
  profileStack: ProfileStack
}, { initialRouteName: 'mainBottomTab' });

export default createAppContainer(RootSwitch);