<template>
  <teleport to="#destination" :disabled="disableTeleport">
    <ModifyFasteyesOutputForm ref="settingmodal" :faseyes_observation_form_data="faseyes_observation_form" />
  </teleport>

  <div class="mt-4" >
    <p>已設定將歷史紀錄上傳用戶所指定之第三方平台。</p>
  </div>
  <div>
      <div class="mt-4" >
    <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
      <p>txt. 檔案輸出設定</p>
    </div>
    <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
      <div class = "block_text"> 
        <p>所輸出的fasteyes 裝置:</p>
      </div>
      <div class="block_text"> 
        <p>{{ faseyes_device_list_name }}</p>
      </div>
    </div>
    <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
      <div class = "block_text"> 
        <p>每日輸出時間:</p>
      </div>
      <div class = "block_text" > 
        <p>{{ faseyes_output_date_list_name }}</p>
      </div>
    </div>
    <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
      <div class = "block_text"> 
        <p>是否輸出離職員工資料:</p>
      </div>
      <div class = "block_text" > 
        <p v-if="resign_staff_output" >是</p>
        <p v-else>否</p>
      </div>
    </div>
    <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
      <div class = "block_text"> 
        <p>輸出欄位格式：</p>
      </div>
      <div class = "block_text" > 
        <p>{{ output_list_name }}</p>
      </div>
    </div>
    <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
      <div class = "block_text"> 
        <p>不輸出的欄位：</p>
      </div>
      <div class = "block_text" > 
        <p>{{ not_output_list_name }}</p>
      </div>
    </div>
    <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
      <button class="device_comfirm_button" @click="showSettingModal">
        修改
      </button>
    </div>
  </div>
  </div>
</template>
<script>

import { ref } from 'vue';
import { useRouter } from "vue-router";
// import { getUerInfo, getgroup, getusers} from '../../untils/api.js'
import { get_output } from '../../untils/api.js'
import moment from 'moment';
import ModifyFasteyesOutputForm from "../../components/fasteyes/ModifyFasteyesOutputForm.vue"

const router = useRouter();
export default {
  components:{
    ModifyFasteyesOutputForm
  },
  data () {
    return {
      faseyes_observation_form:{},
      faseyes_device_list:[],
      faseyes_output_date_list:[],
      output_list:[],
      not_output_list:[],
      resign_staff_output: false,
   }
  },
  computed:{
    faseyes_device_list_name: function(){
      let name = ""
      this.faseyes_device_list.forEach(element => {
        name += element.name + ","
      }); 
      return name.substring(0,name.length-1)
    },
    faseyes_output_date_list_name: function(){
      let name = ""
      this.faseyes_output_date_list.forEach(element => {
        name += element + ","
      }); 
      return name.substring(0,name.length-1)
    },
    output_list_name: function(){
      let name = ""
      this.output_list.forEach(element => {
        name += element.name + "、"
      }); 

      return name.substring(0,name.length-1)
    },
    not_output_list_name: function(){
      let name = ""
      this.not_output_list.forEach(element => {
        name += element.name + "、"
      }); 
      return name.substring(0,name.length-1)
    },
  },
  methods: {
    async getOutput(){
      await get_output().then((res)=>{
        console.log(res.data)
        let output_form = res.data
        this.faseyes_observation_form = output_form
        console.log(this.faseyes_observation_form)
        this.faseyes_output_date_list = output_form.output_time
        this.faseyes_device_list = output_form.output_fasteyes
        this.output_list = output_form.output_sequence
        this.not_output_list = output_form.not_output
        this.resign_staff_output = output_form.resign_staff_output
      })
    },
    btnEvent(){
    }
  },
  beforeMount() {
    this.getOutput()
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
  setup() {
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
  },
}
</script>
<style scoped>
.block_text{
  font-size: 16px;
  /* font-weight: bold; */
  color: black;
  /* background-color: gray; */
  border-radius: 6px;
  padding: 0px 0px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  align-content: center;
}
.block_blue_text{
  font-size: 16px;
  /* font-weight: bold; */
  color: blue;
  /* background-color: gray; */
  border-radius: 6px;
  padding: 0px 0px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  align-content: center;
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
</style>
