import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import ScreenAppLoading from '@screens/ScreenAppLoading';

//##############################################

// const MainStack = createStackNavigator({
//   main: ScreenMain,
//   settings: ScreenSettings,
// }, { initialRouteName: 'main'});


//##############################################

const RootSwitch = createSwitchNavigator({
  appLoading: ScreenAppLoading,
  // mainStack: MainStack,
}, { initialRouteName: 'appLoading' });

export default createAppContainer(RootSwitch);