import React, { useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';

const ScreenCourseListing = (props) => {
  const { navigate, goBack } = useNavigation();
  
  useEffect(() => {
    console.log("ScreenCourseListing")
    props.navigation.setParams({"navOptions":{
      header:()=> HeaderWithBack("Course", navigate, "screenUniversity")
    }});
    return function cleanup() { } 
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color:"black"}}>course listing</Text>
      <FlatList
        data={[
          {
            id: '1',
            title: 'Bachelor of Science (Honours) in Data Science and Business Analytics',
            subtitle: 'Awarded by University of London',
          },
          {
            id: '2',
            title: 'Bachelor of Computer Science (Big Data)',
            subtitle: 'Awarded by University of Wollongong',
          },
          {
            id: '3',
            title: 'Bachelor of Business Information Systems',
            subtitle: 'Awarded by University of Wollongong',
          },
        ]}
        renderItem={({ item }) => (
          <Pressable onPress={()=>alert('hello')}>
            <View style={{backgroundColor: 'white', padding: 20, width:Dimensions.get('window').width * 0.95, marginVertical: 8, borderColor: 'black', borderWidth:1}}>
              <Text style={{ fontSize: 20, }}>{item.title}</Text>
              <Text style={{ fontSize: 16, }}>{item.subtitle}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />
      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenCourseListing, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  viewHolder: { flex: 1, alignItems: 'stretch', flexDirection: 'column', backgroundColor: '#ffffff' },
  seperator: {width: '90%', height: 1.5, backgroundColor: 'gray', alignSelf: 'center', marginTop: 30},
  imgBg: {width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'},
  topHolder: {flexDirection: 'row', position: 'absolute', right: 10, top: 10},
  logoHolder: {width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'},
  logo: {width: (Dimensions.get('window').width) * 0.8, height: ((Dimensions.get('window').width) * 0.8)/3},
  centerContent: {width: '100%', height: (Dimensions.get('window').height) * 0.55, justifyContent: 'space-between'},
});
