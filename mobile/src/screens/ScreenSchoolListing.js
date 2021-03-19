import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderWithBack, StyleConstant } from '@assets/MyStyle';
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import { useNavigation } from 'react-navigation-hooks';
import CustomFlatList from '@components/CustomFlatList';
import WebApi from '@helpers/WebApi';
import Constants from '@helpers/Constants';
import Icon from 'react-native-vector-icons/FontAwesome';

const ScreenSchoolListing = (props) => {
  const { navigate, goBack } = useNavigation();
  // FLATLIST VALUES ---- START
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const flatListRef = useRef(null);
  // FLATLIST VALUES ---- END
  const continentIcon = {
    "europe" : "globe-europe",
    "uk" : "globe-europe",
    "australia" : "globe-asia",
    "singapore" : "globe-asia",
    "us" : "globe-americas",
  }

  useEffect(() => {
    console.log("ScreenSchoolListing")
    props.navigation.setParams({"navOptions":{
      header:()=> HeaderWithBack("University Partners", navigate, "screenUniversity")
    }});
    return function cleanup() { } 
  }, []);

  // FLATLIST FUNCTIONS ---- START
  getList = (page = 0)=>{
    if(!refreshing){
      WebApi.listUniversityPartners(page).then((res)=>{
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
      <Pressable onPress={ () => navigate("screenSchoolDetail", {item:item, data: data})}>
        <View>
          <View style={styles.card}>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, padding: 5}}>
              <Icon style={{marginHorizontal: 10}} name={continentIcon[item.continent]} size={28} color={StyleConstant.primaryColor}/>
              <View style={styles.midContent}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{item.name}</Text>
                <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode={'tail'}>{item.continent}</Text>
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
      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenSchoolListing, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  viewHolder: { flex: 1, alignItems: 'stretch', flexDirection: 'column', backgroundColor: '#ffffff' },
  seperator: {width: '90%', height: 1.5, backgroundColor: 'gray', alignSelf: 'center', marginTop: 30},
  imgBg: {width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'},
  topHolder: {flexDirection: 'row', position: 'absolute', right: 10, top: 10},
  logoHolder: {width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'},
  logo: {width: (Dimensions.get('window').width) * 0.8, height: ((Dimensions.get('window').width) * 0.8)/3},
  centerContent: {width: '100%', height: (Dimensions.get('window').height) * 0.55, justifyContent: 'space-between'}
});
