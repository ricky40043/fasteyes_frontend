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

export function setUserInfo (email_alert=-1,language=-1) {
  let setinfo = {}
  if(email_alert != -1)
    setinfo.email_alert = email_alert

  if(language != -1)
    setinfo.language = language

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
    url: `${base.url}/observations/device/observation/latest`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getDevice_ModelObservation (device_model_id, page, size,status,start_time,end_time) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
    e = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T23:59:59"
  } 
  // console.log(s)
  // console.log(e)

  return axios({
    url: `${global_.url}/observations/device_model/${device_model_id}?start_timestamp=${s}&end_timestamp=${e}&page=${page}&size=${size}&status=${status}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}


export function getFasteyes_Observation (page, size,status,start_time,end_time) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
    e = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T23:59:59"
  } 

  return axios({
    url: `${global_.url}/fasteyes_observations?start_timestamp=${s}&end_timestamp=${e}&page=${page}&size=${size}&status=${status}`,
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


export function getFasteyes_Attendance (page, size,status,start_time,end_time) {
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
    url: `${global_.url}/attendance?start_timestamp=${s}&end_timestamp=${e}&page=${page}&size=${size}&status=${status}`,
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

export function get () {
  return axios({
    url: `${global_.url}/users`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}