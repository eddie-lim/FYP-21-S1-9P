import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, Text, Pressable } from 'react-native';
import { HeaderWithBack, StyleConstant, fabStyle, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import Environment from '@helpers/Environment';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ScreenMap = (props) => {
  const mapViewRef = useRef(null);
  const cameraRef = useRef(null);
  const userLocationRef = useRef(null);

  const [followMap, setFollowMap] = useState(true);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    MapboxGL.setAccessToken(Environment.MAPBOX_KEY);
    props.navigation.setParams({"navOptions":{
      headerShown: false
    }});
    return function cleanup() { } 
  }, []);

  handleOnDidFinishRenderingMapFully = (e) =>{
    cameraRef.current.setCamera({
      centerCoordinate: [103.776027, 1.329290],
      zoomLevel: 17,
      animationDuration: 200,
    });
  }

  handleOnUserLocationUpdate = (e) =>{
  }

  handleOnPressMyLocation = (e) =>{
    cameraRef.current.setCamera({
      centerCoordinate: [103.776027, 1.329290],
      zoomLevel: 17,
      animationDuration: 200,
    });
  }

  renderUserLocation = () => {
      if (hasLocationPermission) {
          // if isRecording, will show an image at the latest lnglat of the polyline
          return (
              <MapboxGL.UserLocation ref={userLocationRef} visible={true} showsUserHeadingIndicator={true} onUpdate={throttle(10000, true, handleOnUserLocationUpdate)} />
          )
      }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapboxGL.MapView ref={mapViewRef} style={styles.map} onDidFinishRenderingMapFully={handleOnDidFinishRenderingMapFully} onTouchEnd={() => { setFollowMap(false) }}>
            {/* removing this followUserLocation={followMap}  */}
            <MapboxGL.Camera ref={cameraRef} zoomLevel={18} minZoomLevel={9} maxZoomLevel={19} />

            {/* {renderUserLocation()} */}

            <MapboxGL.UserLocation ref={userLocationRef} visible={true} showsUserHeadingIndicator={true} onUpdate={handleOnUserLocationUpdate} />
            
            {/* user location */}
            {/* <MapboxGL.ShapeSource id="user-location-source" shape={userLocationGeoJson.current}>
                <MapboxGL.SymbolLayer id="user-location-icon-layer" style={userLocationIcon} />
            </MapboxGL.ShapeSource> */}

        </MapboxGL.MapView>

        <View style={{width: '100%', position: 'absolute', bottom: 0}}>
          <Pressable onPress={handleOnPressMyLocation} style={styles.locationBtn}>
            <Icon name={'school'} size={25} style={Platform.OS == 'android' || {width: 25, height: 25}} color={"white"}/>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default withScreenBase(ScreenMap, ScreenBaseType.MAIN);

const styles = StyleSheet.create({
  viewHolder: { flex: 1, alignItems: 'stretch', flexDirection: 'column', backgroundColor: '#ffffff' },
  seperator: {width: '90%', height: 1.5, backgroundColor: 'gray', alignSelf: 'center', marginTop: 30},
  imgBg: {width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'},
  topHolder: {flexDirection: 'row', position: 'absolute', right: 10, top: 10},
  logoHolder: {width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'},
  logo: {width: (Dimensions.get('window').width) * 0.8, height: ((Dimensions.get('window').width) * 0.8)/3},
  centerContent: {width: '100%', height: (Dimensions.get('window').height) * 0.55, justifyContent: 'space-between'},
  container: { flex: 1 },
  background: { backgroundColor: "black" },
  locationBtn: {width: 40, height: 40, position:'absolute', alignItems:'center', justifyContent: 'center', top: -45, right: 10, backgroundColor: StyleConstant.primaryColor, borderRadius: 20, ...ShadowStyle},
  map: { flex: 1 },
  centerView: { width: 10, backgroundColor: "transparent", position: 'absolute', top: "50%", left: "50%", zIndex: 100 },
});
