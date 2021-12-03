import { data } from "autoprefixer"
import axios from "./https.js"
import store from "../store"
// import base from  "../static/config.js"
// const source = CancelToken.source()
const base = {
  url: 'http://192.168.45.38:8000'
}
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
    url: `${base.url}/auth/login`,
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
    url: `${base.url}/users/email/exists?email=${email}`,
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
    url: `${base.url}/users/setting`,
    method: 'patch',
    data: setinfo,
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getAllDevice (device_model_id) {
  return axios({
    url: `${base.url}/devices/device_model/${device_model_id}`,
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
    url: `${base.url}/observations/device/${device_id}?start_timestamp=${s}&end_timestamp=${e}`,
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
    // url: `${base.url}/observations/device/${device_model_id}?start_timestamp=${s}&end_timestamp=${e}?page=${page}&?size=${size}`,
    url: `${base.url}/observations/device_model/${device_model_id}?start_timestamp=${s}&end_timestamp=${e}&page=${page}&size=${size}&status=${status}`,
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
    // url: `${base.url}/fasteyes_observations/start_timestamp=${s}&end_timestamp=${e}?page=${page}&?size=${size}`,
    url: `${base.url}/fasteyes_observations?start_timestamp=${s}&end_timestamp=${e}&page=${page}&size=${size}&status=${status}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}


export function getFasteyesDevice () {
  return axios({
    url: `${base.url}/fasteyes_device`,
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
    url: `${base.url}/attendance?start_timestamp=${s}&end_timestamp=${e}&page=${page}&size=${size}&status=${status}`,
    // url: `${base.url}/attendance?start_timestamp=2021-8-15T06:43:55.533&end_timestamp=2021-12-15T06:43:55.533&page=3&size=50`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    data: attendance_in
  })
}

export function getStaff (status, department_id) {
  return axios({
    url: `${base.url}/staffs?status=${status}&department_id=${department_id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}


export function getDepartment () {
  return axios({
    url: `${base.url}/department`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

// export function IP_cam_login () {
//   console.log("IPCam")
//   return axios({
//     url: `https://192.168.45.211:5001/webapi/entry.cgi?api=SYNO.API.Auth&method=login&version=3&account=ricky@fastwise.net&passwd=Aa16171819&session=SurveillanceStation&format=sid`,
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   })
// }