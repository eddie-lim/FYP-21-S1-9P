import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, Text, Pressable, Modal, Button } from 'react-native';
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

  useEffect(() => {
    console.log("ScreenEventListing")
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
      <Pressable onPress={ () => navigate("screenEventDetail", {item:item, data: data})}>
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
  const [refreshList, renderList] = CustomFlatList(getList, data, renderItem, "No information found", refreshing, isLastPage, 1, flatListRef, "course", (Dimensions.get('window').height)-80);
  // FLATLIST FUNCTIONS ---- END

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        { renderList() }

        <SlidingUpPanel
          snappingPoints={[(Dimensions.get('window').height) * 0.55]}
          friction={0.75}
          backdropOpacity={0}
          showBackdrop={false}
          ref={slidingUpPanelRef}
          draggableRange={{top: (Dimensions.get('window').height) * 0.90 , bottom: 75}}
          allowDragging={true}
        >
          <View style={styles.panalContainer}>
            
            <View style={[styles.sliderHeader]}>
              <Text style={[styles.sliderHeaderText]}>Calender</Text>
              <Pressable style={[styles.sliderResetButton]} onPress={() => {
              }}>
                <Icon name={'refresh'} color={'white'} size={28} />
              </Pressable>
              <Pressable style={[styles.sliderDoneButton]} onPress={() => slidingUpPanelRef.current.hide()}>
                <Icon name={'check-circle-outline'} color={'white'} size={28} />
              </Pressable>
            </View>

            <View style={[styles.calendarContainer]}>
              <Calendar
                // Initially visible month. Default = Date()
                current={'2021-03-19'}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={'2020-05-10'}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                maxDate={'2021-05-30'}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={(day) => {console.log('selected day', day)}}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={(day) => {console.log('selected day', day)}}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month) => {console.log('month changed', month)}}
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
                // Show week numbers to the left. Default = false
                showWeekNumbers={true}
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
                markedDates={{
                  '2021-03-16': {selected: true, marked: true, selectedColor: 'blue'},
                  '2021-03-17': {marked: true},
                  '2021-03-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                  '2021-03-19': {disabled: true, disableTouchEvent: true}
                }}
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={5}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={5}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}
                // Enable horizontal scrolling, default = false
                horizontal={true}
                // Enable paging on horizontal, default = false
                pagingEnabled={true}
                // Set custom calendarWidth.
              />
            </View>
          </View>
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
});
