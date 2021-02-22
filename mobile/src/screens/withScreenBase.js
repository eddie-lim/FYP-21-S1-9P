import React, { useEffect, useContext } from 'react';
import { StyleConstant, ShareStyle } from '@assets/MyStyle';
import { Text, View, StyleSheet } from 'react-native';
import { GlobalContext } from '@helpers/Settings';
import { NavigationEvents } from "react-navigation";
import firebase from 'react-native-firebase';

const ScreenBaseType = { 
  LANDING: 'landing',
  MAIN: 'main'  
}

//higher order compnonet
//ref: https://www.youtube.com/watch?v=l8V59zIdBXU&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=35
const withScreenBase = (WrappedComponent, base=ScreenBaseType.MAIN, navigationOptions=null) => {

  let bgColor = StyleConstant.secondaryColorDark;
  if (base == ScreenBaseType.LANDING) 
    bgColor = '#ffffff';
  else if (base == ScreenBaseType.MAIN)
    bgColor = StyleConstant.bgGray;

  const screenBase = (props) => {
    const { renderActivityIndicator, renderCustomDialog, renderCustomPopup } = useContext(GlobalContext);

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
      
          <NavigationEvents
            onWillFocus={async()=>{
              let name = WrappedComponent.displayName;
              name = name ? name : WrappedComponent.name;
              console.log("will focus: " + name);
              // await firebase.analytics().setCurrentScreen(name);
            }}
          />
          { renderActivityIndicator() }
          { renderCustomDialog() }

          <WrappedComponent {...props} />

        </View>
    );
  }

  //note: option to navigationOptions or "props.navigation.setParams({"navOptions":navOptions});"
  //ref: https://reactnavigation.org/docs/en/navigation-prop.html
  //ref: https://blog.usejournal.com/react-navigation-cheatsheet-bf99f09d8060
  
  if (navigationOptions != null) {
    screenBase.navigationOptions = navigationOptions
  } else {
    screenBase.navigationOptions = ({navigation}) => ({
      ...navigation.getParam("navOptions", {})
    });
  }

  return screenBase;
}

export { withScreenBase, ScreenBaseType }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //backgroundColor: "#ff0000",
    width: '100%',
    height: '100%',
  },

});