import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, Text } from 'react-native';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';

const ScreenCourseDetail = (props) => {
  const { navigate, goBack } = useNavigation();
  const [ activeSections, setActiveSections ] = useState([]);
  const [ isCollapsed2, setIsCollapsed2 ] = useState(true);
    
  const BACON_IPSUM =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

  const CONTENT = [
    {
      title: 'First',
      content: BACON_IPSUM,
    },
    {
      title: 'Second',
      content: BACON_IPSUM,
    },
    {
      title: 'Third',
      content: BACON_IPSUM,
    },
    {
      title: 'Fourth',
      content: BACON_IPSUM,
    },
    {
      title: 'Fifth',
      content: BACON_IPSUM,
    },
  ];
  const SELECTORS = [
    {
      title: 'First',
      value: 0,
    },
    {
      title: 'Third',
      value: 2,
    },
    {
      title: 'None',
    },
  ];
  const SECTIONS = [
    {
      title: 'First',
      header: 'First header',
      content: 'Lorem ipsum...',
    },
    {
      title: 'Second',
      header: 'Second header',
      content: 'Lorem ipsum...',
    },
  ];

  useEffect(() => {
    console.log("ScreenCourseDetail")
    props.navigation.setParams({"navOptions":{
      header:()=> HeaderWithBack("Course Detail", navigate, "screenCourseListing")
    }});
    return function cleanup() { } 
  }, []);
  
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
    console.log("activeSections", activeSections)
    setActiveSections(activeSections);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Accordion
      containerStyle={{width:'90%'}}
        sections={SECTIONS}
        activeSections={activeSections}
        renderSectionTitle={renderSectionTitle}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
      />
      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenCourseDetail, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
