import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Dimensions, StyleSheet, Text, Pressable, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderWithBack, StyleConstant } from '@assets/MyStyle';
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import { useNavigation } from 'react-navigation-hooks';
import CustomFlatList from '@components/CustomFlatList';
import WebApi from '@helpers/WebApi';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import { GlobalContext } from '@helpers/Settings';
import { forEach, isArray, isEmpty, isEqual, trim, upperFirst, words } from 'lodash';
import { InputOutline } from 'react-native-input-outline';
import { NavigationEvents } from 'react-navigation';
import HelperFunctions from '@helpers/HelperFunctions';

const ScreenCourseListing = (props) => {
  const { navigate, goBack } = useNavigation();
  const { initSlidingPanel } = useContext(GlobalContext);
  const slidingUpPanelRef = useRef(null);
  // FLATLIST VALUES ---- START
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const flatListRef = useRef(null);
  // FLATLIST VALUES ---- END
  // const [keyword, setKeyword ] = useState("");
  const keywordRef = useRef(null);
  const keyword = useRef("");
  const [keywordErrorMsg, setKeywordErrorMsg ] = useState("");

  const modeOfStudy_part_time_and_full_time = "part_time_and_full_time";
  const modeOfStudy_full_time = "full_time";
  const modeOfStudy_part_time = "part_time";
  const modeOfStudyIcons = {};
  const [modeOfStudy, setModeOfStudy] = useState([]);
  const modeOfStudyRef = useRef(null);
  const modeOfStudyDefault = useRef([]);

  const [disciplines, setDisciplines] = useState([]);
  const disciplinesRef = useRef(null);
  const disciplinesDefault = useRef([]);

  const [universityParters, setUniversityParters] = useState([]);
  const universityPartersRef = useRef(null);
  const universityPartnersDefault = useRef([]);

  const [academicLevel, setAcademicLevel] = useState([]);
  const academicLevelRef = useRef(null);
  const academicLevelDefault = useRef([]);

  const [entryQualifications, setEntryQualifications] = useState([]);
  const entryQualificationsRef = useRef(null);
  const entryQualificationsDefault = useRef([]);

  const [subDisciplines, setSubDisciplines] = useState([]);
  const subDisciplinesRef = useRef(null);
  const subDisciplinesDefault = useRef([]);

  modeOfStudyIcons[modeOfStudy_part_time_and_full_time] = "circle-half-full";
  modeOfStudyIcons[modeOfStudy_full_time] = "circle";
  modeOfStudyIcons[modeOfStudy_part_time] = "circle-half";

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack("Courses", ()=>{
        // navigate("screenUniversity")
        navigate("screenLanding")
      }, 
      <Pressable style={{position: 'absolute', right: 15, justifyContent: 'center'}} onPress={() => slidingUpPanelRef.current.show()}>
        <Icon name={'filter-variant'} color={'white'} size={30} />
      </Pressable>)
    }}, goBack);
    renderFilterFields();
    return function cleanup() { 
      if(slidingUpPanelRef.current != null){
        slidingUpPanelRef.current.hide();
        initSlidingPanel(<></>, null)
      }
    } 
  }, []);

  renderFilterFields = () =>{
    WebApi.getCourseFilterValues().then((res)=>{  
      var ModeOfStudyItems = [];
      var ModeOfStudyValues = []
      for (let index = 0; index < res.data.mode_of_study.length; index++) {
        const item = res.data.mode_of_study[index];
        const element = modeOfStudyIcons[item];
        ModeOfStudyValues.push(item)
        ModeOfStudyItems.push({
          label: upperFirst(words(item).join(" ")), // capitalise and remove underscore
          value: item,
          icon: () => <Icon name={element} size={18} color="#900" />,
        })
      }
      setModeOfStudy(ModeOfStudyValues)
      modeOfStudyDefault.current = ModeOfStudyValues;

      var DisciplinesItems = [];
      var DisciplinesValues = []
      for (let index = 0; index < res.data.disciplines.length; index++) {
        const item = res.data.disciplines[index];
        DisciplinesValues.push(item)
        DisciplinesItems.push({
          label: upperFirst(words(item).join(" ")), // capitalise and remove underscore
          value: item,
          icon: () => <Icon name={"book-open-variant"} size={18} color="#900" />,
        })
      }
      setDisciplines(DisciplinesValues)
      disciplinesDefault.current = DisciplinesValues;
      
      var UniversityPartersItems = [];
      var UniversityPartersValues = []
      for (let index = 0; index < res.data.universityParters.length; index++) {
        const item = res.data.universityParters[index];
        var uni = JSON.parse(item);
        UniversityPartersValues.push(uni.value)
        UniversityPartersItems.push({
          label: upperFirst(words(uni.label).join(" ")), // capitalise and remove underscore
          value: uni.value,
          icon: () => <Icon name={"book-open-variant"} size={18} color="#900" />,
        })
      }
      setUniversityParters(UniversityPartersValues)
      universityPartnersDefault.current = UniversityPartersValues;

      var AcademicLevelItems = [];
      var AcademicLevelValues = []
      for (let index = 0; index < res.data.academic_level.length; index++) {
        const item = res.data.academic_level[index];
        AcademicLevelValues.push(item)
        AcademicLevelItems.push({
          label: upperFirst(words(item).join(" ")), // capitalise and remove underscore
          value: item,
          icon: () => <Icon name={"school"} size={18} color="#900" />,
        })
      }
      setAcademicLevel(AcademicLevelValues)
      academicLevelDefault.current = AcademicLevelValues;

      var EntryQualificationsItems = [];
      var EntryQualificationsValues = []
      for (let index = 0; index < res.data.entry_qualification.length; index++) {
        const item = res.data.entry_qualification[index];
        EntryQualificationsValues.push(item)
        EntryQualificationsItems.push({
          label: upperFirst(words(item).join(" ")), // capitalise and remove underscore
          value: item,
          icon: () => <Icon name={"book-open-page-variant"} size={18} color="#900" />,
        })
      }
      setEntryQualifications(EntryQualificationsValues);
      entryQualificationsDefault.current = EntryQualificationsValues;

      var SubDisciplinesItems = [];
      var SubDisciplinesValues = []
      for (let index = 0; index < res.data.sub_disciplines.length; index++) {
        const item = res.data.sub_disciplines[index];
        SubDisciplinesValues.push(item)
        SubDisciplinesItems.push({
          label: upperFirst(words(item).join(" ")), // capitalise and remove underscore
          value: item,
          icon: () => <Icon name={"book-open-page-variant"} size={18} color="#900" />,
        })
      }
      setSubDisciplines(SubDisciplinesValues);
      subDisciplinesDefault.current = SubDisciplinesValues;

      initSlidingPanel(
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.panalContainer} onTouchStart={() => {
          // modeOfStudyRef.current.close();
          // disciplinesRef.current.close();
          // universityPartersRef.current.close();
          // academicLevelRef.current.close();
          // entryQualificationsRef.current.close();
          // subDisciplinesRef.current.close();
        }}>
          <View style={[styles.filterHeader]}>
            <Text style={[styles.filterHeaderText]}>Filters</Text>
            <Pressable style={[styles.filterResetButton]} onPress={() => handleReset()}>
              <Icon name={'refresh'} color={'white'} size={28} />
            </Pressable>
            <Pressable style={[styles.filterDoneButton]} onPress={() => handleFilter()}>
              <Icon name={'check-circle-outline'} color={'white'} size={28} />
            </Pressable>
          </View>
          <View style={[styles.filterFieldContainer]}>
            <InputOutline
              ref={keywordRef}
              onChangeText={txt => keyword.current = txt}
              error={keywordErrorMsg} // wont take effect until a message is passed
              placeholder={"Keyword Search"}
              trailingIcon={()=>{
                return(
                  <Icon name={'magnify'} color={'white'} size={30} />
                )
              }}
            />
          </View>

          <View style={[styles.filterFieldContainer, (Platform.OS !== 'android' && {zIndex: 9000})]}>
            <Text>Mode of Study</Text>
            <DropDownPicker
              zIndex={9000}
              controller={instance => modeOfStudyRef.current = instance}
              placeholder="Mode of Study"
              items={ModeOfStudyItems}
              defaultValue={ModeOfStudyValues}
              multiple={true}
              multipleText="%d items have been selected."
              containerStyle={{height: 40}}
              style={[styles.DropDownPickerStyle]}
              itemStyle={[styles.DropDownPickerItemStyle]}
              dropDownStyle={[styles.DropDownPickerDropDownStyle, (Platform.OS !== 'android' && {zIndex: 9000})]}
              onChangeItem={item => setModeOfStudy(item)}
              dropDownMaxHeight={100}
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
          
          <View style={[styles.filterFieldContainer, (Platform.OS !== 'android' && {zIndex: 8000})]}>
            <Text>Disciplines</Text>
            <DropDownPicker
              zIndex={8000}
              controller={instance => disciplinesRef.current = instance}
              placeholder="Disciplines"
              items={DisciplinesItems}
              defaultValue={DisciplinesValues}
              multiple={true}
              multipleText="%d items have been selected."
              containerStyle={{height: 40}}
              style={[styles.DropDownPickerStyle]}
              itemStyle={[styles.DropDownPickerItemStyle]}
              dropDownStyle={[styles.DropDownPickerDropDownStyle, (Platform.OS !== 'android' && {zIndex: 8000})]}
              onChangeItem={item => setDisciplines(item)}
              dropDownMaxHeight={100}
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
          
          <View style={[styles.filterFieldContainer, (Platform.OS !== 'android' && {zIndex: 7000})]}>
            <Text>University Parters</Text>
            <DropDownPicker
              zIndex={7000}
              controller={instance => universityPartersRef.current = instance}
              placeholder="University Parters"
              items={UniversityPartersItems}
              defaultValue={UniversityPartersValues}
              multiple={true}
              multipleText="%d items have been selected."
              containerStyle={{height: 40}}
              style={[styles.DropDownPickerStyle]}
              itemStyle={[styles.DropDownPickerItemStyle]}
              dropDownStyle={[styles.DropDownPickerDropDownStyle, (Platform.OS !== 'android' && {zIndex: 7000})]}
              onChangeItem={item => setUniversityParters(item)}
              dropDownMaxHeight={100}
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
          
          <View style={[styles.filterFieldContainer, (Platform.OS !== 'android' && {zIndex: 6000})]}>
            <Text>Academic Level</Text>
            <DropDownPicker
              zIndex={6000}
              controller={instance => academicLevelRef.current = instance}
              placeholder="Academic Level"
              items={AcademicLevelItems}
              defaultValue={AcademicLevelValues}
              multiple={true}
              multipleText="%d items have been selected."
              containerStyle={{height: 40}}
              style={[styles.DropDownPickerStyle]}
              itemStyle={[styles.DropDownPickerItemStyle]}
              dropDownStyle={[styles.DropDownPickerDropDownStyle, (Platform.OS !== 'android' && {zIndex: 6000})]}
              onChangeItem={item => setAcademicLevel(item)}
              dropDownMaxHeight={100}
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
          
          <View style={[styles.filterFieldContainer, (Platform.OS !== 'android' && {zIndex: 5000}) ]}>
            <Text>Entry Qualifications</Text>
            <DropDownPicker
              zIndex={5000}
              controller={instance => entryQualificationsRef.current = instance}
              placeholder="Entry Qualifications"
              items={EntryQualificationsItems}
              defaultValue={EntryQualificationsValues}
              multiple={true}
              multipleText="%d items have been selected."
              containerStyle={{height: 40}}
              style={[styles.DropDownPickerStyle]}
              itemStyle={[styles.DropDownPickerItemStyle]}
              dropDownStyle={[styles.DropDownPickerDropDownStyle, (Platform.OS !== 'android' && {zIndex: 5000})]}
              onChangeItem={item => setEntryQualifications(item)}
              dropDownMaxHeight={100}
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
          
          <View style={[styles.filterFieldContainer, (Platform.OS !== 'android' && {zIndex: 4000})]}>
            <Text>Sub Disciplines</Text>
            <DropDownPicker
              zIndex={4000}
              controller={instance => subDisciplinesRef.current = instance}
              placeholder="Sub Disciplines"
              items={SubDisciplinesItems}
              defaultValue={SubDisciplinesValues}
              multiple={true}
              multipleText="%d items have been selected."
              containerStyle={{height: 40}}
              style={[styles.DropDownPickerStyle]}
              itemStyle={[styles.DropDownPickerItemStyle]}
              dropDownStyle={[styles.DropDownPickerDropDownStyle, (Platform.OS !== 'android' && {zIndex: 4000})]}
              onChangeItem={item => setSubDisciplines(item)}
              dropDownMaxHeight={100}
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
        </View>
      </ScrollView>, slidingUpPanelRef)
    }).catch((err)=>{
      console.log(err)
      var error = err.data;
      if(isArray(error)){
        HelperFunctions.showToast(error[0].message)
      } else {
        HelperFunctions.showToast(error)
      }
      return null;
    })
  }

  handleReset = () =>{
    // modeOfStudyRef.current.reset();
    // disciplinesRef.current.reset();
    // universityPartersRef.current.reset();
    // academicLevelRef.current.reset();
    // entryQualificationsRef.current.reset();
    // subDisciplinesRef.current.reset();
    initSlidingPanel(<></>, null);
    keyword.current = "";
    if(!isEqual(modeOfStudy, modeOfStudyDefault.current)){
      setModeOfStudy(modeOfStudyDefault.current)
    }
    if(!isEqual(disciplines, disciplinesDefault.current)){
      setDisciplines(disciplinesDefault.current)
    }
    if(!isEqual(universityParters, universityPartnersDefault.current)){
      setUniversityParters(universityPartnersDefault.current)
    }
    if(!isEqual(academicLevel, academicLevelDefault.current)){
      setAcademicLevel(academicLevelDefault.current)
    }
    if(!isEqual(entryQualifications, entryQualificationsDefault.current)){
      setEntryQualifications(entryQualificationsDefault.current)
    }
    if(!isEqual(subDisciplines, subDisciplinesDefault.current)){
      setSubDisciplines(subDisciplinesDefault.current)
    }
    renderFilterFields();
    refreshList();
  }

  handleFilter = () =>{
    slidingUpPanelRef.current.hide();
    refreshList();
  }

  // FLATLIST FUNCTIONS ---- START
  getList = (page = 1)=>{
    if(!refreshing){
      var filter = "";
      var and_counter = 0;
      if(modeOfStudyDefault.current.length != modeOfStudy.length){
        modeOfStudy.forEach(element => {
          filter += "&filter[and]["+and_counter+"][mode_of_study][]="+element
        });
        if(modeOfStudy.length > 0){
          and_counter++;
        }
      }

      if(disciplinesDefault.current.length != disciplines.length){
        disciplines.forEach(element => {
          filter += "&filter[and]["+and_counter+"][disciplines][]="+element
        });
        if(disciplines.length > 0){
          and_counter++;
        }
      }

      if(universityPartnersDefault.current.length != universityParters.length){
        universityParters.forEach(element => {
          filter += "&filter[and]["+and_counter+"][school_id][]="+element
        });
        if(universityParters.length > 0){
          and_counter++;
        }
      }

      if(academicLevelDefault.current.length != academicLevel.length){
        academicLevel.forEach(element => {
          filter += "&filter[and]["+and_counter+"][academic_level][]="+element
        });
        if(academicLevel.length > 0){
          and_counter++;
        }
      }

      if(entryQualificationsDefault.current.length != entryQualifications.length){
        entryQualifications.forEach(element => {
          if(element != null && element != 'null'){
            filter += "&filter[and]["+and_counter+"][entry_qualification][]="+element          
          }
        });
        if(entryQualifications.length > 0){
          and_counter++;
        }
      }

      if(subDisciplinesDefault.current.length != subDisciplines.length){
        subDisciplines.forEach(element => {
          filter += "&filter[and]["+and_counter+"][sub_disciplines][]="+element
        });
        if(subDisciplines.length > 0){
          and_counter++;
        }
      }

      if(!isEmpty(trim(keyword.current))){
        filter += "&filter[and]["+and_counter+"][or][0][name][like][]="+trim(keyword.current).toLowerCase()
        filter += "&filter[and]["+and_counter+"][or][1][disciplines][like][]="+trim(keyword.current).toLowerCase()
        filter += "&filter[and]["+and_counter+"][or][2][sub_disciplines][like][]="+trim(keyword.current).toLowerCase()
        filter += "&filter[and]["+and_counter+"][or][3][tags][like][]="+trim(keyword.current).toLowerCase()
        and_counter++;
      }
      setRefreshing(true);
      WebApi.listCourses(page, filter).then((res)=>{
        if(parseInt(res.meta["currentPage"]) >= parseInt(res.meta["pageCount"])){
          setIsLastPage(true);
        }
        const d = (page === 1)? res.data : [...data, ...res.data];
        setData(d);
      }).catch((err)=>{
        var error = err.data;
        if(isArray(error)){
          HelperFunctions.showToast(error[0].message)
        } else {
          HelperFunctions.showToast(error)
        }
        return
      }).finally(()=>{
        setRefreshing(false);
      })
    }
  }
  renderItem = ({item, index}) => {
    return (        
      <Pressable onPress={ () => navigate("screenCourseDetail", {item:item, data: data, source:"screenCourseListing"})}>
        <View>
          <View style={styles.card}>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, padding: 5}}>
              <Icon style={{marginHorizontal: 10}} name={modeOfStudyIcons[item.mode_of_study]} size={28} color={StyleConstant.primaryColor}/>
              <View style={styles.midContent}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{item.name}</Text>
                <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode={'tail'}>Awarded by {item.university}</Text>
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
    <View style={{flex:1}}>
      <NavigationEvents
        onWillFocus={()=>{
          // renderFilterFields();
        }}
        onWillBlur={()=>{
          if(slidingUpPanelRef.current != null){
            slidingUpPanelRef.current.hide();
            // initSlidingPanel(<></>, null)
          }
        }}
      />
      <View style={styles.container}>
        { renderList() }
      </View>
    </View>
  );
}

