<template>
    <teleport to="#destination" :disabled="disableTeleport">
      <AddIPCam ref="modal" 
      @addDevice="init"/>
    </teleport>
    <teleport to="#destination" :disabled="disableTeleport">
      <SettingIPCam ref="settingmodal" 
      :selectDeviceData="select_device" 
      @saveDevice="init"
      @deleteDevice="init"
      />
    </teleport>
  <div id="upbutton">
      <div class="mt-4" >
        <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
          <!-- <div id="time">
            <div class="relative mx-4 lg:mx-0" style="width= 100%">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>

              <input
                class="pl-10 pr-4 border-gray-200 rounded-md"
                style="width: 100%;"
                type="text"
                placeholder="以裝置名稱或其ID搜尋"
              />
          </div>
        </div> -->

            <button class="device_set_button" @click="addDeviceClick" v-if="level<=2">
                新增裝置
            </button>
        </div>
      </div>
  </div>
  <div class="flex items-center">
    一頁總數：
    <input type="number" v-model="page_size" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-20">
  </div>
  <div>
    <div class="mt-8">
      <div class="mt-6">
        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div
            class="inline-block min-w-full overflow-hidden rounded-lg shadow"
          >
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    裝置名稱
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    裝置編號
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    裝置位置
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    串流名稱
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    IP
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    PORT
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200" v-if="level<=2">
                    管理
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(u, index) in IPCam_DeviceTableData" :key="index">
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.device_name }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.device_serial_number }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.area }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.stream_name }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.ip }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.port }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200 text-indigo-600 hover:text-indigo-900" v-if="level<=2">
                    <button @click="settingDevice(u)">管理</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between"
            >
              <span class="text-xs text-gray-900 xs:text-sm">Showing {{page}} to {{page_total}} of {{page_size}} Entries</span>

              <div class="inline-flex mt-2 xs:mt-0">
                <button class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400" v-on:click="decrement">
                  Prev
                </button>
                <button class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400" v-on:click="increment">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
// import { ref, onMounted } from 'vue'
import { getAllDevice, getUerInfo} from "../../untils/api.js"
import store from "../../store"
import AddIPCam from "../../components/IpCam/AddIPCam.vue"
import SettingIPCam from "../../components/IpCam/SettingIPCam.vue"
import { ref } from 'vue';

export default {
  components:{
    AddIPCam,
    SettingIPCam
  },
  data (){
    return{
      IPCam_DeviceTableData:[],
      page:1,
      total:1,
      page_size:50,
      page_total:1,
      search_text:"",
      select_device:"",
      showModal: false,
      level: 100
    }
  },
  methods: {
    async getUser () {
      await getUerInfo().then((res)=>{
          let UserData = Object.assign(res.data)
          this.level = UserData.level
        })
    },
    increment(){
      if(this.page<this.page_total)
      {
        this.page++
        this.init()
      }
    },
    decrement(){
      if(this.page>1)
      {
        this.page--
        this.init()
      }
    },
    search_event(){
      console.log(this.search_text) 
    },
    settingDevice(input){
      this.select_device = input
      this.showSettingModal()
    },
    async init(){
      // create Device Map 
      let device_model = 2
      await getAllDevice(device_model, this.page, this.page_size).then((res)=>{
        console.log(res.data.items)
        this.devicelist = Object.assign(res.data.items)
        this.total = res.data.total
        this.page_total = Math.ceil(this.total/this.page_size)
        this.IPCam_DeviceTableData = []
        this.devicelist.forEach(Data => {
          let device={}
          device.device_id = Data.id
          device.device_name = Data.name
          device.device_serial_number = Data.serial_number
          device.area = Data.area
          device.stream_name = Data.info.stream_name  
          device.ip = Data.info.ip  
          device.port = Data.info.port  
          device.username = Data.info.username 
          device.password = Data.info.password 
          this.IPCam_DeviceTableData.push(device)
        });
      })
    },
  },
  beforeMount() {
    this.getUser()
    this.init()
  },
  created() {
    if(sessionStorage.getItem("state")){
      let sessionStorageData = JSON.parse(sessionStorage.getItem("state")) 
      this.$store.replaceState(Object.assign({},this.$store.state, sessionStorageData))
    }
    window.addEventListener('beforeunload', ()=>{
      sessionStorage.removeItem('state')
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    })
  },
  watch:{
    page_size(){
      this.init()
    }
  },
  setup() {
    const disableTeleport = ref(false)   
    
    const modal = ref(null);
    const settingmodal = ref(null);
    
    function addDeviceClick(){
      modal.value.show()
      this.showModal = true
    }
    function showSettingModal(){
      settingmodal.value.show()
      this.showModal = true
    }

    return {
      disableTeleport,
      addDeviceClick ,
      showSettingModal,
      modal,
      settingmodal
    }
  },
};
</script>




<style scoped>
#time{
  /* background-color: Red; */
  width: 88%;
}
#device{
  /* background-color: blue; */
  width: 16%;
}
#setbutton{
  /* background-color: green; */
  width: 40%;
}
#switchbutton{
  width: 30%;
}
.searchinput{
  width: 60%;
}
.outputbutton{
  width: 10%;
  align-content: left;
}

.time_block_text{
  font-size: 14px;
  /* font-weight: bold; */
  color: black;
  /* background-color: gray; */
  border-radius: 6px;
  padding: 2px 8px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  align-content: center;
}
.device_block_text{
  font-size: 14px;
  /* font-weight: bold; */
  color: black;
  border-radius: 6px;
  padding: 3px 30px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-content: center;
}
.device_set_button{
  font-size: 14px;
  /* font-weight: bold; */
  color: white;
  border-radius: 6px;
  padding: 5px 30px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-content: center;
  background-color: rgba(79, 134, 202, 1);
}
.device_comfirm_button{
  font-size: 14px;
  /* font-weight: bold; */
  color:rgba(79, 134, 202, 1);
  border-radius: 6px;
  padding: 3px 30px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-content: center;
  background-color: white;
  border-style:solid;
  border-width:2px;
  border-color:#4F86CA;
}

.device_all_button{
  font-size: 14px;
  /* font-weight: bold; */
  color:rgba(79, 134, 202, 1);
  border-radius: 6px;
  padding: 3px 30px;
  display: flex;
  align-content: center;
  background-color: white;
  border-style:solid;
  border-width:2px;
  border-color:#4F86CA;
}
.device_normal_button{
  font-size: 14px;
  /* font-weight: bold; */
  color:rgba(79, 134, 202, 1);
  border-radius: 6px;
  padding: 3px 30px;
  display: flex;
  align-content: center;
  background-color: white;
  border-style:solid;
  border-width:2px;
  border-color:#4F86CA;
}
.device_abnormal_button{
  font-size: 14px;
  /* font-weight: bold; */
  color:rgba(79, 134, 202, 1);
  border-radius: 6px;
  padding: 3px 30px;
  display: flex;
  align-content: center;
  background-color: white;
  border-style:solid;
  border-width:2px;
  border-color:#4F86CA;
}
#search{
  width: 100%;
  min-width: 400px;
  height: 100%;
  min-height: 40px;
  position: relative;
  background-color: white;
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  padding: 20px 0px;
}
</style>



