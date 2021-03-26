import React, { useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, View, Text, Dimensions } from 'react-native';
import WebApi from '@helpers/WebApi';
import { ShadowStyle, StyleConstant, ShareStyle, TextShadowStyle } from '@assets/MyStyle';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade, ShineOverlay} from "rn-placeholder";

export default CustomHorizontalFlatList = (id, api, data_state, renderItem, emptyListType='user', params=[]) => {

    //const { data, setData, refreshing, handleLoadMore, handleRefresh, renderSeparator, renderFooter } = useCustomFlatListFunc(dataUrl);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        //will call twice if use with <NavigationEvents onWillFocus={()=>{refreshInbox()}} />
        //call(id, api, data_state);
        return function cleanup() {}
    }, []);

    call = async(id, api, data_state, params) =>{

        const [ data, setData ] = data_state;
        let res = null;
        try {
            if (params.length > 0){
                res = await api(...params);
            } else { 
                res = await api(); 
            }
            setData(res.data);
            setLoading(false);
            return true;

        } catch(e) {
            if (e.status == WebApi.STATUS_UNPROCESSABLE_ENTITY) {
                const err = e.data[0].message;
                Utils.showToast(err);
              } else {
                Utils.showToast("Unexpected error occured");
              }
            setLoading(false);

        }
        
    }
    
    handleRefresh = async () => {
        return call(id, api, data_state, params);
    }

    renderInside = ()=>{
        if(loading){
            return(
                <View style={{flexDirection: 'row'}}>
                    <Placeholder Animation={ShineOverlay}>
                        <PlaceholderMedia style={styles.card}/>
                        <PlaceholderLine width={70} style={{margin: 5}}/>
                        <PlaceholderLine width={40} style={{margin: 5}}/>
                    </Placeholder>

                    <Placeholder Animation={ShineOverlay}>
                        <PlaceholderMedia style={styles.card}/>
                        <PlaceholderLine width={100} style={{margin: 5}}/>
                        <PlaceholderLine width={50} style={{margin: 5}}/>
                    </Placeholder>
                </View>
            );
        } else {
            return(
                <View style={styles.listEmptyComponent}>
                    <Text style={{alignSelf: 'center', color: "#cccccc"}}>{emptyListType == Constants.EMPTY_LIST_TYPE_COMPANY ? 'There is no plan available.' : 'There is no active plan at the moment.'}</Text>
                </View>
            );
        }
    }

    render = () => {
        //key={id}
            return <FlatList
                    contentContainerStyle={[ { flexGrow: 1 } , data_state[0].length == null? null : { justifyContent: 'flex-start'} ]}
                    ListEmptyComponent={renderInside()}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    snapToAlignment={"start"}
                    decelerationRate={"fast"}
                    snapToInterval={(Dimensions.get('window').width)/2 + 10}
                    bounces={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={data_state[0]}
                    renderItem={renderItem}
                />
    }

    return [handleRefresh, render];
};


const styles = StyleSheet.create({
    listEmptyComponent: {width: '100%', height: 100, flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center'},
    card: {backgroundColor: StyleConstant.greyBg, width: (Dimensions.get('window').width)/2, height: (Dimensions.get('window').width)/4, margin: 5, borderRadius: 10},
  });
  