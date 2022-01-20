<template>
  <div class="modal" v-show="isOpen">
    <div class="modal-content rounded-lg">
      <span class="close" @click="hide">&times;</span>

      <!-- <div id="main" class="items-center justify-center">
        <div class="flex items-center justify-center">
          <p >新增裝置</p>
        </div>
        <div class="flex items-center">
          <span>裝置名稱:</span>
          <input type="text" v-model="device_name" :class="empty_name_error?'error_input':''"/>
        </div>
        <div class="flex items-center">
          <span>裝置編號:</span>
          <input type="text" v-model="serial_number" :class="empty_area_error?'error_input':''"/>
        </div>
        <div class="flex items-center">
          <span>裝置位置:</span>
          <input type="text" v-model="area" :class="empty_serial_number_error?'error_input':''"/>
        </div>
        <div class="flex">
          <span>IP位址</span>
          <input type="number" v-model="ip1" :class="ip_error?'error_input':''"/>
          .<input type="number" v-model="ip2" :class="ip_error?'error_input':''"/>
          .<input type="number" v-model="ip3" :class="ip_error?'error_input':''"/>
          .<input type="number" v-model="ip4" :class="ip_error?'error_input':''"/>
        </div>
        <div class="flex">
          <span>PORT:</span>
          <input type="number" v-model="port" :class="port_error?'error_input':''"/>
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

        <div class="flex items-center justify-center">
          <button class ="device_set_button" @click="connectTest">進行連線測試</button>
        </div>
          <div id="bulletin" v-if="connectTesting">
            <img :src="rstpname" alt="" style="display:block; margin:auto;" />
          </div>
        <div class="flex items-center justify-center">
          <button class ="device_set_button" @click="addDevice">新增</button>
          <button class ="device_comfirm_button" @click="hide">取消</button>
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
                <input type="text" v-model="device_name" :class="empty_name_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-80"/>
              </td>
            </tr>
            <tr>
              <td class="px-2 py-2">
                <span>裝置編號:</span>
              </td>
              <td class="px-2 py-2">
                <input type="text" v-model="serial_number" :class="empty_area_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-80"/>
              </td>
            </tr>
            <tr>
              <td class="px-2 py-2">
                <span>裝置位置:</span>
              </td>
              <td class="px-2 py-2">
                <input type="text" v-model="area" :class="empty_serial_number_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-80"/>
              </td>
            </tr>
            <tr>
              <td class="px-2 py-2">
                <span>IP位址:</span>
              </td>
              <td class="px-2 py-2">
                <div class="flex items-center justify-center">
                  <input type="number" v-model="ip1" :class="ip_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-20"/>
                  .<input type="number" v-model="ip2" :class="ip_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-20"/>
                  .<input type="number" v-model="ip3" :class="ip_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-20"/>
                  .<input type="number" v-model="ip4" :class="ip_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-20"/>
                </div>
              </td>
            </tr>
            <tr>
              <td class="px-2 py-2">
                <span>PORT:</span>
              </td>
              <td class="px-2 py-2">
                <input type="number" v-model="port" :class="port_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-80"/>
              </td>
            </tr>
            <tr>
              <td class="px-2 py-2">
                <span>串流名稱:</span>
              </td>
              <td class="px-2 py-2">
                <input type="text" v-model="stream_name" :class="stream_name_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-80"/>
              </td>
            </tr>
            <tr>
              <td class="px-2 py-2">
                <span>使用者名稱:</span>
              </td>
              <td class="px-2 py-2">
                <input type="text" v-model="username" :class="username_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-80"/>
              </td>
            </tr>
            <tr>
              <td class="px-2 py-2">
                <span>使用者密碼:</span>
              </td>
              <td class="px-2 py-2">
                <input type="password" v-model="password" :class="password_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 w-80"/>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex items-center justify-center">
          <button :class ="connectTesting===false ? 'device_set_button':'device_back_button'" @click="connectTest">進行連線測試</button>
        </div>
        <div id="bulletin" v-if="connectTesting">
          <img :src="rstpname" alt="" style="display:block; margin:auto;" />
        </div>
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
import global_ from "../../Global.vue"

const router = useRouter();

export default {
  data () {
    return {
      device_name:"",
      area:"",
      serial_number:"",
      ip1:"",
      ip2:"",
      ip3:"",
      ip4:"",
      port:"",
      stream_name:"",
      username:"",
      password:"",
      ip_error:false,
      port_error:false,
      stream_name_error:false,
      username_error:false,
      password_error:false,
      empty_name_error:false,
      empty_area_error:false,
      empty_serial_number_error:false,
      connectTesting :false
   }
  },
  computed:{
    ip(){
      let totalIP = this.ip1+"."+this.ip2+"."+this.ip3+"."+this.ip4
      return totalIP
    },
    rstpname(){
      let rstp_name = global_.url+"/ip_cam/connect_test"+"?ip="+this.ip+"&port="+this.port+"&username="+this.username+"&password="+this.password+"&stream_name="+this.stream_name
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
      await add_device(2, this.device_name, this.area, this.serial_number, DeviceData).then((res) => {
        this.hide()
        this.$emit('addDevice')
      })
    },
    connectTest(){
      if(this.check()){
        alert("輸入資料有誤")
        return
      }
      this.connectTesting = !this.connectTesting
    },
    clear_data(){
      this.device_name=""
      this.area=""
      this.serial_number=""
      this.ip1=""
      this.ip2=""
      this.ip3=""
      this.ip4=""
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
      this.connectTesting = false
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

      if(this.port==="")
        this.port_error = true
      else
        this.port_error = false
      
      if((this.ip1<0 || this.ip1>255)  || (this.ip2<0 || this.ip2>255) || (this.ip3<0 || this.ip3>255) || (this.ip4<0 || this.ip4>255) ||
          this.ip1===""||this.ip2===""||this.ip3===""||this.ip4==="")
        this.ip_error = true
      else
        this.ip_error = false
   
      console.log(this.username_error)
      console.log(this.password_error)
      console.log(this.empty_name_error)
      console.log(this.empty_area_error)
      console.log(this.empty_serial_number_error)
      console.log(this.stream_name_error)
      console.log(this.port)
      console.log(this.ip_error)
      if(this.username_error || this.password_error || this.empty_name_error || this.empty_area_error || 
         this.empty_serial_number_error || this.stream_name_error || this.port_error || this.ip_error){
        return true
      }
      else{
        return false
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
    height: 180%;
    background-color: rgba(0, 0, 0, 0.7);
}
.modal-content {
    background-color: #ffffff;
    margin: 15% auto; 
    padding: 20px;
    width: 505px;
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
</style>