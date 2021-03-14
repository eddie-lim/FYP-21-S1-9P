import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import CustomFlatList from '@components/CustomFlatList';
import WebApi from '@helpers/WebApi';
import Constants from '@helpers/Constants';

const ScreenCourseListing = (props) => {
  const { navigate, goBack } = useNavigation();
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const flatListRef = useRef(null);
  
  useEffect(() => {
    console.log("ScreenCourseListing")
    props.navigation.setParams({"navOptions":{
      header:()=> HeaderWithBack("Courses", navigate, "screenUniversity")
    }});
    return function cleanup() { } 
  }, []);

  getList = (page = 0)=>{
    if(!refreshing){
      WebApi.listCourses(page).then((res)=>{
        console.log("eddd");
        console.log(res);
        if(res.data.length < Constants.FLATLIST_PAGESIZE){
          setIsLastPage(true);
        }
        const d = (page === 0)? res.data : [...data, ...res.data];
        setData(d);
        setRefreshing(false);
      }).catch((err)=>{
          console.log("edd err")
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
              <Icon style={{marginHorizontal: 10}} name={item.status_read == true? 'email-open' : 'email'} size={28} color={StyleConstant.primaryColor}/>

              <View style={styles.midContent}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{item.title}</Text>
                <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode={'tail'}>Click to find out more</Text>
              </View>
            </View>

          </View>

          {index == data.length - 1 || <View style={styles.inboxSeperator}/>}

        </View>
      </Pressable>
    )
  }

  const [refreshList, renderList] = CustomFlatList(getList, data, renderItem, "No information found", refreshing, isLastPage, 1, flatListRef, "course", (Dimensions.get('window').height)-80);

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        { renderList() }
      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenCourseListing, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  container:{ flex: 1, alignItems: 'stretch', backgroundColor: 'white'},
  card: {width:'100%', flex:1, paddingVertical: 10, flexDirection:'row', backgroundColor: "white", alignItems: 'center', justifyContent: 'space-between'},
  icon: {width: 50, height: 50, margin: 10},
  midContent: {flex: 1, flexDirection:'column'},
  title: {color:"black" , fontSize: 12, fontWeight: "bold"},
  subtitle: {color:"black" , fontSize: 12},
  inboxSeperator: {position: 'absolute', bottom: 0, width: '95%', alignSelf: 'center', marginLeft: 'auto', marginRight: 'auto', backgroundColor: StyleConstant.bgGray, height: 1},
});
