import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, BackHandler, Text, ScrollView, Dimensions } from 'react-native';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import { capitalize, join, split, parseInt, map } from 'lodash';

const ScreenSchoolDetail = (props) => {
  const { navigate, goBack } = useNavigation();
  const item = useNavigationParam('item');
  const source = useNavigationParam('source');

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack("School Detail", ()=>{
        navigate(source)
      })
    }});
    BackHandler.addEventListener('hardwareBackPress', handleBackHandler);

    return function cleanup() { 
      BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
    } 
  }, []);

  handleBackHandler = ()=>{
   BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
   navigate("screenLanding");
   return true;
 }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{backgroundColor: 'rgba(245,252,255,1)'}}>
        <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

          <View style={styles.fixedContentContainer}>
            <View style={{height:100, marginTop:15, marginBottom:15}}>
              <Image style={{width:'100%', height:'100%', resizeMode: "contain"}} source={{uri : item.thumbnail_url}} />
            </View>
            <Text style={styles.fixedContentHeader}>{item.name+"\nOverview"}</Text>
            <View style={styles.greySeperator}/>
            <Text style={styles.fixedContentBody}>{item.description}</Text>
          </View>

          <View style={styles.fixedContentContainer}>
            <Text style={styles.fixedContentHeader}>Highlights</Text>
            <View style={styles.greySeperator}/>
            <Text style={styles.fixedContentBody}>{item.highlights}</Text>
          </View>

          <View style={styles.fixedContentContainer}>
            <Text style={styles.fixedContentHeader}>Certifications</Text>
            <View style={styles.greySeperator}/>
            <Text style={styles.fixedContentBody}>{item.certifications}</Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenSchoolDetail, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  greySeperator: {width: '100%', height: 1, backgroundColor: StyleConstant.bgGray, marginTop: 10},
  fixedContentContainer: {width: '90%', marginTop:10, marginBottom:10},
  fixedContentHeader:{fontSize:18, color:'navy', fontWeight:'bold'},
  fixedContentBody:{marginTop:10},
});
