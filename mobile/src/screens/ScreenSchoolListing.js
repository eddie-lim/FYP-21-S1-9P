import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderWithBack, StyleConstant } from '@assets/MyStyle';
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import { useNavigation } from 'react-navigation-hooks';
import CustomFlatList from '@components/CustomFlatList';
import WebApi from '@helpers/WebApi';
import Constants from '@helpers/Constants';
// import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { isArray, toLower, upperCase, upperFirst } from 'lodash';
import HelperFunctions from '@helpers/HelperFunctions';

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
  const continentLabel = {
    "europe" : "Europe",
    "uk" : "United Kingdom",
    "australia" : "Australia",
    "singapore" : "Singapore",
    "us" : "United States of Americas",
  }

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack("University Partners", ()=>{
        navigate("screenUniversity")
      })
    }});
    return function cleanup() { } 
  }, []);

  // FLATLIST FUNCTIONS ---- START
  getList = (page = 1)=>{
    if(!refreshing){
      WebApi.listUniversityPartners(page).then((res)=>{
        if(parseInt(res.meta["x-pagination-total-count"]) < parseInt(res.meta["x-pagination-per-page"])){
          setIsLastPage(true);
        }
        const d = (page === 1)? res.data : [...data, ...res.data];
        setData(d);
        setRefreshing(false);
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
  }
  renderItem = ({item, index}) => {
    return (        
      <Pressable onPress={ () => navigate("screenSchoolDetail", {item:item, data: data, source:"screenSchoolListing"})}>
        <View>
          <View style={styles.card}>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, padding: 5}}>
              <FontAwesome5 style={{marginHorizontal: 10}} name={continentIcon[toLower(item.continent)]} size={28} color={StyleConstant.primaryColor}/>
              <View style={styles.midContent}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{item.name}</Text>
                <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode={'tail'}>{continentLabel[item.continent]}</Text>
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

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View>
          
        </View>
        { renderList() }
      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenSchoolListing, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  container:{ flex: 1, alignItems: 'stretch', backgroundColor: 'white'},
});
