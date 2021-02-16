import { createContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const GlobalContext = createContext({});

//Usage:
//Settings.get(Settings.DEBUG_MODE)
//Settings.store(Settings.DEBUG_MODE, true);

//ephemeral settings
class Settings {
    // user/me
    static USER_ID = 'user_id';
    static USER_EMAIL = 'user_email';
    
    static defaultSettings = [];

    //need to call init() upon app starts
    static init = async() => {
        console.log('init Settings');
        this.reset();   
    }

    static reset = () => {
        console.log('reset Settings');
        this.defaultSettings = [];
        this.defaultSettings[this.USER_ID] = "";
        this.defaultSettings[this.USER_EMAIL] = "";
        
        global.settings = this.defaultSettings;
    }    
    static store = (key, value) => {
        //console.log("setting store -> key: " + key + ", value: " + value);
        this.isValidKey(key)
        if (value == null)  { value = ""; }
        global.settings[key] = value;
    }
    static get = (key) => {
        this.isValidKey(key)
        return global.settings[key];
    }
    static isValidKey(key) {
        let valid = false;
        Object.keys(this.defaultSettings).forEach(k => {
            if (key == k) {
                valid = true;
            }
        });
        if (!valid) {
            console.log('Settings !isValidKey: ' + key);
        }
        return valid;
    }    
    static debug = () => {
        //console.log(JSON.stringify(global.settings));
        console.log("DEBUG SETTINGS", global.settings);
    }    
}

//Usage:
//const v = await StoreSettings.get(StoreSettings.FCM_TOKEN);
//await StoreSettings.store(StoreSettings.FCM_TOKEN, 'zxc-zxc-zxc-zcx');

//persistent settings
class StoreSettings {
    static IS_INITIALISE = 'is_initialise';
    static FIRST_RUN = 'first_run';
    static IS_LOGGED_IN = 'is_logged_in';
    static FCM_TOKEN = 'fcm_token';
    static ACCESS_TOKEN = 'access_token';
    
    static defaultSettings = [
        [this.IS_INITIALISE, 'true'],
        [this.FIRST_RUN, 'true'],
        [this.IS_LOGGED_IN, 'false'],
        [this.FCM_TOKEN, '-'],
        [this.ACCESS_TOKEN, '-'],
    ];

    //async storage need to call init() upon app starts
    static init = () => {        
        var promise = new Promise((resolve, reject) => {
            console.log('init StoreSettings');
            AsyncStorage.getItem(this.IS_INITIALISE).then((v) => {
                //console.log("IS_INITIALISE: " + v);
                if (v == null) {
                    return this.reset();
                }
            }).then(()=>{
                resolve("settings init ok")
            }).catch((e)=>{
                console.log(e);
                reject("settings init error")
            });
          });        
        return promise;
    }
    static reset = async() => {
        console.log('reset StoreSettings');
        try {
            var cache = [];
            await AsyncStorage.multiSet(this.defaultSettings);            
            await AsyncStorage.multiSet(cache);
            // this.debug();
            return true;
        } catch (e) {
            Utils.log(e);
            return false;
        }            
        //return a promise
    }
    static store = async (key, value) => {
        console.log('StoreSettings.store',key,value);
        this.checkIsValidKey(key);
        return AsyncStorage.setItem(key, value);
    }
    static get = (key) => {
        this.checkIsValidKey(key)
        return AsyncStorage.getItem(key);
    }
    static storeObj = async (key, obj) => {
        str = JSON.stringify(obj);
        return this.store(key, str)        
    }
    static addObj = async (key, obj) => {
        //console.log('StoreSettings.addObj', key, obj);
        var promise = new Promise((resolve, reject) => {            
            this.getObj(key).then((res)=>{
                //console.log(">>>>>>", res)
                if (res == null) {
                    resolve(this.storeObj(key, [obj]));
                } else {
                    res.push(obj);
                    resolve(this.storeObj(key, res));
                }
            }).catch((e)=>{
                reject(e)
            });
            
        });
        return promise;
    }
    static getObj = async (key) => {
        var promise = new Promise((resolve, reject) => {
            this.get(key).then((res)=>{
                resolve(JSON.parse(res));
            }).catch((e)=>{
                console.error(e);
                reject(e);
            });
        });
        return promise;
    }
    static removeObj = async (key, obj) => {
        var promise = new Promise((resolve, reject) => {
            this.getObj(key).then((res)=>{
                if (res == null) {
                    resolve();
                } else {
                    var index = res.map((el) => { return el.id}).indexOf(obj.id);
                    if (index > -1) {
                        res.splice(index, 1);
                    }
                    resolve(this.storeObj(key, res));
                }
            }).catch((e)=>{
                console.error(e);
                reject(e);
            });
        });
        return promise;
        
    }    
    static checkIsValidKey(key) {
        let valid = false;
        this.defaultSettings.forEach(arr => {
            if (key == arr[0]) {
                valid = true;
            }
        });
        if (!valid) {
            console.error('StoreSettings !checkIsValidKey: ' + key);
            throw new Error('Invalid key');
        }
        return valid;
    }
    static clear = async() => {
        return AsyncStorage.clear();
    }
    static debug = () => {
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                console.log("AsyncStorage.getAllKeys", JSON.stringify(stores));
            });
        });
    }
}


export { Settings, StoreSettings, GlobalContext };