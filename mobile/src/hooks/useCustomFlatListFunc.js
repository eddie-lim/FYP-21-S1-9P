import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import WebApi from '@helpers/WebApi';
import Utils from '@helpers/Utils';
import { Settings, StoreSettings } from '@helpers/Settings';

export default useCustomFlatListFunc = (dataUrl, callback=null, result, seperator=true) => { 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(true);
    const [page, setPage] = useState(0);
    const [error, setError] = useState(null);
    const [isLastPage, setIsLastPage] = useState(false);
    const result_query = dataUrl.indexOf('&result=') > -1 ? "" : '&result=' + result;
    const url = dataUrl.indexOf('?&') > -1 ? dataUrl + '&page=' + page + result_query : dataUrl + '?&page=' + page + result_query;
    const haveSeperator = seperator;
    
    useEffect(() => {
        // Utils.log("isLastPage? ",isLastPage);
        if(!isLastPage){
            makeRemoteRequest();
        }
    }, [page]);    

    makeRemoteRequest = async() => {
        // Utils.log('makeRemoteRequest: ' + url);
        setLoading(true);
        const token = await StoreSettings.get(StoreSettings.ACCESS_TOKEN);
        
        var config = {
          method: WebApi.GET_METHOD,
          headers: {
            'Authorization': "Bearer " + token
          }
        }
        Utils.log(url);
        fetch(url, config)
        .then((res)=>res.json())
        .then((resJson)=>{
            if(resJson.status == WebApi.STATUS_OK){
                if(resJson.data.length < result){
                    setIsLastPage(true);
                    setPage(0)
                } 
                const d =  (page === 1) ? resJson.data : [...data, ...resJson.data];
                Utils.log(resJson);
                setData(d);
                if (callback) { setTimeout(callback,1000); }
            
            } else{
                // Utils.showToast("Unable to load data")
            }
        })
        .catch(err => {
            setError(err)
            //Utils.log(err);
        })
        .finally(()=>{
            setLoading(false);
            setRefreshing(false);
        });
    };
    handleRefresh = () => {
        setPage(0)
        setIsLastPage(false);
        setRefreshing(true);
        this.makeRemoteRequest();
    };
    renderSeparator = () => { 
        if(haveSeperator){
            return ( <View style={styles.separator}/> );
        } else{ return null; } 
    };
    renderFooter = () => {
        if (refreshing || !loading) return null;
        return ( <View style={styles.bottomSeparator}><ActivityIndicator /></View> );
    };
    renderItemDefault = ({item}) => { return (<Text>{Math.random()}</Text>); };
    handleLoadMore = () => { setPage(page + 1); };

    return {
        page, data, setData, refreshing, handleLoadMore, handleRefresh, renderSeparator, renderFooter
    }
}

const styles = StyleSheet.create({
    separator: {
      height: 1,
      width: "100%",
      backgroundColor: "#CED0CE",
      //marginLeft: "14%"
    }, 
    bottomSeparator: {
      paddingVertical: 20,
      borderTopWidth: 1,
      borderColor: "#CED0CE"
    }, 
});
