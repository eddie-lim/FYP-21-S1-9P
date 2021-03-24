import React from 'react';
import { Text, View, StyleSheet, Platform, ImageBackground, Image, Pressable } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Settings, StoreSettings, GlobalContext } from '@helpers/Settings';

const StyleConstant = {
  primaryColor: "#1b5e20",
  primaryColorLight: "#3e794c",
  primaryColorDark: "#002400",
  primaryTextColor: "#000000",

  secondaryColor: "#fbc02d",
  secondaryColorWithAlpha: '#fbc02dda',
  secondaryColorLight: "#fff263",
  secondaryColorDark: "#c49000",  
  secondaryTextColor: "#ffffff",
  mutedTextColor: "#cccccc",

  warnColor: "#ffee75",
  bgGray: "#eeeeee",
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

const HeaderWithTexture = (title)=>{
  return(
    <View style={{width: '100%', height: Platform.OS == 'ios' ? 76 : 56, backgroundColor: StyleConstant.primaryColor, paddingTop: Platform.OS == 'ios' ? 20 : 0}}>
      <ImageBackground source={require('@assets/img/green_texture_bg.png')} style={{width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{alignSelf: 'center', color: 'white'}}>{title}</Text>
      </ImageBackground>
    </View>
  )
}

const HomeHeader = (navigate, logged_in = null)=>{
  const title = "Create Your Own Future.\nBe A #FUTUREMAKER";
  // const logged_in = await StoreSettings.get(StoreSettings.IS_LOGGED_IN);
  // const logged_in = false;
  
  renderAccountButton = () =>{
    if(logged_in === "true" || logged_in === true){
      return(
        <Pressable onPress={() => {navigate('screenProfile')}} style={{position: 'absolute', left: 10, flexDirection: 'row'}}>
          <Icon name={'account-circle'} size={25} color={'white'}/>
          <Text style={{color: 'white', fontSize:20, marginStart:10}}>{'Profile'}</Text>
        </Pressable>
      )
    } else {
      return (
        <Pressable onPress={() => {navigate('screenLogin')}} style={{position: 'absolute', left: 10, flexDirection: 'row'}}>
          <Icon name={'login'} size={25} color={'white'}/>
          <Text style={{color: 'white', fontSize:20, marginStart:10}}>{'Login'}</Text>
        </Pressable>
      )
    }
  }
  return(
    <View style={{width: '100%', height: Platform.OS == 'ios' ? 186 : 156, backgroundColor: StyleConstant.primaryColor, paddingTop: Platform.OS == 'ios' ? 30 : 0}}>
      <View style={{height: '80%', width: '100%',justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'white', fontSize:20, textAlign:'center'}} >{title}</Text>
      </View>
      <View style={{backgroundColor:StyleConstant.primaryColor, width: '100%', height: '30%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        {renderAccountButton()}
        <Pressable onPress={() => {navigate('screenSettings')}} style={{position: 'absolute', right: 10}}>
          <Icon name={'cog'} size={30} color={'white'}/>
        </Pressable>
      </View>
    </View>
  );
}

const ShadowStyle = { shadowColor: 'rgba(0,0,0,0.4)', shadowOffset: {height: 1, width: 1}, shadowOpacity: 1, shadowRadius: 1, elevation: 2 }
const fabStyle = { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }

const HeaderWithBack = (title, navigate, destination, headerRight=null, goBack = null)=>{
  return(
    <View style={{width: '100%', height: Platform.OS == 'ios' ? 85 : 55, backgroundColor: StyleConstant.primaryColor, paddingTop: Platform.OS == 'ios' ? 30 : 0}}>
      <View style={{backgroundColor:StyleConstant.primaryColor, width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{alignSelf: 'center', color: 'white', fontSize:20}}>{title}</Text>
        <Pressable style={{position: 'absolute', left: 10, justifyContent: 'center'}} onPress={() => goBack == null ? navigate(destination): goBack()}>
          <Icon name={'arrow-left'} color={'white'} size={30} />
        </Pressable>
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
  textShadow: { textShadowColor: 'rgba(0,0,0,0.75)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 5 }
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

export { StyleConstant, ShareStyle, MyTheme, HeaderStyle, HeaderStyleWithBack, HeaderStyleWithBackIos, HeaderStyleWithRight, ShadowStyle, fabStyle, NavOptionStyle, HeaderWithTexture, HomeHeader, HeaderWithBack };