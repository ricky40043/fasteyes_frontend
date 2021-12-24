import { data } from "autoprefixer"
import axios from "./https.js"
import store from "../store"
import global_ from "../Global.vue"

// import base from  "../static/config.js"
// const source = CancelToken.source()
// const base = {
  // url: 'http://192.168.45.35:8000'
  // url: 'http://127.0.0.1:8000'
// }
/**
 * post方法，對應post請求
 * @desc註冊請求
 * @param {String} url [請求的url地址]
 * @param {Object} params [請求時攜帶的引數]
 */
export function token () {
  return store.state.token
}
/* eslint-disable */
// 登入
export function login (loginData) {
  return axios({
    url: `${global_.url}/auth/login`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: loginData
  })
}//OK

// 確認Email狀態
export function checkEmail (email) {
  return axios({
    url: `${global_.url}/users/email/exists?email=${email}`,
    method: 'get'
  })
}

export function setUserInfo (obj_input) {
  // let setinfo = {}
  // if(obj_input.email_alert)
  //   setinfo.email_alert = obj_input.email_alert

  // if(obj_input.language)
  //   setinfo.language = obj_input.language

  // if(obj_input.device_email_alert)
  // {
  //   setinfo.device_email_alert = obj_input.device_email_alert
  // }

  // alert(obj_input.device_email_alert)
  let setinfo = obj_input
  return axios({
    url: `${global_.url}/users/setting`,
    method: 'patch',
    data: setinfo,
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getAllDevice (device_model_id) {
  return axios({
    url: `${global_.url}/devices/device_model/${device_model_id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getDeviceObservation (device_id, start_time,end_time) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getDate()
    e = nowTime.setDate(date.getDate() + 1)
  } 
  return axios({
    url: `${global_.url}/observations/device/${device_id}?start_timestamp=${s}&end_timestamp=${e}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getLatestDeviceObservation () {
  return axios({
    url: `${global_.url}/observations/device/observation/latest`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getDevice_ModelObservation (device_model_id, page, size,status,start_time,end_time,select_device_id) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
    e = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T23:59:59"
  } 

  return axios({
    url: `${global_.url}/observations/device_model/${device_model_id}?start_timestamp=${s}&end_timestamp=${e}&page=${page}&size=${size}&status=${status}&select_device=${select_device_id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getDevice_ModelObservation_data (device_model_id,status,start_time,end_time) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
    e = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T23:59:59"
  } 

  return axios({
    url: `${global_.url}/observations/device_model/${device_model_id}/data_output?start_timestamp=${s}&end_timestamp=${e}&status=${status}`,
    method: 'get',
    headers: {
      'Content-Type': 'text/csv',
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getFasteyes_Observation (page, size,status,start_time,end_time,select_device) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
    e = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T23:59:59"
  } 

  return axios({
    url: `${global_.url}/fasteyes_observations?start_timestamp=${s}&end_timestamp=${e}&page=${page}&size=${size}&status=${status}&select_device_id=${select_device}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getFasteyes_StaffObservation (staff_id, page, size,start_time,end_time,select_device) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
    e = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T23:59:59"
  } 

  return axios({
    url: `${global_.url}/fasteyes_observations/staff/${staff_id}?start_timestamp=${s}&end_timestamp=${e}&page=${page}&size=${size}&select_device_id=${select_device}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}


export function getFasteyesDevice () {
  return axios({
    url: `${global_.url}/fasteyes_device`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}


export function getFasteyes_Attendance (page, size,status,start_time,end_time,select_device) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
    e = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T23:59:59"
  } 

  let attendance_in = {}
  attendance_in.working_time_1 = "8:00:00"
  attendance_in.working_time_2 = "9:00:00"
  attendance_in.working_time_off_1 = "17:00:00"
  attendance_in.working_time_off_2 = "18:00:00"
  return axios({
    url: `${global_.url}/attendance?start_timestamp=${s}&end_timestamp=${e}&page=${page}&size=${size}&status=${status}&select_device_id=${select_device}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    data: attendance_in
  })
}

export function getFasteyes_AttendancePie (start_time,end_time,select_device) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
    e = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T23:59:59"
  } 

  let attendance_in = {}
  attendance_in.working_time_1 = "8:00:00"
  attendance_in.working_time_2 = "9:00:00"
  attendance_in.working_time_off_1 = "17:00:00"
  attendance_in.working_time_off_2 = "18:00:00"
  return axios({
    url: `${global_.url}/attendance/pie?start_timestamp=${s}&end_timestamp=${e}&select_device_id=${select_device}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    data: attendance_in
  })
}

export function getFasteyes_AttendanceLineChart (start_time,end_time,page,select_device_id) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
    e = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T23:59:59"
  } 

  let attendance_in = {}
  attendance_in.working_time_1 = "8:00:00"
  attendance_in.working_time_2 = "9:00:00"
  attendance_in.working_time_off_1 = "17:00:00"
  attendance_in.working_time_off_2 = "18:00:00"
  return axios({
    url: `${global_.url}/attendance/line_chart?start_timestamp=${s}&end_timestamp=${e}&page=${page}&select_device_id=${select_device_id}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    data: attendance_in
  })
}

export function getStaff (status, department_id) {
  return axios({
    url: `${global_.url}/staffs?status=${status}&department_id=${department_id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}


export function getDepartment () {
  return axios({
    url: `${global_.url}/department`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function add_department (name) {
  let add_data= {"name": name }
  return axios({
    url: `${global_.url}/department`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    data: add_data
  })
}

export function modify_department (department_id,name) {
  console.log(department_id)
  let patch_data= {"name": name }
  return axios({
    url: `${global_.url}/department/${department_id}`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    data: patch_data
  })
}

export function delete_department (department_id) {
  return axios({
    url: `${global_.url}/department/${department_id}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getUerInfo () {
  return axios({
    url: `${global_.url}/auth/pingServer`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getgroup () {
  return axios({
    url: `${global_.url}/group`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getusers () {
  return axios({
    url: `${global_.url}/users`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function add_device (device_model_id, name, area, serial_number, info) {
  let create_data = {
    "name": name,
    "area": area,
    "serial_number": serial_number,
    "info": info
  }
  return axios({
    url: `${global_.url}/devices/device_model/${device_model_id}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    data: create_data
  })
}

export function modify_device (device_model_id, device_id, name, area, info) {
  let patch_data = {
    "area": area,
    "info": info,
    "name":name
  }
  return axios({
    url: `${global_.url}/devices/device_model/${device_model_id}/device/${device_id}`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    data : patch_data
  })
}

export function delete_device(device_model_id,device_id){
  return axios({
    url: `${global_.url}/devices/device_model/${device_model_id}/device/${device_id}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}


export function add_staff (department_id,serial_number, info, status) {
  let nowTime = new Date()
  let start_time = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
  let create_data = {
    "department_id": department_id,
    "serial_number": serial_number,
    "status": status,
    "start_date": start_time,
    "info": info
  }
  return axios({
    url: `${global_.url}/staffs`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    data: create_data
  })
}

export function get_staff (staff_id) {
  return axios({
    url: `${global_.url}/staffs/${staff_id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function delete_staff (staff_id) {
  return axios({
    url: `${global_.url}/staffs/${staff_id}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function modify_staff (staff_id,department_id, info, status) {
  let create_data = {
    "department_id": department_id,
    "status": status,
    // "card_number": info.card_number,
    // "email": info.email,
    "gender": info.gender,
    // "national_id_number": info.national_id_number,
    // "birthday": info.birthday,
    // "telephone_number": info.telephone_number,
    // "start_date": info.start_date,
    // "end_date": info.end_date,
  }
  return axios({
    url: `${global_.url}/staffs/${staff_id}`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    data: create_data
  })
}

export function get_staff_face (staff_id) {
  return axios({
    url: `${global_.url}/staffs/${staff_id}/faces`,
    method: 'get',
    responseType: 'arraybuffer',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function get_output () {
  return axios({
    url: `${global_.url}/fasteyes_observations/output_form`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function patch_output (patch_data) {
  return axios({
    url: `${global_.url}/fasteyes_observations/output_form/test`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    data: patch_data
  })
}

export function get_output_csv_file () {
  return axios({
    url: `${global_.url}/fasteyes_observations/output_interval_data_csv`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}