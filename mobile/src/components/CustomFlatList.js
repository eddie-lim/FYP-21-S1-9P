import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, RefreshControl } from 'react-native';
import { StyleConstant } from '@assets/MyStyle';

export default CustomFlatList = (callApi, data_state, renderItem, emptyListString, refreshing, lastPage, numCol = 1, reference, type, flatlistHeight=400) => {
    const [ page, setPage ] = useState(1);

    useEffect(() => {
        if(!lastPage){ callApi(); }
    }, [page]);
    
    handleRefresh = async () => {
        setPage(1); 
        callApi(1);
    }

    render = () => {
        // if(refreshing){
        //     return Render.renderPlaceHolder(type);
        // } else{
            return <FlatList
            ListEmptyComponent={
                <View style={{flex: 1, height: flatlistHeight, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: StyleConstant.mutedTextColor}}>{emptyListString}</Text>
                </View>
            }
            refreshControl={ <RefreshControl colors={[StyleConstant.primaryColor]} tintColor={StyleConstant.primaryColor} refreshing={refreshing} onRefresh={handleRefresh}/> }
            data={data_state} showsVerticalScrollIndicator={false}
            ref={reference.current}
            renderItem={renderItem}
            numColumns={numCol}
            columnWrapperStyle = {numCol == 2 ? styles.row : null}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={()=>{setPage(page+ 1);}}
            onEndReachedThreshold={0.1}
            extraData={(item)=> item.selected}
            />
        // }
    }

    return [handleRefresh, render];
};

const styles = StyleSheet.create({
    listEmptyComponent: {width: '100%', height: 100, flex: 1, alignItems: 'center', justifyContent: 'center',alignSelf: 'center'},
    placeHolder: {width: 40, borderRadius: 20, margin: 5, height: 40},  
    row: { flex: 1, justifyContent: "space-between" },
});
  