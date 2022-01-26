<template>
  <div id="downData">
    <div class="mt-8">
      <div class="mt-6">
        <!-- <h2 class="text-xl font-semibold leading-tight text-gray-700">溫濕度感應器</h2> -->
      <div class="mt-4" >
        <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
          <div id="time" class="flex items-center justify-center">
  
            <input id="start_date" type="date" class="time_block_text" v-model="start_date">
            <input id="start_time" type="time" class="time_block_text" v-model="start_time">
            <p> ~ </p>
            <input id="end_date" type="date" class="time_block_text" v-model="end_date">
            <input id="end_time" type="time" class="time_block_text" v-model="end_time">
          </div>
          <div id="device" class="flex items-center justify-center">
            <select v-model="select_device" class="device_block_text">
              <option value="-1">所有裝置</option>
              <option v-for="device in device_list" :value="device.id" :key="device.name">{{device.name}}</option>
            </select>
          </div>
          <div id="setbutton" class="focus:outline-none focus:bg-indigo-500 flex items-center justify-center">
            <button class="device_set_button " v-on:click="enter">
                確認
            </button>
            <button class="device_comfirm_button" v-on:click="reset">
                重置
            </button>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">

          <div id="switchbutton">
            <div class="focus:bg-indigo-500 flex items-center justify-center">
              <button :class="[ select_status===-1 ? 'device_set_button' : 'device_comfirm_button' ]" v-on:click="select_all">
                  全部
              </button>
              <button :class="[ select_status===0 ? 'device_set_button' : 'device_comfirm_button'  ]" v-on:click="select_normal">
                  正常
              </button>
              <button :class="[ select_status===1 ? 'device_set_button' : 'device_comfirm_button'  ]" v-on:click="select_abnormal">
                  異常
              </button>
            </div>
          </div>
          <div id="searchinput">
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
              class="w-32 pl-10 pr-4 text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              type="text"
            placeholder="以位置搜尋"
            v-model="search_text"
            @change="search_event"
            />
          </div>
          </div>
          <div id="outputbutton" @click="getTHObservationOutput()">
            <button class="device_abnormal_button">
              輸出 .csv
            </button>
          </div>
          
        </div>
      </div>
        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8 tableout">
          <div
            class="inline-block min-w-full overflow-hidden rounded-lg shadow"
          >
            <div class="flex flex-col items-center ">
              <div class="inline-flex mt-2 xs:mt-0">
                <button class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400" v-on:click="decrement">
                  Prev
                </button>
                <button class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400" v-on:click="increment">
                  Next
                </button>
              </div>
            </div>
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
                    測量時間
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    溫度
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    濕度
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    類型
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(u, index) in temperature_humidity_ObservationTableData" :key="index">
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
                    <p class="text-gray-900 whitespace-nowrap">{{ u.time }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap" v-if="u.alarm_temperature == 0">{{ u.temperature }}°C</p>
                    <p class="text-gray-900 whitespace-nowrap" style="color:red;" v-else>{{ u.temperature }}°C</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap" v-if="u.alarm_humidity == 0">{{ u.humidity }}％</p>
                    <p class="text-gray-900 whitespace-nowrap" style="color:red;" v-else>{{ u.humidity }}％</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap" v-if="u.alarm_temperature == 0 && u.alarm_humidity == 0 && u.status == 0 ">正常</p>
                    <p class="text-red-600 whitespace-nowrap" v-else-if="u.status == 3 ">資料遺失</p>
                    <p class="text-red-600 whitespace-nowrap" v-else-if="u.alarm_temperature == 0 && u.alarm_humidity == 1 ">濕度異常</p>
                    <p class="text-red-600 whitespace-nowrap" v-else-if="u.alarm_temperature == 1 && u.alarm_humidity == 0 ">溫度異常</p>
                    <p class="text-red-600 whitespace-nowrap" v-else-if="u.alarm_temperature == 1 && u.alarm_humidity == 1 ">溫濕度異常</p>
                    <p class="text-red-600 whitespace-nowrap" v-else-if="u.status == 2 ">裝置異常</p>
                    <p class="text-red-600 whitespace-nowrap" v-else>異常</p>
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

<script type="text/javascript">
// import { ref, onMounted } from 'vue'
import moment from 'moment';
import { getDevice_ModelObservation, getDevice_ModelObservation_data, getAllDevice} from "../../untils/api.js"
import store from "../../store"
export default {
  data (){
    return{
      temperature_humidity_ObservationTableData:[],
      device_Map: new Map(),
      page: 1,
      total: 1,
      page_size: 50,
      page_total: 1,
      start_date: "",
      start_time: "00:00:00",
      end_date:"",
      end_time: "23:59:59",
      select_status: -1,
      search_text: "",
      device_list:[],
      select_device: -1,
      timer: window.setInterval(() => { this.getTHObservation () }, 10000),
    }
  },
  methods: {
    async getTHObservation(){
      let device_model = 1
      let start_time = this.start_date+"T"+this.start_time
      let end_time = this.end_date+"T"+this.end_time
      await getDevice_ModelObservation(device_model,this.page,this.page_size, this.select_status,start_time,end_time,this.select_device,this.search_text).then((res)=>{
        let observationlist = Object.assign(res.data.items)
        this.total = Object.assign(res.data.total)
        this.page_total = Math.ceil(this.total/this.page_size)
        this.temperature_humidity_ObservationTableData = []

        observationlist.forEach(observation =>{
          let observation_data = {}
          observation_data.device_name = this.device_Map.get(observation.device_id).name
          observation_data.device_serial_number = this.device_Map.get(observation.device_id).serial_number
          observation_data.area = this.device_Map.get(observation.device_id).area
          let datetime = moment(observation.created_at, "YYYY-MM-DDThh:mm:ss:SSSSSS")
          observation_data.time = datetime.format('YYYY-MM-DD HH:mm:ss')
          observation_data.temperature = observation.info.temperature  
          observation_data.humidity = observation.info.humidity  
          observation_data.status = observation.info.status  
          observation_data.alarm_temperature = observation.info.alarm_temperature  
          observation_data.alarm_humidity = observation.info.alarm_humidity  
          this.temperature_humidity_ObservationTableData.push(observation_data)
        });
      }) 
    },
    async getTHObservationOutput(){
      let device_model = 1
      let start_time = this.start_date+"T"+this.start_time
      let end_time = this.end_date+"T"+this.end_time
      let FILE = await getDevice_ModelObservation_data(device_model, this.select_status,start_time,end_time,this.search_text).then((res)=>{
        return Object.assign(res.data)
      }) 
      if (FILE) {
         const anchor = document.createElement('a');
          anchor.href = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(FILE);
          anchor.target = '_blank';
          anchor.download = this.start_date+'-'+this.end_date+'輸出報表.csv';
          anchor.click();
      } else 
        console.log('none')
    },
    async get_all_device(){
      // create Device Map 
      this.device_list= []
      let device_model = 1
      await getAllDevice(device_model).then((res)=>{
        this.devicelist = Object.assign(res.data)
        this.devicelist.forEach(Data => {
          this.device_Map.set(Data.id, Object.assign(Data))
          let device = {}
          device.name = Data.name 
          device.id = Data.id
          this.device_list.push(device)
        });
      })
    },
    getnowTime() {
      // var currentdate = new Date(); 
      // let h = currentdate.getHours();
      // let H = h>9?h:"0"+h;
      // let m = currentdate.getMinutes();
      // let M = m>9?m:"0"+m; 
      // let s = currentdate.getSeconds();
      // let S = s>9?s:"0"+s;
      // this.current_time = H + ":" + M + ":" +S; 
      var d = Date(Date.now()); 
      return currentdate.getTime()
    },
    increment(){
      if(this.page<this.page_total)
      {
        this.page++
        this.getTHObservation()
      }
    },
    decrement(){
      if(this.page>1)
      {
        this.page--
        this.getTHObservation()
      }
    },
    enter(){
      this.getTHObservation()
    },
    reset(){
      let nowTime = new Date()
      let date = nowTime.getDate()-10>=0?nowTime.getDate():"0"+nowTime.getDate()
      let month = nowTime.getMonth()+1-10>=0?nowTime.getMonth()+1:"0"+(nowTime.getMonth()+1)
      this.start_date = nowTime.getFullYear()+"-"+month+"-"+date
      this.start_time = "00:00:00"
      this.end_date = nowTime.getFullYear()+"-"+month+"-"+date
      this.end_time = "23:59:59"
      this.search_text=""
      this.select_status=-1
      this.getTHObservation()
    },
    select_all(){
      this.select_status = -1
      this.isActive = true
      this.getTHObservation()
    },
    select_normal(){
      this.select_status = 0
      this.isActive = false

      this.getTHObservation()
    },
    select_abnormal(){
      this.select_status = 1
      this.isActive = false
      this.getTHObservation()
    },
    search_event(){
      // console.log(this.search_text) 
    },
  },
  beforeMount() {
    this.get_all_device()
    this.reset()
  },
  beforeUnmount(){
    window.clearInterval(this.timer)
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
  }
};
</script>

<style scoped>
#time{
  /* background-color: Red; */
  width: 60%;
}
#device{
  /* background-color: blue; */
  width: 16%;
}
#setbutton{
  /* background-color: green; */
  width: 24%;
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