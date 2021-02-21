import firebase from 'react-native-firebase';
import Constants from '@helpers/Constants';
import Toast from 'react-native-root-toast';
import {Keyboard} from 'react-native';

//place functions dependent of project here
export default HelperFunctions = {
  showToast: (msg) => {
    Keyboard.dismiss();
    Toast.show(msg, { duration:Toast.durations.LONG });
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
      //console.log("\x1b[36m", d, "\x1b[0m", msg);
      console.log(d, msg);
    }
  },
  error: (msg) => {
    if (__DEV__) { // __DEV__ is React Native variable for app built in --variance--debug
      var dateFormat = require('dateformat');
      let now = new Date().toLocaleString("en-US", {timeZone: "Asia/Singapore"})
      const d = dateFormat(now, "yyyy-mm-dd HH:MM:ss");
      //console.log("\x1b[31m", d, "\x1b[0m", msg);
      console.log(d, msg);
    }
  },
};
