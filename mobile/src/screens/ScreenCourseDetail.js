import React, { useEffect, useRef, useState } from 'react';
import { View, BackHandler, StyleSheet, ScrollView, Text, Image, Pressable } from 'react-native';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle, ShareStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import Accordion from 'react-native-collapsible/Accordion';
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';
import { capitalize, join, split, parseInt, map, words, upperFirst } from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WebApi from '@helpers/WebApi';
import { Button } from 'react-native-paper';

const ScreenCourseDetail = (props) => {
  const { navigate, goBack } = useNavigation();
  const item = useNavigationParam('item');
  /*    TYPESCRIPT WOULD BE USEFUL HERE OH WELL
  id
  name
  school_id
  university
  university_thumbnail_url
  mode_of_study
  disciplines
  sub_disciplines
  academic_level
  introduction
  programme_structure
  admission_criteria
  entry_qualification
  fees
  exemptions
  profiles
  assessments_exams
  */
  const source = useNavigationParam('source');

  const [ introductionIsCollapsible, setIntroductionIsCollapsible ] = useState(true);
  const [ programmeStructureIsCollapsible, setProgrammeStructureIsCollapsible ] = useState(true);
  const [ admissionCriteriaIsCollapsible, setAdmissionCriteriaIsCollapsible ] = useState(true);
  const [ feesIsCollapsible, setFeesIsCollapsible ] = useState(true);
  const [ exemptionsIsCollapsible, setExemptionsIsCollapsible ] = useState(true);
  const [ profilesIsCollapsible, setProfilesIsCollapsible ] = useState(true);
  const [ assessmentsExamsIsCollapsible, setAssessmentsExamsIsCollapsible ] = useState(true);

  const [ events, setEvents ] = useState(null);

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack("Course Detail", ()=>{
        navigate(source)
      })
    }});
    BackHandler.addEventListener('hardwareBackPress', handleBackHandler);

    WebApi.listEvents(0, "&per-page=1&filter[and][0][school_id][]="+item.school_id)
    .then((res)=>{
      setEvents(res.data[0])
    })
    .catch((err)=>{
      console.log(err)
    })

    return function cleanup() { 
      BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
    } 
  }, []);

  handleBackHandler = ()=>{
   BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
   navigate(source);
   return true;
  }

  handleJoinEvent = () =>{
    navigate("screenEventDetail", {item:events, source:"screenCourseDetail", courseDetailItem:item})
  }

  renderEvents = () =>{
    if(events == null){
      return (
        <>
          <Text style={{width:'100%', textAlign:'center', marginBottom:20, marginTop:20}}>No upcoming events related to this course.</Text>
        </>
      )
    } else {
      return (
        <>
          <Text style={{fontWeight:'bold', marginTop:10}}>{events.name}</Text>
          <Text>{events.description}</Text>
          <Button style={{marginBottom:20, marginTop:20, height:60, justifyContent:'center', backgroundColor:"navy", color:'white' }} icon="door-open" mode="contained" onPress={() => handleJoinEvent()}>
            Join Now
          </Button>
        </>
      )
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          
          <View style={styles.fixedContentContainer}>
            <Text style={{fontSize:30}}>{item.name},&nbsp;{upperFirst(words(item.mode_of_study).join(" "))}</Text>
            <View style={{marginTop:15, flexDirection:'row', flexWrap:'wrap'}}>
              <Text style={{fontSize:20, alignItems: 'center', width:'40%'}}>Awarded by:</Text>
              <View style={{height:50, width:'50%'}}>
                <Image style={{width:'100%', height:'100%', resizeMode: "contain"}} source={{uri : item.university_thumbnail_url}} />
              </View>
            </View>
          </View>

          <View style={styles.fixedContentContainer}>
            <Text style={styles.fixedContentHeader}>Application</Text>
            <View style={styles.greySeperator}/>
            <Text style={styles.fixedContentBody}>{item.application}</Text>
          </View>

          <View style={styles.fixedContentContainer}>
            <Text style={styles.fixedContentHeader}>Course Start Date &amp; End Date</Text>
            <View style={styles.greySeperator}/>
            <Text style={styles.fixedContentBody}>{item.course_start_end_date}</Text>
          </View>

          <View style={styles.fixedContentContainer}>
            <Text style={styles.fixedContentHeader}>Scholarships &amp; Awards</Text>
            <View style={styles.greySeperator}/>
            <Text style={styles.fixedContentBody}>{item.scholarships_award}</Text>
          </View>

          <View style={styles.fixedContentContainer}>
            <Text style={styles.fixedContentHeader}>Programme Overview</Text>
            <View style={styles.greySeperator}/>
            <Image source={{uri : item.thumbnail_url}} />
            <Text style={styles.fixedContentBody}>{item.overview}</Text>
          </View>

          <Pressable style={styles.accordionHeader} onPress={()=>setIntroductionIsCollapsible(previousState => !previousState)}>
            <Icon style={styles.accordionHeaderLeftIcon} name={'grease-pencil'} size={16} color={'white'}/>
            <Text style={styles.accordionHeaderText}>Introduction</Text>
            <Icon style={styles.accordionHeaderRightIcon} name={introductionIsCollapsible?'chevron-down':'chevron-up'} size={20} color={'white'}/>
          </Pressable>
          <Collapsible collapsed={introductionIsCollapsible}>
            <Animatable.View style={styles.accordionBodyText}>
              <Animatable.Text>{item.introduction}</Animatable.Text>
            </Animatable.View>
          </Collapsible>

          <Pressable style={styles.accordionHeader} onPress={()=>setProgrammeStructureIsCollapsible(previousState => !previousState)}>
            <Icon style={styles.accordionHeaderLeftIcon} name={'sitemap'} size={16} color={'white'}/>
            <Text style={styles.accordionHeaderText}>Programme Structure</Text>
            <Icon style={styles.accordionHeaderRightIcon} name={programmeStructureIsCollapsible?'chevron-down':'chevron-up'} size={20} color={'white'}/>
          </Pressable>
          <Collapsible collapsed={programmeStructureIsCollapsible}>
            <Animatable.View style={styles.accordionBodyText}>
              <Animatable.Text>{item.programme_structure}</Animatable.Text>
            </Animatable.View>
          </Collapsible>

          <Pressable style={styles.accordionHeader} onPress={()=>setAdmissionCriteriaIsCollapsible(previousState => !previousState)}>
            <Icon style={styles.accordionHeaderLeftIcon} name={'newspaper-variant-multiple'} size={16} color={'white'}/>
            <Text style={styles.accordionHeaderText}>Admission Criteria</Text>
            <Icon style={styles.accordionHeaderRightIcon} name={admissionCriteriaIsCollapsible?'chevron-down':'chevron-up'} size={20} color={'white'}/>
          </Pressable>
          <Collapsible collapsed={admissionCriteriaIsCollapsible}>
            <Animatable.View style={styles.accordionBodyText}>
              <Animatable.Text>{item.admission_criteria}</Animatable.Text>
            </Animatable.View>
          </Collapsible>

          <Pressable style={styles.accordionHeader} onPress={()=>setFeesIsCollapsible(previousState => !previousState)}>
            <Icon style={styles.accordionHeaderLeftIcon} name={'cash'} size={16} color={'white'}/>
            <Text style={styles.accordionHeaderText}>Fees</Text>
            <Icon style={styles.accordionHeaderRightIcon} name={feesIsCollapsible?'chevron-down':'chevron-up'} size={20} color={'white'}/>
          </Pressable>
          <Collapsible collapsed={feesIsCollapsible}>
            <Animatable.View style={styles.accordionBodyText}>
              <Animatable.Text>{item.fees}</Animatable.Text>
            </Animatable.View>
          </Collapsible>

          <Pressable style={styles.accordionHeader} onPress={()=>setExemptionsIsCollapsible(previousState => !previousState)}>
            <Icon style={styles.accordionHeaderLeftIcon} name={'checkbox-marked-outline'} size={16} color={'white'}/>
            <Text style={styles.accordionHeaderText}>Exemptions</Text>
            <Icon style={styles.accordionHeaderRightIcon} name={exemptionsIsCollapsible?'chevron-down':'chevron-up'} size={20} color={'white'}/>
          </Pressable>
          <Collapsible collapsed={exemptionsIsCollapsible}>
            <Animatable.View style={styles.accordionBodyText}>
              <Animatable.Text>{item.exemptions}</Animatable.Text>
            </Animatable.View>
          </Collapsible>

          <Pressable style={styles.accordionHeader} onPress={()=>setProfilesIsCollapsible(previousState => !previousState)}>
            <Icon style={styles.accordionHeaderLeftIcon} name={'account-group'} size={16} color={'white'}/>
            <Text style={styles.accordionHeaderText}>Profiles</Text>
            <Icon style={styles.accordionHeaderRightIcon} name={profilesIsCollapsible?'chevron-down':'chevron-up'} size={20} color={'white'}/>
          </Pressable>
          <Collapsible collapsed={profilesIsCollapsible}>
            <Animatable.View style={styles.accordionBodyText}>
              <Animatable.Text>{item.profiles}</Animatable.Text>
            </Animatable.View>
          </Collapsible>

          <Pressable style={styles.accordionHeader} onPress={()=>setAssessmentsExamsIsCollapsible(previousState => !previousState)}>
            <Icon style={styles.accordionHeaderLeftIcon} name={'pencil'} size={16} color={'white'}/>
            <Text style={styles.accordionHeaderText}>Assessments &amp; Exams</Text>
            <Icon style={styles.accordionHeaderRightIcon} name={assessmentsExamsIsCollapsible?'chevron-down':'chevron-up'} size={20} color={'white'}/>
          </Pressable>
          <Collapsible collapsed={assessmentsExamsIsCollapsible}>
            <Animatable.View style={styles.accordionBodyText}>
              <Animatable.Text>{item.assessments_exams}</Animatable.Text>
            </Animatable.View>
          </Collapsible>

          <View style={styles.fixedContentContainer}>
            <Text style={styles.fixedContentHeader}>Events &amp; Programme Briefings</Text>
            <View style={styles.greySeperator}/>
            {renderEvents()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default withScreenBase(ScreenCourseDetail, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  accordionBodyText: {width: '90%', flexDirection: 'row', alignItems: 'center', marginTop:15, marginBottom:15},
  accordionHeader: {width: '100%', backgroundColor: StyleConstant.primaryColor, flexDirection: 'row', alignItems: 'center'},
  accordionHeaderText: {color: 'white', fontSize: 16, marginTop: 10, marginBottom:10, marginLeft:10},
  accordionHeaderLeftIcon:{marginTop: 10, marginBottom: 10, marginLeft:10},
  accordionHeaderRightIcon:{marginTop: 10, marginBottom: 10, position: 'absolute', right: 10},
  greySeperator: {width: '100%', height: 1, backgroundColor: StyleConstant.bgGray, marginTop: 10},
  fixedContentContainer: {width: '90%', marginTop:10, marginBottom:10},
  fixedContentHeader:{fontSize:18, color:'navy', fontWeight:'bold'},
  fixedContentBody:{marginTop:10},
});
