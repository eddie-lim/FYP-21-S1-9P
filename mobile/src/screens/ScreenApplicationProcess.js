import React, { useEffect, useRef } from 'react';
import { View, Linking, StyleSheet, ImageBackground, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';

const ScreenApplicationProcess = (props) => {
  const { navigate, goBack } = useNavigation();

  useEffect(() => {
    props.navigation.setParams({"navOptions":{
      header:()=> HeaderWithBack("Application Process", ()=>{
        navigate("screenQuestions")
      })
    }});
    return function cleanup() { } 
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom:15}}>
          <View style={{width:'80%', marginTop: 15}}>
            <Text style={{color:StyleConstant.primaryColor, width:'100%', fontSize:20, fontWeight:'bold'}}>Step 1</Text>
            <Image source={require('@assets/img/process_step1.png')} style={{width: 120, height: 120, marginTop: 10, alignSelf: 'center', resizeMode:'contain'}} />
            <Text style={{color:"black", width:'100%', textAlign:'center'}}>Read through the Additional Information section on this page.{"\n"}Prepare copies of supporting documents.</Text>
          </View>
          
          <View style={{width:'80%', marginTop: 15}}>
            <Text style={{color:StyleConstant.primaryColor, width:'100%', fontSize:20, fontWeight:'bold'}}>Step 2</Text>
            <Image source={require('@assets/img/process_step2.jpg')} style={{width: 300, height: 120, marginTop: 10, alignSelf: 'center', resizeMode:'contain'}} />
            <Text style={{color:"black", width:'100%', textAlign:'center'}}>Click&nbsp;
            <Text style={{color:'blue', fontWeight:'bold'}} onPress={()=> Linking.openURL('https://simconnect.simge.edu.sg/psp/paprd/EMPLOYEE/HRMS/s/WEBLIB_EOPPB.ISCRIPT1.FieldFormula.Iscript_SM_Redirect?cmd=login&languageCd=ENG&')}>here</Text>
            &nbsp;to start your application</Text>
          </View>
          
          <View style={{width:'80%', marginTop: 15}}>
            <Text style={{color:StyleConstant.primaryColor, width:'100%', fontSize:20, fontWeight:'bold'}}>Step 3</Text>
            <Image source={require('@assets/img/process_step3.png')} style={{width: 120, height: 120, marginTop: 10, alignSelf: 'center', resizeMode:'contain'}} />
            <Text style={{color:"black", width:'100%', textAlign:'center'}}>Complete your application and payment of application fees.</Text>
          </View>
          
          <View style={{width:'80%', marginTop: 15}}>
            <Text style={{color:StyleConstant.primaryColor, width:'100%', fontSize:20, fontWeight:'bold'}}>Step 4</Text>
            <Image source={require('@assets/img/process_step4.png')} style={{width: 120, height: 120, marginTop: 10, alignSelf: 'center', resizeMode:'contain'}} />
            <Text style={{color:"black", width:'100%', textAlign:'center'}}>Bring your original documents to SIM HQ for verification.</Text>
          </View>
          
          <View style={{width:'80%', marginTop: 15}}>
            <Text style={{color:StyleConstant.primaryColor, width:'100%', fontSize:20, fontWeight:'bold'}}>Step 5</Text>
            <Image source={require('@assets/img/process_step5.png')} style={{width: 120, height: 120, marginTop: 10, alignSelf: 'center', resizeMode:'contain'}} />
            <Text style={{color:"black", width:'100%', textAlign:'center'}}>Check your email for your application outcome.</Text>
          </View>

          <View style={styles.greySeperator}/>
          
          <View style={{width:'80%', marginTop: 15}}>
            <Text style={{color:StyleConstant.primaryColor, width:'100%', fontSize:20, fontWeight:'bold'}}>Application Fees</Text>
            <Text style={{color:"black", width:'100%'}}>Local applicants: S$96.30</Text>
            <Text style={{color:"black", width:'100%'}}>International applicants: S$481.50*</Text>
            <Text style={{color:"black", width:'100%'}}>Payment Modes: MasterCard / Visa credit card or eNETS</Text>
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
}

export default withScreenBase(ScreenApplicationProcess, ScreenBaseType.MAIN);

const styles = StyleSheet.create({  
  greySeperator: {width: '100%', height: 1, backgroundColor: StyleConstant.bgGray, marginTop: 10},
});
