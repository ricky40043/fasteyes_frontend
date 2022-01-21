<template>

  <teleport to="#destination" :disabled="disableTeleport">
    <DeleteComfirm ref="deletemodal" 
    @deleteDevice="deleteDevice"
    />
  </teleport>

  <div class="modal" v-show="isOpen">
    <div class="modal-content rounded-lg">
      <span class="close" @click="hide">&times;</span>

      <!-- <div id="main" class="items-center justify-center">
        <div class="flex items-center justify-center">
          <p >新增裝置</p>
        </div>
        <div class="flex items-center">
          <span>裝置名稱:</span>
          <input type="text" v-model="device_name" :class="empty_name_error?'error_input':''" />
        </div>
        <div class="flex items-center">
          <span>裝置編號:</span>
          <input type="text" v-model="serial_number" :class="empty_area_error?'error_input':''" disabled/>
        </div>
        <div class="flex items-center">
          <span>裝置位置:</span>
          <input type="text" v-model="area" :class="empty_serial_number_error?'error_input':''"/>
        </div>
        <div class="flex">
          <span>IP位址</span>
          <input type="text" v-model="ip" :class="ip_error?'error_input':''" disabled/>
        </div>
        <div class="flex">
          <span>PORT:</span>
          <input type="text" v-model="port" :class="port_error?'error_input':''" disabled/>
        </div>
        <div class="flex">
          <span>串流名稱:</span>
          <input type="text" v-model="stream_name" :class="stream_name_error?'error_input':''"/>
        </div>
        <div class="flex">
          <span>使用者名稱:</span>
          <input type="text" v-model="username" :class="username_error?'error_input':''"/>
        </div>
        <div class="flex">
          <span>使用者密碼:</span>
          <input type="password" v-model="password" :class="password_error?'error_input':''"/>
        </div>
        <div >
          <button class="device_delete_button" style="align-content: center;" @click="deleteDevice">刪除裝置</button>
        </div>
        <div class="flex items-center justify-center">
          <button class ="device_set_button" @click="seeVideo">查看影像</button>
        </div>

        <div id="bulletin" v-if="watchingVideo">
          <img :src="rstpname" alt="" style="display:block; margin:auto;" />
        </div>
        <div class="flex items-center justify-center">
          <button class ="device_comfirm_button" @click="hide">取消</button>
          <button class ="device_set_button" @click="addDevice">儲存</button>
        </div>
      </div> -->


      <div id="main" class="items-center justify-center">
        <div class="flex items-center justify-center">
          <p class="text-xl">編輯裝置</p>
        </div>
        <div class="flex justify-center">
          <div id="left"> 
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
                    <span>IP位址:</span>
                  </td>
                  <td class="px-2 py-2">
                    <div class="flex items-center justify-center">
                      <input type="text" v-model="ip" :class="ip_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" disabled/>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-2">
                    <span>PORT:</span>
                  </td>
                  <td class="px-2 py-2">
                    <input type="number" v-model="port" :class="port_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"/>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-2">
                    <span>串流名稱:</span>
                  </td>
                  <td class="px-2 py-2">
                    <input type="text" v-model="stream_name" :class="stream_name_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"/>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-2">
                    <span>使用者名稱:</span>
                  </td>
                  <td class="px-2 py-2">
                    <input type="text" v-model="username" :class="username_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"/>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-2">
                    <span>使用者密碼:</span>
                  </td>
                  <td class="px-2 py-2">
                    <input type="password" v-model="password" :class="password_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"/>
                  </td>
                </tr>
              </tbody>
            </table>
                        <div class="py-2">
              <button class="device_delete_button" style="align-content: center;" @click="deleteClick">刪除裝置</button>
            </div>
          </div>
          <div id="right">
            <div class="flex items-center justify-center">
              <button :class ="watchingVideo===false ? 'device_set_button':'device_back_button'" @click="seeVideo">查看影像</button>
            </div>
            <div id="bulletin" v-if="watchingVideo">
              <img :src="rstpname" alt="" style="display:block; margin:auto;" class="w-auto h-auto"/>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <button class ="device_comfirm_button" @click="hide">取消</button>
          <button class ="device_set_button" @click="addDevice">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { modify_device, delete_device} from '../../untils/api.js'
import DeleteComfirm from '../../components/DeleteComfirm.vue'
import global_ from "../../Global.vue"

const router = useRouter();

