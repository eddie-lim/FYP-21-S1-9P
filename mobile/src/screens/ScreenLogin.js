import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, Text, TextInput, Pressable } from 'react-native';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';

const ScreenLogin = (props) => {
  const { navigate, goBack } = useNavigation();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  useEffect(() => {
    console.log("ScreenLogin")
    props.navigation.setParams({"navOptions":{
      header: HeaderWithBack("Login", navigate, "mainBottomTab")
    }});
    return function cleanup() { } 
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color:"black"}}>login</Text>
        <View style={[styles.container]}>
          <TextInput style={styles.txt}
              placeholder={"email"}
              placeholderTextColor={StyleConstant.mutedTextColor}
              returnKeyType="done"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              defaultValue={email}
              onChangeText={(new_value)=>{setEmail(new_value)}}
          />
        </View>
        
        <View style={[styles.container]}>
          <TextInput style={styles.txt}
              placeholder={"password"}
              placeholderTextColor={StyleConstant.mutedTextColor}
              returnKeyType="done"
              secureTextEntry
              defaultValue={password}
              onChangeText={(new_value)=>{setPassword(new_value)}}
          />
        </View>

        <Pressable onPress={()=>{navigate("screenRegister")}}>
          <Text style={{color:"black"}}>register button here</Text>
        </Pressable>

        <Pressable style={{marginTop:15}} onPress={() => console.log("login!")}>
          <ImageBackground resizeMode={'cover'} style={{width: 300, height: 100, justifyContent: 'center', alignItems: 'center'}} source={require('@assets/img/bg-orange.jpg')} >
            {/* <LottieView style={{height: 150, position:'absolute', top:0}} source={require('@assets/animation/splashscreen.json')} autoPlay={true} loop={true} /> */}
            <Text style={{ position:'absolute', color:"black", bottom:10}}>Login</Text>
          </ImageBackground>
        </Pressable>

        <Text>email: {email}</Text>
        <Text>password: {password}</Text>
      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenLogin, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  viewHolder: { flex: 1, alignItems: 'stretch', flexDirection: 'column', backgroundColor: '#ffffff' },
  seperator: {width: '90%', height: 1.5, backgroundColor: 'gray', alignSelf: 'center', marginTop: 30},
  imgBg: {width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'},
  topHolder: {flexDirection: 'row', position: 'absolute', right: 10, top: 10},
  logoHolder: {width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'},
  logo: {width: (Dimensions.get('window').width) * 0.8, height: ((Dimensions.get('window').width) * 0.8)/3},
  centerContent: {width: '100%', height: (Dimensions.get('window').height) * 0.55, justifyContent: 'space-between'},
  txt: { width: '80%', height: 40, borderRadius: 10, backgroundColor: '#ffffff', color: '#000000', textAlign: 'left', textAlignVertical: 'center', borderWidth: 1, borderColor: StyleConstant.bgGray, paddingLeft: 15 },
  container: { width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 },
});
