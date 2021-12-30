import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Dashboard from "./page/Dashboard.vue";
import Forms from "./page/Forms.vue";
import Tables from "./page/Tables.vue";
import TableList from "./page/TablesList.vue";
import UIElements from "./page/UIElements.vue";
import Login from "./page/Login.vue";
import Modal from "./page/Modal.vue";
import Card from "./page/Card.vue";
import Blank from "./page/Blank.vue";
import Main from "./page/main/Main.vue";
import Bulletin from "./page/main/Bulletin.vue";
import Group from "./page/main/Group.vue";
import Management from "./page/main/Management.vue";
import Attendance from "./page/fasteyes/Attendance.vue";
import AttendanceStatistics from "./page/fasteyes/AttendanceStatistics.vue";
import StaffHistory from "./page/fasteyes/StaffHistory.vue";
import DataOutput from "./page/fasteyes/DataOutput.vue";
import Department from "./page/fasteyes/Department.vue";
import FasteyesDevice from "./page/fasteyes/Device.vue";
import FasteyesHistory from "./page/fasteyes/History.vue";
import ElectrostaticHistory from "./page/electrostatic/History.vue";
import ElectrostaticDevice from "./page/electrostatic/Device.vue";
import UnDetectStaff from "./page/electrostatic/UnDetectStaff.vue";
import Nitrogen from "./page/environmental/Nitrogen.vue";
import EnvironmentDeviceEmail from "./page/environmental/Device_Email.vue";
import EnvironmentDeviceNitrogen from "./page/environmental/Device_Nitrogen.vue";
import EnvironmentDeviceTemperatureHumidity from "./page/environmental/Device_TemperatureHumidity.vue";
import TemperatureHumidity from "./page/environmental/TemperatureHumidity.vue";
import IPCam from "./page/IPCam/IPCam.vue";

import Staff from "./page/fasteyes/Staff.vue";
import NotFound from "./page/NotFound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { layout: "empty" ,requiresAuth: false},
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: false}
  },
  {
    path: "/forms",
    name: "Forms",
    component: Forms,
  },
  {
    path: "/cards",
    name: "Cards",
    component: Card,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/tableList",
    name: "TableList",
    component: TableList,
  },
  {
    path: "/ui-elements",
    name: "UIElements",
    component: UIElements,
  },
  {
    path: "/modal",
    name: "Modal",
    component: Modal,
  },
  {
    path: "/blank",
    name: "Blank",
    component: Blank,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    meta: { layout: "main" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/main/group",
    name: "Group",
    component: Group,
    meta: { layout: "main" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/main/management",
    name: "Management",
    component: Management,
    meta: { layout: "main" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/main/bulletin",
    name: "Bulletin",
    component: Bulletin,
    meta: { layout: "main" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/fasteyes/history",
    name: "FasteyesHistory",
    component: FasteyesHistory,
    meta: { layout: "fasteyes" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/fasteyes/device",
    name: "FasteyesDevice",
    component: FasteyesDevice,
    meta: { layout: "fasteyes" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/fasteyes/output",
    name: "DataOutput",
    component: DataOutput,
    meta: { layout: "fasteyes" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/fasteyes/attendance",
    name: "Attendance",
    component: Attendance,
    meta: { layout: "fasteyes" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/fasteyes/attendance/statistics",
    name: "AttendanceStatistics",
    component: AttendanceStatistics,
    meta: { layout: "fasteyes" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  
  {
    path: "/fasteyes/staff",
    name: "Staff",
    component: Staff,
    meta: { layout: "fasteyes" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/fasteyes/staff/:id/history",
    name: "StaffHistory",
    component: StaffHistory,
    meta: { layout: "fasteyes" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/fasteyes/department",
    name: "Department",
    component: Department,
    meta: { layout: "fasteyes" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/electrostatic/device",
    name: "ElectrostaticDevice",
    component: ElectrostaticDevice,
    meta: { layout: "electrostatic" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }

  },
  {
    path: "/electrostatic/history",
    name: "ElectrostaticHistory",
    component: ElectrostaticHistory,
    meta: { layout: "electrostatic" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }

  },
  {
    path: "/electrostatic/UnDetectStaff",
    name: "UnDetectStaff",
    component: UnDetectStaff,
    meta: { layout: "electrostatic" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }

  },
  {
    path: "/ipcam",
    name: "IPCam",
    component: IPCam,
    meta: { layout: "IPCam" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/environment/device/email",
    name: "EnvironmentDeviceEmail",
    component: EnvironmentDeviceEmail,
    meta: { layout: "environmental" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/environment/device/Nitrogen",
    name: "EnvironmentDeviceNitrogen",
    component: EnvironmentDeviceNitrogen,
    meta: { layout: "environmental" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/environment/device/temperature_humidity",
    name: "EnvironmentDeviceTemperatureHumidity",
    component: EnvironmentDeviceTemperatureHumidity,
    meta: { layout: "environmental" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/environment/Nitrogen",
    name: "Nitrogen",
    component: Nitrogen,
    meta: { layout: "environmental" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
  {
    path: "/environment/temperature_humidity",
    name: "TemperatureHumidity",
    component: TemperatureHumidity,
    meta: { layout: "environmental" ,requiresAuth: true},
    beforeEnter: (to, from, next)=> {
      if(to.matched.some(recode =>{
        return recode.meta.requiresAuth
      })) {
        if(!sessionStorage.getItem('token')) {
          next({ name:'Login'})
        } else {
          next()
        }
      } else{
        next()
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
