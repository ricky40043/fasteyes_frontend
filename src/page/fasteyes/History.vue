<template>
  <teleport to="#destination" :disabled="disableTeleport">
    <ModifyObservation ref="settingmodal"
    :selectObservation_id="select_id"
    @modifyObservation="reset"
    />
  </teleport>
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
              <!-- <button :class="[ select_status===-1 ? device_set_button : device_comfirm_button ,device_set_button ]" v-on:click="select_all"> -->
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
          <!-- <div id="searchinput">
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
          </div> -->
          <div id="outputbutton">
            <button class="device_abnormal_button" @click="outputclick">
              輸出 .csv
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <div id="downtable" :class="showPicture? 'showPictureClass':'NotshowPictureClass'">
              <div class="mt-6">
          <div class="px-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div
              class="inline-block min-w-full overflow-hidden rounded-lg shadow tableout"
            >
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      裝置名稱
                    </th>
                    <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      時間
                    </th>
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
                      體溫
                    </th>
                    <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      類型
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="u in fasteyes_ObservationTableData" :key="u.id" v-on:click="showResult($event, u)" class="report_list" :style="select_id==u.id? 'background-color:powderblue;':''">
                    <td class="px-5 py-5 text-sm border-b border-gray-200">
                      <p class="text-gray-900 whitespace-nowrap">{{ u.deviceName }}</p>
                    </td>
                    <td class="px-5 py-5 text-sm border-b border-gray-200">
                      <p class="text-gray-900 whitespace-nowrap">{{ u.time }}</p>
                    </td>
                    <td class="px-5 py-5 text-sm border-b border-gray-200">
                      <p class="text-gray-900 whitespace-nowrap" v-if="u.staff == 'Unknow'">訪客</p>
                      <p class="text-gray-900 whitespace-nowrap" v-else>{{ u.department }}</p>
                    </td>
                    <td class="px-5 py-5 text-sm border-b border-gray-200">
                      <p class="text-gray-900 whitespace-nowrap" v-if="u.staff == 'Unknow'">None</p>
                      <p class="text-gray-900 whitespace-nowrap" v-else>{{ u.serial_number }}</p>
                    </td>
                    <td class="px-5 py-5 text-sm border-b border-gray-200">
                      <p class="text-gray-900 whitespace-nowrap" v-if="u.staff == 'Unknow'">訪客</p>
                      <p class="text-gray-900 whitespace-nowrap" v-else>{{ u.staff }}</p>
                    </td>
                    <td class="px-5 py-5 text-sm border-b border-gray-200">
                      <p class="text-gray-900 whitespace-nowrap" v-if="u.status == 0">{{ u.temperature }}°C</p>
                      <p class="text-gray-900 whitespace-nowrap" style="color:red;" v-else>{{ u.temperature }}°C</p>
                    </td>
                    <td class="px-5 py-5 text-sm border-b border-gray-200">
                      <p class="text-gray-900 whitespace-nowrap" v-if="u.status == 0">正常</p>
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
      <div v-show="showPicture">
        <div class="max-w-sm mt-6 overflow-hidden bg-white rounded shadow-lg cardPos">
        <div class="px-6 py-4" v-if="select_staff.name!='Unknow'">
          <p>{{ select_staff.time }}</p>
          <p>部門：{{ select_staff.department }}</p>
          <p>ID：{{ select_staff.serial_number }}</p> 
          <p>體溫：{{ select_staff.temperature }}°C</p>
          <p>人員：{{ select_staff.name }}</p>
        </div>
        <div class="px-6 py-4" v-else>
          <p>{{ select_staff.time }}</p>
          <p>部門：訪客</p>
          <p>ID：None</p> 
          <p>體溫：{{ select_staff.temperature }}°C</p>
          <p>人員：訪客</p>
        </div>
        <img
          class="w-full"
          :src="face_url"
          alt="人員照片"
        />
        <div class="px-6 py-4 text-blue-600">
          <div @click="errorReportClick">錯誤回報</div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getFasteyes_Observation, getFasteyesDevice, get_output_csv_file} from "../../untils/api.js"
import ModifyObservation from "../../components/fasteyes/ModifyObservation.vue" 
import store from "../../store"
import moment from 'moment';
import global_ from "../../Global.vue"
//const base = {
//  url: 'http://192.168.45.35:8000'
  // url: 'http://127.0.0.1:8000'
