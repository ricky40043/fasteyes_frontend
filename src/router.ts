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
    meta: { layout: "empty" },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
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
    meta: { layout: "main" }
  },
  {
    path: "/main/group",
    name: "Group",
    component: Group,
    meta: { layout: "main" }
  },
  {
    path: "/main/management",
    name: "Management",
    component: Management,
    meta: { layout: "main" }
  },
  {
    path: "/main/bulletin",
    name: "Bulletin",
    component: Bulletin,
    meta: { layout: "main" }
  },
  {
    path: "/fasteyes/history",
    name: "FasteyesHistory",
    component: FasteyesHistory,
    meta: { layout: "fasteyes" }
  },
  {
    path: "/fasteyes/device",
    name: "FasteyesDevice",
    component: FasteyesDevice,
    meta: { layout: "fasteyes" }
  },
  {
    path: "/fasteyes/output",
    name: "DataOutput",
    component: DataOutput,
    meta: { layout: "fasteyes" }
  },
  {
    path: "/fasteyes/attendance",
    name: "Attendance",
    component: Attendance,
    meta: { layout: "fasteyes" }
  },
  {
    path: "/fasteyes/staff",
    name: "Staff",
    component: Staff,
    meta: { layout: "fasteyes" }
  },
  {
    path: "/fasteyes/department",
    name: "Department",
    component: Department,
    meta: { layout: "fasteyes" }
  },
  {
    path: "/electrostatic/device",
    name: "ElectrostaticDevice",
    component: ElectrostaticDevice,
    meta: { layout: "electrostatic" }

  },
  {
    path: "/electrostatic/history",
    name: "ElectrostaticHistory",
    component: ElectrostaticHistory,
    meta: { layout: "electrostatic" }

  },
  {
    path: "/electrostatic/UnDetectStaff",
    name: "UnDetectStaff",
    component: UnDetectStaff,
    meta: { layout: "electrostatic" }

  },
  {
    path: "/ipcam",
    name: "IPCam",
    component: IPCam,
    meta: { layout: "IPCam" }
  },
  {
    path: "/environment/device/email",
    name: "EnvironmentDeviceEmail",
    component: EnvironmentDeviceEmail,
    meta: { layout: "environmental" }
  },
  {
    path: "/environment/device/Nitrogen",
    name: "EnvironmentDeviceNitrogen",
    component: EnvironmentDeviceNitrogen,
    meta: { layout: "environmental" }
  },
  {
    path: "/environment/device/temperature_humidity",
    name: "EnvironmentDeviceTemperatureHumidity",
    component: EnvironmentDeviceTemperatureHumidity,
    meta: { layout: "environmental" }
  },
  {
    path: "/environment/Nitrogen",
    name: "Nitrogen",
    component: Nitrogen,
    meta: { layout: "environmental" }
  },
  {
    path: "/environment/temperature_humidity",
    name: "TemperatureHumidity",
    component: TemperatureHumidity,
    meta: { layout: "environmental" }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
