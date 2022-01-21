<template>
  <div id=upbutton>
        <div class=" px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
          <div id="setbutton" class=" flex items-center">
            <router-link class="device_comfirm_button"
              to="/environment/device/temperature_humidity">
                溫濕度感應器
            </router-link>
            <router-link class="device_comfirm_button"              
              to="/environment/device/Nitrogen">
                氮氣產生機
            </router-link>
          </div>
        </div>
  </div>
  <div id="device_data">
      <div class="mt-4" >
        <h3>Email 通知</h3>
        <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
          <h4>當收到異常資料時通知我</h4>
          <button :class="device_email_alarm? 'device_set_button': 'device_comfirm_button'" @click="email_alarm_set(true)">ON</button>
          <button :class="!device_email_alarm? 'device_set_button': 'device_comfirm_button'" @click="email_alarm_set(false)">OFF</button>
        </div>
        <!-- <div v-else class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
          <h4>當收到異常資料時通知我</h4>
          <button class="device_comfirm_button" @click="email_alarm_set(true)">ON</button>
          <button class="device_set_button">OFF</button>
        </div> -->
      </div>
      <!-- <div class="mt-4" >
        <h3>Email 通知</h3>
        <div class="flex items-center px-4  space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
        <h4>當收到異常資料時通知我</h4>
            <button class="device_set_button ">
                ON
            </button>
            <button class="device_set_button ">
                OFF
            </button>
        </div> 
       <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
        <h4>當裝置狀態異常時通知我</h4>
            <button class="device_set_button ">
                ON
            </button>
            <button class="device_set_button ">
                OFF
            </button>
        </div>
      </div> -->
      
  </div>
</template>

<script type="text/javascript">
// import { ref, onMounted } from 'vue'
import { setUserInfo,getUerInfo} from "../../untils/api.js"

export default {
  data (){
    return{
      device_email_alarm : false,
    }
  },
  methods: {
    async email_alarm_set(para){
      this.device_email_alarm = para
      let obj = {"device_email_alert":this.device_email_alarm }
      await setUserInfo(obj).then((res)=>{
            // let response = Object.assign(res.data)
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
            this.device_email_alarm = UserData.info.device_email_alert
          }
      })
    },
  },
  beforeMount(){
    this.getUser()
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
