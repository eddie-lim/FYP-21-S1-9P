import React, { useEffect, useRef, useState } from 'react';
import { View, BackHandler, StyleSheet, ScrollView, Text } from 'react-native';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import Accordion from 'react-native-collapsible/Accordion';
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';
import { capitalize, join, split, parseInt, map } from 'lodash';

const ScreenCourseDetail = (props) => {
  const { navigate, goBack } = useNavigation();
  const [ activeSections, setActiveSections ] = useState([0]);
  const [ section, setSection ] = useState([]);
  const item = useNavigationParam('item');
  /*
  id
  name
  university
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

  const [ nameIsCollapsible, setNameIsCollapsible ] = useState(false);
  const [ universityIsCollapsible, setUniversityIsCollapsible ] = useState(false);
  const [ modeOfStudyIsCollapsible, setModeOfStudyIsCollapsible ] = useState(false);
  const [ disciplinesIsCollapsible, setDisciplinesIsCollapsible ] = useState(false);
  const [ subDisciplinesIsCollapsible, setSubDisciplinesIsCollapsible ] = useState(false);
  const [ academicLevelIsCollapsible, setAcademicLevelIsCollapsible ] = useState(false);
  const [ introductionIsCollapsible, setIntroductionIsCollapsible ] = useState(false);
  const [ programmeStructureIsCollapsible, setProgrammeStructureIsCollapsible ] = useState(false);
  const [ admissionCriteriaIsCollapsible, setAdmissionCriteriaIsCollapsible ] = useState(false);
  const [ entryQualificationIsCollapsible, setEntryQualificationIsCollapsible ] = useState(false);
  const [ feesIsCollapsible, setFeesIsCollapsible ] = useState(false);
  const [ exemptionsIsCollapsible, setExemptionsIsCollapsible ] = useState(false);
  const [ profilesIsCollapsible, setProfilesIsCollapsible ] = useState(false);
  const [ assessmentsExamsIsCollapsible, setAssessmentsExamsIsCollapsible ] = useState(false);

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack("Course Detail", navigate, source)
    }});
    BackHandler.addEventListener('hardwareBackPress', handleBackHandler);

    var item_keys = Object.keys(item);
    setActiveSections(map(Object.keys(item_keys), parseInt));
    var item_values = Object.values(item);
    var items = [];
    for (let i = 0; i < item_keys.length; i++) {
      const item_key = capitalize(join(split(item_keys[i], "_"), " "));
      const item_value = item_values[i];
      items.push({
        header:item_key,
        content:item_value
      })
    }
    setSection(items)

    return function cleanup() { 
      BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
    } 
  }, []);

  handleBackHandler = ()=>{
   BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
   navigate(source);
   return true;
  }
  
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
    setActiveSections(activeSections);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{backgroundColor: 'rgba(245,252,255,1)'}}>
        <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          {/* <Accordion
            containerStyle={{width:'100%'}}
            sections={section}
            activeSections={activeSections}
            // renderSectionTitle={renderSectionTitle}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
          /> */}
          <Text>{item.name}</Text>
          <Text>Awarded by: {item.university}</Text>
          <Collapsible collapsed={modeOfStudyIsCollapsible}>
            <Animatable.View>
              <Animatable.Text>{item.mode_of_study}</Animatable.Text>
            </Animatable.View>
          </Collapsible>
          <Collapsible collapsed={disciplinesIsCollapsible}>
            <Animatable.View>
              <Animatable.Text>{item.disciplines}</Animatable.Text>
            </Animatable.View>
          </Collapsible>
          <Collapsible collapsed={subDisciplinesIsCollapsible}>
            <Animatable.View>
              <Animatable.Text>{item.sub_disciplines}</Animatable.Text>
            </Animatable.View>
          </Collapsible>
          <Collapsible collapsed={academicLevelIsCollapsible}>
            <Animatable.View>
              <Animatable.Text>{item.academic_level}</Animatable.Text>
            </Animatable.View>
          </Collapsible>
          <Collapsible collapsed={introductionIsCollapsible}>
            <Animatable.View>
              <Animatable.Text>{item.introduction}</Animatable.Text>
            </Animatable.View>
          </Collapsible>
          <Collapsible collapsed={programmeStructureIsCollapsible}>
            <Animatable.View>
              <Animatable.Text>{item.programme_structure}</Animatable.Text>
            </Animatable.View>
          </Collapsible>
          <Collapsible collapsed={admissionCriteriaIsCollapsible}>
            <Animatable.View>
              <Animatable.Text>{item.admission_criteria}</Animatable.Text>
            </Animatable.View>
          </Collapsible>
          <Collapsible collapsed={entryQualificationIsCollapsible}>
            <Animatable.View>
              <Animatable.Text>{item.entry_qualification}</Animatable.Text>
            </Animatable.View>
          </Collapsible>
          <Collapsible collapsed={feesIsCollapsible}>
            <Animatable.View>
              <Animatable.Text>{item.fees}</Animatable.Text>
            </Animatable.View>
          </Collapsible>
          <Collapsible collapsed={exemptionsIsCollapsible}>
            <Animatable.View>
              <Animatable.Text>{item.exemptions}</Animatable.Text>
            </Animatable.View>
          </Collapsible>
          <Collapsible collapsed={profilesIsCollapsible}>
            <Animatable.View>
              <Animatable.Text>{item.profiles}</Animatable.Text>
            </Animatable.View>
          </Collapsible>
          <Collapsible collapsed={assessmentsExamsIsCollapsible}>
            <Animatable.View>
              <Animatable.Text>{item.assessments_exams}</Animatable.Text>
            </Animatable.View>
          </Collapsible>

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
