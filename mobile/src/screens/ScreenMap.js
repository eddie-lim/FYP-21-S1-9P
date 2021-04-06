import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Pressable, Text } from 'react-native';
import { StyleConstant, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import Environment from '@helpers/Environment';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as turf from '@turf/turf';

import icon_map_marker from '@assets/img/icon_map_marker.png';
import { GlobalContext } from '@helpers/Settings';
import { toUpper } from 'lodash';

const ScreenMap = (props) => {
  const { showCustomDialog } = useContext(GlobalContext);

  const mapViewRef = useRef(null);
  const cameraRef = useRef(null);
  const userLocationRef = useRef(null);

  const [followMap, setFollowMap] = useState(true);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const icons = { icon_map_marker: icon_map_marker }
  const [firstSourceGeoJson, setFirstSourceGeoJson] = useState({
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "block a",
          "type": "icon",
          "description": "Student Learning Centre\nStudent Lounge\nStudent Gym\nComputer Labs\nLecture Theatres\nOpen Study Areas\n"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            103.77657383680344,
            1.329615268618031
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "block b",
          "type": "icon",
          "description": "Computer Labs\nLecture Theatres\nOpen Study Areas\nStudent Activity Hub\nStudent Involvement Centre\n"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            103.77642631530762,
            1.3293310309979476
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "block c",
          "type": "icon",
          "description": "Computer Labs\nStudent Wellness Centre\nSeminar Rooms\nFinancial Training Centre\n"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            103.77594619989395,
            1.3290709267320269
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "block d",
          "type": "icon",
          "description": "Multi-Purpose Sports Hall\nPerforming Arts Theatre\nDance Studio\n"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            103.77623587846756,
            1.328596303413303
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "library",
          "type": "icon",
          "description": "The Library is located at Block A, Level 1."
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            103.77592742443085,
            1.3299155951244523
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "food court",
          "type": "icon",
          "description": ""
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            103.77575308084488,
            1.3296206315916785
          ]
        }
      }
    ]
  });

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

  handleShapeSourceOnPress = (e) => {
    // console.log("handleShapeSourceOnPress", e);
    var properties = e.features[0].properties;
    var name = properties.name
    var description = properties.description

    renderTooltipBody = () =>{
      return(
        <View style={{marginHorizontal: 5}}>
          <Text style={{color:"black", textAlign:'center'}}>{description}</Text>
        </View>
      );
    }
    showCustomDialog({title:toUpper(name), body:renderTooltipBody, hasCancelButton:true})
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapboxGL.MapView ref={mapViewRef} style={styles.map} onDidFinishRenderingMapFully={handleOnDidFinishRenderingMapFully}>

            <MapboxGL.Camera ref={cameraRef} zoomLevel={18} minZoomLevel={9} maxZoomLevel={19} />

            {/* user location */}
            <MapboxGL.UserLocation ref={userLocationRef} visible={true} showsUserHeadingIndicator={true} onUpdate={handleOnUserLocationUpdate} />
            
            <MapboxGL.Images images={icons} />

            <MapboxGL.ShapeSource id="first-source" shape={firstSourceGeoJson} onPress={handleShapeSourceOnPress}>
              <MapboxGL.SymbolLayer id="icon-layer" style={styles.icon} filter={['==', "type", "icon"] } />
            </MapboxGL.ShapeSource>

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

const commonIcon = { iconImage: icon_map_marker, iconSize: 0.4, iconAnchor: "center" };
const styles = {
  container: { flex: 1 },
  locationBtn: {width: 40, height: 40, position:'absolute', alignItems:'center', justifyContent: 'center', top: -45, right: 10, backgroundColor: StyleConstant.primaryColor, borderRadius: 20, ...ShadowStyle},
  map: { flex: 1 },
  icon: { ...commonIcon, iconAllowOverlap: true },
};
