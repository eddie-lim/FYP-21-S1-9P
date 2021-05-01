import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, Platform, Image, Pressable } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StyleConstant = {
  primaryColor: "#009067",
  // primaryColor: "#009369",
  primaryColorLight: "#4fc497",
  primaryColorDark: "#00643e",
  primaryTextColor: "#ffffff",

  secondaryColor: "#0a2f4f",
  secondaryColorWithAlpha: '#0a2f4fda',
  secondaryColorLight: "#3c587b",
  secondaryColorDark: "#000427",  
  secondaryTextColor: "#ffffff",
  mutedTextColor: "grey",

  warnColor: "#ffee75",
  bgGray: "#767676",
  tabGray: "#999",
  xmasRed: "#af0005",
  additionRed: "#c62828",

  titleFontSize: 28,
}

const s = StyleConstant;

const MyTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: s.primary,
    accent: s.secondary,
  }
};


//ref: https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
const HeaderStyle = {
  headerStyle : {backgroundColor: s.primaryColor},
  headerTitleStyle: { color: "white", alignSelf: "center", marginLeft: "auto", marginRight: "auto", fontSize: 16, fontWeight: "normal"},
  headerTintColor: 'white'
};

const HeaderStyleWithBackDroid = {
  headerTitleStyle: { color: "white", alignSelf: "center", marginLeft: "auto", marginRight: "auto", fontSize: 16, fontWeight: "normal"},
  headerTintColor: 'white',
  headerStyle: { backgroundColor: s.primaryColor },
  headerTitleContainerStyle: {
    left: 0
  }
};
const HeaderStyleWithBackIos = {
  headerTitleStyle: { color: "white", alignSelf: "center", marginLeft: "auto", marginRight: "auto", fontSize: 16, fontWeight: "normal"},
  headerTintColor: 'white',
  headerStyle: { backgroundColor: s.primaryColor },
  headerTitleContainerStyle: {}
};
//different style required for droid and ios
const HeaderStyleWithBack = Platform.OS === 'android'? HeaderStyleWithBackDroid : HeaderStyleWithBackIos;

const HeaderStyleWithRight = {
  headerTitleStyle: { color: "white", alignSelf: "center", marginLeft: "auto", marginRight: "auto", fontSize: 16, fontWeight: "normal"},
  headerTintColor: 'white',
  headerStyle: { backgroundColor: s.primaryColor },
  headerTitleContainerStyle: {
    alignItems: "center"
  }
};

const HomeHeader = (navigate, logged_in = null, user_name = null)=>{
  
  renderAccountButton = () =>{
    if(logged_in === "true" || logged_in === true){
      return(
        <Pressable onPress={() => {navigate('screenProfile')}} style={{position: 'absolute', left: 15, bottom: 15, flexDirection: 'row'}}>
          <Icon name={'account-circle'} size={25} color={'white'}/>
          <Text style={{color: 'white', fontSize:20, marginStart:10}}>{user_name}</Text>
        </Pressable>
      )
    } else {
      return (
        <Pressable onPress={() => {navigate('screenLogin', {source:"screenLanding"})}} style={{height:25, position: 'absolute', left: 15, bottom: 15, flexDirection: 'row'}}>
          <Icon name={'login'} size={25} color={'white'}/>
          <Text style={{color: 'white', fontSize:20, marginStart:10}}>{'Login'}</Text>
        </Pressable>
      )
    }
  }
  renderSettingsButton = () =>{
    if(logged_in === "true" || logged_in === true){
      return(
        <Pressable onPress={() => {navigate('screenSettings')}} style={{height:30, position: 'absolute', right: 20, bottom: 10}}>
          <Icon name={'cog'} size={30} color={'white'}/>
        </Pressable>
      )
    }
  }
  return(
    <View style={{width: '100%', height: Platform.OS == 'ios' ? 180 : 150, backgroundColor: StyleConstant.primaryColor, paddingTop: Platform.OS == 'ios' ? 30 : 0}}>
      
      <View style={{height: '80%', width: '100%',justifyContent: 'center', alignItems: 'center', marginBottom:0, backgroundColor:'white', borderBottomLeftRadius:30, /*borderBottomRightRadius:30*/}}>
          <Pressable style={{width:'100%', height:'100%', paddingTop:15}} onPress={() => navigate("screenLandingWebview", {url:'https://www.simge.edu.sg/', source:"screenLanding", headerName:"SIM GE"})}>
            <Image style={{height: '80%', width: '100%', resizeMode:'contain'}} source={require('@assets/img/openhouse-logo.png')} />
          {/* <Text style={{color: 'white', fontSize:20, textAlign:'center'}} >{title}</Text> */}
        </Pressable>
      </View>
      <View style={{backgroundColor:'white', width: '100%', height: '35%',}}>
      <View style={{backgroundColor:StyleConstant.primaryColor, width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopRightRadius:30, borderBottomLeftRadius:30}}>
        {renderAccountButton()}
        {renderSettingsButton()}
      </View>
      </View>
    </View>
  );
}

