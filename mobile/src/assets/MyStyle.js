import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

const StyleConstant = {
  
  // primary: '#ffc300',
  primary: '#16b2bc',
  primaryLight: '#ffdb66',
  primaryDark: '#ffb901',
  secondary: '#06B995',
  dealerColor: '#663E07',
  mutedText: "#c9c9c9",
  cooldownBlue: '#386BE3',
  greyBg: '#f0f0f0',
  orange: '#f89b02',
  warning: '#f15c5b',
  green: '#5fa31c',
  dark: '#333333',

  greyBgHightlight: '#dddddd',
  greyOutline: '#c8c7cc',
  primary1: '#F4869C',
  primary2: '#6296f9',
  searchBg: '#303337',
  disabled: '#dadee0',
  white: '#ffffff',
  error: '#ff190c',
  secondary2: '#00B233',
  secondary3: '#00FF48',

  //https://mdbootstrap.com/docs/jquery/css/colors/
  success: "#00C851",
  danger: "#ff4444",
  warn: "#ffbb33",
  info: "#33b5e5",

  titleSize: 28,
}

const s = StyleConstant;

const MyTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: s.primary,
    accent: s.secondary,
    placeholder: '#dddddd',
  }
};

const ShadowStyle = {
  shadowColor: 'rgba(0,0,0,0.4)', shadowOffset: {height: 1, width: 1}, shadowOpacity: 1, shadowRadius: 1, elevation: 2
};

const TextShadowStyle = { textShadowColor: 'rgba(0,0,0,0.75)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 5 };

const ShareStyle = StyleSheet.create({
  titleTxt: { fontSize: StyleConstant.titleSize, lineHeight:StyleConstant.titleSize, color: StyleConstant.primaryText,  textAlign: 'center', textAlignVertical: 'center' 
            //fontWeight: 'bold',
  },
  btnSmall: { flexDirection: 'row', backgroundColor: StyleConstant.secondary, borderRadius: 6, justifyContent: 'center', alignSelf: 'flex-end', padding: 4 },
  btnSmallShadow: {elevation:4, shadowOffset: { width: 5, height: 5 }, shadowColor: "grey", shadowOpacity: 0.5, shadowRadius: 10},
  txtBold : {  },
  txtItalic : { },
  txtSemibold : { },
  txtRegular : { }
});

const NavOptionStyle = {
  transparent : {title: null, headerTransparent: true, backgroundColor: 'transparent', headerTintColor: 'white'},
  default: {
    headerTitleStyle: { color: StyleConstant.dark, fontSize: 16},
    headerTintColor: StyleConstant.dark,
    headerStyle: { backgroundColor: 'white' }, 
    headerBackTitle: 'Back'
  } 
};
export { StyleConstant, ShareStyle, MyTheme, ShadowStyle, TextShadowStyle, NavOptionStyle };

/*

{
  primary: '#9E9E9E',
  primary1: '#4d86f7',
  primary2: '#6296f9',
  secondary: '#8F0CE8',
  secondary2: '#00B233',
  secondary3: '#00FF48',
  grey0: '#393e42',
  grey1: '#43484d',
  grey2: '#5e6977',
  grey3: '#86939e',
  grey4: '#bdc6cf',
  grey5: '#e1e8ee',
  dkGreyBg: '#232323',
  greyOutline: '#bbb',
  searchBg: '#303337',
  disabled: '#dadee0',
  white: '#ffffff',
  error: '#ff190c',
};

  */
