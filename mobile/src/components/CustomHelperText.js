import React from 'react';
import { StyleSheet } from 'react-native';
import { StyleConstant, ShareStyle } from '@assets/MyStyle';
import { List, Avatar, HelperText } from 'react-native-paper';

export default function CustomHelperText(props) {
    return <HelperText style={{color: StyleConstant.warning, ...ShareStyle.txtRegular}} type="error" visible={props.visible}>
        {props.text}
    </HelperText>;
}

const styles = StyleSheet.create({
    elem: {borderWidth: 1, borderColor: '#cccccc', height: 50, marginTop: 5, borderRadius: 6}
});
