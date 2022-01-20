<template>
  <div class="modal" v-show="isOpen">
    <div class="modal-content rounded-lg">
      <span class="close" @click="hide">&times;</span>


      <div id="main" class="items-center justify-center">
        <div class="flex items-center justify-center">
          <p class="text-xl">新增裝置</p>
        </div>
      <table>
        <tbody>
          <tr>
            <td class="px-2 py-2">
              <span>裝置名稱:</span>
            </td>
            <td class="px-2 py-2">
              <input type="text" v-model="device_name" :class="empty_name_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"/>
            </td>
          </tr>
          <tr>
            <td class="px-2 py-2">
              <span>裝置編號:</span>
            </td>
            <td class="px-2 py-2">
              <input type="text" v-model="serial_number" :class="empty_area_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"/>
            </td>
          </tr>
          <tr>
            <td class="px-2 py-2">
              <span>裝置位置:</span>
            </td>
            <td class="px-2 py-2">
              <input type="text" v-model="area" :class="empty_serial_number_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"/>
            </td>
          </tr>
          <tr>
            <td class="px-2 py-2">
              <span>溫度正常範圍:</span>
            </td>
            <td class="px-2 py-2">
              <div class="flex items-center">
                <input type="number" v-model="addDeviceData.alarm_temperature_lower_limit" :class="temperature_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-20"/>
                <p>~</p>
                <input type="number" v-model="addDeviceData.alarm_temperature_upper_limit" :class="temperature_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-20"/>
                <p>°C</p>
              </div>
              <p v-if="temperature_error" style="color: red;">上限值不得小於下限值</p>
            </td>
          </tr>
          <tr>
            <td class="px-2 py-2">
              <span>濕度正常範圍:</span>
            </td>
            <td class="px-2 py-2">
              <div class="flex items-center">
                <input type="number" v-model="addDeviceData.alarm_humidity_lower_limit" :class="humidity_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-20"/>
                <p>~</p>
                <input type="number" v-model="addDeviceData.alarm_humidity_upper_limit" :class="humidity_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-20"/>
                <p>%</p>
              </div>
              <p v-if="humidity_error" style="color: red;">上限值不得小於下限值，且介於0~100</p>
            </td>
          </tr>
          <tr>
            <td class="px-2 py-2">
              <span>溫度補償:</span>
            </td>
            <td class="px-2 py-2">
              <input type="number" v-model="addDeviceData.compensate_temperature" :class="empty_temperature_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"/>
            </td>
          </tr>
          <tr>
            <td class="px-2 py-2">
              <span>濕度補償:</span>
            </td>
            <td class="px-2 py-2">
              <input type="number" v-model="addDeviceData.compensate_humidity" :class="empty_humidity_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"/>
            </td>
          </tr>
        </tbody>
      </table>
        <div class="flex items-center justify-center">
          <button class ="device_set_button" @click="addDevice">新增</button>
          <button class ="device_comfirm_button" @click="hide">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { add_device } from '../../untils/api.js'
const router = useRouter();

export default {
  data () {
    return {
      device_name:"",
      area:"",
      serial_number:"",
      temperature_error: false,
      humidity_error: false,
      empty_name_error: false,
      empty_area_error: false,
      empty_serial_number_error: false,
      empty_temperature_error: false,
      empty_humidity_error: false,
      addDeviceData: {
        interval_time: 60,
        alarm_temperature_lower_limit: "",
        alarm_temperature_upper_limit: "",
        alarm_humidity_lower_limit: "",
        alarm_humidity_upper_limit: "",
        battery_alarm: 10,
        compensate_temperature: 0,
        compensate_humidity: 0
      },
   }
  },
    methods: {
    async addDevice () {
      if(!this.check()){
        alert("輸入資料有誤")
        return
      }
      let DeviceData = Object.assign(this.addDeviceData)
      await add_device(1, this.device_name, this.area, this.serial_number, DeviceData).then((res) => {
        this.hide()
        this.$emit('addDevice')
      }).catch((err) => {
        alert(err.response.data.detail)
      })
    },
    clear_data(){
      this.temperature_error=false
      this.humidity_error=false
      this.empty_name_error=false
      this.empty_area_error=false
      this.empty_serial_number_error=false
      this.empty_temperature_error = false
      this.empty_humidity_error= false
      this.device_name = ""
      this.area = ""
      this.serial_number = ""
      this.addDeviceData= {
        interval_time: 60,
        alarm_temperature_lower_limit: "",
        alarm_temperature_upper_limit: "",
        alarm_humidity_lower_limit: "",
        alarm_humidity_upper_limit: "",
        compensate_temperature: 0,
        compensate_humidity: 0,
        battery_alarm: 10
      }
    },
    check(){
      if(this.addDeviceData.alarm_temperature_lower_limit > this.addDeviceData.alarm_temperature_upper_limit ||
         this.addDeviceData.alarm_temperature_lower_limit ==="" ||
         this.addDeviceData.alarm_temperature_upper_limit ===""){
        this.temperature_error = true
      }
      else{
        this.temperature_error = false
      }
      if(this.addDeviceData.alarm_humidity_lower_limit > this.addDeviceData.alarm_humidity_upper_limit ||
         this.addDeviceData.alarm_humidity_lower_limit<0 || this.addDeviceData.alarm_humidity_lower_limit>100 ||
         this.addDeviceData.alarm_humidity_upper_limit<0 || this.addDeviceData.alarm_humidity_upper_limit>100 ||
         this.addDeviceData.alarm_humidity_lower_limit==="" ||
         this.addDeviceData.alarm_humidity_upper_limit==="" ){
        this.humidity_error = true
      }
      else
        this.humidity_error = false

      if(this.device_name=="")
        this.empty_name_error = true
      else
        this.empty_name_error = false

      if(this.area=="")
        this.empty_area_error = true
      else
        this.empty_area_error = false
      
      if(this.serial_number=="")
        this.empty_serial_number_error = true
      else
        this.empty_serial_number_error = false

      if(this.addDeviceData.compensate_temperature==="")
        this.empty_temperature_error = true
      else
        this.empty_temperature_error = false
      
      if(this.addDeviceData.compensate_humidity==="")
        this.empty_humidity_error = true
      else
        this.empty_humidity_error = false

      if(this.humidity_error || this.temperature_error || this.empty_name_error || this.empty_area_error || 
         this.empty_serial_number_error || this.empty_temperature_error || this.empty_humidity_error)
        return false
      else
        return true
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
  setup(){
    const isOpen = ref(false);

    function hide(){
        isOpen.value = false;
    }

    function show(){
        this.clear_data()
        isOpen.value = true;
    }

    return{
        isOpen,
        hide,
        show
    }
}
}
</script>

<style scoped>
#main{
  /*  width: 20%;
   height: auto; */
}
#content{
  /*  width: 20%;
   height: auto; */
  /* background-color: rgba(59, 65, 79, 1.0); */
}
a{
  color:white
}

.modal {
    position: absolute;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 135%;
    background-color: rgba(0, 0, 0, 0.7);
}
.modal-content {
    background-color: #ffffff;
    margin: 15% auto; 
    padding: 20px;
    width: 400px;
    border: 1px solid #888;
}
.close {
    padding: 0px 0px;
    cursor: pointer;
    color: #aaa;
    float:right;
    font-size:20px;
    font-weight: bold;
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
.error_input{
  border-color:red
}
</style>