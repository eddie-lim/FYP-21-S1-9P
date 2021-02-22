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

//##############################################

const LandingStack = createStackNavigator({
  screenLanding: ScreenLanding,
  // settings: ScreenSettings,
}, { initialRouteName: 'screenLanding'});

//##############################################

const EventStack = createStackNavigator({
  screenEventListing: ScreenEventListing,
  // settings: ScreenSettings,
}, { initialRouteName: 'screenEventListing'});

//##############################################

const MainBottomTab= createBottomTabNavigator({
  // event:EventStack,
  landing: {
    screen: LandingStack,
    navigationOptions:{
      tabBarLabel: ({ focused }) =>(<Text style={{fontSize: 9, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>landing</Text>),
      tabBarIcon: ({ focused }) =>(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={'calendar'} style={{marginRight: 5}} color={focused ? StyleConstant.primaryColor : StyleConstant.mutedText} size={24} />
          <Text style={{fontSize: 12, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>landing</Text>
        </View>
      ),
    }
  },
  event: {
    screen: EventStack,
    navigationOptions:{
      tabBarLabel: ({ focused }) =>(<Text style={{fontSize: 9, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>event</Text>),
      tabBarIcon: ({ focused }) =>(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={'calendar'} style={{marginRight: 5}} color={focused ? StyleConstant.primaryColor : StyleConstant.mutedText} size={24} />
          <Text style={{fontSize: 12, color: focused ? StyleConstant.primaryColor : StyleConstant.mutedText, alignSelf: 'center'}}>event</Text>
        </View>
      ),
    }
  },
}, { initialRouteName: 'landing', resetOnBlur:true, tabBarOptions: {showLabel: false, style: {height: 60}} });

//##############################################

const RootSwitch = createSwitchNavigator({
  appLoading: ScreenAppLoading,
  mainBottomTab: MainBottomTab,
}, { initialRouteName: 'mainBottomTab' });

export default createAppContainer(RootSwitch);