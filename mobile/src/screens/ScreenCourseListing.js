import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, Text, Pressable, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderWithBack, StyleConstant } from '@assets/MyStyle';
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import { useNavigation } from 'react-navigation-hooks';
import CustomFlatList from '@components/CustomFlatList';
import WebApi from '@helpers/WebApi';
import Constants from '@helpers/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SlidingUpPanel from 'rn-sliding-up-panel';

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
  const modeOfStudyIcon = {
    "part_time" : "circle-half",
    "full_time" : "circle",
    "part_time_and_full_time" : "circle-half-full"
  }
  
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
              <Icon style={{marginHorizontal: 10}} name={modeOfStudyIcon[item.mode_of_study]} size={28} color={StyleConstant.primaryColor}/>
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
          snappingPoints={[(Dimensions.get('window').height) * 0.05, (Dimensions.get('window').height) * 0.20]}
          friction={0.75}
          backdropOpacity={0}
          showBackdrop={false}
          ref={slidingUpPanelRef}
          draggableRange={{top: (Dimensions.get('window').height) * 0.80 , bottom: 0}}
          // height={250}
          allowDragging={true}
        >
          {/* <ScrollView> */}
            <View style={styles.panalContainer}>
              <Text>Here is the content inside panel</Text>
              <Button title='Hide' onPress={() => slidingUpPanelRef.current.hide()} />
            </View>
          {/* </ScrollView> */}
        </SlidingUpPanel>
      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenCourseListing, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  container:{ flex: 1, alignItems: 'stretch', backgroundColor: 'white'},
  panalContainer:{flex: 1, backgroundColor: 'lightgrey', alignItems: 'center', justifyContent: 'center'},
  card: {width:'100%', flex:1, paddingVertical: 10, flexDirection:'row', backgroundColor: "white", alignItems: 'center', justifyContent: 'space-between'},
  icon: {width: 50, height: 50, margin: 10},
  midContent: {flex: 1, flexDirection:'column'},
  title: {color:"black" , fontSize: 12, fontWeight: "bold"},
  subtitle: {color:"black" , fontSize: 12},
  inboxSeperator: {position: 'absolute', bottom: 0, width: '95%', alignSelf: 'center', marginLeft: 'auto', marginRight: 'auto', backgroundColor: StyleConstant.bgGray, height: 1},
});