export default {
  components:{
    DeleteComfirm
  },
    props:[
    "selectDeviceData",
  ],
  data () {
    return {
      device_name:"",
      area:"",
      serial_number:"",
      ip:"",
      port:"",
      stream_name:"",
      username:"",
      password:"",
      device_id:-1,
      ip_error:false,
      port_error:false,
      stream_name_error:false,
      username_error:false,
      password_error:false,
      empty_name_error:false,
      empty_area_error:false,
      empty_serial_number_error:false,
      watchingVideo :false
   }
  },
  computed:{
    rstpname(){
      let rstp_name = global_.url+"/ip_cam/device/"+this.device_id+"/video"
      return rstp_name
    }
  },
    methods: {
    async addDevice () {
      if(this.check()){
        alert("輸入資料有誤")
        return
      }
      let DeviceData = {
        "stream_name":this.stream_name,
        "ip":this.ip,
        "port":this.port.toString(),
        "password":this.password,
        "username":this.username,
      }
      await modify_device(2, this.device_id, this.device_name, this.area, DeviceData, this.serial_number).then((res) => {
        this.hide()
        this.$emit('saveDevice')
      }).catch((err) => {
        alert(err.response.data.detail)
      })
    },
    seeVideo(){
      this.watchingVideo = !this.watchingVideo
    },
    async deleteClick(){
      this.showDeleteModal()
    },
    async deleteDevice(){
      await delete_device(2, this.device_id).then((res) => {
        this.hide()
        this.$emit('deleteDevice')
      })
    },
    clear_data(){
      this.device_name=""
      this.area=""
      this.serial_number=""
      this.ip=""
      this.port=""
      this.stream_name=""
      this.username=""
      this.password=""
      this.ip_error=false
      this.port_error=false
      this.stream_name_error=false
      this.username_error=false
      this.password_error=false
      this.empty_name_error=false
      this.empty_area_error=false
      this.empty_serial_number_error=false
      this.watchingVideo = false
    },
    check(){
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

      if(this.stream_name=="")
        this.stream_name_error = true
      else
        this.stream_name_error = false

      if(this.username=="")
        this.username_error = true
      else
        this.username_error = false
      
      if(this.password=="")
        this.password_error = true
      else
        this.password_error = false

      if(this.port=="")
        this.port_error = true
      else
        this.port_error = false
      
      if(this.password=="")
        this.password_error = true
      else
        this.password_error = false

      if((this.ip1<0 || this.ip1>255)  || (this.ip2<0 || this.ip2>255) || (this.ip3<0 || this.ip3>255) || (this.ip4<0 || this.ip4>255))
        this.ip_error = true
      else
        this.ip_error = false
   

      if(this.username_error || this.password_error || this.empty_name_error || this.empty_area_error || 
         this.empty_serial_number_error || this.stream_name_error || this.port_error || this.ip_error){
        return false
      }
      else{
        return true
      }
    },
    input_data(){
      this.device_id = this.selectDeviceData.device_id
      this.device_name = this.selectDeviceData.device_name
      this.area = this.selectDeviceData.area
      this.serial_number = this.selectDeviceData.device_serial_number
      this.device_id = this.selectDeviceData.device_id
      this.ip=this.selectDeviceData.ip
      this.port=this.selectDeviceData.port
      this.stream_name=this.selectDeviceData.stream_name
      this.username=this.selectDeviceData.username
      this.password=this.selectDeviceData.password
    },
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
        setTimeout(()=>{
          this.input_data()
        },10)
    }

    const deletemodal = ref(null);
    function showDeleteModal(){
      deletemodal.value.show()
    }

    return{
        isOpen,
        hide,
        show,
        deletemodal,
        showDeleteModal
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
#left {
  width: 35%;
}
#right {
  width: 65%;
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
    height: 130%;
    background-color: rgba(0, 0, 0, 0.7);
}
.modal-content {
    background-color: #ffffff;
    margin: 15% auto; 
    padding: 20px;
    width: 1000px;
    height: 650px;
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
.device_back_button{
  font-size: 14px;
  /* font-weight: bold; */
  color: white;
  border-radius: 6px;
  padding: 5px 30px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-content: center;
  background-color: gainsboro;
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
#bulletin{
  width: 100%;
  min-width: 200px;
  height: 100%;
  min-height: 250px;
  position: relative;
  /* background-color: rgba(216, 12, 12, 0.2); */
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  padding: 0px 0px;
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
</style>