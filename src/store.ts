/* eslint-disable */
// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//     state:{
//         userInfo:{},
//         token:'',
//         refreshToken:'',
//         userCharacter:'',
//     },
//     actions:{
//         setToken(context,token){
//             context.commit('SET_TOKEN',token)
//         },
//         setRefreshToken(context,refreshToken){
//             context.commit('SET_REFRESH_TOKEN',refreshToken)
//         },
//         setUserInfo(context,userInfo){
//             context.commit('SET_USER_INFO',userInfo)
//         },
//         setUserCharacter(context,Character){
//             context.commit('SET_USER_CHARACTER',Character)
//         },
//         // setDataTime(context,time){
//         //     context.commit('SET_DATA_TIME',time)
//         // },
//         // setCompanyList(context,companyList){
//         //     context.commit('SET_COMPANY_LIST',companyList)
//         // },
//         // setDeviceList(context,deviceList){
//         //     context.commit('SET_DEVICE_LIST',deviceList)
//         // },
//         // setMergeDataList(context,mergeDataList){
//         //     context.commit('SET_MERGE_DATA_LIST',mergeDataList)
//         // },
//         // setStaffList(context,staffList){
//         //     context.commit('SET_STAFF_LIST',staffList)
//         // },
//         // setDepartment(context,department_list){
//         //     context.commit('SET_DEPARTMENT_LIST',department_list)
//         // },
//         // logoutEvent(context,reset){
//         //     context.commit('LOGOUT_EVENT','')
//         // },
//         // setDeviceSocketSettings(context,patchData){
//         //     context.commit('SET_DEVICE_SOCKET_SETTINGS',patchData)
//         // },
//     },
//     mutations:{
//         // setLang (state, value) {
//         //     state.language = value;
//         // },
//         SET_TOKEN(context, token){
//             this.state.token = String(token)
//         },
//         SET_REFRESH_TOKEN(context, refreshToken){
//             this.state.refreshToken = String(refreshToken)
//         },
//         SET_USER_INFO(context, userInfo){
//             this.state.userInfo = Object.assign(userInfo)
//         },
//         SET_USER_CHARACTER(context, character){
//             this.state.userCharacter = String(character)
//         },
//         // SET_DATA_TIME(context, time){
//         //     this.state.dataTime = Object.assign(time)
//         // },
//         // SET_COMPANY_LIST(context, companyList){
//         //     this.state.companyList = companyList.map( D => D)
//         // },
//         // SET_DEVICE_LIST(context, deviceList){
//         //     this.state.deviceList = deviceList.map( D => D)
//         // },
//         // SET_MERGE_DATA_LIST(context, mergeDataList){
//         //     this.state.mergeDataList = mergeDataList.map( D => D)
//         // },
//         // SET_STAFF_LIST(state, staffList){
//         //     Vue.set(state,'staffList',new Map(staffList))
//         // },
//         // SET_DEPARTMENT_LIST(context, department_list){
//         //     this.state.department_list = department_list.map( D => D)
//         // },
//         // LOGOUT_EVENT(context, reset){
//         //     this.state.language='',
//         //     this.state.userInfo={},
//         //     this.state.token='',
//         //     this.state.refreshToken='',
//         //     this.state.userCharacter='',
//         //     this.state.dataTime='',
//         //     this.state.deviceList=[],
//         //     this.state.mergeDataList=[],
//         //     this.state.staffList={},
//         //     this.failedTemperatureBy= 'device',
//         //     this.defaultFaliedTemperatur= 37.5
//         // },
//         // SET_DEVICE_SOCKET_SETTINGS(context, patchData){
//         //     this.state.deviceList.forEach(device => {
//         //         if(device.id == patchData.id) {
//         //             device.name = patchData.name
//         //             device.description = patchData.description
//         //             device.Setting = patchData.Setting
//         //         }
//         //       })

//             // let target = this.state.deviceList.splice(patchData.index, 1)[0]
//             // Object.keys(patchData.value).forEach(key => {
//             //     if (key === 'BodyTemperature:Abnormal:Threshold') {
//             //         target.Settings.BodyTemperature.Abnormal.Threshold = patchData.value[key]
//             //     } else if (key === 'Screenshot:UploadScreenshot') {
//             //         target.Settings.Screenshot.UploadScreenshot = patchData.value[key]
//             //     }
//             // })
//             // this.state.deviceList.push(Object.assign(target))
//             // this.state.deviceList.sort((a, b) => {
//             //     let result = (a.id < b.id) ? 1 : -1
//             //     return result
//             // })
//         // },
//     },
//     getters:{
//         // getDepartmentList : (state) => {
//         //     // let staffList = Array.from(state.staffList)
//         //     let departmentList = []
//         //     let department_list = state.department_list
//         //     department_list.forEach( department => {
//         //         departmentList.push(department.name)
//         //     });

//         //     return departmentList
//         // },
//         getStatusList: (state) => {
//             let statusList = (state.language === 'tw') ? ['在職中', '離職', '留職停薪'] : ['In-Service', 'Resigned', 'LWOP']
//             return statusList
//         } 
//     }
// })

import { createStore } from "vuex"

