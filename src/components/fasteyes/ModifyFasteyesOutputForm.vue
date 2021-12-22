<template>
  <div class="modal" v-show="isOpen">
    <div class="modal-content">
      <span class="close" @click="hide">&times;</span>
      <div id="main" class="items-center justify-center">
        <div class="flex items-center justify-center">
          <h4>檔案輸出設定</h4>
        </div>
        <div class="flex">
          <div class="flex items-center">
            <span>選擇所欲輸出的Fasteyes裝置（複選）:</span>
            <select v-model="select_device" >
              <option value="-1">全選</option>
              <option v-for="faseyes_device in faseyes_device_list" :value="faseyes_device.name" :key="faseyes_device.name">{{ faseyes_device.name}}</option>
            </select>
          </div>
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
            <button class="device_comfirm_button" @click="deleteOutput(item)">{{item.name}}</button>
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
            <button class="device_comfirm_button" @click="addOutput(item)">{{item.name}}</button>
          </div>
        </div>
        <div class="flex">
            <p>每日輸出時間：</p>
          <div class="items-center">
          <ul id="array-rendering">
            <li v-for="(item, index) in faseyes_output_date_list">
              <input id="start_time" type="time" class="time_block_text" v-model="faseyes_output_date_list[index]">
            </li>
          </ul>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <button class ="device_comfirm_button" @click="hide">取消</button>
          <button class ="device_set_button" @click="modifyOutputform">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { patch_output} from '../../untils/api.js'
const router = useRouter();

export default {
  props:[
    "faseyes_observation_form_data"
  ],
  data () {
    return {
      faseyes_device_list:[],
      faseyes_output_date_list:[],
      output_list:[],
      not_output_list:[],
      resign_staff_output: false,
      select_device: -1,
      temp:-1
   }
  },
    methods: {
    async modifyOutputform () {
      this.faseyes_observation_form_data.resign_staff_output = this.resign_staff_output
      let faseyes_form_data = Object.assign(this.faseyes_observation_form_data)
      await patch_output(faseyes_form_data).then((res) => {
        console.log(res.data)
        this.hide()
        }).catch((err) => {
          console.log(err)
        })
    },
    clear_data(){
      this.faseyes_device_list=[],
      this.faseyes_output_date_list=[],
      this.output_list=[],
      this.not_output_list=[],
      this.resign_staff_output=false
    },
    input_data(){
      console.log(this.faseyes_observation_form_data)
      this.faseyes_output_date_list = this.faseyes_observation_form_data.output_time
      this.faseyes_device_list = this.faseyes_observation_form_data.output_fasteyes
      this.output_list = this.faseyes_observation_form_data.output_sequence
      this.not_output_list = this.faseyes_observation_form_data.not_output
      this.resign_staff_output = this.faseyes_observation_form_data.resign_staff_output
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
  created(){
    sessionStorage.clear()
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
    width: 800px;
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
</style>