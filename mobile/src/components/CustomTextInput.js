import React from 'react';
import { StyleSheet } from 'react-native';
import { StyleConstant, ShareStyle } from '@assets/MyStyle';
import { TextInput, DefaultTheme } from 'react-native-paper';


export default function CustomTextInput(props) {
    return <TextInput mode='flat' theme={theme} underlineColor="transparent" {...props} style={[styles.elem, props.style]} />;
}
  
const theme = {
    ...DefaultTheme,
    roundness: 0,
    colors: {
        ...DefaultTheme.colors,
        primary: StyleConstant.primary,
        background: 'white',
        accent: StyleConstant.secondary,
        placeholder: '#dddddd',
    },
    //fonts: { medium: 'Open Sans' }
};

const styles = StyleSheet.create({
    elem: {
        height: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#cccccc',
        justifyContent: 'center',
        marginTop: 10,
        width: '90%',
        paddingVertical: 0,
        alignSelf: 'center',
    },
});
  