const ShadowStyle = { shadowColor: 'rgba(0,0,0,0.4)', shadowOffset: {height: 1, width: 1}, shadowOpacity: 1, shadowRadius: 1, elevation: 2 }
const fabStyle = { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }

const HeaderWithBack = (title, navigate, headerRight=null)=>{
  return(
    <View style={{...ShareStyle.curveThis, width: '100%', height: Platform.OS == 'ios' ? 85 : 55, backgroundColor: StyleConstant.primaryColor, paddingTop: Platform.OS == 'ios' ? 30 : 0}}>
      <View style={{...ShareStyle.curveThis, backgroundColor:StyleConstant.primaryColor, width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{alignSelf: 'center', color: 'white', fontSize:20}}>{title}</Text>
        <Pressable style={{position: 'absolute', left: 15, justifyContent: 'center'}} onPress={() => navigate()}>
          <Icon name={'arrow-left'} color={'white'} size={30} />
        </Pressable>
        {headerRight}
      </View>
    </View>
  );
}
const HeaderWithCustomButtons = (title, headerLeft=null, headerRight=null)=>{
  return(
    <View style={{...ShareStyle.curveThis, width: '100%', height: Platform.OS == 'ios' ? 85 : 55, backgroundColor: StyleConstant.primaryColor, paddingTop: Platform.OS == 'ios' ? 30 : 0}}>
      <View style={{...ShareStyle.curveThis, backgroundColor:StyleConstant.primaryColor, width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{alignSelf: 'center', color: 'white', fontSize:20}}>{title}</Text>
        {headerLeft}
        {headerRight}
      </View>
    </View>
  );
}

const NavOptionStyle = {
  transparent : {headerTransparent: true, backgroundColor: 'transparent', headerTintColor: 'black', headerBackTitle: null, headerTitleStyle: {position: 'absolute', fontSize: 14, left: -30, fontWeight: 'normal'}},
  transparentWhite : {headerTransparent: true, backgroundColor: 'transparent', headerTintColor: 'white', headerBackTitle: null, headerTitleStyle: {position: 'absolute', fontSize: 14, left: -30, fontWeight: 'normal'}},};

const ShareStyle = StyleSheet.create({
  titleTxt: { fontSize: StyleConstant.titleFontSize, lineHeight:StyleConstant.titleFontSize, color: StyleConstant.primaryColorLight, textAlign: 'center', textAlignVertical: 'center', },
  flex1: { flex: 1, },
  flex2: { flex: 2, },
  flex3: { flex: 3, },
  txtBold : { fontWeight: 'bold' },
  txtRegular : {},
  textShadow: { textShadowColor: 'rgba(0,0,0,0.75)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 5 },
  curveThis: {borderBottomLeftRadius:20, borderBottomRightRadius:20, }
});
/*
const MyThemeReactPaper = {
  ...DefaultTheme,
  roundness: 12,
  colors: {
    ...DefaultTheme.colors,
    primary: StyleConstant.primaryColor,
    accent: StyleConstant.primaryColorLight,
  },
};
*/

export { StyleConstant, ShareStyle, MyTheme, HeaderStyle, HeaderStyleWithBack, HeaderStyleWithBackIos, HeaderStyleWithRight, ShadowStyle, fabStyle, NavOptionStyle, HomeHeader, HeaderWithBack, HeaderWithCustomButtons };