<template>
  <div class="modal" v-show="isOpen"   >
    <div class="modal-content rounded-lg">
      <span class="close" @click="hide">&times;</span>
      <div id="main" class="items-center justify-center">
        <div class="flex items-center justify-center">
          <h4>檔案輸出設定</h4>
        </div>
        <!-- <div class="flex">
          <div class="flex items-center">
            <span>選擇所欲輸出的Fasteyes裝置（複選）:</span>
            <button
              @click="dropdownOpen1 = !dropdownOpen1"
              class="device_comfirm_button"
            >
            裝置選擇 ᴠ
            </button>
            <div class="flex mx-4 text-gray-600 focus:outline-none">


            <div
              v-show="dropdownOpen1"
              class="fixed inset-0 z-10 w-full h-full"
              @click="dropdownOpen1 = false"
            ></div>
              
            <transition
              enter-active-class="transition duration-150 ease-out transform"
              enter-from-class="scale-95 opacity-0"
              enter-to-class="scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in transform"
              leave-from-class="scale-100 opacity-100"
              leave-to-class="scale-95 opacity-0"
            >
              <div
                v-show="dropdownOpen1"
                class="absolute z-2 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
              >
                <div v-for="(item, index) in Fasteyes_DeviceList">
                  <input type="checkbox" :key="item.id" value="first_checkbox" v-model="select_faseyes_device_list[index]">
                  <label :for="item.id">{{item.name}}</label>
                </div>
              </div>
            </transition>
            </div> 
          </div>
        </div> -->
        <span>選擇所欲輸出的Fasteyes裝置（複選）:</span>
        <div v-for="(item, index) in Fasteyes_DeviceList">
          <input type="checkbox" :key="item.id" value="first_checkbox" v-model="select_faseyes_device_list[index]">
          <label :for="item.id">{{item.name}}</label>
        </div>
        <div class="flex ">
          <div class="flex items-center">
            <input type="checkbox" id="cbox1" value="first_checkbox" v-model="resign_staff_output">
            <label for="cbox1">輸出含離職員工的歷史資料</label>
          </div>
        </div>
        <div class="flex">
          <div class="flex items-center">
            <p>輸出格式：</p>
            <p>{{output_list_name}}</p>
          </div>
        </div>
        <div class="flex" style="border-width:1px;border-style:solid;border-color:Black;padding:3px 3px;">
          <div v-for="item in output_list">
            <div class="device_comfirm_button" @click="deleteOutput(item)" @mouseover="mouseoverEvent" @mouseleave="mouseleaveEvent">
              {{item.name}}
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="flex items-center">
            <p>未輸出欄位：</p>
            <p>{{not_output_list_name}}</p>
          </div>
        </div>
        <div class="flex" style="border-width:1px;border-style:solid;border-color:Black;padding:3px 3px;">
          <div v-for="item in not_output_list">
            <button class="device_comfirm_button" @click="addOutput(item)" @mouseover="mouseoverEvent2" @mouseleave="mouseleaveEvent2">{{item.name}}</button>
          </div>
        </div>
        <div class="flex">
            <p>每日輸出時間：</p>
          <div class="items-center">
          <ul id="array-rendering">
            <li v-for="item in faseyes_output_date_list">
              <input id="start_time" type="time" class="time_block_text" v-model="faseyes_output_date_list[index]">
            </li>
          </ul>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <button class ="device_cancel_button" @click="hide">取消</button>
          <button class ="device_set_button" @click="modifyOutputform">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { patch_output, getFasteyesDevice} from '../../untils/api.js'
const router = useRouter();

