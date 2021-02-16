import React, { useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, View, Text, Dimensions, RefreshControl } from 'react-native';
import { ShadowStyle, StyleConstant, ShareStyle, TextShadowStyle } from '@assets/MyStyle';
import Render from '@helpers/Render';

export default MyCustomFlatList = (id, api, data_state, renderItem, emptyListString, refreshing, lastPage, type) => {
    const [ page, setPage ] = useState(0);

    useEffect(() => {
        if(!lastPage){ call(id, api); }
        else{setPage(0);}
        console.log("id:" + id, "page :",page);
    }, [page]);

    const call = async(id, api) =>{
        let res = null;
        //calls the api passed in from the individual screen
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
        } else{
            return <FlatList
            ListEmptyComponent={
                <View style={{flex: 1, height: 400, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: StyleConstant.mutedText}}>{emptyListString}</Text>
                </View>
            }
            refreshControl={ <RefreshControl colors={[StyleConstant.primary]} tintColor={StyleConstant.primary} refreshing={refreshing} onRefresh={handleRefresh}/> }
            data={data_state} showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={()=>{setPage(page+ 1);}}
            onEndReachedThreshold={0.1}
            extraData={(item)=> item.selected}
            />
        }
    }

    return [handleRefresh, render];
};


const styles = StyleSheet.create({
    listEmptyComponent: {width: '100%', height: 100, flex: 1, alignItems: 'center', justifyContent: 'center',alignSelf: 'center'},
    placeHolder: {width: 40, borderRadius: 20, margin: 5, height: 40},  
    row: { flex: 1, justifyContent: "space-between" },
});
  