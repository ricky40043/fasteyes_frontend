<template>
    <teleport to="#destination" :disabled="disableTeleport">
      <Addtemperaturehumidity ref="modal" 
      @addDevice="init"/>
    </teleport>
    <teleport to="#destination" :disabled="disableTeleport">
      <Settingtemperaturehumidity ref="settingmodal" 
      :selectDeviceData="select_device" 
      @saveDevice="init"
      @deleteDevice="init"
      />
    </teleport>
  <div id="upbutton">
        <div class=" px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
          <div id="setbutton" class=" flex items-center" @click="getTHDevice">
            <router-link class="device_set_button"
              to="/environment/device/temperature_humidity">
                溫濕度感應器
            </router-link>
            <router-link class="device_comfirm_button"              
              to="/environment/device/Nitrogen">
                氮氣產生機
            </router-link>
            <router-link class="device_comfirm_button"              
              to="/environment/device/email">
                Email通知
            </router-link>
          </div>
        </div>
      <div class="mt-4" >
        <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
          <div id="time">
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
          </div>
            <button class="device_set_button" @click="addDeviceClick" v-if="level<=2">
                新增裝置
            </button>
        </div>
      </div>
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
                    溫度正常範圍
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    濕度正常範圍
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    電池
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    狀態
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200" v-if="level<=2">
                    管理
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="u in temperature_humidity_DeviceTableData" :key="u.id">
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
                    <p class="text-gray-900 whitespace-nowrap">{{ u.temperature_lower_limit }}°C~{{ u.temperature_upper_limit }}°C</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.humidity_lower_limit }}%~{{ u.humidity_upper_limit }}%</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap" style="color:red;" v-if="u.battery ==-1">無資料</p>
                    <p class="text-gray-900 whitespace-nowrap" v-else-if="u.battery > 10">{{ u.battery }}%</p>
                    <p class="text-gray-900 whitespace-nowrap" style="color:red;" v-else>{{ u.battery }}%</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap" v-if="u.status == 0">正常</p>
                    <p class="text-gray-900 whitespace-nowrap" style="color:red;" v-else>異常</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200 text-indigo-600 hover:text-indigo-900"  v-if="level<=2">
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
import { getLatestDeviceObservation, getAllDevice, getUerInfo} from "../../untils/api.js"
import store from "../../store"
import Addtemperaturehumidity from "../../components/temperature_humidity/Addtemperaturehumidity.vue"
import Settingtemperaturehumidity from "../../components/temperature_humidity/Settingtemperaturehumidity.vue"
import { ref } from 'vue';

export default {
  components:{
    Addtemperaturehumidity,
    Settingtemperaturehumidity
  },
  data (){
    return{
      temperature_humidity_DeviceTableData:[],
      TH_Data_list:[],
      device_Map: new Map(),
      device_observation_Map: new Map(),
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
    getTHDevice(){
      this.temperature_humidity_DeviceTableData=[]
      this.device_Map.forEach(Data =>{
        let device = {}
        device.device_id = Data.id
        device.device_name = Data.name
        device.device_serial_number = Data.serial_number
        device.area = Data.area
        device.interval_time = Data.info.interval_time
        device.temperature_lower_limit = Data.info.alarm_temperature_lower_limit  
        device.temperature_upper_limit = Data.info.alarm_temperature_upper_limit  
        device.humidity_lower_limit = Data.info.alarm_humidity_lower_limit  
        device.humidity_upper_limit = Data.info.alarm_humidity_upper_limit  
        device.battery = this.device_observation_Map.get(Data.id)!=undefined ? this.device_observation_Map.get(Data.id).info.battery : -1
        if (this.device_observation_Map.get(Data.id)==undefined)
          device.status = 1
        else{
          if(this.device_observation_Map.get(Data.id).info.alarm_temperature || this.device_observation_Map.get(Data.id).info.alarm_temperature )
            device.status = 1
          else
            device.status = 0
        }

        this.temperature_humidity_DeviceTableData.push(device)
      })
    },
    async getTHObservation(){
      this.TH_Data_list = []
      await getLatestDeviceObservation().then((res)=>{
            let observation = Object.assign(res.data)
            this.TH_Data_list = observation
            this.TH_Data_list.forEach(Data => {
              this.device_observation_Map.set(Data.device_id, Object.assign(Data))
            });
        })
    },
    increment(){
      if(this.page<this.page_total)
      {
        this.page++
        this.getTHDevice()
      }
    },
    decrement(){
      if(this.page>1)
      {
        this.page--
        this.getTHDevice()
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
      this.device_Map = new Map()
      let device_model = 1
      await getAllDevice(device_model).then((res)=>{
        this.devicelist = res.data
        this.devicelist.forEach(device => {
          this.device_Map.set(device.id, Object.assign(device))
        });
      })
      await this.getTHDevice()
      await this.getTHObservation()
    },
    doSome(res) {
      console.log(success)
    }
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



