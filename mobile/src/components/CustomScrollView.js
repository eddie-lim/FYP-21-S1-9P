import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Linking, Alert, FlatList, Image, ImageBackground, Dimensions, RefreshControl, SafeAreaView } from 'react-native';
import useCustomFlatListFunc from '@hooks/useCustomFlatListFunc';
import { ShareStyle, StyleConstant } from '@assets/MyStyle';

export default CustomScrollView = (props) => {

    return (
        <ScrollView 
            refreshControl={ <RefreshControl progressViewOffset={props.offset} colors={[StyleConstant.primary]} tintColor={StyleConstant.primary} refreshing={props.refreshing} onRefresh={props.onRefresh}/> }
            contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}
        >
        {props.children}
        </ScrollView>
    );
};
