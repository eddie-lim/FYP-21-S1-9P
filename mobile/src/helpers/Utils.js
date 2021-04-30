import moment from 'moment';

//place functions independent of project here
export default Utils = {
  reformHyperlink: (link) => {
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      link = "http://" + link;
    }
    return link
  },
  truncate: (str, max) => {
    if (str) {
        return str.length > max ? str.substr(0, max - 1) + '...' : str;
    }
    return "";
  },
  uuid: () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  },
  generate_token: (len) => {
    // not true random. to use purely for non-security stuff
    var str = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < len; i++ ) {
      str += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return str;
  },
  timestamp: () => {
    return Math.round(new Date().getTime() / 1000);
  },
  timestampToCalendarDate: (timestamp) =>{
    let d = new Date(timestamp * 1000);
    d = moment(d).format("DD/MM/YYYY");
    return d;
  },
  timestampToCalendarTime: (timestamp) =>{
    let d = new Date(timestamp * 1000);
    d = moment(d).format("HH:mm");
    return d;
  },
  timestampToCalendarDateTime: (timestamp) =>{
    let d = new Date(timestamp * 1000);
    d = moment(d).format("DD/MM/YYYY HH:mm");
    return d;
  },
  timestampToCalendarTime12Hrs: (timestamp) =>{
    let d = new Date(timestamp  * 1000);
    d = moment(d).format("DD/MM/YYYY hh:mm A");
    return d;
  },
  timestampToTimeDifference: (date) => {
    var d = moment(date, "YYYYMMDD").fromNow();
    //{moment(new Date(item.created_at * 1000)).format("D MMMM")}
    return d;
  },
  timestampToDaysRemaining: (date) => {
    var now = moment().startOf('day');
    var end = moment(date).startOf('day');
    var d = end.diff(now, 'days');
    return d;
  },
  round: (value, decimals) => {
    decimals = typeof decimals !== 'undefined' ? decimals : 15;
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  },
  isset: (obj) => {
    return (typeof obj !== "undefined");
  },
  timeSince: (date) => {
    var seconds = Math.floor((new Date()/1000 - date) );
    var interval = Math.floor(seconds / 31536000);
  
    if (interval >= 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hrs";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " mins";
    }
    return Math.floor(seconds) + " sec";
  },
  isEmail: (email) => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  },
  testPasswordStrength: (pw) => {
    var regex = /^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])\S*$/;
    return regex.test(pw);
  },
  bytesToGigabytes: (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 0;
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if(sizes[i] == 'GB'){
      return Math.round(bytes / Math.pow(1024, i), 2);
    } else {
      return 0;
    }
  },
  roundUpGigabyteToPowersOfTwo: (gb) => {
    p = 0;
    r = 0;
    do {
      p += 1;
      r = Math.pow(2,p);
    } while (r < gb);
    return r;
  }
};

