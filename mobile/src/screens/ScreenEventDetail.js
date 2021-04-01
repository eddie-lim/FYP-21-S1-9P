import React, { useEffect, useRef, useState } from 'react';
import { View, BackHandler, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import { capitalize, join, split, parseInt, map } from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ScreenEventDetail = (props) => {
  const { navigate, goBack } = useNavigation();
  const [ activeSections, setActiveSections ] = useState([0]);
  const [ section, setSection ] = useState([]);
  const item = useNavigationParam('item');
  const source = useNavigationParam('source');

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      header:()=> HeaderWithBack("Event Detail", navigate, source,
      <Pressable style={{position: 'absolute', right: 15, justifyContent: 'center'}} onPress={() => handleRegister()}>
        <Icon name={'calendar-plus'} color={'white'} size={30} />
      </Pressable>)
    }});
    BackHandler.addEventListener('hardwareBackPress', handleBackHandler);

    var item_keys = Object.keys(item);
    setActiveSections(map(Object.keys(item_keys), parseInt));
    var item_values = Object.values(item);
    var items = [];
    for (let i = 0; i < item_keys.length; i++) {
      const item_key = capitalize(join(split(item_keys[i], "_"), " "));
      const item_value = item_values[i];
      items.push({
        header:item_key,
        content:item_value
      })
    }
    setSection(items)

    return function cleanup() { } 
  }, []);

  handleBackHandler = ()=>{
   BackHandler.removeEventListener('hardwareBackPress', handleBackHandler);
   navigate("mainBottomTab");
   return true;
 }

  handleRegister = () => {

  }

  renderSectionTitle = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.title}</Text>
      </View>
    );
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={[styles.header, isActive ? styles.active : styles.inactive]}>
        <Text style={styles.headerText}>{section.header}</Text>
      </Animatable.View>
    );
  };

  renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={[styles.content, isActive ? styles.active : styles.inactive]}>
        <Animatable.Text
          duration={500}
          easing="ease-out"
          animation={isActive ? 'bounceIn' : false}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{backgroundColor: 'rgba(245,252,255,1)'}}>
        <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Accordion
          containerStyle={{width:'100%'}}
          sections={section}
          activeSections={activeSections}
          // renderSectionTitle={renderSectionTitle}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={updateSections}
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenEventDetail, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  container: {flex: 1,backgroundColor: '#F5FCFF',paddingTop: Constants.statusBarHeight,},
  title: {textAlign: 'center',fontSize: 22,fontWeight: '300',marginBottom: 20,},
  header: {backgroundColor: '#F5FCFF',padding: 10,},
  headerText: {textAlign: 'center',fontSize: 16,fontWeight: '500',},
  content: {padding: 20,backgroundColor: '#fff',},
  active: {backgroundColor: 'rgba(255,255,255,1)',},
  inactive: {backgroundColor: 'rgba(245,252,255,1)',},
  selectors: {marginBottom: 10,flexDirection: 'row',justifyContent: 'center',},
  selector: {backgroundColor: '#F5FCFF',padding: 10,},
  activeSelector: {fontWeight: 'bold',},
  selectTitle: {fontSize: 14,fontWeight: '500',padding: 10,},
  multipleToggle: {flexDirection: 'row',justifyContent: 'center',marginVertical: 30,alignItems: 'center',},
  multipleToggle__title: {fontSize: 16,marginRight: 8,},
});
