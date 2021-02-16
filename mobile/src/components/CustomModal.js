import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '@components/CustomButton';
import { ShareStyle } from '@assets/MyStyle';
import Modal from "react-native-modal";


export default class CustomModal extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
    }
  }
  render() {
    const dismiss = () => { 
      this.setState({modalVisible:false});
    };

    return (
      <Modal isVisible={this.state.modalVisible} backdropColor='#333333' animationType='fade' style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.txt}>I am the modal content!</Text>
          <CustomButton btnTxt="Ok" onPress={dismiss} style={ShareStyle.flex1} />
        </View>        
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    padding: 22,
    //justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  txt: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
});
