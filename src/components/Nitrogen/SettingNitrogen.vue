<template>
  <div class="modal" v-show="isOpen">
    <div class="modal-content rounded-lg">
      <span class="close" @click="hide">&times;</span>

      <!-- <div id="main" class="items-center justify-center">
        <div class="flex items-center justify-center">
          <p >裝置管理</p>
        </div>
        <div class="flex items-center">
          <span>裝置名稱:</span>
          <input type="text" v-model="device_name" :class="empty_name_error?'error_input':''"/>
        </div>
        <div class="flex items-center">
          <span>裝置編號:</span>
          <input type="text" v-model="serial_number" :class="empty_area_error?'error_input':''" disabled="disabled"/>
        </div>
        <div class="flex items-center">
          <span>裝置位置:</span>
          <input type="text" v-model="area" :class="empty_serial_number_error?'error_input':''"/>
        </div>
        <div class="flex">
          <span>氮氣壓力正常範圍:</span>
          <input type="number" v-model="alarm_Nitrogen_lower_limit" :class="Nitrogen_error?'error_input':''"/>
          <p>~</p>
          <input type="number" v-model="alarm_Nitrogen_upper_limit" :class="Nitrogen_error?'error_input':''"/>
        </div>
        <p v-if="temperature_error" style="color: red;">上限值不得小於下限值</p>
        <div class="flex">
          <span>含氧量正常範圍:</span>
          <input type="number" v-model="alarm_Oxygen_lower_limit" :class="Oxygen_error?'error_input':''"/>
          <p>~</p>
          <input type="number" v-model="alarm_Oxygen_upper_limit" :class="Oxygen_error?'error_input':''"/>
          <p>%</p>
        </div>
        <p v-if="humidity_error" style="color: red;">上限值不得小於下限值，且介於0~100</p>
        <div class="flex">
          <span>狀態：</span>
          <p class="text-gray-900 whitespace-nowrap" v-if="device_status == 0">正常</p>
          <p class="text-gray-900 whitespace-nowrap" style="color:red;" v-else>異常</p>
        </div>
        <div >
          <button class="device_delete_button" style="align-content: center;" @click="deleteDevice">刪除裝置</button>
        </div>
        <div class="flex items-center justify-center">
          <button class ="device_comfirm_button" @click="hide">取消</button>
          <button class ="device_set_button" @click="modifyDevice">儲存</button>

        </div>
      </div> -->

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
              <span>氮氣壓力正常範圍:</span>
            </td>
            <td class="px-2 py-2">
              <div class="flex items-center">
                <input type="number" v-model="alarm_Nitrogen_lower_limit" :class="Nitrogen_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-20"/>
                <p>~</p>
                <input type="number" v-model="alarm_Nitrogen_upper_limit" :class="Nitrogen_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-20"/>
              </div>
              <p v-if="Nitrogen_error" style="color: red;">上限值不得小於下限值</p>
            </td>
          </tr>
          <tr>
            <td class="px-2 py-2">
              <span>含氧量正常範圍:</span>
            </td>
            <td class="px-2 py-2">
              <div class="flex items-center">
                <input type="number" v-model="alarm_Oxygen_lower_limit" :class="Oxygen_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-20"/>
                <p>~</p>
                <input type="number" v-model="alarm_Oxygen_upper_limit" :class="Oxygen_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-20"/>
                <p>%</p>
              </div>
              <p v-if="Oxygen_error" style="color: red;">上限值不得小於下限值，且介於0~100</p>
            </td>
          </tr>
        </tbody>
      </table>
        <div >
          <button class="device_delete_button" style="align-content: center;" @click="deleteDevice">刪除裝置</button>
        </div>
        <div class="flex items-center justify-center">
          <button class ="device_comfirm_button" @click="hide">取消</button>
          <button class ="device_set_button" @click="modifyDevice">儲存</button>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { modify_device, delete_device} from '../../untils/api.js'
const router = useRouter();

export default {
  props:[
    "selectDeviceData",
  ],
  data () {
    return {
      device_name: "",
      area: "",
      serial_number: "",
      device_id: "",
      temperature_error: false,
      humidity_error: false,
      empty_name_error: false,
      empty_area_error: false,
      empty_serial_number_error: false,
      alarm_Nitrogen_lower_limit: "",
      alarm_Nitrogen_upper_limit: "",
      alarm_Oxygen_lower_limit: "",
      alarm_Oxygen_upper_limit: "",
      device_status: 0
   }
  },
    methods: {
    async modifyDevice () {
      if(!this.check()){
        alert("輸入資料有誤")
        return
      }
      let DeviceData = {
        "alarm_Nitrogen_lower_limit": this.alarm_Nitrogen_lower_limit,
        "alarm_Nitrogen_upper_limit": this.alarm_Nitrogen_upper_limit,
        "alarm_Oxygen_lower_limit": this.alarm_Oxygen_lower_limit,
        "alarm_Oxygen_upper_limit": this.alarm_Oxygen_upper_limit
      }
      await modify_device(4, this.device_id,this.device_name, this.area, DeviceData).then((res) => {
        this.hide()
        this.$emit('saveDevice')
      })
    },
    async deleteDevice(){
      await delete_device(4, this.device_id).then((res) => {
        alert("資料刪除成功")
        this.hide()
        this.$emit('deleteDevice')
      })
    },
    input_data(){
      this.device_name = this.selectDeviceData.device_name
      this.area = this.selectDeviceData.area
      this.serial_number = this.selectDeviceData.device_serial_number
      this.device_id = this.selectDeviceData.device_id
      this.alarm_Nitrogen_lower_limit = this.selectDeviceData.alarm_Nitrogen_lower_limit
      this.alarm_Nitrogen_upper_limit = this.selectDeviceData.alarm_Nitrogen_upper_limit
      this.alarm_Oxygen_lower_limit = this.selectDeviceData.alarm_Oxygen_lower_limit
      this.alarm_Oxygen_upper_limit = this.selectDeviceData.alarm_Oxygen_upper_limit
      this.device_status = this.selectDeviceData.status
    },
check(){
      if(this.alarm_Nitrogen_lower_limit > this.alarm_Nitrogen_upper_limit ||
         this.alarm_Nitrogen_lower_limit =="" ||
         this.alarm_Nitrogen_upper_limit ==""){
        this.Nitrogen_error = true
      }
      else{
        this.Nitrogen_error = false
      }
      if(this.alarm_Oxygen_lower_limit > this.alarm_Oxygen_upper_limit ||
         this.alarm_Oxygen_lower_limit<0 || this.aalarm_Oxygen_lower_limit>100 ||
         this.alarm_Oxygen_upper_limit<0 || this.alarm_Oxygen_upper_limit>100 ||
         this.alarm_Oxygen_lower_limit=="" ||
         this.alarm_Oxygen_upper_limit=="" ){
        this.Oxygen_error = true
      }
      else
        this.Oxygen_error = false
      
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

      if(this.Oxygen_error || this.Nitrogen_error || this.empty_name_error || this.empty_area_error || this.empty_serial_number_error){
        return false
      }
      else{
        return true
      }
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
        isOpen.value = true;
        setTimeout(()=>{
          this.input_data()
        },10)
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
    height: 100%;
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
.device_delete_button{
  font-size: 14px;
  /* font-weight: bold; */
  color: white;
  border-radius: 6px;
  padding: 5px 30px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-content: center;
  background-color: red;
}
.error_input{
  border-color:red
}
</style>