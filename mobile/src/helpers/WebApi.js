import Environment from '@helpers/Environment';
import Constants from '@helpers/Constants';
import { Settings, StoreSettings } from '@helpers/Settings';
import axios from 'axios';

const POST_METHOD = 'POST';
const GET_METHOD = 'GET';

const STATUS_OK = 200;
const STATUS_BAD_REQUEST = 400;
const STATUS_UNAUTHORIZED = 401;
const STATUS_FORBIDDEN = 403;    
//const STATUS_DATA_VALIDATION_FAILED = 422;
const STATUS_UNPROCESSABLE_ENTITY = 422;

/*
//response format
{
    "status": 200,
    "text": "OK",
    "data": {
        "authorization_code": "5b936156796b42a9e9564d6b61e8eae99c4b640729ae5982f97ab65defd49add",
        "expires_at": 1559740415
    }
}
*/
console.log("SETUP WEB API");
//ref: https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
axios.interceptors.request.use(config => {
  console.log('Request sent', config);
  return config;
}, error => {
  console.log('Request error', error);
  return Promise.reject(error);
});


axios.interceptors.response.use(async (response) => {
  console.log('Response received', response.data);

  //note: do force logout logic here.
  /*
  if (reponse.data.status == WebApi.STATUS_UNAUTHORIZED) {    
    
  }
  */

  return response.data;
},
/**/
error => {
  //todo: show generic error dialog for catch all?
  console.log('Response error', error.response.data);
  return Promise.reject(error.response.data);
}

);

callApi = async(method, endpoint, data, isMultipart = false) => {
  // const lang = await StoreSettings.get(StoreSettings.USER_LANGUAGE);
  // const url = endpoint.includes("?") ? Environment.API_URL + endpoint + "&locale=" + lang : Environment.API_URL + endpoint + "?locale=" + lang;
  const url = Environment.API_URL + endpoint;
  const token = await StoreSettings.get(StoreSettings.ACCESS_TOKEN);
  const headers = { 'Authorization': "Bearer " + token } 
  let formData = JSON.stringify(data);
  if (isMultipart) {
    headers['Content-Type'] = 'multipart/form-data';
    formData = data;
  }
  
  const config = {
    method: method,
    url: url,
    headers: headers,
    data: formData
  }

  return axios(config);
}

const WebApi = {
  STATUS_OK: 200,
  STATUS_BAD_REQUEST: 400,
  STATUS_UNAUTHORIZED: 401,
  STATUS_FORBIDDEN: 403,
  STATUS_UNPROCESSABLE_ENTITY: 422,
  
  register: async(firstname, lastname, email, password, password_confirm) => {
    var data = {"firstname":firstname, "lastname":lastname, "password":password, "password_confirm":password_confirm, "email":email};
    return callApi(POST_METHOD, '/user/register', data);
  },
  authorise: async(email, password) => {
    var data = { "email": email, "password": password }
    return callApi(POST_METHOD, '/user/authorize', data);
  },
  accessToken: async(authorization_code) => {
    var data = { "authorization_code": authorization_code }
    return callApi(POST_METHOD, '/user/access-token', data);
  },
  logout: async() => {
    return callApi(GET_METHOD, '/user/logout');
  },
  me: async() => {
    return callApi(GET_METHOD, '/user/me');
  },

  // LISTING
  listCourses: async(page) => {
    return callApi(GET_METHOD, '/site/list-courses?page='+page);
  },
  listEvents: async(page) => {
    return callApi(GET_METHOD, '/site/list-events?page='+page);
  },
  listFaq: async(page) => {
    return callApi(GET_METHOD, '/site/list-faq?page='+page);
  },
  listUniversityPartners: async(page) => {
    return callApi(GET_METHOD, '/site/list-university-partners?page='+page);
  },

  // GET INDIVIDUAL
  getCourse: async(id) => {
    return callApi(GET_METHOD, '/site/get-course?page='+id);
  },
  getEvent: async(id) => {
    return callApi(GET_METHOD, '/site/get-event?page='+id);
  },
  getFaq: async(id) => {
    return callApi(GET_METHOD, '/site/get-faq?page='+id);
  },
  getUniversityPartners: async(id) => {
    return callApi(GET_METHOD, '/site/get-university-partner?page='+id);
  },
  getFeaturedItems: async() => {
    return callApi(GET_METHOD, '/site/get-featured-items');
  },
};

export default WebApi;
