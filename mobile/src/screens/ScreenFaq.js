import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderWithBack, StyleConstant } from '@assets/MyStyle';
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import { useNavigation } from 'react-navigation-hooks';
import CustomFlatList from '@components/CustomFlatList';
import WebApi from '@helpers/WebApi';
import Constants from '@helpers/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { isArray } from 'lodash';
import HelperFunctions from '@helpers/HelperFunctions';

const ScreenFaq = (props) => {
  const { navigate, goBack } = useNavigation();
  // FLATLIST VALUES ---- START
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const flatListRef = useRef(null);
  // FLATLIST VALUES ---- END

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack("FAQ", ()=>{
        navigate("screenQuestions")
      })
    }});
    return function cleanup() { } 
  }, []);

  // FLATLIST FUNCTIONS ---- START
  getList = (page = 1)=>{
    console.log("getList page", page)
    if(!refreshing){
      setRefreshing(true);
      WebApi.listFaq(page).then((res)=>{        
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
      <Pressable onPress={ () => navigate("screenFaqDetail", {item:item, data: data})}>
        <View>
          <View style={styles.card}>
            <View style={{flexDirection:'row', alignItems: 'center', flex: 1}}>
              {/* <Icon style={{marginHorizontal: 10}} name={modeOfStudyIcon[item.mode_of_study]} size={28} color={StyleConstant.primaryColor}/> */}
              <View style={styles.midContent}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>&bull;&nbsp;{item.question}</Text>
                {/* <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode={'tail'}>Awarded by {item.school_id}</Text> */}
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

export default withScreenBase(ScreenFaq, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  container:{ flex: 1, alignItems: 'stretch', backgroundColor: 'white'},
  card:{marginBottom:15, marginTop:15, marginLeft:5, marginRight:5},
  inboxSeperator: {position: 'absolute', bottom: 0, width: '95%', alignSelf: 'center', marginLeft: 'auto', marginRight: 'auto', backgroundColor: StyleConstant.bgGray, height: 1},
});
