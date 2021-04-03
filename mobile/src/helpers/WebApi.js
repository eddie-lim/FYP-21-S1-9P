import Environment from '@helpers/Environment';
import Constants from '@helpers/Constants';
import { Settings, StoreSettings } from '@helpers/Settings';
import axios from 'axios';

const POST_METHOD = 'POST';
const GET_METHOD = 'GET';
const PATCH_METHOD = 'PATCH';

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
//ref: https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
axios.interceptors.request.use(config => {
  // console.log("axios.request", config)
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(async (response) => {
    return response;
  }, error => {
    return Promise.reject(error);
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
  if(method == PATCH_METHOD){
    headers['Content-Type'] = 'application/json';
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
    return callApi(POST_METHOD, '/v1/site/register', data);
  },
  authorise: async(email, password) => {
    var data = { "email": email, "password": password }
    return callApi(POST_METHOD, '/v1/site/authorize', data);
  },
  accessToken: async(authorization_code) => {
    var data = { "authorization_code": authorization_code }
    return callApi(POST_METHOD, '/v1/site/access-token', data);
  },
  logout: async() => {
    return callApi(GET_METHOD, '/site/logout');
  },

  // LISTING
  listCourses: async(page, filter) => {
    return callApi(GET_METHOD, '/courses?page='+page+filter);
  },
  listEvents: async(page, filter) => {
    console.log("listEvents", '/events?page='+page+filter)
    return callApi(GET_METHOD, '/events?page='+page+filter);
  },
  listFaq: async(page) => {
    return callApi(GET_METHOD, '/faq?page='+page);
  },
  listUniversityPartners: async(page) => {
    return callApi(GET_METHOD, '/university-partners?page='+page);
  },

  // GET INDIVIDUAL
  getCourse: async(id) => {
    return callApi(GET_METHOD, '/courses/'+id);
  },
  getEvent: async(id) => {
    return callApi(GET_METHOD, '/events/'+id);
  },
  getFaq: async(id) => {
    return callApi(GET_METHOD, '/faq/'+id);
  },
  getUniversityPartner: async(id) => {
    return callApi(GET_METHOD, '/university-partners/'+id);
  },
  getFeaturedItems: async() => {
    return callApi(GET_METHOD, '/v1/site/get-featured-items');
  },
  getProfile: async() => {
    return callApi(GET_METHOD, '/user?expand=userProfile');
  },

  // Filter Values
  getCourseFilterValues: async() => {
    return callApi(GET_METHOD, '/courses/filter-values');
  },
  getEventFilterValues: async() => {
    return callApi(GET_METHOD, '/events/filter-values');
  },


  postEnquiries: async(school_id, enquiry) => {
    return callApi(POST_METHOD, '/enquiries');
  },
  patchProfile: async(data) => {
    const profile = Settings.get(Settings.USER_PROFILE);
    var user_id = profile.id;
    return callApi(PATCH_METHOD, '/user/'+user_id, data);
  },
};

export default WebApi;
