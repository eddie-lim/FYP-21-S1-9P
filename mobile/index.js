import React from 'react';
import {AppRegistry, StatusBar, LogBox, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { GlobalContext } from '@helpers/Settings';
import { Provider as PaperProvider , DefaultTheme} from 'react-native-paper';
import { MyTheme, StyleConstant } from '@assets/MyStyle';
import useActivityIndicator from "@hooks/useActivityIndicator";
import useSlidingPanel from "@hooks/useSlidingPanel";
import useCustomDialog from '@hooks/useCustomDialog';
import useWatchInternetConnection from '@hooks/useWatchInternetConnection';
import { RootSiblingParent } from 'react-native-root-siblings';

LogBox.ignoreAllLogs();

const AppTheme = () => {
    const { toggleActivityIndicator, renderActivityIndicator } = useActivityIndicator();    
    const { showCustomDialog, renderCustomDialog } = useCustomDialog();
    const { renderConnectedToInternetInfo } = useWatchInternetConnection();
    const { initSlidingPanel, renderSlidingPanel } = useSlidingPanel();

    return (
        <RootSiblingParent>
            <GlobalContext.Provider value={{ toggleActivityIndicator, renderActivityIndicator, showCustomDialog, renderCustomDialog, initSlidingPanel }}>
                <PaperProvider theme={DefaultTheme}>
                    <StatusBar backgroundColor={StyleConstant.primaryColor} />
                    <Text>V2</Text>
                    <App/>
                </PaperProvider>
                { renderSlidingPanel() }
                { renderConnectedToInternetInfo() }
            </GlobalContext.Provider>
        </RootSiblingParent>
    );
};

AppRegistry.registerComponent(appName, () => AppTheme);