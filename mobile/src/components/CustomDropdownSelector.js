import React from 'react';
import { StyleSheet } from 'react-native';
import { StyleConstant, ShareStyle } from '@assets/MyStyle';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//ref: https://facebook.github.io/react-native/docs/view.html#hitslop

export default function CustomDropdownSelector(props) {
  return <ModalSelector
    style={[styles.selector, props.style]}
    data={props.data}
    initValue={props.initValue}
    onChange={props.onChange}
    selectTextStyle={{alignSelf: 'flex-start', color: StyleConstant.dark, marginLeft: 5, fontSize: 14, ...ShareStyle.txtRegular}}
    selectStyle={{height: 50, borderWidth: 0, justifyContent: 'center'}}
    initValueTextStyle={{alignSelf: 'flex-start', color: StyleConstant.dark, marginLeft: 5, fontSize: 14, ...ShareStyle.txtRegular}}
  />
}

const styles = StyleSheet.create({
  selector: {backgroundColor: StyleConstant.greyBg, width: '100%', alignSelf: 'center', marginTop: 5, borderRadius: 6, height: 50},
});
