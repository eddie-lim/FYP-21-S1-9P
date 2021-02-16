import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image'

//ref: https://github.com/DylanVann/react-native-fast-image
//usage: <CustomImage path='media/test/1/UOqFk6081fSvQdA1ONNjg6xKCPHD3y9U.jpg'/>

//uri: 'https://d1ysynm7e5rbq.cloudfront.net/media/test/1/UOqFk6081fSvQdA1ONNjg6xKCPHD3y9U.jpg',

export default CustomImage = (props) => { 
    const url = props.path;
    //const url = 'https://picsum.photos/id/12/400/400';
    //console.log("CustomImage url", url);

    return (
      <FastImage
        {...props} 
        style={[styles.elem, props.style]}
        source={{
            uri: url,
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
}
const styles = StyleSheet.create({
  elem: { width: 200, height: 200 },
});