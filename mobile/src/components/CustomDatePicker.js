import React from 'react';
import { StyleSheet } from 'react-native';
import { StyleConstant, ShareStyle } from '@assets/MyStyle';
import DatePicker from 'react-native-datepicker';

export default function CustomDatePicker(props) {
    return <DatePicker
        //"datetime", "DD-MM-YYYY HH:mm" from props
        style={[styles.elem, props.style]}
        date={props.date}
        mode={props.mode}
        placeholder="select date"
        format={props.format}
        // minDate="01-01-1900"
        // maxDate= {new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={props.onDateChange}
        showIcon={false}
        customStyles={{
            dateText: {alignSelf: 'flex-start', color: StyleConstant.dark, marginLeft: 15, ...ShareStyle.txtRegular},
            dateInput: {borderWidth: 0},
            placeholderText: {alignSelf: 'flex-start',  marginLeft: 15, ...ShareStyle.txtRegular}
        }}
    />;
}

const styles = StyleSheet.create({
    elem: {width: '100%', borderWidth: 1, borderColor: StyleConstant.mutedText, height: 50, marginTop: 5, borderRadius: 6, justifyContent: 'center'}
});
  