const store = createStore({
    state:{
        userInfo:{},
        token:'',
        refreshToken:'',
        userCharacter:'',
        deviceList_TH:[],
        deviceList_IPCam:[],
        deviceList_electro:[],
        deviceList_Nitrogen:[],
        deviceList_Fasteyes:[],
        observation_TH:"",
    },
    actions:{
        setToken(context,token){
            context.commit('SET_TOKEN',token)
        },
        setRefreshToken(context,refreshToken){
            context.commit('SET_REFRESH_TOKEN',refreshToken)
        },
        setUserInfo(context,userInfo){
            context.commit('SET_USER_INFO',userInfo)
        },
        setUserCharacter(context,Character){
            context.commit('SET_USER_CHARACTER',Character)
        },
        setDeviceList_TH(context,deviceList){
            context.commit('SET_DEVICE_LIST_TH',deviceList)
        },
        setDeviceList_IPCam(context,deviceList){
            context.commit('SET_DEVICE_LIST_IPCam',deviceList)
        },
        setDeviceList_eletro(context,deviceList){
            context.commit('SET_DEVICE_LIST_eletro',deviceList)
        },
        setObservationList_TH(context,observation){
            context.commit('SET_OBSERVATION_LIST_TH',observation)
        },
        setDeviceList_fasteyes(context,deviceList_Fasteyes){
            context.commit('SET_DEVICE_LIST_Fasteyes',deviceList_Fasteyes)
        },
        // setDataTime(context,time){
        //     context.commit('SET_DATA_TIME',time)
        // },
        // setCompanyList(context,companyList){
        //     context.commit('SET_COMPANY_LIST',companyList)
        // },
        // setMergeDataList(context,mergeDataList){
        //     context.commit('SET_MERGE_DATA_LIST',mergeDataList)
        // },
        // setStaffList(context,staffList){
        //     context.commit('SET_STAFF_LIST',staffList)
        // },
        // setDepartment(context,department_list){
        //     context.commit('SET_DEPARTMENT_LIST',department_list)
        // },
        // logoutEvent(context,reset){
        //     context.commit('LOGOUT_EVENT','')
        // },
        // setDeviceSocketSettings(context,patchData){
        //     context.commit('SET_DEVICE_SOCKET_SETTINGS',patchData)
        // },
    },
    mutations:{
        // setLang (state, value) {
        //     state.language = value;
        // },
        SET_TOKEN(context, token){
            this.state.token = String(token)
        },
        SET_REFRESH_TOKEN(context, refreshToken){
            this.state.refreshToken = String(refreshToken)
        },
        SET_USER_INFO(context, userInfo){
            this.state.userInfo = Object.assign(userInfo)
        },
        SET_USER_CHARACTER(context, character){
            this.state.userCharacter = String(character)
        },
        SET_DEVICE_LIST_TH(context, deviceList){
            this.state.deviceList_TH = deviceList.map( D => D)
        },
        SET_DEVICE_LIST_IPCam(context, deviceList){
            this.state.deviceList_IPCam = deviceList.map( D => D)
        },
        SET_DEVICE_LIST_eletro(context, deviceList){
            this.state.deviceList_eletro = deviceList.map( D => D)
        },
        SET_DEVICE_LIST_Nitrogen(context, deviceList){
            this.state.deviceList_Nitrogen = deviceList.map( D => D)
        },
        SET_OBSERVATION_LIST_TH(context, observation){
            this.state.observation_TH = Object.assign(observation)
        },
        SET_DEVICE_LIST_Fasteyes(context, deviceList){
            this.state.deviceList_Fasteyes = deviceList.map( D => D)
        },
        // SET_DATA_TIME(context, time){
        //     this.state.dataTime = Object.assign(time)
        // },
        // SET_COMPANY_LIST(context, companyList){
        //     this.state.companyList = companyList.map( D => D)
        // },

        // SET_MERGE_DATA_LIST(context, mergeDataList){
        //     this.state.mergeDataList = mergeDataList.map( D => D)
        // },
        // SET_STAFF_LIST(state, staffList){
        //     Vue.set(state,'staffList',new Map(staffList))
        // },
        // SET_DEPARTMENT_LIST(context, department_list){
        //     this.state.department_list = department_list.map( D => D)
        // },
        // LOGOUT_EVENT(context, reset){
        //     this.state.language='',
        //     this.state.userInfo={},
        //     this.state.token='',
        //     this.state.refreshToken='',
        //     this.state.userCharacter='',
        //     this.state.dataTime='',
        //     this.state.deviceList=[],
        //     this.state.mergeDataList=[],
        //     this.state.staffList={},
        //     this.failedTemperatureBy= 'device',
        //     this.defaultFaliedTemperatur= 37.5
        // },
        // SET_DEVICE_SOCKET_SETTINGS(context, patchData){
        //     this.state.deviceList.forEach(device => {
        //         if(device.id == patchData.id) {
        //             device.name = patchData.name
        //             device.description = patchData.description
        //             device.Setting = patchData.Setting
        //         }
        //       })

            // let target = this.state.deviceList.splice(patchData.index, 1)[0]
            // Object.keys(patchData.value).forEach(key => {
            //     if (key === 'BodyTemperature:Abnormal:Threshold') {
            //         target.Settings.BodyTemperature.Abnormal.Threshold = patchData.value[key]
            //     } else if (key === 'Screenshot:UploadScreenshot') {
            //         target.Settings.Screenshot.UploadScreenshot = patchData.value[key]
            //     }
            // })
            // this.state.deviceList.push(Object.assign(target))
            // this.state.deviceList.sort((a, b) => {
            //     let result = (a.id < b.id) ? 1 : -1
            //     return result
            // })
        // },
    },
    getters:{
        // getDepartmentList : (state) => {
        //     // let staffList = Array.from(state.staffList)
        //     let departmentList = []
        //     let department_list = state.department_list
        //     department_list.forEach( department => {
        //         departmentList.push(department.name)
        //     });

        //     return departmentList
        // },
        // getStatusList: (state) => {
        //     let statusList = (state.language === 'tw') ? ['在職中', '離職', '留職停薪'] : ['In-Service', 'Resigned', 'LWOP']
        //     return statusList
        // } 
    }
});

export default store;