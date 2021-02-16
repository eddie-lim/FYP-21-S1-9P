import React from 'react';
import { StyleSheet } from 'react-native';
import { StyleConstant, ShareStyle } from '@assets/MyStyle';
import { Input, Button, Card } from 'react-native-elements';


export default function CustomTextInput2(props) {
    return  <Input multiline={props.multiline} numberOfLines={1} errorMessage={props.errorMessage} keyboardType={['default'], props.keyboardType} inputStyle={[{fontSize: 14, color: StyleConstant.dark, ...ShareStyle.txtRegular}, props.inputStyle]} placeholderTextColor="#ccc" inputContainerStyle={{borderBottomWidth: 0}} containerStyle={[styles.elem, props.style]} rightIcon={props.rightIcon} placeholder={props.placeholder} value={props.value} onChangeText={props.onChangeText} autoCapitalize="characters" editable={props.editable}/>;
}

const styles = StyleSheet.create({
    elem: {borderWidth: 1, paddingTop: 0, paddingBottom: 0, justifyContent: 'center', borderColor: '#cccccc', height: 50, marginTop: 5, marginBottom: 5, borderRadius: 6}
});
