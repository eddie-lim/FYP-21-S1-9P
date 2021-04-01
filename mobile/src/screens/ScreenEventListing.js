import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, Text, Pressable, Modal, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderWithBack, StyleConstant } from '@assets/MyStyle';
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import { useNavigation } from 'react-navigation-hooks';
import CustomFlatList from '@components/CustomFlatList';
import WebApi from '@helpers/WebApi';
import Constants from '@helpers/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';
import OutlineInput from 'react-native-outline-input';
import DatePicker from 'react-native-datepicker'
import randomcolor from 'randomcolor';
import { isEqual, padStart } from 'lodash';

const ScreenEventListing = (props) => {
  const { navigate, goBack } = useNavigation();
  // FLATLIST VALUES ---- START
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const flatListRef = useRef(null);
  // FLATLIST VALUES ---- END
  const slidingUpPanelRef = useRef(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [keyword, setKeyword ] = useState("");
  const [keywordErrorMsg, setKeywordErrorMsg ] = useState("");

  const [filterStartDate , setFilterStartDate] = useState();
  const [filterEndDate, setFilterEndDate] = useState();

  const TypeOfEvents_part_time_and_full_time = "part_time_and_full_time";
  const TypeOfEvents_full_time = "full_time";
  const TypeOfEvents_part_time = "part_time";
  const TypeOfEventsIcons = {};
  const [TypeOfEvents, setTypeOfEvents] = useState();
  const TypeOfEventsRef = useRef(null);

  TypeOfEventsIcons[TypeOfEvents_part_time_and_full_time] = "circle-half-full";
  TypeOfEventsIcons[TypeOfEvents_full_time] = "circle";
  TypeOfEventsIcons[TypeOfEvents_part_time] = "circle-half";

  const [selectedDate, setSelectedDate] = useState(Date());
  const markedDatesRef = useRef({});
  const calendarRef = useRef(null);

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown: false
    }});
    // slidingUpPanelRef.current.show()
    return function cleanup() { } 
  }, []);

  // FLATLIST FUNCTIONS ---- START
  getList = (page = 0)=>{
    if(!refreshing){
      WebApi.listEvents(page).then((res)=>{
        if(res.data.length < parseInt(res.headers["x-pagination-per-page"])){
          setIsLastPage(true);
        }
        res.data.forEach(element => {
          var start = new Date(element.start_at * 1000);
          var start_date = start.getFullYear()+"-"+padStart(start.getMonth(),2,"0")+"-"+start.getDate();
          var end = new Date(element.end_at * 1000);
          var end_date = end.getFullYear()+"-"+padStart(end.getMonth(),2,"0")+"-"+end.getDate();
          var dates = markedDatesRef.current;
          var color = randomcolor();
          if(dates.hasOwnProperty(start_date)){
            dates[start_date].periods.push({startingDay: true, endingDay: false, color: color})
          } else {
            dates[start_date] = {
              periods:[{startingDay: true, endingDay: false, color: color}]
            }
          }
          if(start_date != end_date){
            if(dates.hasOwnProperty(end_date)){
              dates[end_date].periods.push({startingDay: true, endingDay: false, color: color})
            } else {
              dates[end_date] = {
                periods:[{startingDay: false, endingDay: true, color: color}]
              }
            }
          }
          markedDatesRef.current = JSON.parse(JSON.stringify(dates));
        });

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
      <Pressable onPress={ () => navigate("screenEventDetail", {item:item, data: data, source:"screenEventListing"})}>
        <View>
          <View style={styles.card}>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, padding: 5}}>
              <Icon style={{marginHorizontal: 10}} name="party-popper" size={28} color={StyleConstant.primaryColor}/>
              <View style={styles.midContent}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{item.name}</Text>
                <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode={'tail'}>Held at {item.venue}</Text>
              </View>
            </View>
          </View>
          {index == data.length - 1 || <View style={styles.inboxSeperator}/>}
        </View>
      </Pressable>
    )
  }
  const [refreshList, renderList] = CustomFlatList(getList, data, renderItem, "No information found", refreshing, isLastPage, 1, flatListRef, "course", (Dimensions.get('window').height)*0.5);
  // FLATLIST FUNCTIONS ---- END

  renderFilterFields = () =>{
    var TypeOfEventsItems = []; 
    for (const key in TypeOfEventsIcons) {
      if (Object.hasOwnProperty.call(TypeOfEventsIcons, key)) {
        const element = TypeOfEventsIcons[key];
        TypeOfEventsItems.push({
          label: key, // capitalise and remove underscore
          value: key,
          icon: () => <Icon name={element} size={18} color="#900" />,
        })
      }
    }

    return (
      <>
        <View style={[styles.filterFieldContainer]}>
          <OutlineInput
            value={keyword}
            onChangeText={(e) => setKeyword(e)}
            label="Keyword Search"
            activeValueColor="#6c63fe"
            activeBorderColor="#6c63fe"
            activeLabelColor="#6c63fe"
            passiveBorderColor="#bbb7ff"
            passiveLabelColor="#bbb7ff"
            passiveValueColor="#bbb7ff"
          />
        </View>

        <View style={[styles.filterFieldContainer, (Platform.OS !== 'android' && {zIndex: 9000})]}>
          <Text>Types of Events</Text>
          <DropDownPicker
            controller={instance => TypeOfEventsRef.current = instance}
            placeholder="Types of Events"
            items={TypeOfEventsItems}
            defaultValue={Object.keys(TypeOfEventsIcons)}
            multiple={true}
            multipleText="%d items have been selected."
            containerStyle={{height: 40}}
            style={[styles.DropDownPickerStyle]}
            itemStyle={[styles.DropDownPickerItemStyle]}
            dropDownStyle={[styles.DropDownPickerDropDownStyle]}
            onChangeItem={item => setTypeOfEvents(item)}
            onOpen={() => {
              // TypeOfEventsRef.current.close();
            }}
          />
        </View>
        
        <View style={[styles.filterFieldContainer]}>
          <DatePicker
            style={{width: "100%"}}
            date={filterStartDate}
            mode="date"
            placeholder="select start date"
            format="YYYY-MM-DD"
            minDate="2021-01-01"
            maxDate="2021-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {setFilterStartDate(date)}}
          />
        </View>

        <View style={[styles.filterFieldContainer]}>
          <DatePicker
            style={{width: "100%"}}
            date={filterEndDate}
            mode="date"
            placeholder="select end date"
            format="YYYY-MM-DD"
            minDate="2021-01-01"
            maxDate="2021-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {setFilterEndDate(date)}}
          />
        </View>
      </>
    )
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={[styles.calendarContainer]}>
          <Calendar
            ref={calendarRef}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2021-01-01'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2021-05-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => {
              setSelectedDate(day.dateString)
              console.log('selected day', day)
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => {
              console.log('selected day', day)
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {
              console.log('month changed', month)
            }}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={(direction) => (<Icon name={'arrow-'+direction} color={'black'} size={28} />)}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={subtractMonth => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Disable left arrow. Default = false
            disableArrowLeft={false}
            // Disable right arrow. Default = false
            disableArrowRight={false}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            // Replace default month and year title with custom one. the function receive a date as parameter. Date() object
            renderHeader={(date) => (<Text>{months[date.getMonth()]} {date.getFullYear()}</Text>)}
            // Enable the option to swipe between months. Default = false
            // Collection of dates that have to be marked. Default = {}
            // markedDates={{
            //   '2021-03-16': {marked: true},
            //   '2021-03-17': {marked: true},
            //   '2021-03-18': {marked: true, dotColor: 'red', activeOpacity: 0},
            //   '2021-03-19': {disabled: true, disableTouchEvent: true}
            // }}
            // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
            markingType='multi-period'
            markedDates={markedDatesRef.current}
            // Callback which gets executed when visible months change in scroll view. Default = undefined
            onVisibleMonthsChange={(months) => {
              console.log('now these months are visible', months);
            }}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={3}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={3}
            // Enable or disable scrolling of calendar list
            scrollEnabled={true}
            // Enable or disable vertical scroll indicator. Default = false
            showScrollIndicator={true}
            // Enable horizontal scrolling, default = false
            horizontal={true}
            // Enable paging on horizontal, default = false
            pagingEnabled={true}
          />
        </View>
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
              TypeOfEventsRef.current.close();
            }}>
              
              <View style={[styles.filterHeader]}>
                <Text style={[styles.filterHeaderText]}>Filters</Text>
                <Pressable style={[styles.filterResetButton]} onPress={() => {
                  TypeOfEventsRef.current.reset();
                }}>
                  <Icon name={'refresh'} color={'white'} size={28} />
                </Pressable>
                <Pressable style={[styles.filterDoneButton]} onPress={() => slidingUpPanelRef.current.hide()}>
                  <Icon name={'check-circle-outline'} color={'white'} size={28} />
                </Pressable>
              </View>
              {/* {renderFilteredResults()} */}
              {renderFilterFields()}
            </View>
          </ScrollView>
        </SlidingUpPanel>
      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenEventListing, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  content: {backgroundColor: 'white', padding: 22, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.1)',},
  contentTitle: {fontSize: 20, marginBottom: 12,},
  sliderHeader: {borderTopLeftRadius:15, borderTopRightRadius:15, backgroundColor:"#3c3c3c", width: '100%', height: 55, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
  sliderHeaderText: {alignSelf: 'center', color: 'white', fontSize:16, fontWeight:"bold"},
  sliderResetButton: {position: 'absolute', left: 10, justifyContent: 'center'},
  sliderDoneButton: {position: 'absolute', right: 10, justifyContent: 'center'},
  calendarContainer: { width:"100%",  marginTop: 10, marginBottom: 10 },
  container:{ flex: 1, alignItems: 'stretch', backgroundColor: 'white'},
  panalContainer:{borderLeftColor:"black", borderRightColor:"black", borderTopWidth:1, borderLeftWidth:1, borderRightWidth:1, borderRadius:15, flex: 1, backgroundColor: 'white', alignItems: 'center', },
  DropDownPickerStyle:{backgroundColor: '#fafafa'},
  DropDownPickerItemStyle:{justifyContent: 'flex-start'},
  DropDownPickerDropDownStyle:{backgroundColor: '#fafafa'},
  filterHeader: {borderTopLeftRadius:15, borderTopRightRadius:15, backgroundColor:"#3c3c3c", width: '100%', height: 55, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
  filterHeaderText: {alignSelf: 'center', color: 'white', fontSize:16, fontWeight:"bold"},
  filterResultText: {alignSelf: 'center', color: 'white', fontSize:15, fontWeight:"bold", marginRight:10},
  filterResetButton: {position: 'absolute', left: 10, justifyContent: 'center'},
  filterDoneButton: {position: 'absolute', right: 10, justifyContent: 'center'},
  filterFieldContainer: { width:"80%",  marginTop: 10, marginBottom: 10 },
  card: {width:'100%', flex:1, paddingVertical: 10, flexDirection:'row', backgroundColor: "white", alignItems: 'center', justifyContent: 'space-between'},
  icon: {width: 50, height: 50, margin: 10},
  midContent: {flex: 1, flexDirection:'column'},
  title: {color:"black" , fontSize: 12, fontWeight: "bold"},
  subtitle: {color:"black" , fontSize: 12},
  inboxSeperator: {position: 'absolute', bottom: 0, width: '95%', alignSelf: 'center', marginLeft: 'auto', marginRight: 'auto', backgroundColor: StyleConstant.bgGray, height: 1},
});