export default withScreenBase(ScreenCourseListing, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  DropDownPickerStyle:{backgroundColor: '#fafafa'},
  DropDownPickerItemStyle:{justifyContent: 'flex-start'},
  DropDownPickerDropDownStyle:{backgroundColor: '#fafafa'},
  filterHeader: {borderTopLeftRadius:15, borderTopRightRadius:15, backgroundColor:"#3c3c3c", width: '100%', height: 55, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
  filterHeaderText: {alignSelf: 'center', color: 'white', fontSize:16, fontWeight:"bold"},
  filterResultText: {alignSelf: 'center', color: 'black', fontSize:15, fontWeight:"bold", marginRight:10},
  filterResetButton: {position: 'absolute', left: 10, justifyContent: 'center'},
  filterDoneButton: {position: 'absolute', right: 10, justifyContent: 'center'},
  filterFieldContainer: { width:"80%",  marginTop: 10, marginBottom: 10 },
  container:{ flex: 1, alignItems: 'stretch', backgroundColor: 'white'},
  panalContainer:{borderLeftColor:"black", borderRightColor:"black", borderTopWidth:1, borderLeftWidth:1, borderRightWidth:1, borderRadius:15, flex: 1, backgroundColor: 'white', alignItems: 'center', },
  card: {width:'100%', flex:1, paddingVertical: 10, flexDirection:'row', backgroundColor: "white", alignItems: 'center', justifyContent: 'space-between'},
  icon: {width: 50, height: 50, margin: 10},
  midContent: {flex: 1, flexDirection:'column'},
  title: {color:"black" , fontSize: 12, fontWeight: "bold"},
  subtitle: {color:"black" , fontSize: 12},
  inboxSeperator: {position: 'absolute', bottom: 0, width: '95%', alignSelf: 'center', marginLeft: 'auto', marginRight: 'auto', backgroundColor: StyleConstant.bgGray, height: 1},
});
