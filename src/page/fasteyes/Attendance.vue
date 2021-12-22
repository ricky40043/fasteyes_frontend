<template>
  <div id="select">
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
              <option v-for="device in Fasteyes_DeviceList" :value="device.id" :key="device.name">{{device.name}}</option>
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
  </div>
  <div id="data">
    <div id="upnormal">
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
            placeholder="以裝置名稱或其ID搜尋"
            v-model="search_text"
            @change="search_event"
            />
          </div>
          </div>
          <!-- <div id="outputbutton">
            <button class="device_abnormal_button">
              輸出 .csv
            </button>
          </div> -->
          
        </div>
      </div>
    </div>
    <div>
      <div>
        <vue-echarts :option="option" style="height: 400px" ref="chart" />
      </div>
    </div>
    <div class="mt-8">
      <div class="mt-6">
        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
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

          <h5 align="center" v-if="select_date!=''">{{ select_date }} 出勤紀錄</h5>
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    部門
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    ID
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    人員
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    最早時間
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    體溫
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    最晚時間
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    體溫
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    狀態
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(u, index) in fasteyes_AttendanceTableData" :key="index">
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.department }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.serial_number }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.staff }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap" style="color:red;"  v-if="u.checkin=='Invalid date'">無資料</p>
                    <p class="text-gray-900 whitespace-nowrap" v-else>{{ u.checkin }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap" style="color:red;"  v-if="u.checkin=='Invalid date'">無資料</p>
                    <p class="text-gray-900 whitespace-nowrap" v-else-if="u.checkin_result == false">{{ u.checkin_temperature }}°C</p>
                    <p class="text-gray-900 whitespace-nowrap" style="color:red;" v-else>{{ u.checkin_temperature }}°C</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap" style="color:red;" v-if="u.checkout=='Invalid date'">無資料</p>
                    <p class="text-gray-900 whitespace-nowrap">{{ u.checkout }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap" style="color:red;" v-if="u.checkout=='Invalid date'">無資料</p>
                    <p class="text-gray-900 whitespace-nowrap" v-else-if="u.checkout_result == false">{{ u.checkout_temperature }}°C</p>
                    <p class="text-gray-900 whitespace-nowrap" style="color:red;" v-else>{{ u.checkout_temperature }}°C</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap" v-if="u.checkin_result == false && u.checkout_result == false">正常</p>
                    <p class="text-gray-900 whitespace-nowrap" style="color:red;" v-else>異常</p>
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
import { getFasteyes_Attendance, getFasteyes_AttendanceLineChart, getFasteyesDevice} from "../../untils/api.js"
import store from "../../store"
import moment from 'moment'
import { VueEcharts } from "vue3-echarts";
export default {
  components: {
    VueEcharts,
  },
  data (){
    let fasteyes_AttendanceTableData=[]
    let page = 1
    let total = 1
    let page_size = 1
    let page_total = 1
    let start_date = ""
    let start_time = "00:00:00"
    let end_date = ""
    let end_time = "23:59:59"
    let select_status = -1
    let search_text = ""
    let select_date = ""
    return{
      fasteyes_AttendanceTableData,
      page,
      total,
      page_size,
      page_total,
      start_date,
      start_time,
      end_date,
      end_time,
      select_status,
      search_text,
      select_date,
      Fasteyes_DeviceList: [],
      select_device: -1,
      timer: window.setInterval(() => { 
          this.getfasteyes_Attendance ()
          this.getfasteyesAttendanceLineChart()
        }, 10000),
      time_intervalData:[1,2,3,4,5,6,7,8],
      work_staff:[1,2,3,4,5,6,7,8],
    }
  },
  computed: {
    option() {
      return {
        title: {
          text: "出勤統計折線圖",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["aaa", "bbb", "ccc", "ddd", "eee"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.time_intervalData,
          name:"時間"
        },
        yAxis: {
          type: "value",
          name:"人數"
        },
        series: [
          {
            name: "上班人數",
            type: "line",
            stack: "1",
            data: this.work_staff ,
          },
        ],
      }
    }
  },
  methods: {
    async getfasteyes_Attendance(){
      let start_time = this.start_date+"T"+this.start_time
      let end_time = this.end_date+"T"+this.end_time
      await getFasteyes_Attendance(this.page,this.page_size,this.select_status,start_time,end_time,this.select_device).then((res)=>{
        let observationlist = Object.assign(res.data.items)
        this.total = Object.assign(res.data.total)
        this.page_total = Math.ceil(this.total/this.page_size)
        this.fasteyes_AttendanceTableData = []
        
        observationlist.forEach(observation =>{
          this.select_date = observation.date
          let attendance = observation.attendance
          attendance.forEach(eachdata =>{
            let observation_data = {}
            let datetime = moment(eachdata.punch_in, "YYYY-MM-DDThh:mm:ss:SSSSSS")
            observation_data.checkin = datetime.format('YYYY-MM-DD HH:mm:ss')
            observation_data.checkin_temperature =eachdata.punch_in_temperature
            observation_data.checkin_result = eachdata.punch_in_temperature_result
            datetime = moment(eachdata.punch_out, "YYYY-MM-DDThh:mm:ss:SSSSSS")
            observation_data.checkout = datetime.format('YYYY-MM-DD HH:mm:ss')
            observation_data.checkout_temperature = eachdata.punch_out_temperature
            observation_data.checkout_result = eachdata.punch_out_temperature_result
            observation_data.staff_id = eachdata.staff_id
            observation_data.staff = eachdata.staff_name
            observation_data.serial_number = eachdata.staff_serial_number
            observation_data.department = eachdata.department_name
            this.fasteyes_AttendanceTableData.push(observation_data)
          })
        });
      }) 
    },
    async getfasteyesAttendanceLineChart(){
      let start_time = this.start_date+"T"+this.start_time
      let end_time = this.end_date+"T"+this.end_time
      await getFasteyes_AttendanceLineChart(start_time,end_time,this.page,this.select_device).then((res)=>{
        let observation = Object.assign(res.data)
        // console.log(observation)
        // console.log(this.option)
        this.time_intervalData = observation.time_interval
        this.work_staff = observation.work_staff
        // console.log(this.option)
      }) 
    },
    async getDevice(){
      this.Fasteyes_DeviceTableData = []
      await getFasteyesDevice().then((res)=>{
        let devicelist = Object.assign(res.data)
        devicelist.forEach(Data =>{
          let device = {}
          device.name = Data.name 
          device.id = Data.id
          this.Fasteyes_DeviceList.push(device)
        });
      }) 
    },
    increment(){
      if(this.page<this.page_total)
      {
        this.page++
        this.getfasteyes_Attendance()
        this.getfasteyesAttendanceLineChart()
      }
    },
    decrement(){
      if(this.page>1)
      {
        this.page--
        this.getfasteyes_Attendance()
        this.getfasteyesAttendanceLineChart()
      }
    },
    enter(){
      this.getfasteyes_Attendance()
      this.getfasteyesAttendanceLineChart()
    },
    reset(){
      let nowTime = new Date()
      let date = nowTime.getDate()-10>=0?nowTime.getDate():"0"+nowTime.getDate()
      this.start_date = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+date
      this.start_time = "00:00:00"
      this.end_date = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+date
      this.end_time = "23:59:59"
      this.search_text=""
      this.select_status=-1
      this.getfasteyes_Attendance()
      this.getfasteyesAttendanceLineChart()
    },
    select_all(){
      this.select_status = -1
      this.getfasteyes_Attendance()
    },
    select_normal(){
      this.select_status = 0
      this.getfasteyes_Attendance()
    },
    select_abnormal(){
      this.select_status = 1
      this.getfasteyes_Attendance()
    },
    search_event(){
      console.log(this.search_text) 
    },
  },
  beforeMount() {
    this.reset()
    this.getDevice()
  },
  beforeUnmount(){
    window.clearInterval(this.timer)
  },
  created() {
    if(sessionStorage.getItem("state")){
      let sessionStorageData = JSON.parse(sessionStorage.getItem("state")) 
      this.$store.replaceState(Object.assign({},this.$store.state, sessionStorageData))
      // this.$store.dispatch('setToken', sessionStorageData)
    }
    window.addEventListener('beforeunload', ()=>{
      sessionStorage.removeItem('state')
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    })
  }
};
</script>



<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
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