export default {
  props:[
    "faseyes_observation_form_data"
  ],
  data () {
    return {
      device_Map: new Map(),
      Fasteyes_DeviceList:[],
      faseyes_device_list:[],
      select_faseyes_device_list:[],
      faseyes_output_date_list:[],
      output_list:[],
      not_output_list:[],
      resign_staff_output: false,
      temp:-1,
      dropdownOpen1: false,
      temp_outputdata:""
   }
  },
    methods: {
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
    async modifyOutputform () {
      this.faseyes_observation_form_data.resign_staff_output = this.resign_staff_output
      let faseyes_form_data = Object.assign(this.faseyes_observation_form_data)
      faseyes_form_data.output_fasteyes = []
      this.Fasteyes_DeviceList.forEach((device,index)=>{
        if(this.select_faseyes_device_list[index]){
          faseyes_form_data.output_fasteyes.push(device)
        }
      })
      await patch_output(faseyes_form_data).then((res) => {
        this.hide()
        this.$emit('saveOutputForm')
        }).catch((err) => {
          console.log(err)
        })
    },
    async getDevice(){
      this.Fasteyes_DeviceList =[]
      await getFasteyesDevice().then((res)=>{
        let devicelist = Object.assign(res.data)
        devicelist.forEach(Data =>{
          let device = {}
          device.name = Data.name 
          device.id = Data.id
          this.Fasteyes_DeviceList.push(device)
          this.device_Map.set(device.id, Object.assign(device))
        });
      }) 
    },
    clear_data(){
      this.faseyes_device_list=[],
      this.select_faseyes_device_list=[]
      this.faseyes_output_date_list=[],
      this.output_list=[],
      this.not_output_list=[],
      this.resign_staff_output=false
    },
    input_data(){
      this.faseyes_output_date_list = this.faseyes_observation_form_data.output_time
      this.faseyes_device_list = this.faseyes_observation_form_data.output_fasteyes
      this.output_list = this.faseyes_observation_form_data.output_sequence
      this.not_output_list = this.faseyes_observation_form_data.not_output
      this.resign_staff_output = this.faseyes_observation_form_data.resign_staff_output
      this.select_faseyes_device_list = []
      this.Fasteyes_DeviceList.forEach(device =>{
        let use_device = false
        if (this.faseyes_device_list.find(element => element.id == device.id)){
          use_device = true
        }
        this.select_faseyes_device_list.push(use_device)
      });
      console.log(this.select_faseyes_device_list)
    },
    deleteOutput(item){
      const index = this.output_list.indexOf(item);
      if (index > -1) {
        this.output_list.splice(index, 1);
      }
      this.not_output_list.push(item)
    },
    addOutput(item){
      const index = this.not_output_list.indexOf(item);
      if (index > -1) {
        this.not_output_list.splice(index, 1);
      }
      this.output_list.push(item)
    },
    mouseoverEvent(event){
      event.target.className = "device_delete_button"
      var img = "✘"
      if(event.target.innerHTML.indexOf(img)<0)
         event.target.innerHTML += img 
    },
    mouseleaveEvent(event){
      event.target.className = "device_comfirm_button"
      var img = "✘"
      let innerdata = event.target.innerHTML
      innerdata = innerdata.substring(0,innerdata.length - img.length)
      event.target.innerHTML = innerdata 
    },
    mouseoverEvent2(event){
      event.target.className = "device_in_button"
      var img = "✓"
      if(event.target.innerHTML.indexOf(img)<0)
         event.target.innerHTML += img 
    },
    mouseleaveEvent2(event){
      event.target.className = "device_comfirm_button"
      var img = "✓"
      let innerdata = event.target.innerHTML
      innerdata = innerdata.substring(0,innerdata.length - img.length)
      event.target.innerHTML = innerdata 
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
          this.getDevice()
        },10)
        setTimeout(()=>{
          this.input_data()
        },100)
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
#left {
  width: 50%;
}
#right {
  width: 50%;
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
.modal {
    position: absolute;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 110%;
    background-color: rgba(0, 0, 0, 0.7);
}
.modal-content {
    background-color: #ffffff;
    margin: 15% auto; 
    padding: 20px;
    width: 1000px;
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
.device_cancel_button{
  font-size: 14px;
  /* font-weight: bold; */
  color:rgba(79, 134, 202, 1);
  border-radius: 6px;
  padding: 5px 30px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-content: center;
  background-color: white;
  border-style:solid;
  border-width:2px;
  border-color:#4F86CA;
}
.device_comfirm_button{
  font-size: 14px;
  /* font-weight: bold; */
  color:rgba(79, 134, 202, 1);
  border-radius: 6px;
  padding: 3px 6px;
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
  border-color:red;
  color: red;
}
.select_output{
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
  color:red;
  border-radius: 6px;
  padding: 3px 6px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-content: center;
  background-color: white;
  border-style:solid;
  border-width:2px;
  border-color:red;
}
.device_in_button{
  font-size: 14px;
  /* font-weight: bold; */
  color:limegreen;
  border-radius: 6px;
  padding: 3px 6px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-content: center;
  background-color: white;
  border-style:solid;
  border-width:2px;
  border-color:limegreen;
}
</style>