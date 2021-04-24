import React, { useEffect, useRef, useState } from 'react';
import { View, BackHandler, StyleSheet, Pressable, Text, ScrollView, Image } from 'react-native';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import { capitalize, join, split, parseInt, map } from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Utils from '@helpers/Utils';
import { Button } from 'react-native-paper';

const ScreenEventDetail = (props) => {
  const { navigate, goBack } = useNavigation();
  const item = useNavigationParam('item');
  const source = useNavigationParam('source');
  const courseDetailItem = useNavigationParam('courseDetailItem'); //screenCourseDetail

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack("Event Detail", ()=>{
        navigate(source, {item:courseDetailItem})
      },
      <Pressable style={{position: 'absolute', right: 15, justifyContent: 'center'}} onPress={() => handleRegister()}>
        <Icon name={'calendar-plus'} color={'white'} size={30} />
      </Pressable>)
    }});
    BackHandler.addEventListener('hardwareBackPress', handleBackHandler);

    return function cleanup() {
      BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
    } 
  }, []);

  handleBackHandler = ()=>{
   BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
   navigate(source, {item:courseDetailItem});
   return true;
 }

  handleRegister = () => {
    navigate("screenEventRegistration", {event_data:item});
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{backgroundColor: 'rgba(245,252,255,1)'}}>
        <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

          <View style={{height:100, width:'100%'}}>
            <Image style={{width:'100%', height:'100%', resizeMode: "contain"}} source={{uri : item.thumbnail_url}} />
          </View>
          <View style={styles.fixedContentContainer}>
            <Text style={{fontSize:30}}>{item.name}</Text>
            <View style={{marginTop:15, flexDirection:'row', flexWrap:'wrap'}}>
              <Text style={{fontSize:20, alignItems: 'center', width:'40%'}}>By:</Text>
              <View style={{height:50, width:'50%'}}>
                <Image style={{width:'100%', height:'100%', resizeMode: "contain"}} source={{uri : item.university_thumbnail_url}} />
              </View>
            </View>
          </View>

          <View style={styles.fixedContentContainer}>
            <Text style={styles.fixedContentHeader}>Description</Text>
            <View style={styles.greySeperator}/>
            <Text style={styles.fixedContentBody}>{item.description}</Text>
          </View>

          <View style={styles.fixedContentContainer}>
            <Text style={styles.fixedContentHeader}>Details</Text>
            <View style={styles.greySeperator}/>
            <Text style={styles.fixedContentBody}>{Utils.timestampToCalendarDate(item.start_at)+" - "+Utils.timestampToCalendarDate(item.end_at)}</Text>
            <Text style={styles.fixedContentBody}>{Utils.timestampToCalendarTime(item.start_at)+" - "+Utils.timestampToCalendarTime(item.end_at)}</Text>
            <Text style={styles.fixedContentBody}>{item.venue}</Text>
            <Button style={{marginBottom:20, marginTop:30, height:60, justifyContent:'center', backgroundColor:"orange" }} icon="calendar-plus" mode="contained" onPress={() => handleRegister()}>
              Register Interest
            </Button>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenEventDetail, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  greySeperator: {width: '100%', height: 1, backgroundColor: StyleConstant.bgGray, marginTop: 10},
  fixedContentContainer: {width: '90%', marginTop:10, marginBottom:10},
  fixedContentHeader:{fontSize:18, color:'navy', fontWeight:'bold'},
  fixedContentBody:{marginTop:10},
});
