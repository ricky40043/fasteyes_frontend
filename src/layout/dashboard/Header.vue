<template>
  <header
    class="flex items-center justify-between px-6 py-4 bg-white  border-indigo-600"
    style="background-color=Yellow"
  >
    <div class="flex items-left">
        <!-- <router-link  class="border-bottom-style:dotted"
         :class="[$route.name === 'Dashboard' ? activeClass : inactiveClass]" to="/dashboard">
        <img src="../../assets/SUMI_img/SUMI logo/w.png" hight=30 width=30 />
        </router-link> -->
        <img src="../../assets/SUMI_img/SUMI logo/w.png" hight=30 width=30 />

        <router-link :class="[$route.name === 'Main' ? activeClass : inactiveClass]" to="/main">
          <span class="mx-4">首頁</span>
        </router-link>
        <router-link :class="[$route.name === 'FasteyesHistory' ? activeClass : inactiveClass]" to="/fasteyes/history" v-if="level<=3">
          <span class="mx-4">Fasteyes</span>
        </router-link>
        <!-- <router-link :class="[$route.name === 'ElectrostaticHistory' ? activeClass : inactiveClass]" to="/electrostatic/history">
          <span class="mx-4">靜電環</span>
        </router-link> -->
        <router-link :class="[$route.name === 'IPCam' ? activeClass : inactiveClass]" to="/ipcam">
          <span class="mx-4">IPCam</span>
        </router-link>
        <router-link :class="[$route.name === 'TemperatureHumidity' ? activeClass : inactiveClass]" to="/environment/temperature_humidity">
          <span class="mx-4">環境監控</span>
        </router-link>
      


    </div>

    <div class="flex items-center">
      <div class="flex mx-4 text-gray-600 focus:outline-none">
        <button
          @click="dropdownOpen1 = !dropdownOpen1"
        >
        <img src="../../assets/SUMI_img/icon-14.png" hight=25 width=25 />

        </button>

        <div
          v-show="dropdownOpen1"
          @click="dropdownOpen1 = false"
          class="fixed inset-0 z-10 w-full h-full"
        ></div>

        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-show="dropdownOpen1"
            class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
          >
            <div class="flex items-center justify-center"> 
              <p class="text-xl font-semibold text-gray-700">功能列表</p>
              <br>
              <br>
            </div>
          <hr>
            <div class="flex items-center justify-center"> 
              <h3 class="ti-user"></h3>
              <router-link :class="[$route.name === 'Management' ? activeClass : inactiveClass]" to="/main/management">
                <h5 class="mx-4">帳號管理</h5>
              </router-link>
              <br>
              <br>
            </div>
            <div class="flex items-center justify-center" v-show="level<3"> 
              <h3 class="ti-wheelchair"></h3>
                   <router-link :class="[$route.name === 'Group' ? activeClass : inactiveClass]" to="/main/group">
                <h5 class="mx-4">群組管理</h5>
              </router-link>
              <br>
              <br>
            </div>

            <div class="flex items-center justify-center" v-show="level<3"> 
              <h3 class="ti-comment"></h3>
              <router-link :class="[$route.name === 'Bulletin' ? activeClass : inactiveClass]" to="/main/bulletin">
              <h5 class="mx-4">公告管理</h5>
              </router-link>
              <br>
              <br>
            </div>
          </div>
        </transition>
      </div> 


      <div class="relative">
        <button
          @click="dropdownOpen = !dropdownOpen"

          class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
        >
        <img src="../../assets/SUMI_img/icon-15.png" hight=25 width=25 />

        </button>

        <div
          v-show="dropdownOpen"
          @click="dropdownOpen = false"
          class="fixed inset-0 z-10 w-full h-full"
        ></div>

        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-show="dropdownOpen"
            class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
          >
            <h3 class="block px-4 py-2 text-ssm text-gray-700 hover:bg-indigo-600 hover:text-white">{{name}}</h3>
            <h3 class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">{{email}}</h3>
            <h3 class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white" v-if="level==0">RD</h3>
            <h3 class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white" v-else-if="level==2">Admin</h3>
            <h3 class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white" v-else-if="level==3">HR</h3>
            <h3 class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white" v-else>User</h3>
              <router-link :class="[$route.name === 'Management' ? activeClass : inactiveClass]" to="/main/management">
                <h4 class="mx-4">帳號管理</h4>
              </router-link>
            <!-- <router-link to="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">
              登出
            </router-link> -->
            <div class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white" @click="logoutClick">
              登出
            </div>
          </div>
        </transition>
      </div>
    </div>
    <!-- <button :disabled="!isNamePresent" @click="submitName">Submit</button> -->
  </header>
</template>

<script setup lang="ts">

import { useStore} from "vuex";
import { ref, onMounted} from "vue";
import { useRouter } from 'vue-router'
// import func from "../../../vue-temp/vue-editor-bridge";
import { useSidebar } from "../../hooks/useSidebar";
import { getUerInfo } from "../../untils/api.js";
const dropdownOpen1 = ref(false);
const dropdownOpen = ref(false);
const { isOpen } = useSidebar();
const activeClass = ref(
  "bg-gray-400 bg-opacity-25 text-gray-100 border-gray-500"
)
const inactiveClass = ref(
  "border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
)
let name = ref('Name')
let email = ref('email')
let level = ref(-1)
const router = useRouter()
const store = useStore()
async function getinfo(){
  await getUerInfo().then((res)=>{
            let UserData = Object.assign(res.data)
            name.value = UserData.name
            email.value = UserData.email
            level.value = parseInt(UserData.level) 
          })
}
function logoutClick(){
  sessionStorage.clear()
  router.push({name: 'Login'})
}
onMounted(async () => {
    if(sessionStorage.getItem("state")){
    let sessionStorageData = JSON.parse(sessionStorage.getItem("state")) 
    store.replaceState(Object.assign({},store.state, sessionStorageData))
    // this.$store.dispatch('setToken', sessionStorageData)
  }
  window.addEventListener('beforeunload', ()=>{
    sessionStorage.removeItem('state')
    sessionStorage.setItem('state', JSON.stringify(store.state))
  })
  await getinfo()
});
</script>


<style scoped>
header{
  width: 100%;
  position: relative;
  background-color: rgba(47, 49, 62, 1);
}
span{
  color: white;
}
</style>