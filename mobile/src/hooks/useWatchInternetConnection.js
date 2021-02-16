import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Alert, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { ShareStyle,  StyleConstant } from '@assets/MyStyle';
import Utils from '@helpers/Utils';

//ref: https://github.com/react-native-community/react-native-netinfo

export default useWatchInternetConnection = () => { 
  const [isConnectedToInternet, setIsConnectedToInternet] = useState(true);
  
  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnectedToInternet(state.isInternetReachable)
    });
    return function cleanup() {
      // Unsubscribe
      unsubscribe();
    } 
  }, []);


  render = () => {
    if (!isConnectedToInternet) {
      return (
          <View style={styles.content}>
            <Text style={styles.txt}>Internet connection not available. Please reconnect.</Text>
          </View>
      );
    }
  }

  return { renderConnectedToInternetInfo:render, isConnectedToInternet }

}

const styles = StyleSheet.create({
  content: { backgroundColor: StyleConstant.warn, padding: 5, top: 0, width: '100%', height: 30 },
  txt: { textAlign: 'center', textAlignVertical: 'center', color: StyleConstant.dark, ...ShareStyle.txtRegular}  
});