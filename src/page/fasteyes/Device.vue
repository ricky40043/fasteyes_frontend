<template>
  <div id="data">
    <div id="upnormal">
      <div class="mt-4" >
        <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
          <div id="time">
            <div class="relative mx-4 lg:mx-0">
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

            <button class="device_set_button ">
                新增裝置
            </button>
        </div>
      </div>
    </div>
    <div id="downtable">
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
                    裝置描述
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    體溫異常值
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    照片上傳
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    建立時間
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(u, index) in Fasteyes_DeviceTableData" :key="index">
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.device_name }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.device_descrip }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.temperature_alarm }}°C</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap" v-if="u.upload == 0">不上傳</p>
                    <p class="text-gray-900 whitespace-nowrap" v-else-if="u.upload == 1">全部上傳</p>
                    <p class="text-gray-900 whitespace-nowrap" v-else>僅上傳異常</p>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.time }}</p>
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
  </div>
  <div id="data">
    <div id="upnormal">
      <div class="mt-4" >
        <h3>Email 通知</h3>
        <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
          <h4>當收到異常資料時通知我</h4>
          <button :class="email_alarm==true? 'device_set_button':'device_comfirm_button'" @click="email_alarm_change(true)">ON</button>
          <button :class="email_alarm==false? 'device_set_button':'device_comfirm_button'" @click="email_alarm_change(false)">OFF</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
// import { ref, onMounted } from 'vue'
import { setUserInfo, getFasteyesDevice, getUerInfo } from "../../untils/api.js"
import store from "../../store"
import moment from 'moment';

export default {
  data (){
    return{
      Fasteyes_DeviceTableData:[],
      page:1,
      total:1,
      page_size:50,
      page_total:1,
      search_text:"",
      email_alarm:false,
      timer: window.setInterval(() => { this.getDevice () }, 10000)
    }
  },
  methods: {
    async getDevice(){
      this.Fasteyes_DeviceTableData = []
      await getFasteyesDevice().then((res)=>{
        let devicelist = Object.assign(res.data)
        devicelist.forEach(Data =>{
          let device = {}
          device.device_name = Data.name 
          device.device_descrip = Data.description
          device.temperature_alarm = Data.info.body_temperature_threshold  
          device.upload = Data.info.uploadScreenshot  
          let datetime = moment(Data.created_at, "YYYY-MM-DDThh:mm:ss:SSSSSS")
          device.time = datetime.format('YYYY-MM-DD HH:mm:ss')
          this.Fasteyes_DeviceTableData.push(device)
        });
      }) 
    },
    async getUser () {
      await getUerInfo().then((res)=>{
          if (res.data.Status === false) {
            let errorEvent = {
              target: 'email',
              text: (window.navigator.language === 'zh-TW') ? '帳號尚未驗證' : 'User is not validated'
            }
          } else {
            let UserData = Object.assign(res.data)
            this.email_alarm = UserData.info.email_alert
          }
      })
    },
    increment(){
      if(this.page<this.page_total)
      {
        this.page++
        this.getDevice()
      }
    },
    decrement(){
      if(this.page>1)
      {
        this.page--
        this.getDevice()
      }
    },
    search_event(){
      console.log(this.search_text) 
    },
    async email_alarm_change(select){
      this.email_alarm = select
      let obj = {"email_alert":this.email_alarm }
      await setUserInfo(obj).then((res)=>{
            // let response = Object.assign(res.data)
        })
    },
    // async email_alarm_off(){
    //   this.email_alarm = false
    //   let obj = {"email_alert":this.email_alarm }
    //   await setUserInfo(obj).then((res)=>{
    //         // let response = Object.assign(res.data)
    //     })
    // },
  },
  beforeMount() {
    this.getUser ()
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
};
</style>
