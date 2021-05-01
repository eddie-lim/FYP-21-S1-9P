import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Pressable, Text, Image, Linking } from 'react-native';
import { StyleConstant, ShadowStyle } from '@assets/MyStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { withScreenBase, ScreenBaseType } from '@screens/withScreenBase';
import Environment from '@helpers/Environment';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as turf from '@turf/turf';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

import icon_map_marker from '@assets/img/icon_map_marker.png';
import { GlobalContext } from '@helpers/Settings';
import { toUpper } from 'lodash';

const ScreenMap = (props) => {
  const { navigate } = useNavigation();
  const { showCustomDialog, toggleActivityIndicator } = useContext(GlobalContext);

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
            103.7767106294632,
            1.3295321425249813
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
            103.77655506134033,
            1.3292103640738702
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
            103.7764048576355,
            1.3288939485560516
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
            103.77625465393066,
            1.3285828959735992
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
            103.77590596675873,
            1.329929002556917
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
      },
      {
        "type": "Feature",
        "properties": {
          "type": "school_zone"
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              103.77542853355408,
              1.3308031669967546
            ],
            [
              103.77550899982452,
              1.3307602632277906
            ],
            [
              103.7756860256195,
              1.3306476408307342
            ],
            [
              103.77591669559479,
              1.3304813887113631
            ],
            [
              103.77615809440613,
              1.3302936846921731
            ],
            [
              103.77634584903717,
              1.330181062273807
            ],
            [
              103.7766569852829,
              1.330030899041321
            ],
            [
              103.7777191400528,
              1.3295160536034283
            ],
            [
              103.77744019031525,
              1.3288939485560516
            ],
            [
              103.77638876438141,
              1.3275263894960134
            ],
            [
              103.77602398395538,
              1.3269954545982272
            ],
            [
              103.77580940723419,
              1.3271670699311868
            ],
            [
              103.77555191516876,
              1.3276282860795237
            ],
            [
              103.7754875421524,
              1.327923249850203
            ],
            [
              103.77531588077544,
              1.328282569305097
            ],
            [
              103.77493500709534,
              1.3288939485560516
            ],
            [
              103.7752890586853,
              1.3297734763357967
            ],
            [
              103.77536416053772,
              1.3303580403575084
            ],
            [
              103.77539634704588,
              1.3305403814001626
            ],
            [
              103.77542853355408,
              1.3308031669967546
            ]
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
    toggleActivityIndicator(false)
    handleOnPressMyLocation()
  }

  handleOnUserLocationUpdate = (e) =>{
  }

  handleOnPressMyLocation = (e) =>{
    cameraRef.current.setCamera({
      centerCoordinate: [103.7763077630, 1.329329329],
      zoomLevel: 16.5,
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
        <MapboxGL.MapView ref={mapViewRef} style={styles.map} onWillStartRenderingMap={()=>{ toggleActivityIndicator(true, "Setting Up Map...") }} onDidFinishRenderingMapFully={handleOnDidFinishRenderingMapFully}>

            <MapboxGL.RasterSource id="onemap-source" tileSize={256} url={"https://maps-a.onemap.sg/v3/Original_HD/{z}/{x}/{y}.png"} >
                <MapboxGL.BackgroundLayer id="bg-layer" style={styles.background} />
                <MapboxGL.RasterLayer id="onemap-layer" sourceLayerID='onemap-source' />
            </MapboxGL.RasterSource>
            <MapboxGL.Camera ref={cameraRef} zoomLevel={16} minZoomLevel={10} maxZoomLevel={18} />

            {/* user location */}
            <MapboxGL.UserLocation ref={userLocationRef} visible={true} showsUserHeadingIndicator={true} onUpdate={handleOnUserLocationUpdate} />
            
            <MapboxGL.Images images={icons} />

            <MapboxGL.ShapeSource id="first-source" shape={firstSourceGeoJson} onPress={handleShapeSourceOnPress}>
              <MapboxGL.SymbolLayer id="icon-layer" style={styles.icon} filter={['==', "type", "icon"] } />
            </MapboxGL.ShapeSource>

            <MapboxGL.ShapeSource id="second-source" shape={firstSourceGeoJson} >
              <MapboxGL.LineLayer id="school-zone-layer" style={styles.polylineStyle} filter={['==', "type", "school_zone"] } />
            </MapboxGL.ShapeSource>

        </MapboxGL.MapView>

        <View style={{position: 'absolute', paddingLeft: 10, paddingRight: 10, left: 120, borderRadius: 10, bottom: 5, flexDirection: 'row', backgroundColor: 'white'}}>
          <Image style={{width: 16, height: 16}} source={{uri:'https://www.onemap.gov.sg/docs/maps/images/new-onemap-logo_150x150.png'}} />
          <Text style={{marginLeft: 5, color: StyleConstant.primaryColor}} onPress={()=>{Linking.openURL("https://www.onemap.sg/home/")}}>OneMap</Text>
        </View>

        <View style={{width: '100%', position: 'absolute', bottom:80, right:5}}>
          <Pressable onPress={()=>{navigate("screenWebview", {url:'https://www.simge.edu.sg/discover-sim-ge/modern-learning-spaces/', source:"screenMap", headerName:"Modern Learning Spaces"})}} style={styles.locationBtn}>
            <Icon name={'format-list-bulleted-square'} size={30} style={Platform.OS == 'android' || {width: 30, height: 30}} color={'white'}/>
          </Pressable>
        </View>
        <View style={{width: '100%', position: 'absolute', bottom:20, right:5}}>
          <Pressable onPress={handleOnPressMyLocation} style={styles.locationBtn}>
            <Icon name={'domain'} size={30} style={Platform.OS == 'android' || {width: 30, height: 30}} color={'white'}/>
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
  locationBtn: {width: 50, height: 50, position:'absolute', alignItems:'center', justifyContent: 'center', top: -45, right: 10, backgroundColor: StyleConstant.primaryColor, borderRadius: 25, ...ShadowStyle},
  map: { flex: 1 },
  icon: { ...commonIcon, iconAllowOverlap: true },
  polylineStyle: { lineColor:StyleConstant.primaryColor, lineWidth:2 }
};
