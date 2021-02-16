import React from 'react';
import { StyleSheet } from 'react-native';
import { StyleConstant, ShareStyle } from '@assets/MyStyle';
import { Button, DefaultTheme } from 'react-native-paper';

//ref: https://facebook.github.io/react-native/docs/view.html#hitslop

export default function CustomButton(props) {
  return <Button mode="flat" labelStyle={{fontSize: 12, ...ShareStyle.txtBold}} theme={theme} icon={props.icon} {...props} color= {props.color} style={[styles.elem, props.style]} hitSlop={{top: 20, bottom: 20, left: 50, right: 50}} />;
}

const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      primary: "white",
      accent: StyleConstant.secondary,
    },
    fonts: { regular:{...ShareStyle.txtBold}, medium: {...ShareStyle.txtBold}, light: {...ShareStyle.txtBold}, thin: {...ShareStyle.txtBold} }
  };

const styles = StyleSheet.create({
    elem: {
        //color: ShareStyle.primaryText,
        height: 40,
        width: '60%',
        justifyContent: 'center',
        marginTop: 16,
        borderWidth: 2,
        borderColor: StyleConstant.secondary
    },
});
