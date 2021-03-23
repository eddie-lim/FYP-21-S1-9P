import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text } from 'react-native';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';

const ScreenCourseDetail = (props) => {
  const { navigate, goBack } = useNavigation();
  const [ activeSections, setActiveSections ] = useState([0]);
    
  const SECTIONS = [
    {
      // title: 'title',
      header: 'Programme Overview',
      content: 'Developed and awarded by RMIT University, Australia. \n\nFounded in 1887, RMIT is one of Australia’s original educational institutions. \n\nRMIT has a 5-Star QS ranking for excellence in higher education and is 15th highest ranked university in Australia (QS World University Rankings 2020-21). RMIT is ranked 18th in the world and 5th in Australia among universities less than 50 years old (QS Top 50 Under 50 index 2021). \n\nRMIT University has been providing education in aerospace engineering and aviation for over 75 years. The programme offered in Singapore enables students to access the same content and quality of instruction they would receive in Melbourne. \n\nThe successful completion of the programme will provide you with a broad, coherent body of knowledge and theory related to the global aviation industry.',
    },
    {
      // title: 'title',
      header: 'Application',
      content: 'Jul 2021 Intake\n\nLocal Applicant: 20 Jan 2021 to 30 Apr 2021',
    },
    {
      // title: 'title',
      header: 'Course Start Date & End Date',
      content: 'Intake Month(s)\n\nPart-time: Jan, Jul\n\nNext intake: July 2021\n\nDirect Entry (14 modules):\n\n2.5 years : 01-Jul-21 – 31-Dec-23\n\nNon-direct Entry (18 modules – Require Prep modules):\n\n3 years : 01-Jul-21 – 30-Jun-24',
    },
    {
      // title: 'title',
      header: 'Fee',
      content: 'SIM Preparatory modules:\n\nS$1,070.00 for 2 modules\n\nRMIT Preparatory modules:\n\nS$5,035.42 for 2 modules\n\nRMIT Undergraduate programme: \n\nS$35,247.94 for 14 modules, payable over 5 semesters\n\nTotal course fee: S$41,353.36 (with 7% GST)\n\nFees quoted are valid for July 2021 intake only.\n\nAll fees inclusive of prevailing GST',
    },
    {
      // title: 'title',
      header: 'Assessment & Exams',
      content: 'Assessment components vary from module to module. Students are normally assessed by continuous assessments in the form of mid-term class tests, individual and group assignments or projects, case studies, discussion and class presentations.\n\n      Most modules have a final examination at the end of semester. The examinations are held from late April to early May for the semester commencing in January, and in late October to early November for the semester commencing in July.\n\n      \n\n      The examinations are scheduled on weekdays and Saturdays, in the morning and afternoon.\n\n      \n\n      \n\n      Academic Progress\n\n      Students are allowed to repeat a module once only. For advanced modules with pre-requisites, students are required to satisfactorily meet the pre-requisites before undertaking the modules.\n\n      \n\n      \n\n      Attendance Requirement\n\n      Part-time (local) students: 75%\n\n      \n\n      \n\n      Awards & Graduation\n\n      Students will be considered as eligible for the award of Bachelor of Applied Science (Aviation) when they have satisfactorily completed all academic requirements of the programme as detailed in the programme structure.\n\n      \n\n      Awards are presented to students who have attained a set standard of achievement in the overall performance of the programme.\n\n      \n\n      The degree can be awarded with Distinction based on the student’s academic performance.\n\n      \n\n      A degree conferral ceremony is held in August or September each year in Singapore.',
    },
    {
      // title: 'title',
      header: 'Events & Programme Briefings',
      content: '[19 & 20 Mar, 11am to 5.30pm] SIM Open House: On-Campus Admissions Consultation\n\n\nSIM Education Fair - Online & On-campus',
    },
  ];

  useEffect(() => {
    console.log("ScreenCourseDetail")
    props.navigation.setParams({"navOptions":{
      header:()=> HeaderWithBack("Course Detail", navigate, "screenCourseListing")
    }});
    return function cleanup() { } 
  }, []);
  
  renderSectionTitle = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.title}</Text>
      </View>
    );
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={[styles.header, isActive ? styles.active : styles.inactive]}>
        <Text style={styles.headerText}>{section.header}</Text>
      </Animatable.View>
    );
  };

  renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={[styles.content, isActive ? styles.active : styles.inactive]}>
        <Animatable.Text
          duration={500}
          easing="ease-out"
          animation={isActive ? 'bounceIn' : false}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  updateSections = (activeSections) => {
    console.log("activeSections", activeSections)
    setActiveSections(activeSections);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{backgroundColor: 'rgba(245,252,255,1)'}}>
        <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Accordion
          containerStyle={{width:'100%'}}
          sections={SECTIONS}
          activeSections={activeSections}
          // renderSectionTitle={renderSectionTitle}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={updateSections}
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenCourseDetail, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  container: {flex: 1,backgroundColor: '#F5FCFF',paddingTop: Constants.statusBarHeight,},
  title: {textAlign: 'center',fontSize: 22,fontWeight: '300',marginBottom: 20,},
  header: {backgroundColor: '#F5FCFF',padding: 10,},
  headerText: {textAlign: 'center',fontSize: 16,fontWeight: '500',},
  content: {padding: 20,backgroundColor: '#fff',},
  active: {backgroundColor: 'rgba(255,255,255,1)',},
  inactive: {backgroundColor: 'rgba(245,252,255,1)',},
  selectors: {marginBottom: 10,flexDirection: 'row',justifyContent: 'center',},
  selector: {backgroundColor: '#F5FCFF',padding: 10,},
  activeSelector: {fontWeight: 'bold',},
  selectTitle: {fontSize: 14,fontWeight: '500',padding: 10,},
  multipleToggle: {flexDirection: 'row',justifyContent: 'center',marginVertical: 30,alignItems: 'center',},
  multipleToggle__title: {fontSize: 16,marginRight: 8,},
});
