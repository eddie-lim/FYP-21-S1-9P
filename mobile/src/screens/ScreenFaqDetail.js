import React, { useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text } from 'react-native';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';

const ScreenFaqDetail = (props) => {
  const { navigate, goBack } = useNavigation();
  const item = useNavigationParam('item');

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      headerShown:true,
      header:()=> HeaderWithBack("FAQ Detail", ()=>{
        navigate("screenFaq")
      })
    }});
    return function cleanup() { } 
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
        <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width:'80%'}}>
          <Text style={{color:"black", fontSize:20, marginBottom:20}}>{item.question}</Text>
          <ScrollView>
            <View>
              <Text style={{color:"black"}}>{item.answer}</Text>
            </View>
          </ScrollView>
        </View>
    </View>
  );
}

export default withScreenBase(ScreenFaqDetail, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  viewHolder: { flex: 1, alignItems: 'stretch', flexDirection: 'column', backgroundColor: '#ffffff' },
  seperator: {width: '90%', height: 1.5, backgroundColor: 'gray', alignSelf: 'center', marginTop: 30},
  imgBg: {width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'},
  topHolder: {flexDirection: 'row', position: 'absolute', right: 10, top: 10},
  logoHolder: {width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'},
  logo: {width: (Dimensions.get('window').width) * 0.8, height: ((Dimensions.get('window').width) * 0.8)/3},
  centerContent: {width: '100%', height: (Dimensions.get('window').height) * 0.55, justifyContent: 'space-between'}
});
