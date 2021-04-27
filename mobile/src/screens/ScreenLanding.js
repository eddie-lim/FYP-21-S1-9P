import React, { useEffect, useRef, useState, useMemo } from 'react';
import { View, Dimensions, StyleSheet, FlatList, Text, ImageBackground, Image, Pressable, ScrollView } from 'react-native';
import { HomeHeader, StyleConstant, fabStyle, ShadowStyle, ShareStyle } from '@assets/MyStyle';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { StoreSettings, Settings } from '@helpers/Settings';
import { NavigationEvents } from 'react-navigation';
import WebApi from '@helpers/WebApi';
import { capitalize, isArray, shuffle } from 'lodash';
import HelperFunctions from '@helpers/HelperFunctions';
import PagerView from 'react-native-pager-view';
import { Placeholder, PlaceholderMedia, PlaceholderLine, ShineOverlay } from "rn-placeholder";

const ScreenLanding = (props) => {
  const { navigate } = useNavigation();
  const [ loggedIn, setLoggedIn ] = useState(null);
  const [ featuredItems, setFeaturedItems ] = useState({
    course:[],
    event:[],
    university_partner:[],
    course_quiz_url:[],
  })
  const [ universityPartners, setUniversityPartners ] = useState([]);
  const [ courses, setCourses ] = useState([]);
  const [ events, setEvents ] = useState([]);

  const viewPagerRef = useRef(null);
  const [ viewPagerSliderState, setViewPagerSliderState ] = useState(null);
  var currentViewPagerPage = useRef(0);

  useEffect(() => {
    getFeaturedItems();
    getSchoolListing();
    getCourseListing();
    getEventListing();
    if(viewPagerSliderState==null){
      var viewPagerSlider = setInterval(function(){
        if(viewPagerRef.current != null){
          // 0 - 6
          if (currentViewPagerPage.current >= 6) {
            currentViewPagerPage.current = 0;
          } else {
            currentViewPagerPage.current ++;
          }
          viewPagerRef.current.setPage(currentViewPagerPage.current);
        }
      }, 5000);
      setViewPagerSliderState(viewPagerSlider)
    }
    
    return function cleanup() {
      clearInterval(viewPagerSlider);
    } 
  }, []);

  getSchoolListing = () => {
    WebApi.listUniversityPartners(0).then((res)=>{
      setUniversityPartners(shuffle(res.data).slice(0, 3))
    }).catch((err)=>{
      console.log(err)
    })
  }

  getCourseListing = () => {
    WebApi.listCourses(0, '').then((res)=>{
      setCourses(shuffle(res.data).slice(0, 3))
    }).catch((err)=>{
      console.log(err)
    })
  }

  getEventListing = () => {
    WebApi.listEvents(0, '').then((res)=>{
      setEvents(shuffle(res.data).slice(0, 3))
    }).catch((err)=>{
      console.log(err)
    })
  }

  getFeaturedItems = ()=>{
    WebApi.getFeaturedItems().then((res)=>{
      setFeaturedItems(res.data)
    }).catch((err)=>{
      var error = err.data;
      if(isArray(error)){
        HelperFunctions.showToast(error[0].message)
      } else {
        HelperFunctions.showToast(error)
      }
      return
    })
  }

  renderFlatListItem = ({ item, index }, endpoint) => {
    return (
      <Pressable onPress={()=>{ navigate(endpoint, {item:item, source:"screenLanding"}) }} style = {{ width: (Dimensions.get('window').width)*0.8, height: (Dimensions.get('window').height)*0.15, borderColor:"black", borderWidth:0, borderRadius:10, marginLeft:index == 0 ? 15 : 0, marginRight:15, marginBottom:10, backgroundColor: '#ededed'}}>
        <Image source={{uri:item.thumbnail_url}} style={{width:'100%', height:'70%', resizeMode:'cover', paddingLeft:5, paddingRight:5, paddingTop:5, borderTopLeftRadius:10, borderTopRightRadius:10}} />
        <View style={{backgroundColor:StyleConstant.secondaryColor, width:'100%', height:'30%', borderBottomRightRadius:10, borderBottomLeftRadius:10, paddingLeft:5, paddingRight:5, paddingTop:5}}>
          <Text numberOfLines={1} style={{textAlign:'center', color:StyleConstant.secondaryTextColor}}>{item.name}</Text>
        </View>
      </Pressable>
    )
  }

  renderFlatListPlaceholder = () =>{
    return(
      <View style={{flexDirection:'row'}}>
        <Placeholder
          style={{width: (Dimensions.get('window').width)*0.8, height: (Dimensions.get('window').height)*0.15, marginLeft: 15, marginRight:15, marginTop:15}}
          Animation={ShineOverlay}
        >
          <PlaceholderMedia style={{width:"100%", height:'70%', borderRadius:10}} />
          <PlaceholderLine style={{position:'absolute', bottom:0, borderRadius:10}} />
        </Placeholder>

        <Placeholder
          style={{width: (Dimensions.get('window').width)*0.8, height: (Dimensions.get('window').height)*0.15, marginTop:15}}
          Animation={ShineOverlay}
        >
          <PlaceholderMedia style={{width:"100%", height:'70%', borderRadius:10}} />
          <PlaceholderLine style={{position:'absolute', bottom:0, borderRadius:10}} />
        </Placeholder>
      </View>
    )
  }

  renderEventFlatList = () =>{
    if(events.length == 0){
      return(
        <>
          {renderFlatListPlaceholder()}
        </>
      )
    } else {
      return(
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          data={events}
          renderItem={item => renderFlatListItem(item, "screenEventDetail")}
          keyExtractor={i => i.id}
          style={styles.flatListContainer}
        />
      )
    }
  }

  renderCourseFlatList = () =>{
    if(courses.length == 0){
      return(
        <>
          {renderFlatListPlaceholder()}
        </>
      )
    } else {
      return(
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          data={courses}
          renderItem={item => renderFlatListItem(item, "screenCourseDetail")}
          keyExtractor={i => i.id}
          style={styles.flatListContainer}
        />
      )
    }
  }

  renderUniPartnerFlatList = () =>{
    if(universityPartners.length == 0){
      return(
        <>
          {renderFlatListPlaceholder()}
        </>
      )
    } else {
      return(
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          data={universityPartners}
          renderItem={item => renderFlatListItem(item, "screenSchoolDetail")}
          keyExtractor={i => i.id}
          style={styles.flatListContainer}
        />
      )
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <NavigationEvents
        onWillFocus={()=>{
          StoreSettings.get(StoreSettings.IS_LOGGED_IN)
          .then((res)=>{
            setLoggedIn(res);
            if(res == true || res == "true"){
              WebApi.getProfile().then((profile_res)=>{
                // console.log(profile_res.data[0]);
                Settings.store(Settings.USER_PROFILE, profile_res.data[0]);
                props.navigation.setParams({"navOptions":{
                  headerShown:true,
                  header:()=> HomeHeader(navigate,res, capitalize(profile_res.data[0].userProfile.firstname))
                }});
              }).catch((err)=>{
                var error = err.data;
                if(isArray(error)){
                  HelperFunctions.showToast(error[0].message)
                } else {
                  HelperFunctions.showToast(error)
                }
                return
              })
            }
            props.navigation.setParams({"navOptions":{
              headerShown:true,
              header:()=> HomeHeader(navigate,res,"")
            }});
          })
        }}
      />
      <ScrollView>
        <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', marginTop:20, paddingBottom:5}}>
          
          <View style={{height: 160, width: '100%',justifyContent: 'center', alignItems: 'center'}}>
            <PagerView ref={viewPagerRef} onPageSelected={(e)=>{ currentViewPagerPage.current = e.nativeEvent.position; console.log("onPageSelected",e.nativeEvent.position) }} style={{height: '100%', width: '100%'}} initialPage={0}>
              <View key="1">
                <Image style={{width:'100%', height:'100%', maxHeight:150, resizeMode:'cover'}} source={{uri:"https://www.simge.edu.sg/wp-content/uploads/2021/02/01-3560-LE_Campus-tour_web-banner_sj_v01_onsite1440x600-2A.png"}} />
              </View>
              <View key="2">
                <Image style={{width:'100%', height:'100%', maxHeight:150, resizeMode:'cover'}} source={{uri:"https://www.simge.edu.sg/wp-content/uploads/2020/10/Web-Banner-for-counter2.png"}} />
              </View>
              <View key="3">
                <Image style={{width:'100%', height:'100%', maxHeight:150, resizeMode:'cover'}} source={{uri:"https://www.simge.edu.sg/wp-content/uploads/2021/04/Web_Banner_Create_Big-R2.jpg"}} />
              </View>
              <View key="4">
                <Image style={{width:'100%', height:'100%', maxHeight:150, resizeMode:'cover'}} source={{uri:"https://www.simge.edu.sg/wp-content/uploads/2021/04/SIM-Music-Quiz-Mega-banner-V2.png"}} />
              </View>
              <View key="5">
                <Image style={{width:'100%', height:'100%', maxHeight:150, resizeMode:'cover'}} source={{uri:"https://www.simge.edu.sg/wp-content/uploads/2021/04/Official-Web-Banner-eDM.png"}} />
              </View>
              <View key="6">
                <Image style={{width:'100%', height:'100%', maxHeight:150, resizeMode:'cover'}} source={{uri:"https://www.simge.edu.sg/wp-content/uploads/2021/04/Nursing-Webinar-GE-Event-Homepage-Banner-1440-x-600.png"}} />
              </View>
              <View key="7">
                <Image style={{width:'100%', height:'100%', maxHeight:150, resizeMode:'cover'}} source={{uri:"https://www.simge.edu.sg/wp-content/uploads/2021/04/03-3567-GE-PC-2_Mega-bnr-1440x400.jpg"}} />
              </View>
            </PagerView>
          </View>

          <View>
            <View style={styles.flatListHeaderContainer}>
              <Text style={styles.flatListHeaderLeft}>Events</Text>
              <Pressable onPress={()=>navigate("screenEventListing")}>
                <Text style={styles.flatListHeaderRight}>View All &gt;</Text>
              </Pressable>
            </View>
            
            { useMemo( renderEventFlatList, [events]) }
            <View style={styles.greySeperator}/>
          </View>

          <View>
            <View style={styles.flatListHeaderContainer}>
              <Text style={styles.flatListHeaderLeft}>Courses</Text>
              <Pressable onPress={()=>navigate("screenCourseListing")}>
                <Text style={styles.flatListHeaderRight}>View All &gt;</Text>
              </Pressable>
            </View>

            { useMemo( renderCourseFlatList, [courses]) }
            <View style={styles.greySeperator}/>
          </View>

          <View>
            <View style={styles.flatListHeaderContainer}>
              <Text style={styles.flatListHeaderLeft}>University Partners</Text>
              <Pressable onPress={()=>navigate("screenSchoolListing")}>
                <Text style={styles.flatListHeaderRight}>View All &gt;</Text>
              </Pressable>
            </View>

            { useMemo( renderUniPartnerFlatList, [universityPartners]) }
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenLanding, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  cardContainer: {width: (Dimensions.get('window').width) * 0.90, height: 200, justifyContent: 'center', alignItems: 'center', borderWidth:1, borderRadius:15, padding:20, backgroundColor:'#fff', shadowColor: "#fff", shadowOpacity: 0.8, shadowRadius: 2, shadowOffset: {
    height: 1,
    width: 1
  }},
  greySeperator: {width: '100%', height: 1, backgroundColor: StyleConstant.bgGray, marginTop: 10},
  flatListHeaderLeft:{fontSize:18, color:'navy', fontWeight:'bold', marginLeft:15},
  flatListHeaderRight:{fontSize:14, color:'#6e6e6e', fontWeight:'bold', marginRight:15},
  flatListContainer:{width: '100%', height:(Dimensions.get('window').height)*0.17, marginTop:15, marginBottom:5},
  flatListHeaderContainer:{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop:15},
});
