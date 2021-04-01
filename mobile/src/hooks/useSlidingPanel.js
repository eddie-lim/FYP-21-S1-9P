import React, { useState, useRef } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

export default useSlidingPanel = () => { 
  const id = "sliding-panel"; //provide key to supress error, shd use uuid instead?
  const [content, setContent] = useState(null);
  const slidingUpPanelRef = useRef(null);
  
  init = (jsx, ref) => { 
    console.log('jsx', jsx)
    setContent(
      <SlidingUpPanel
        snappingPoints={[(Dimensions.get('window').height) * 0.1]}
        friction={0.75}
        backdropOpacity={0}
        showBackdrop={false}
        ref={ref}
        draggableRange={{top: (Dimensions.get('window').height) * 0.95 , bottom: 55}}
        // height={250}
        allowDragging={true}
      >
        { jsx }
      </SlidingUpPanel>);
  };

  render = () => {
    console.log('content', content)
    if(content !== null){
      return (
        <>
        { content }
        </>
      );
    }
  }
  return { initSlidingPanel:init, renderSlidingPanel:render }
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