//}
export default {
  components:{
    ModifyObservation
  },
  data (){
    let fasteyes_ObservationTableData=[]
    let page = 1
    let total = 1
    let page_size = 50
    let page_total = 1
    let start_date = ""
    let start_time = "00:00:00"
    let end_date = ""
    let end_time = "23:59:59"
    let select_status = -1
    let search_text = ""
    let showPicture = false
    let select_id = -1
    return{
      fasteyes_ObservationTableData,
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
      showPicture,
      select_id,
      select_staff:{
        department : "",
        time : "",
        serial_number : "",
        name : "",
        temperature : "",
        image_name :"",
        device_id: ""
      },
      face_url: "",
      Fasteyes_DeviceList: [],
      select_device: -1,
      timer: window.setInterval(() => { this.getfasteyes_Observation () }, 10000)
    }
  },
  methods: {
    async getfasteyes_Observation(){
      let start_time = this.start_date+"T"+this.start_time
      let end_time = this.end_date+"T"+this.end_time
      await getFasteyes_Observation(this.page,this.page_size, this.select_status,start_time,end_time,this.select_device).then((res)=>{
        let observationlist = Object.assign(res.data.items)
        this.total = Object.assign(res.data.total)
        this.page_total = Math.ceil(this.total/this.page_size)
        this.fasteyes_ObservationTableData = []
        observationlist.forEach(observation =>{
          let observation_data = {}
          // console.log(observation)
          // console.log(observation.info)
          observation_data.deviceName = observation.info.device_name 
          let datetime = moment(observation.phenomenon_time, "YYYY-MM-DDThh:mm:ss:SSSSSS")
          observation_data.device_id = observation.fasteyes_device_id
          observation_data.id = observation.id
          observation_data.time = datetime.format('YYYY-MM-DD HH:mm:ss')
          observation_data.department = observation.info.department_name 
          observation_data.serial_number = observation.info.staff_serial_number 
          observation_data.staff = observation.info.staff_name 
          observation_data.temperature = observation.info.temperature 
          observation_data.status = observation.result 
          observation_data.image_name = observation.image_name
          this.fasteyes_ObservationTableData.push(observation_data)
        });
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
    async outputclick(){
      let start_time = this.start_date+"T"+this.start_time
      let end_time = this.end_date+"T"+this.end_time
      let FILE = await get_output_csv_file(start_time,end_time).then((res)=>{
        return Object.assign(res.data)
      }) 
      if (FILE) {
         const anchor = document.createElement('a');
          anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(FILE);
          anchor.target = '_blank';
          let today = new Date();
          let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          anchor.download = date+'觀測結果輸出報表.csv';
          anchor.click();
      } else 
        console.log('none')
    },
    increment(){
      if(this.page<this.page_total)
      {
        this.page++
        this.getfasteyes_Observation()
      }
    },
    decrement(){
      if(this.page>1)
      {
        this.page--
        this.getfasteyes_Observation()
      }
    },
    showResult (event, select_staff){
      if(this.select_id == select_staff.id){
        this.showPicture = !this.showPicture
      }
      else{
        this.showPicture = true
      }
      this.select_staff.department = select_staff.department
      this.select_staff.time = select_staff.time
      this.select_staff.serial_number = select_staff.serial_number
      this.select_staff.name = select_staff.staff
      this.select_staff.temperature = select_staff.temperature
      this.select_staff.image_name = select_staff.image_name
      this.select_staff.device_id = select_staff.device_id
      this.face_url = global_.url+"/Files/download/image/device/"+this.select_staff.device_id+"/file_name/"+this.select_staff.image_name
      this.select_id = select_staff.id
    },
    enter(){
      this.getfasteyes_Observation()
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
      this.select_id=-1
      this.showPicture = false
      this.getfasteyes_Observation()
    },
    select_all(){
      this.select_status = -1
      this.getfasteyes_Observation()
    },
    select_normal(){
      this.select_status = 0
      this.getfasteyes_Observation()
    },
    select_abnormal(){
      this.select_status = 1
      this.getfasteyes_Observation()
    },
    search_event(){
      console.log(this.search_text) 
    },
    errorReportClick(){
      this.showSettingModal()
    }
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
  },
  setup(){
    const disableTeleport = ref(false)   
    
    const settingmodal = ref(null);
    
    function showSettingModal(){
      settingmodal.value.show()
      this.showModal = true
    }

    return {
      disableTeleport,
      showSettingModal,
      settingmodal
    }
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
.showPictureClass{
  width: 80%;
}
.NotshowPictureClass{
  width: 100%;
}
.cardPos{
  /* color:rebeccapurple */
  position: absolute;
  top: 300px;
}
.report_list{
  background-color: white;
}
.report_list:hover{
  background-color: powderblue;
}
.tableout{
  height: 400px;
  width: 100%;
  overflow-y: scroll;
}
</style>

