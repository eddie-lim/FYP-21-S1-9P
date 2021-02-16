import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default useActivityIndicator = () => { 
  //causing error
  //const id = "single-modal-id"; //provide same id to all modal to prevent triggering multiple modal
  const id = "activity-indicator"; //provide key to supress error, shd use uuid instead?
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Loading...");
  
  toggle = (flag, text = null) => { 
    setVisible(flag); 
    if(text != null){
      setMessage(text);} else {setMessage("Loading...");
    } 
  };

  render = () => {
    return (
      <Spinner
        visible={visible}
        textContent={message}
        textStyle={styles.spinnerTextStyle}
      />
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
