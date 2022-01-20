import { createApp } from 'vue';
import App from './App.vue';
import store from "./store";
import router from './router';
import './assets/main.css';
import './assets/css/themify-icons.css';
import "./assets/sass/paper-dashboard.scss";
import 'font-awesome/css/font-awesome.min.css';

import DashboardLayout from './layout/dashboard/DashboardLayout.vue';
import MainDashboardLayout from './layout/main/MainDashboardLayout.vue';
import ElectrostaticDashboardLayout from './layout/electrostatic/ElectrostaticDashboardLayout.vue';
import EnvironmentalDashboardLayout from './layout/environmental/EnvironmentalDashboardLayout.vue';
import FasteyesDashboardLayout from './layout/fasteyes/FasteyesDashboardLayout.vue';
import IPCamDashboardLayout from './layout/IPCam/IPCamDashboardLayout.vue';
import AreaDashboardLayout from './layout/area/AreaDashboardLayout.vue';
import EmptyLayout from './layout/dashboard/EmptyLayout.vue';

const app = createApp(App);

app.component('default-layout', DashboardLayout);
app.component('main-layout', MainDashboardLayout);
app.component('electrostatic-layout', ElectrostaticDashboardLayout);
app.component('environmental-layout', EnvironmentalDashboardLayout);
app.component('fasteyes-layout', FasteyesDashboardLayout);
app.component('IPCam-layout', IPCamDashboardLayout);
app.component('empty-layout', EmptyLayout);
app.component('area-layout', AreaDashboardLayout);

app.use(router);
app.use(store);
app.mount('#app');
