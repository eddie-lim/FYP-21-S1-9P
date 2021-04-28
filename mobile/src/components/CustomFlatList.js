import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, RefreshControl } from 'react-native';
import { StyleConstant } from '@assets/MyStyle';
import { Placeholder, PlaceholderMedia, PlaceholderLine, ShineOverlay } from "rn-placeholder";

export default CustomFlatList = (callApi, data_state, renderItem, emptyListString, refreshing, lastPage, numCol = 1, reference, type, flatlistHeight=400) => {
    const [ page, setPage ] = useState(1);

    useEffect(() => {
        console.log("callApi page", page)
        if(!lastPage){ callApi(page); }
    }, [page]);
    
    handleRefresh = async () => {
        setPage(1); 
        callApi(1);
    }

    render = () => {
        if(refreshing && page == 1){
            return (
                <View style={{marginLeft:15, marginRight:15, marginTop:15, width:'100%'}}>
                    <Placeholder
                    Animation={ShineOverlay}
                    Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={50} />
                        <PlaceholderLine width={20} />
                    </Placeholder>

                    <View style={styles.greySeperator}/>

                    <Placeholder
                    Animation={ShineOverlay}
                    Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={50} />
                        <PlaceholderLine width={20} />
                    </Placeholder>

                    <View style={styles.greySeperator}/>

                    <Placeholder
                    Animation={ShineOverlay}
                    Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={50} />
                        <PlaceholderLine width={20} />
                    </Placeholder>

                    <View style={styles.greySeperator}/>

                    <Placeholder
                    Animation={ShineOverlay}
                    Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={50} />
                        <PlaceholderLine width={20} />
                    </Placeholder>
                    
                    <View style={styles.greySeperator}/>

                    <Placeholder
                    Animation={ShineOverlay}
                    Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={50} />
                        <PlaceholderLine width={20} />
                    </Placeholder>
                    
                    <View style={styles.greySeperator}/>

                    <Placeholder
                    Animation={ShineOverlay}
                    Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={50} />
                        <PlaceholderLine width={20} />
                    </Placeholder>
                    
                    <View style={styles.greySeperator}/>

                    <Placeholder
                    Animation={ShineOverlay}
                    Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={50} />
                        <PlaceholderLine width={20} />
                    </Placeholder>
                </View>
            )
        } else{
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
        }
    }

    return [handleRefresh, render];
};

const styles = StyleSheet.create({
    listEmptyComponent: {width: '100%', height: 100, flex: 1, alignItems: 'center', justifyContent: 'center',alignSelf: 'center'},
    placeHolder: {width: 40, borderRadius: 20, margin: 5, height: 40},  
    row: { flex: 1, justifyContent: "space-between" },
    greySeperator: {width: '90%', height: 1, backgroundColor: StyleConstant.bgGray, marginTop: 10, marginBottom: 10},
});
  