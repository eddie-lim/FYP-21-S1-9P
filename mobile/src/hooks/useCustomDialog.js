import React, {useState} from 'react';
import { ShareStyle, HeaderStyleWithBack, StyleConstant, ShadowStyle } from '@assets/MyStyle';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, Dimensions } from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default useCustomDialog = () => { 
  //causing error
  //const id = "single-modal-id"; //provide same id to all modal to prevent triggering multiple modal
  const id = "custom-dialog"; //provide key to supress error, shd use uuid instead?
  
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);

  const dialogWidth = (Dimensions.get('window').width) * 0.9;
  const imageWidth = (Dimensions.get('window').width) * 0.5;
  
  const showCustomDialog = (data, isVisible = true) => {
    // Utils.log(data);
    // console.log(data.body);
    setData(data);
    setVisible(isVisible);
  }

  renderTitle = () => {
    if(data.hasOwnProperty("title")){
      return (
        <Text style={styles.title}>{data.title}</Text>
      );
    }
  }

  renderOkButton = () => {
    if(data.hasOwnProperty("okButtonText")){
      return (
        <TouchableOpacity style={styles.addBtn} onPress={handleOk}>
          <Icon name={data.hasBtnIcon? data.btnIcon : 'plus-circle'} size={20} color={'white'}/>
          <Text style={{color: 'white', fontSize: 12, marginLeft: 5, marginRight: 5, ...ShareStyle.txtRegular}}>{data.okButtonText}</Text>
        </TouchableOpacity>
      );
    }
  }

  handleOk = () =>{
    if(data.hasOwnProperty("okCallback")){
      let callback = data.okCallback[Object.keys(data.okCallback)[0]];
      callback();
    }
    setVisible(false);
  }

  renderCloseButton = () => {
    if(data.hasOwnProperty("hasCancelButton")){
      return (
        <TouchableOpacity style={{marginHorizontal: 5}} onPress={handleCancel}>
          <Icon name={'close'} size={30} color={StyleConstant.secondary}/>
        </TouchableOpacity>
      );
    }
  }

  handleCancel = () =>{
    if(data.hasOwnProperty("cancelCallback")){
      let callback = data.cancelCallback[Object.keys(data.cancelCallback)[0]];
      callback();
    }
    setVisible(false);
  }

  renderBody = () => {
    if(data.hasOwnProperty("body")){
      if(data.hasOwnProperty('index')){
        return(
          <View style={{marginTop: 10, marginBottom: 10}}>
            {data.body(data.index)}
          </View>
        );
      } else{
        return(
          <View style={{marginTop: 10, marginBottom: 10}}>
            {data.body()}
          </View>
        );
      }
    }
  }

  render = () => {
    return (
      <Modal key={id} isVisible={visible} backdropColor={'#00000070'} animationIn={'fadeIn'} animationOut={'fadeOut'} style={styles.container} hardwareAccelerated={true}>
        <View style={{width: dialogWidth, backgroundColor: 'white', borderRadius: 12, alignItems: 'stretch', overflow: 'hidden', borderWidth: 0, borderColor: data.borderColor, ...ShadowStyle}}>
          <View style={{flexDirection: 'row', alignItems: 'center', width: '90%', alignSelf: 'center', marginTop: 10, justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
              {data.renderIcon}
              {renderTitle()}
              {renderCloseButton()}
            </View>
          </View>
          <View style={{width: '90%', alignSelf:'center', marginTop: 5, marginBottom: 5, height: 0.5, backgroundColor: data.borderColor}}/>
          {renderBody()}
          {renderOkButton()}
        </View>
      </Modal>
    );
  }

  return { showCustomDialog, renderCustomDialog:render }
}

const styles = StyleSheet.create({
  header:{ textAlign: 'center', textAlignVertical: 'center', color: 'black', fontSize: 18, fontWeight: 'bold', margin: 10 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', },
  content: { backgroundColor: '#ffffff', padding: 22, justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderColor: 'rgba(0, 0, 0, 0.1)', },
  title: {fontSize: 18, marginHorizontal: 5, flex: 1, color: StyleConstant.dark, ...ShareStyle.txtBold},
  body: { textAlign: 'center', textAlignVertical: 'center', color: '#666666', margin: 10 },
  addBtn: {flexDirection: 'row', backgroundColor: StyleConstant.secondary, borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginTop: 5, marginBottom: 5, padding: 10, alignSelf: 'center', marginTop: 10, marginBottom: 15},
});
