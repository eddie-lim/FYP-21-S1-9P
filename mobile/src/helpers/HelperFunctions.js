import firebase from 'react-native-firebase';
import Constants from '@helpers/Constants';
import Toast from 'react-native-root-toast';
import {Keyboard} from 'react-native';
import { isEmpty, trim } from 'lodash';

//place functions dependent of project here
export default HelperFunctions = {
  showToast: (msg) => {
    Keyboard.dismiss();
    if (!isEmpty(trim(msg))) {
      Toast.show(msg, { duration:Toast.durations.LONG });
    }
  },
  showNotification: (notification) => {
    const notif = new firebase.notifications.Notification()
    .android.setChannelId(Constants.CHANNELID)
    .setNotificationId(notification.notificationId)
    .setTitle(notification.title)
    .setBody(notification.body);
    firebase.notifications().displayNotification(notif)
  },
  log: (msg) => {
    if (__DEV__) { // __DEV__ is React Native variable for app built in --variance--debug
      var dateFormat = require('dateformat');
      let now = new Date().toLocaleString("en-US", {timeZone: "Asia/Singapore"})
      const d = dateFormat(now, "yyyy-mm-dd HH:MM:ss");
    }
  },
  error: (msg) => {
    if (__DEV__) { // __DEV__ is React Native variable for app built in --variance--debug
      var dateFormat = require('dateformat');
      let now = new Date().toLocaleString("en-US", {timeZone: "Asia/Singapore"})
      const d = dateFormat(now, "yyyy-mm-dd HH:MM:ss");
    }
  },
};

