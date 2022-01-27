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

export function getAllDevice (device_model_id, page, size, area="") {
  if(area===""){
    return axios({
      url: `${global_.url}/devices/device_model/${device_model_id}?page=${page}&size=${size}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token()}`
      }
    })
  }
  else{
    return axios({
      url: `${global_.url}/devices/device_model/${device_model_id}?page=${page}&size=${size}&area=${area}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token()}`
      }
    }) 
  }
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

export function getLatestDeviceObservation (device_model_id) {
  return axios({
    url: `${global_.url}/observations/device_model/${device_model_id}/latest`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getDevice_ModelObservation (device_model_id, page, size,status,start_time,end_time,select_device_id,area) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
    e = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T23:59:59"
  } 

  return axios({
    url: `${global_.url}/observations/device_model/${device_model_id}?start_timestamp=${s}&end_timestamp=${e}&page=${page}&size=${size}&status=${status}&select_device=${select_device_id}&area=${area}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getDevice_ModelObservation_data (device_model_id,status,start_time,end_time,area) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
    e = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T23:59:59"
  } 
  if(area===""){
    return axios({
      url: `${global_.url}/observations/device_model/${device_model_id}/data_output?start_timestamp=${s}&end_timestamp=${e}&status=${status}`,
      method: 'get',
      headers: {
        'Content-Type': 'text/csv',
        Authorization: `Bearer ${token()}`
      }
    })
  }
  else
  {
    return axios({
      url: `${global_.url}/observations/device_model/${device_model_id}/data_output?start_timestamp=${s}&end_timestamp=${e}&status=${status}&area=${area}`,
      method: 'get',
      headers: {
        'Content-Type': 'text/csv',
        Authorization: `Bearer ${token()}`
      }
    })
  }

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

export function modifyFasteyes_Observation (observation_id, staff_id) {
  let modifyData={"staff_id":staff_id}
  return axios({
    url: `${global_.url}/fasteyes_observations/${observation_id}`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    data: modifyData
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


export function getFasteyes_Attendance (page, size,status,start_time,end_time,select_device,check_in_time1,check_in_time2,check_out_time1,check_out_time2) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
    e = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T23:59:59"
  } 
  // let attendance_in = {}
  // attendance_in.working_time_1 = check_in_time1
  // attendance_in.working_time_2 = check_in_time2
  // attendance_in.working_time_off_1 = check_out_time1
  // attendance_in.working_time_off_2 = check_out_time2
  return axios({
    url: `${global_.url}/attendance?start_timestamp=${s}&end_timestamp=${e}&page=${page}&size=${size}&status=${status}&select_device_id=${select_device}&working_time_1=${check_in_time1}&working_time_2=${check_in_time2}&working_time_off_1=${check_out_time1}&working_time_off_2=${check_out_time2}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getFasteyes_Attendance_csv (start_time,end_time,select_device, status,check_in_time1,check_in_time2,check_out_time1,check_out_time2) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
    e = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T23:59:59"
  } 
  return axios({
    url: `${global_.url}/attendance/output_csv?start_timestamp=${s}&end_timestamp=${e}&select_device_id=${select_device}&status=${status}&working_time_1=${check_in_time1}&working_time_2=${check_in_time2}&working_time_off_1=${check_out_time1}&working_time_off_2=${check_out_time2}`,
    method: 'get',
    headers: {
      'Content-Type': 'text/csv',
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getFasteyes_AttendancePie (start_time,end_time,select_device,working_time_1,working_time_2,working_time_off_1,working_time_off_2) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
    e = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T23:59:59"
  } 

  // let attendance_in = {}
  // attendance_in.working_time_1 = "8:00:00"
  // attendance_in.working_time_2 = "9:00:00"
  // attendance_in.working_time_off_1 = "17:00:00"
  // attendance_in.working_time_off_2 = "18:00:00"
  // let working_time_1 = "8:00:00"
  // let working_time_2 = "9:00:00"
  // let working_time_off_1 = "17:00:00"
  // let working_time_off_2 = "18:00:00"
  return axios({
    url: `${global_.url}/attendance/pie?start_timestamp=${s}&end_timestamp=${e}&select_device_id=${select_device}&working_time_1=${working_time_1}&working_time_2=${working_time_2}&working_time_off_1=${working_time_off_1}&working_time_off_2=${working_time_off_2}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function getFasteyes_AttendanceLineChart (start_time,end_time,page,select_device_id,working_time_1,working_time_2,working_time_off_1,working_time_off_2) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    let nowTime = new Date()
    s = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T00:00:00"
    e = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+ nowTime.getDate()+"T23:59:59"
  } 

  // let attendance_in = {}
  // attendance_in.working_time_1 = "8:00:00"
  // attendance_in.working_time_2 = "9:00:00"
  // attendance_in.working_time_off_1 = "17:00:00"
  // attendance_in.working_time_off_2 = "18:00:00"
  return axios({
    url: `${global_.url}/attendance/line_chart?start_timestamp=${s}&end_timestamp=${e}&page=${page}&select_device_id=${select_device_id}&working_time_1=${working_time_1}&working_time_2=${working_time_2}&working_time_off_1=${working_time_off_1}&working_time_off_2=${working_time_off_2}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
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

export function modify_group (name) {
  let patch_data={"name":name}
  return axios({
    url: `${global_.url}/group`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    data : patch_data
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

export function modify_user_info (name) {
  let patch_data={"name":name}
  return axios({
    url: `${global_.url}/users/info`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    data : patch_data
  })
}

export function invite_user(email, level) {
  let user_data={
    "email":email,
    "level":level
  }
  return axios({
    url: `${global_.url}/users/invite`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    data : user_data
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

export function modify_device (device_model_id, device_id, name, area, info, serial_number) {
  let patch_data = {
    "area": area,
    "info": info,
    "name":name,
    "serial_number": serial_number
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
  let patch_data = {
    "department_id": department_id,
    "status": status,
    "name": info.name,
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
    data: patch_data
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
    url: `${global_.url}/fasteyes_observations/output_form/modify`,
    method: 'patch',
    data: patch_data,
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function get_output_csv_file (start_time,end_time) {
  let s = start_time 
  let e = end_time
  if(!(s && e)){
    return axios({
      url: `${global_.url}/fasteyes_observations/output_interval_data_csv`,
      method: 'get',
      headers: {
        'Content-Type': 'text/csv',
        Authorization: `Bearer ${token()}`
      }
    })
  } 
  else{
    return axios({
      url: `${global_.url}/fasteyes_observations/output_interval_data_csv?start_timestamp=${s}&end_timestamp=${e}`,
      method: 'get',
      headers: {
        'Content-Type': 'text/csv',
        Authorization: `Bearer ${token()}`
      }
    })
  }
}

export function get_bulletin () {
  return axios({
    url: `${global_.url}/bulletin`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function modify_bulletin (is_used) {
  return axios({
    url: `${global_.url}/bulletin?is_used=${is_used}`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function get_bulletin_image () {
  return axios({
    url: `${global_.url}/bulletin/image`,
    method: 'get',
    responseType: 'arraybuffer',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function post_bulletin_image (image) {
  // generate file from base64 string
  const file = dataURLtoFile(image)
  // put file into form data
  const formdata = new FormData()
  formdata.append('Image_file', file, file.name)
  return axios({
    url: `${global_.url}/bulletin/image`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token()}`,
      'Content-Type': 'multipart/form-data'
    },
    data: formdata
  })
}
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1)
    n -= 1 // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime })
}

export function delete_bulletin_image () {
  return axios({
    url: `${global_.url}/bulletin/image`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token()}`,
    }
  })
}

export function delete_user (user_id) {
  return axios({
    url: `${global_.url}/users/${user_id}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token()}`,
    }
  })
}

export function get_area () {
  return axios({
    url: `${global_.url}/area`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`,
    }
  })
}

export function create_area (name) {
  return axios({
    url: `${global_.url}/area?name=${name}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  })
}

export function modify_area (area_id,name,send_mail) {
  return axios({
    url: `${global_.url}/area/${area_id}?name=${name}&send_mail=${send_mail}`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${token()}`,
    }
  })
}

export function delete_area (area_id) {
  return axios({
    url: `${global_.url}/area/${area_id}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token()}`,
    }
  })
}

export function get_area_user (area_id) {
  return axios({
    url: `${global_.url}/area_user?area_id=${area_id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token()}`,
    }
  })
}

export function create_area_user (area_id, user_id) {
  return axios({
    url: `${global_.url}/area_user?area_id=${area_id}&user_id=${user_id}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token()}`,
    }
  })
}

export function delete_area_user (area_id, user_id) {
  return axios({
    url: `${global_.url}/area_user?area_id=${area_id}&user_id=${user_id}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token()}`,
    }
  })
}

export function getAreaImage (area_id) {
  return axios({
    url: `${global_.url}/area/${area_id}/image`,
    method: 'get',
    responseType: 'arraybuffer',
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}

export function patchAreaImage (area_id,image) {
  // generate file from base64 string
  const file = dataURLtoFile(image)
  // put file into form data
  const formdata = new FormData()
  formdata.append('Image_file', file, file.name)
  return axios({
    url: `${global_.url}/area/${area_id}/image`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${token()}`,
      'Content-Type': 'multipart/form-data'
    },
    data: formdata
  })
}

export function deleteAreaImage (area_id) {
  return axios({
    url: `${global_.url}/area/${area_id}/image`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token()}`,
    }
  })
}

export function modify_device_position (device_model_id, device_id, position_x,position_y) {
  return axios({
    url: `${global_.url}/devices/device_model/${device_model_id}/device/${device_id}/position?&position_x=${position_x}&position_y=${position_y}`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${token()}`
    },
  })
}