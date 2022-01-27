<template>
    <!-- <teleport to="#destination" :disabled="disableTeleport">
      <Addtemperaturehumidity ref="modal" 
      @addDevice="init"/>
    </teleport>
    <teleport to="#destination" :disabled="disableTeleport">
      <Settingtemperaturehumidity ref="settingmodal" 
      :selectDeviceData="select_device" 
      @saveDevice="init"
      @deleteDevice="init"
      />
    </teleport> -->


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
          <span>區域：</span>
          <div id="device" class="flex items-center justify-center">
            <select v-model="select_area" class="device_block_text" @change="init">
              <option value="-1">所有區域</option>
              <option v-for="area in area_list" :value="area" :key="area">{{area.name}}</option>
            </select>
          </div>
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
                    裝置類型
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="u in DeviceTableData" :key="u.id">
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.device_name }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.device_serial_number }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap" v-if="u.device_model_id==1">溫濕度感應器</p>
                    <p class="text-gray-900 whitespace-nowrap" v-else-if ="u.device_model_id==2">IP Cam</p>
                    <p class="text-gray-900 whitespace-nowrap" v-else-if="u.device_model_id==3">靜電環</p>
                    <p class="text-gray-900 whitespace-nowrap" v-else-if="u.device_model_id==4">氮氣機</p>
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
import {getAllDevice, get_area} from "../../untils/api.js"
// import store from "../../store"
// import Addtemperaturehumidity from "../../components/temperature_humidity/Addtemperaturehumidity.vue"
// import Settingtemperaturehumidity from "../../components/temperature_humidity/Settingtemperaturehumidity.vue"
// import { ref } from 'vue';

export default {
  // components:{
  //   Addtemperaturehumidity,
  //   Settingtemperaturehumidity
  // },
  data (){
    return{
      DeviceTableData:[],
      area_list:[],
      page:1,
      total:1,
      page_size:10,
      page_total:1,
      search_text:"",
      select_area:-1,
      showModal: false,
    }
  },
  methods: {
    async getArea(){
      this.area_list = []
      await get_area().then((res)=>{
        let Arealist = Object.assign(res.data)
        Arealist.forEach(Data =>{
          let area = {}
          area.name = Data.name  
          area.send_mail = Data.send_mail  
          area.id = Data.id
          this.area_list.push(area)
        });
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
    this.DeviceTableData=[]
    let areaName = ""
    if(this.select_area !=-1){
      areaName = this.select_area.name
    }
    await getAllDevice(-1, this.page, this.page_size, areaName).then((res)=>{
      this.total = res.data.total
      this.page_total = Math.ceil(this.total/this.page_size)
      let devicelist = res.data.items
      devicelist.forEach(Data => {
        let device = {}
        device.device_id = Data.id
        device.device_name = Data.name
        device.device_serial_number = Data.serial_number
        device.device_model_id = Data.device_model_id
        device.x = Data.info.position_x
        device.y = Data.info.position_y
        this.DeviceTableData.push(device)
      });
    })
    },
    doSome(res) {
      console.log(success)
    }
  },
  async beforeMount() {
    await this.getArea()
    await this.init()
  },
  watch:{
    page_size(){
      this.init()
    }
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
  // setup() {
  //   const disableTeleport = ref(false)   
    
  //   const modal = ref(null);
  //   const settingmodal = ref(null);
    
  //   function addDeviceClick(){
  //     modal.value.show()
  //     // this.showModal = true
  //   }
  //   function showSettingModal(){
  //     settingmodal.value.show()
  //     // this.showModal = true
  //   }

  //   return {
  //     disableTeleport,
  //     addDeviceClick ,
  //     showSettingModal,
  //     modal,
  //     settingmodal
  //   }
  // },
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



