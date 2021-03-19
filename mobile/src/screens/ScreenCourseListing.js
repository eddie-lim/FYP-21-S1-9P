import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, Text, Pressable, Button, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationEvents } from 'react-navigation';
import { HeaderWithBack, StyleConstant } from '@assets/MyStyle';
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import { useNavigation } from 'react-navigation-hooks';
import CustomFlatList from '@components/CustomFlatList';
import WebApi from '@helpers/WebApi';
import Constants from '@helpers/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SlidingUpPanel from 'rn-sliding-up-panel';
import DropDownPicker from 'react-native-dropdown-picker';

const ScreenCourseListing = (props) => {
  const { navigate, goBack } = useNavigation();
  const [ showFilterOptions, setShowFilterOptions ] = useState(false);
  const slidingUpPanelRef = useRef(null);
  // FLATLIST VALUES ---- START
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const flatListRef = useRef(null);
  // FLATLIST VALUES ---- END
  const default_filter_all = "All";

  const modeOfStudy_part_time_and_full_time = "part_time_and_full_time";
  const modeOfStudy_full_time = "full_time";
  const modeOfStudy_part_time = "part_time";
  const modeOfStudyIcons = {};
  const [modeOfStudy, setModeOfStudy] = useState();
  const modeOfStudyRef = useRef(null);

  const disciplines_arts_and_social_sciences = "arts_and_social_sciences";
  const disciplines_business = "business";
  const disciplines_it_and_computer_science = "it_and_computer_science";
  const disciplines_nursing = "nursing";
  const disciplines_specialty = "specialty";
  const disciplinesIcons = {};
  const [disciplines, setDisciplines] = useState();
  const disciplinesRef = useRef(null);

  const universityPartners_grenoble_ecole_de_management = "grenoble_ecole_de_management";
  const universityPartners_la_trobe_university = "la_trobe_university";
  const universityPartners_monash_college = "monash_college";
  const universityPartners_rmit_university = "rmit_university";
  const universityPartners_singapore_institute_of_management = "singapore_institute_of_management";
  const universityPartners_the_university_of_manchester = "the_university_of_manchester";
  const universityPartners_the_university_of_sydney = "the_university_of_sydney";
  const universityPartners_the_university_of_warwick = "the_university_of_warwick";
  const universityPartners_university_at_buffalo_the_state_university_of_new_york = "university_at_buffalo_the_state_university_of_new_york";
  const universityPartners_university_of_birmingham = "university_of_birmingham";
  const universityPartners_university_of_london = "university_of_london";
  const universityPartners_university_of_stirling = "university_of_stirling";
  const universityPartners_university_of_wollongong = "university_of_wollongong";
  const universityPartersIcons = {};
  const [universityParters, setUniversityParters] = useState();
  const universityPartersRef = useRef(null);

  const academicLevel_bachelor = "bachelor";
  const academicLevel_cerificate = "cerificate";
  const academicLevel_diploma = "diploma";
  const academicLevel_postgraduate_or_masters = "postgraduate_or_masters";
  const academicLevelIcons = {};
  const [academicLevel, setAcademicLevel] = useState();
  const academicLevelRef = useRef(null);

  const entryQualifications_a_level = "a_level";
  const entryQualifications_o_level = "o_level";
  const entryQualifications_degree = "degree";
  const entryQualifications_diploma = "diploma";
  const entryQualificationsIcons = {};
  const [entryQualifications, setEntryQualifications] = useState();
  const entryQualificationsRef = useRef(null);

  const subDisciplines_accounting = "accounting";
  const subDisciplines_big_data = "big_data";
  const subDisciplinesIcons = {};
  const [subDisciplines, setSubDisciplines] = useState();
  const subDisciplinesRef = useRef(null);

  modeOfStudyIcons[modeOfStudy_part_time_and_full_time] = "circle-half-full";
  modeOfStudyIcons[modeOfStudy_full_time] = "circle";
  modeOfStudyIcons[modeOfStudy_part_time] = "circle-half";
  
  disciplinesIcons[disciplines_arts_and_social_sciences] = "book-open-variant";
  disciplinesIcons[disciplines_business] = "book-open-variant";
  disciplinesIcons[disciplines_it_and_computer_science] = "book-open-variant";
  disciplinesIcons[disciplines_nursing] = "book-open-variant";
  disciplinesIcons[disciplines_specialty] = "book-open-variant";

  universityPartersIcons[universityPartners_grenoble_ecole_de_management] = "book-open-variant";
  universityPartersIcons[universityPartners_la_trobe_university] = "book-open-variant";
  universityPartersIcons[universityPartners_monash_college] = "book-open-variant";
  universityPartersIcons[universityPartners_rmit_university] = "book-open-variant";
  universityPartersIcons[universityPartners_singapore_institute_of_management] = "book-open-variant";
  universityPartersIcons[universityPartners_the_university_of_manchester] = "book-open-variant";
  universityPartersIcons[universityPartners_the_university_of_sydney] = "book-open-variant";
  universityPartersIcons[universityPartners_the_university_of_warwick] = "book-open-variant";
  universityPartersIcons[universityPartners_university_at_buffalo_the_state_university_of_new_york] = "book-open-variant";
  universityPartersIcons[universityPartners_university_of_birmingham] = "book-open-variant";
  universityPartersIcons[universityPartners_university_of_london] = "book-open-variant";
  universityPartersIcons[universityPartners_university_of_stirling] = "book-open-variant";
  universityPartersIcons[universityPartners_university_of_wollongong] = "book-open-variant";

  academicLevelIcons[academicLevel_bachelor] = "school";
  academicLevelIcons[academicLevel_cerificate] = "school";
  academicLevelIcons[academicLevel_diploma] = "school";
  academicLevelIcons[academicLevel_postgraduate_or_masters] = "school";

  entryQualificationsIcons[entryQualifications_a_level] = "certificate";
  entryQualificationsIcons[entryQualifications_o_level] = "certificate";
  entryQualificationsIcons[entryQualifications_degree] = "certificate";
  entryQualificationsIcons[entryQualifications_diploma] = "certificate";

  subDisciplinesIcons[subDisciplines_accounting] = "book-open-page-variant";
  subDisciplinesIcons[subDisciplines_big_data] = "book-open-page-variant";
  
  useEffect(() => {
    console.log("ScreenCourseListing")
    // slidingUpPanelRef.current.hide()
    props.navigation.setParams({"navOptions":{
      header:()=> HeaderWithBack("Courses", navigate, "screenUniversity", 
        <Pressable style={{position: 'absolute', right: 10, justifyContent: 'center'}} onPress={() => slidingUpPanelRef.current.show()}>
          <Icon name={'filter-variant'} color={'white'} size={30} />
        </Pressable>
      )
    }});
    return function cleanup() { } 
  }, []);

  renderDropDownPicker = () =>{
    var ModeOfStudyItems = []; 
    for (const key in modeOfStudyIcons) {
      if (Object.hasOwnProperty.call(modeOfStudyIcons, key)) {
        const element = modeOfStudyIcons[key];
        ModeOfStudyItems.push({
          label: key, // capitalise and remove underscore
          value: key,
          icon: () => <Icon name={element} size={18} color="#900" />,
        })
      }
    }

    var DisciplinesItems = []; 
    for (const key in disciplinesIcons) {
      if (Object.hasOwnProperty.call(disciplinesIcons, key)) {
        const element = disciplinesIcons[key];
        DisciplinesItems.push({
          label: key, // capitalise and remove underscore
          value: key,
          icon: () => <Icon name={element} size={18} color="#900" />,
        })
      }
    }
    
    var UniversityPartersItems = []; 
    for (const key in universityPartersIcons) {
      if (Object.hasOwnProperty.call(universityPartersIcons, key)) {
        const element = universityPartersIcons[key];
        UniversityPartersItems.push({
          label: key, // capitalise and remove underscore
          value: key,
          icon: () => <Icon name={element} size={18} color="#900" />,
        })
      }
    }

    var AcademicLevelItems = []; 
    for (const key in academicLevelIcons) {
      if (Object.hasOwnProperty.call(academicLevelIcons, key)) {
        const element = academicLevelIcons[key];
        AcademicLevelItems.push({
          label: key, // capitalise and remove underscore
          value: key,
          icon: () => <Icon name={element} size={18} color="#900" />,
        })
      }
    }

    var EntryQualificationsItems = []; 
    for (const key in entryQualificationsIcons) {
      if (Object.hasOwnProperty.call(entryQualificationsIcons, key)) {
        const element = entryQualificationsIcons[key];
        EntryQualificationsItems.push({
          label: key, // capitalise and remove underscore
          value: key,
          icon: () => <Icon name={element} size={18} color="#900" />,
        })
      }
    }

    var SubDisciplinesItems = []; 
    for (const key in subDisciplinesIcons) {
      if (Object.hasOwnProperty.call(subDisciplinesIcons, key)) {
        const element = subDisciplinesIcons[key];
        SubDisciplinesItems.push({
          label: key, // capitalise and remove underscore
          value: key,
          icon: () => <Icon name={element} size={18} color="#900" />,
        })
      }
    }

    return (
      <>
        <View style={[styles.dropDownContainer, (Platform.OS !== 'android' && {zIndex: 9000})]}>
          <Text>Mode of Study</Text>
          <DropDownPicker
            controller={instance => modeOfStudyRef.current = instance}
            placeholder="Mode of Study"
            items={ModeOfStudyItems}
            defaultValue={Object.keys(modeOfStudyIcons)}
            multiple={true}
            multipleText="%d items have been selected."
            containerStyle={{height: 40}}
            style={[styles.DropDownPickerStyle]}
            itemStyle={[styles.DropDownPickerItemStyle]}
            dropDownStyle={[styles.DropDownPickerDropDownStyle]}
            onChangeItem={item => setModeOfStudy(item.value)}
            onOpen={() => {
              // modeOfStudyRef.current.close();
              disciplinesRef.current.close();
              universityPartersRef.current.close();
              academicLevelRef.current.close();
              entryQualificationsRef.current.close();
              subDisciplinesRef.current.close();
            }}
          />
        </View>
        
        <View style={[styles.dropDownContainer, (Platform.OS !== 'android' && {zIndex: 8000})]}>
          <Text>Disciplines</Text>
          <DropDownPicker
            controller={instance => disciplinesRef.current = instance}
            placeholder="Disciplines"
            items={DisciplinesItems}
            defaultValue={Object.keys(disciplinesIcons)}
            multiple={true}
            multipleText="%d items have been selected."
            containerStyle={{height: 40}}
            style={[styles.DropDownPickerStyle]}
            itemStyle={[styles.DropDownPickerItemStyle]}
            dropDownStyle={[styles.DropDownPickerDropDownStyle]}
            onChangeItem={item => setDisciplines(item.value)}
            onOpen={() => {
              modeOfStudyRef.current.close();
              // disciplinesRef.current.close();
              universityPartersRef.current.close();
              academicLevelRef.current.close();
              entryQualificationsRef.current.close();
              subDisciplinesRef.current.close();
            }}
          />
        </View>
        
        <View style={[styles.dropDownContainer, (Platform.OS !== 'android' && {zIndex: 7000})]}>
          <Text>University Parters</Text>
          <DropDownPicker
            controller={instance => universityPartersRef.current = instance}
            placeholder="University Parters"
            items={UniversityPartersItems}
            defaultValue={Object.keys(universityPartersIcons)}
            multiple={true}
            multipleText="%d items have been selected."
            containerStyle={{height: 40}}
            style={[styles.DropDownPickerStyle]}
            itemStyle={[styles.DropDownPickerItemStyle]}
            dropDownStyle={[styles.DropDownPickerDropDownStyle]}
            onChangeItem={item => setUniversityParters(item.value)}
            onOpen={() => {
              modeOfStudyRef.current.close();
              disciplinesRef.current.close();
              // universityPartersRef.current.close();
              academicLevelRef.current.close();
              entryQualificationsRef.current.close();
              subDisciplinesRef.current.close();
            }}
          />
        </View>
        
        <View style={[styles.dropDownContainer, (Platform.OS !== 'android' && {zIndex: 6000})]}>
          <Text>Academic Level</Text>
          <DropDownPicker
            controller={instance => academicLevelRef.current = instance}
            placeholder="Academic Level"
            items={AcademicLevelItems}
            defaultValue={Object.keys(academicLevelIcons)}
            multiple={true}
            multipleText="%d items have been selected."
            containerStyle={{height: 40}}
            style={[styles.DropDownPickerStyle]}
            itemStyle={[styles.DropDownPickerItemStyle]}
            dropDownStyle={[styles.DropDownPickerDropDownStyle]}
            onChangeItem={item => setAcademicLevel(item.value)}
            onOpen={() => {
              modeOfStudyRef.current.close();
              disciplinesRef.current.close();
              universityPartersRef.current.close();
              // academicLevelRef.current.close();
              entryQualificationsRef.current.close();
              subDisciplinesRef.current.close();
            }}
          />
        </View>
        
        <View style={[styles.dropDownContainer, (Platform.OS !== 'android' && {zIndex: 5000})]}>
          <Text>Entry Qualifications</Text>
          <DropDownPicker
            controller={instance => entryQualificationsRef.current = instance}
            placeholder="Entry Qualifications"
            items={EntryQualificationsItems}
            defaultValue={Object.keys(entryQualificationsIcons)}
            multiple={true}
            multipleText="%d items have been selected."
            containerStyle={{height: 40}}
            style={[styles.DropDownPickerStyle]}
            itemStyle={[styles.DropDownPickerItemStyle]}
            dropDownStyle={[styles.DropDownPickerDropDownStyle]}
            onChangeItem={item => setEntryQualifications(item.value)}
            onOpen={() => {
              modeOfStudyRef.current.close();
              disciplinesRef.current.close();
              universityPartersRef.current.close();
              academicLevelRef.current.close();
              // entryQualificationsRef.current.close();
              subDisciplinesRef.current.close();
            }}
          />
        </View>
        
        <View style={[styles.dropDownContainer, (Platform.OS !== 'android' && {zIndex: 4000})]}>
          <Text>Sub Disciplines</Text>
          <DropDownPicker
            controller={instance => subDisciplinesRef.current = instance}
            placeholder="Sub Disciplines"
            items={SubDisciplinesItems}
            defaultValue={Object.keys(subDisciplinesIcons)}
            multiple={true}
            multipleText="%d items have been selected."
            containerStyle={{height: 40}}
            style={[styles.DropDownPickerStyle]}
            itemStyle={[styles.DropDownPickerItemStyle]}
            dropDownStyle={[styles.DropDownPickerDropDownStyle]}
            onChangeItem={item => setSubDisciplines(item.value)}
            onOpen={() => {
              modeOfStudyRef.current.close();
              disciplinesRef.current.close();
              universityPartersRef.current.close();
              academicLevelRef.current.close();
              entryQualificationsRef.current.close();
              // subDisciplinesRef.current.close();
            }}
          />
        </View>
      </>
    )
  }

  renderFilteredResults = () =>{
    return (
      <>
        <Text style={[styles.filterResultText]}>Mode of Study: {modeOfStudy}</Text>
        <Text style={[styles.filterResultText]}>Disciplines: {disciplines}</Text>
        <Text style={[styles.filterResultText]}>University Parters: {universityParters}</Text>
        <Text style={[styles.filterResultText]}>Academic Level: {academicLevel}</Text>
        <Text style={[styles.filterResultText]}>Entry Qualifications: {entryQualifications}</Text>
        <Text style={[styles.filterResultText]}>Sub Disciplines: {subDisciplines}</Text>
      </>
    )
  }
  // FLATLIST FUNCTIONS ---- START
  getList = (page = 0)=>{
    if(!refreshing){
      WebApi.listCourses(page).then((res)=>{
        console.log(res);
        if(res.data.length < Constants.FLATLIST_PAGESIZE){
          setIsLastPage(true);
        }
        const d = (page === 0)? res.data : [...data, ...res.data];
        setData(d);
        setRefreshing(false);
      }).catch((err)=>{
          console.log(err)
          return
      })
    }
  }
  renderItem = ({item, index}) => {
    return (        
      <Pressable onPress={ () => navigate("screenCourseDetail", {item:item, data: data})}>
        <View>
          <View style={styles.card}>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, padding: 5}}>
              <Icon style={{marginHorizontal: 10}} name={modeOfStudyIcons[item.mode_of_study]} size={28} color={StyleConstant.primaryColor}/>
              <View style={styles.midContent}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{item.name}</Text>
                <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode={'tail'}>Awarded by {item.school_id}</Text>
              </View>
            </View>
          </View>
          {index == data.length - 1 || <View style={styles.inboxSeperator}/>}
        </View>
      </Pressable>
    )
  }
  const [refreshList, renderList] = CustomFlatList(getList, data, renderItem, "No information found", refreshing, isLastPage, 1, flatListRef, "course", (Dimensions.get('window').height)-80);
  // FLATLIST FUNCTIONS ---- END

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        { renderList() }

        <SlidingUpPanel
          snappingPoints={[(Dimensions.get('window').height) * 0.1]}
          friction={0.75}
          backdropOpacity={0}
          showBackdrop={false}
          ref={slidingUpPanelRef}
          draggableRange={{top: (Dimensions.get('window').height) * 0.80 , bottom: 55}}
          // height={250}
          allowDragging={true}
        >
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.panalContainer} onTouchStart={() => {
              modeOfStudyRef.current.close();
              disciplinesRef.current.close();
              universityPartersRef.current.close();
              academicLevelRef.current.close();
              entryQualificationsRef.current.close();
              subDisciplinesRef.current.close();
            }}>
              
              <View style={[styles.filterHeader]}>
                <Text style={[styles.filterHeaderText]}>Filters</Text>
                <Pressable style={[styles.filterResetButton]} onPress={() => {
                  modeOfStudyRef.current.reset();
                  disciplinesRef.current.reset();
                  universityPartersRef.current.reset();
                  academicLevelRef.current.reset();
                  entryQualificationsRef.current.reset();
                  subDisciplinesRef.current.reset();
                }}>
                  <Icon name={'refresh'} color={'white'} size={28} />
                </Pressable>
                <Pressable style={[styles.filterDoneButton]} onPress={() => slidingUpPanelRef.current.hide()}>
                  <Icon name={'check-circle-outline'} color={'white'} size={28} />
                </Pressable>
              </View>
              {/* {renderFilteredResults()} */}
              {renderDropDownPicker()}
            </View>
          </ScrollView>
        </SlidingUpPanel>
      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenCourseListing, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  DropDownPickerStyle:{backgroundColor: '#fafafa'},
  DropDownPickerItemStyle:{justifyContent: 'flex-start'},
  DropDownPickerDropDownStyle:{backgroundColor: '#fafafa'},
  filterHeader: {borderTopLeftRadius:15, borderTopRightRadius:15, backgroundColor:"#3c3c3c", width: '100%', height: 55, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
  filterHeaderText: {alignSelf: 'center', color: 'white', fontSize:16, fontWeight:"bold"},
  filterResultText: {alignSelf: 'center', color: 'white', fontSize:15, fontWeight:"bold", marginRight:10},
  filterResetButton: {position: 'absolute', left: 10, justifyContent: 'center'},
  filterDoneButton: {position: 'absolute', right: 10, justifyContent: 'center'},
  dropDownContainer: { width:"80%",  marginTop: 10, marginBottom: 10 },
  container:{ flex: 1, alignItems: 'stretch', backgroundColor: 'white'},
  panalContainer:{borderLeftColor:"black", borderRightColor:"black", borderTopWidth:1, borderLeftWidth:1, borderRightWidth:1, borderRadius:15, flex: 1, backgroundColor: 'white', alignItems: 'center', },
  card: {width:'100%', flex:1, paddingVertical: 10, flexDirection:'row', backgroundColor: "white", alignItems: 'center', justifyContent: 'space-between'},
  icon: {width: 50, height: 50, margin: 10},
  midContent: {flex: 1, flexDirection:'column'},
  title: {color:"black" , fontSize: 12, fontWeight: "bold"},
  subtitle: {color:"black" , fontSize: 12},
  inboxSeperator: {position: 'absolute', bottom: 0, width: '95%', alignSelf: 'center', marginLeft: 'auto', marginRight: 'auto', backgroundColor: StyleConstant.bgGray, height: 1},
});
