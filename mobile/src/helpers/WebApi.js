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
  const lang = await StoreSettings.get(StoreSettings.USER_LANGUAGE);
  const url = endpoint.includes("?") ? Environment.API_URL + endpoint + "&locale=" + lang : Environment.API_URL + endpoint + "?locale=" + lang;
  // const url = Environment.API_URL + endpoint;
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
  
  geoIp: async() => {
    return callApi(GET_METHOD, '/utils/geo-ip');
  },
  getTermsUrl: async(region_id) => {
    return callApi(GET_METHOD, '/terms?region_id=' + region_id);
  },
  getWhatsappBusinessUrl: async(region_id) => {
    return callApi(GET_METHOD, '/whatsapp-business?region_id=' + region_id);
  },
  getOtp: async(region_id, mobile_calling_code, mobile_number, mobile_number_full) => {
    var data = {  "region_id":region_id, "mobile_calling_code":mobile_calling_code, "mobile_number":mobile_number, "mobile_number_full": mobile_number_full }
    return callApi(POST_METHOD, '/user/get-otp', data);
  },
  verifyOtp: async(mobile_number_full, token) => {
    var data = { "mobile_number_full":mobile_number_full, "token":token }
    return callApi(POST_METHOD, '/user/verify-otp', data);
  },
  resendVerifyEmail: async() => {
    return callApi(GET_METHOD, '/user/resend-verify-email');
  },
  accessToken: async(code) => {
    var data = { "authorization_code": code }
    return callApi(POST_METHOD, '/user/access-token', data);
  },
  registerFcmToken: async(token) => {
    var data = { "token": token }
    return callApi(POST_METHOD, '/user/register-fcm-token', data);
  },
  logout: async() => {
    return callApi(GET_METHOD, '/user/logout');
  },
  me: async() => {
    return callApi(GET_METHOD, '/user/me');
  },
  //weird bug causing param pass from customflatlist to horizontalflatlist
  meListPlans: async(page = 0, pageSize = Constants.FLATLIST_PAGESIZE) =>{ 
    status_type = Constants.STATUS_TYPE_ACTIVE;
    return callApi(GET_METHOD, '/user/my-plans?status_type=' + status_type + '&page=' + page +'&pageSize='+ pageSize);
  },
  meListPlansAll: async(page = 0, pageSize = Constants.FLATLIST_PAGESIZE) =>{ 
    status_type = Constants.STATUS_TYPE_ALL;
    return callApi(GET_METHOD, '/user/my-plans?status_type=' + status_type + '&page=' + page +'&pageSize='+ pageSize);
  },
  meListPlanActions: async(plan_pool_id) =>{
    return callApi(GET_METHOD, '/user/my-plan-actions?plan_pool_id=' + plan_pool_id);
  },
  meListPlanDetails: async(plan_pool_id) =>{
    var data = { "plan_pool_ids": [plan_pool_id]}
    return callApi(POST_METHOD, '/user/my-plan-details', data);
  },
  meAddPlan: async(channel, activation_token) => {
    var data = { "channel":channel, "activation_token":activation_token }
    return callApi(POST_METHOD, '/user/add-plan', data);
  },
  meRegisterPlan: async(m, image_url) => {
    var formData = new FormData();
    let counter = 0;
    image_url.map((img) => {
      counter++;
      var f = {
        uri : img.uri,
        type: 'image/jpeg',
        name: counter+'.jpg',
      }
      formData.append('image_file[]', f);
    })
    formData.append('json', JSON.stringify(m));
    return callApi(POST_METHOD, '/user/register-plan', formData, isMultipart=true);
  },
  meRegistrationResubmit: async(plan_pool_id, description, image_url) =>{
    var formData = new FormData();
    let counter = 0;
    image_url.map((img) => {
      counter++;
      var f = {
        uri : img.uri,
        type: 'image/jpeg',
        name: counter+'.jpg',
      }
      formData.append('image_file[]', f);
    })
    var data = '';
    if(description==''||description==null){
      data = { "plan_pool_id":plan_pool_id }
    } else {
      data = { "plan_pool_id":plan_pool_id, "description":description }
    }
    formData.append('json', JSON.stringify(data));

    return callApi(POST_METHOD, '/user/registration-resubmit', formData, isMultipart=true);
  },
  dealerMe: async() => {
    return callApi(GET_METHOD, '/dealer-company/me');
  },
  dealerAvailablePlans: async() => {
    return callApi(GET_METHOD, '/dealer-company/available-plans');
  },
  dealerOrderPlanAdHoc: async(plan_id) => {
    return callApi(GET_METHOD, '/dealer-company/order-plan-ad-hoc?plan_id='+plan_id);
  },
  dealerOrderPlanStockpile: async(plan_id) => {
    return callApi(GET_METHOD, '/dealer-company/order-plan-stockpile?plan_id='+plan_id);
  },
  dealerAddAssociate: async(full_mobile_no) => {
    return callApi(GET_METHOD, '/dealer-company/add-staff?dealer_staff_mobile='+full_mobile_no); //add dealer staff
  },
  dealerDeleteAssociate: async(user_id) => {
    return callApi(GET_METHOD, '/dealer-company/delete-staff?dealer_staff_id='+user_id); //delete dealer staff
  },
  dealerListStaff: async(page, pageSize) =>{
    var data = { "company_ids": [Settings.get(Settings.DEALER_ID)]}
    return callApi(POST_METHOD, '/dealer-company/view-staff?page='+ page + '&pageSize='+ pageSize, data);
    // return callApi(GET_METHOD, '/dealer-company/view-staff?page='+ page + '&pageSize='+ pageSize); //get dealer staff
  },
  dealerStaffMovement: async(page, pageSize) =>{
    return callApi(GET_METHOD, '/dealer-company/staff-movement?page='+ page + '&pageSize='+ pageSize); //display from dealer_user_history
  },
  dealerVoidOrder: async(plan_pool_id, reason) => {
    return callApi(GET_METHOD, '/dealer-company/void-order?plan_pool_id='+plan_pool_id+'&reason='+reason);
  },
  //list of plans sold
  dealerOrderHistory: async(dealer_user_id=null, page, pageSize) => {
    return callApi(GET_METHOD, '/dealer-company/order-history?dealer_user_id='+ dealer_user_id + '&page='+ page + '&pageSize='+ pageSize);
  },
  //new api from jw
  dealerOrderDetail: async(plan_pool_id)=>{
    var data = { "plan_pool_ids": [plan_pool_id]}
    return callApi(POST_METHOD, '/dealer-company/plan-detail', data);
  },
  dealerOrderHistoryGraph: async(day, dealer_user_id=null) => {
    return callApi(GET_METHOD, '/dealer-company/order-history-graph?day='+day+'&dealer_user_id='+dealer_user_id);
  },
  dealerCompanyOrderHistory: async(page, pageSize) => {
    return callApi(GET_METHOD, '/dealer-company/company-order-history?page='+ page + '&pageSize='+ pageSize);
  },
  dealerCompanyOrderHistoryGraph: async(day) => {
    return callApi(GET_METHOD, '/dealer-company/company-order-history-graph?day='+day);
  },
  dealerUploadPhoto: async(plan_pool_id, image_url) =>{
    var formData = new FormData();
    let counter = 0;
    image_url.map((img) => {
      counter++;
      var f = {
        uri : img.uri,
        type: 'image/jpeg',
        name: counter+'.jpg',
      }
      formData.append('image_file[]', f);
    })
    formData.append('plan_pool_id', JSON.stringify(plan_pool_id));
    return callApi(POST_METHOD, '/dealer-company/register-plan-photo', formData, isMultipart=true);
  },
  dealerUpdateProfile: async(image_url) => {
    var formData = new FormData();
    if(image_url != null ){
      var f = {
        uri : image_url,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      }
      formData.append('image_file[]', f);
    }
    return await callApi(POST_METHOD, '/dealer-company/update-profile', formData, isMultipart=true);
  },  
  dealerRequestStock: async(plan_id, amount) =>{
    return await callApi(GET_METHOD, '/company-inventory/request-stock?plan_id='+plan_id +'&amount='+ amount);
  },
  dealerAllocateStock: async(downline_id, amount, plan_id) =>{
    const data = {
      "downline_id": downline_id,
      "amount": amount,
      "plan_id": plan_id,
    };
    return await callApi(POST_METHOD, '/company-inventory/allocate-stock', data);
  },
  dealerActivateStock: async(plan_id, amount) =>{
    const data = {
      "amount": amount,
      "plan_id": plan_id
    };
    return await callApi(POST_METHOD, '/company-inventory/activate-stock', data);
  },
  dealerActionHistory: async(page, pageSize) =>{
    return await callApi(GET_METHOD, '/company-inventory/allocation-history?page=' + page + '&pageSize=' + pageSize);
  },
  dealerViewInfo: async(id) =>{
    const data = {
      "dealer_company_ids": id
    };
    return await callApi(POST_METHOD, '/dealer-company/view-info', data);
  },
  dealerViewInventory: async(id) =>{
    const data = {
      "dealer_company_ids": id
    };
    return await callApi(POST_METHOD, '/company-inventory/view-inventory', data);
  },
  dealerOrgChart: async() =>{
    return await callApi(GET_METHOD, '/dealer-company/organization-chart');
  },
  instapPromotion: async() =>{
    return callApi(GET_METHOD, '/instap/promotion'); 
  },
  sysDeviceAssessment: async(data, image_url) => {
    var formData = new FormData();
    let counter = 0;
    image_url.map((img) => {
      counter++;
      var f = {
        uri : img,
        type: 'image/jpeg',
        name: counter+'.jpg',
      }
      formData.append('image_file[]', f);
    })
    formData.append('json', JSON.stringify(data));

    return await callApi(POST_METHOD, '/sys/device-assessment', formData, isMultipart=true);
  },
  meUpdateProfile: async(data, image_url) => {
    var formData = new FormData();
    if(image_url != null ){
      var f = {
        uri : image_url,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      }
      formData.append('image_file[]', f);
    }
    if(data != null){
      formData.append('detail', JSON.stringify(data));
    }

    return await callApi(POST_METHOD, '/user/update-profile', formData, isMultipart=true);
  },
  meListMyInbox: async(page, pageSize) =>{
    return callApi(GET_METHOD, '/user/list-my-inbox?page=' + page + '&pageSize=' + pageSize);
  },
  meReadNotification: async(id) =>{
    return callApi(GET_METHOD, '/user/read-notification?id=' + id);
  },
  meFavoriteNotification: async(id) =>{
    return callApi(GET_METHOD, '/user/favorite-notification?id=' + id);
  },
  meDeleteNotification: async(id) =>{
    return callApi(GET_METHOD, '/user/delete-notification?id=' + id);
  },
  meDeleteAllNotification: async() =>{
    return callApi(GET_METHOD, '/user/delete-all-notification');
  },
  meGetNumberOfUnreadNotification: async() => {
    return await callApi(GET_METHOD, '/user/get-number-of-unread-notification');
  },
  meRefreshProvisionalToken: async() => {
    return await callApi(GET_METHOD, '/user/refresh-provisional-token');
  },
  qcdRepairCentre: async(plan_pool_id) => {
    // brand = Settings.get(Settings.DEVICE_BRAND).toLowerCase();
    region_id = Settings.get(Settings.COUNTRY_ISO_CODE);
    // const brand = 'apple';
    return await callApi(GET_METHOD, '/qcd/list-repair-centre?plan_pool_id='+ plan_pool_id );
  },
  meRegisterClaim: async(m, image_url) => {
    var formData = new FormData();
    let counter = 0;
    image_url.map((img) => {
      counter++;
      var f = {
        uri : img.uri,
        type: 'image/jpeg',
        name: counter+'.jpg',
      }
      formData.append('image_file[]', f);
    })
    var data = {"plan_pool_id": m.plan_pool_id, "contact_alt": m.alt_no, "device_issue": m.device_issue, "repair_centre_id": m.repair_centre_id, "location": m.location, "occurred_at": m.occurred_at};
    formData.append('json', JSON.stringify(data));
    return callApi(POST_METHOD, '/user/register-claim', formData, isMultipart=true);
  },
  meCaseResubmit: async(plan_pool_id, description, image_url) =>{
    var formData = new FormData();
    let counter = 0;
    image_url.map((img) => {
      counter++;
      var f = {
        uri : img.uri,
        type: 'image/jpeg',
        name: counter+'.jpg',
      }
      formData.append('image_file[]', f);
    })

    var data = '';
    if(description==''||description==null){
      data = { "plan_pool_id":plan_pool_id }
    } else {
      data = { "plan_pool_id":plan_pool_id, "description":description }
    }
    formData.append('json', JSON.stringify(data));

    return callApi(POST_METHOD, '/user/registration-resubmit-claim', formData, isMultipart=true);
  },
  meModelColor: async() =>{
    const device_no  = Settings.get(Settings.DEVICE_MODEL_NO);
    return callApi(GET_METHOD, '/user/model-colour?model='+ device_no); 
  },
  listServerSetting: async () => {
    return callApi(GET_METHOD, '/sys/list-setting');
  },

};

export default WebApi;
