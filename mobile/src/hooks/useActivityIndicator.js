import React, {useState} from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from "react-native-modal";
import LottieView from 'lottie-react-native';

export default useActivityIndicator = () => { 
  //causing error
  //const id = "single-modal-id"; //provide same id to all modal to prevent triggering multiple modal
  const id = "activity-indicator"; //provide key to supress error, shd use uuid instead?
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Loading...");
  
  toggle = (flag, text = null) => {
    if(flag == false){
      setTimeout(() => {
        setVisible(flag);
      }, 1234);
    } else {
      setVisible(flag);
      if(text != null){
        setMessage(text);} else {setMessage("Loading...");
      } 
    }
  };

  render = () => {
    return (
      // <Spinner
      //   visible={visible}
      //   textContent={message}
      //   textStyle={styles.spinnerTextStyle}
      // />
      <Modal key={id} visible={visible} animationIn={'fadeIn'} animationOut={'fadeOut'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#00000070', margin: 0}}
        deviceWidth={(Dimensions.get('window').width)}
        deviceHeight={(Dimensions.get('window').height)}
        hardwareAccelerated={true}
      >
        <LottieView style={{height: 200}} source={require('@assets/animation/lego-loader-410.json')} autoPlay={true} loop={true} />
        {/* <LottieView style={{height: 200}} source={require('@assets/animation/ripple-loading-448.json')} autoPlay={true} loop={true} /> */}
      </Modal>
    );
  }

  return { toggleActivityIndicator:toggle, renderActivityIndicator:render }

}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#000000aa',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    paddingTop: 10
  }  
});
