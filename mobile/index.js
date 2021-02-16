import React from 'react';
import {AppRegistry, StatusBar, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { GlobalContext } from '@helpers/Settings';
import { Provider as PaperProvider } from 'react-native-paper';
import { MyTheme } from '@assets/MyStyle';
import useActivityIndicator from "@hooks/useActivityIndicator";
import useCustomDialog from '@hooks/useCustomDialog';
import useWatchInternetConnection from '@hooks/useWatchInternetConnection';
import { RootSiblingParent } from 'react-native-root-siblings';

LogBox.ignoreAllLogs();

const AppTheme = () => {
    const { toggleActivityIndicator, renderActivityIndicator } = useActivityIndicator();    
    const { showCustomDialog, renderCustomDialog } = useCustomDialog();
    const { renderConnectedToInternetInfo } = useWatchInternetConnection();
    

    return (
        <RootSiblingParent>
            <GlobalContext.Provider value={{ toggleActivityIndicator, renderActivityIndicator, showCustomDialog, renderCustomDialog, renderConnectedToInternetInfo }}>
                <PaperProvider theme={MyTheme}>
                    <StatusBar backgroundColor="#074d21" barStyle="light-content"/>
                    <App/>
                </PaperProvider>
                { renderConnectedToInternetInfo() }
            </GlobalContext.Provider>
        </RootSiblingParent>
    );
};

AppRegistry.registerComponent(appName, () => AppTheme);