import React, { useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, View, Text, Dimensions, RefreshControl } from 'react-native';
import { ShadowStyle, StyleConstant, ShareStyle, TextShadowStyle } from '@assets/MyStyle';
import { SwipeListView } from 'react-native-swipe-list-view';

export default CustomSwipeListView = (id, api, data_state, renderItem, renderHiddenItem, rightValue, emptyListString, refreshing, lastPage, type) => {
    const [ page, setPage ] = useState(0);
    
    useEffect(() => {
        if(!lastPage){ call(id, api); }
        else{setPage(0);}
        console.log("id:" + id, "page :",page);
    }, [page]);

    call = async(id, api) =>{
        api(page);
        return true;
    }
    
    handleRefresh = async () => {
        setPage(0); 
        call(id, api, data_state);
    }

    render = () => {
        if(refreshing){
            return Render.renderPlaceHolder(type);
        } else if(data_state.length > 0){
            return <SwipeListView
            refreshControl={ <RefreshControl colors={[StyleConstant.primary]} tintColor={StyleConstant.primary} refreshing={refreshing} onRefresh={handleRefresh}/> }
            data={data_state} showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue = {rightValue}
            disableRightSwipe={true}
            onEndReached={()=>{setPage(page + 1);}}
            onEndReachedThreshold={0.1}
            />
        } else{ return(
            <View style={{width: '100%', height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: StyleConstant.mutedText}}>{emptyListString}</Text>
            </View>
        ); }
    }

    return [handleRefresh, render];
};


const styles = StyleSheet.create({
    listEmptyComponent: {width: '100%', height: 100, flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center'},
    placeHolder: {width: 40, borderRadius: 20, margin: 5, height: 40},
  });
  