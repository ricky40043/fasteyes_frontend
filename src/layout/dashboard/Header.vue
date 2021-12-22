<template>
  <header
    class="flex items-center justify-between px-6 py-4 bg-white  border-indigo-600"
    style="background-color=Yellow"
  >
    <div class="flex items-left">
      <div class="flex mx-3 text-gray-600 focus:outline-none">
        <router-link :class="[$route.name === 'Dashboard' ? activeClass : inactiveClass]" to="/dashboard">
        <img src="../../assets/SUMI_img/SUMI logo/w.png" hight=30 width=30 />
        </router-link>
        <!-- <router-link :class="[$route.name === 'Main' ? activeClass : inactiveClass]" to="/main">
        <img src="../../assets/SUMI_img/SUMI logo/w.png" hight=30 width=30 />
        </router-link> -->
      </div>
      <div class="flex mx-3 text-gray-600 focus:outline-none">             
        <router-link :class="[$route.name === 'Main' ? activeClass : inactiveClass]" to="/main">
          <span class="mx-4">首頁</span>
        </router-link>
      </div>
            <div class="flex mx-3 text-gray-600 focus:outline-none">             
        <router-link :class="[$route.name === 'FasteyesHistory' ? activeClass : inactiveClass]" to="/fasteyes/history">
          <span class="mx-4">Fasteyes</span>
        </router-link>
      </div>
            <div class="flex mx-3 text-gray-600 focus:outline-none">             
        <router-link :class="[$route.name === 'ElectrostaticHistory' ? activeClass : inactiveClass]" to="/electrostatic/history">
          <span class="mx-4">靜電環</span>
        </router-link>
      </div>
            <div class="flex mx-3 text-gray-600 focus:outline-none">             
        <router-link :class="[$route.name === 'Ipcam' ? activeClass : inactiveClass]" to="/ipcam">
          <span class="mx-4">IPCam</span>
        </router-link>
      </div>
            <div class="flex mx-3 text-gray-600 focus:outline-none">             
        <router-link :class="[$route.name === 'TemperatureHumidity' ? activeClass : inactiveClass]" to="/environment/temperature_humidity">
          <span class="mx-4">環境監控</span>
        </router-link>
      </div>
      


    </div>

    <div class="flex items-center">
      <!-- <button class="flex mx-4 text-gray-600 focus:outline-none">
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button> -->

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
                <h3 class="mx-4">帳號管理</h3>
              </router-link>
              <br>
              <br>
            </div>

            <div class="flex items-center justify-center"> 
              <h3 class="ti-wheelchair"></h3>
                   <router-link :class="[$route.name === 'Group' ? activeClass : inactiveClass]" to="/main/group">
                <h3 class="mx-4">群組管理</h3>
              </router-link>
              <br>
              <br>
            </div>

            <div class="flex items-center justify-center"> 
              <h3 class="ti-comment"></h3>
              <router-link :class="[$route.name === 'Bulletin' ? activeClass : inactiveClass]" to="/main/bulletin">
              <h3 class="mx-4">公告管理</h3>
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
            <h3 class="block px-4 py-2 text-ssm text-gray-700 hover:bg-indigo-600 hover:text-white">Ricky</h3>
            <h3 class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Ricky@fastwis.net</h3>
            <h3 class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Admin</h3>
              <router-link :class="[$route.name === 'Management' ? activeClass : inactiveClass]" to="/main/management">
                <h3 class="mx-4">帳號管理</h3>
              </router-link>
            <router-link
              to="/"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
              >登出</router-link
            >
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSidebar } from "../../hooks/useSidebar";

const dropdownOpen1 = ref(false);
const dropdownOpen = ref(false);
const { isOpen } = useSidebar();
const activeClass = ref(
  "bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100"
);
const inactiveClass = ref(
  "border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
);
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