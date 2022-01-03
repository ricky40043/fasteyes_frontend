<template>
  <div class="modal" v-show="isOpen">
    <div class="modal-content rounded-lg">
      <span class="close" @click="hide">&times;</span>

      <div id="main" class="items-center justify-center">
        <div class="flex items-center justify-center">
          <p class="text-xl">編輯人員資料</p>
        </div>
        <div class="flex justify-center">
          <div id="left"> 
            <table>
              <tbody>
                <tr>
                  <td class="px-2 py-2">
                    <span>ID:</span>
                  </td>
                  <td class="px-2 py-2">
                    <input type="text" v-model="serial_number" :class="empty_serial_number_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" disabled/>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-2">
                    <span>姓名:</span>
                  </td>
                  <td class="px-2 py-2">
                    <input type="text" v-model="addStaffData.name" :class="empty_name_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"/>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-2">
                    <span>部門:</span>
                  </td>
                  <td class="px-2 py-2">
                    <select v-model="select_department" :class="select_department_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                      <option value="-1">請選擇</option>
                      <option v-for="department in department_list" :value="department.id" :key="department.name">{{ department.name}}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-2">
                    <span>在職狀態:</span>
                  </td>
                  <td class="px-2 py-2">
                    <select v-model="status" :class="select_status_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                      <option value="-1">員工狀態</option>
                      <option value="1">在職</option>
                      <option value="2">留職停薪</option>
                      <option value="3">離職</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-2">
                    <span>性別:</span>
                  </td>
                  <td class="px-2 py-2">
                    <select v-model="addStaffData.gender" :class="select_gender_error?'error_input':''" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                      <option value="-1">請選擇</option>
                      <option value="1">男生</option>
                      <option value="2">女生</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="right" class="px-2 py-2">
            <p>臉部識別建檔照</p>
            <img class="py-2" :src="image_data" alt="" v-if="face_img_exist" />
            <img class="py-2" src="../../assets/SUMI_img/noImg_tw.3307d94.png" alt="" v-else/>
            <button class="device_delete_button py-2" @click="deleteStaff">刪除人員</button>
          </div>
        </div>


        <div class="flex items-center justify-center">
          <button class ="device_comfirm_button" @click="hide">取消</button>
          <button class ="device_set_button" @click="modifyStaff">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { modify_staff, getDepartment, get_staff_face, delete_staff} from '../../untils/api.js'
import global_ from "../../Global.vue"
const router = useRouter();

export default {
  props:[
    "selectStaffData"
  ],
  data () {
    return {
      staff_id: -1,
      serial_number: "",
      select_department: -1,
      status: -1,
      department_Map: new Map(),
      empty_name_error: false,
      empty_serial_number_error: false,
      select_status_error: false,
      select_department_error: false,
      select_gender_error: false,
      id_repeate: false,
      department_list: [],
      face_img_exist :false,
      addStaffData: {
        name: "",
        gender: -1,
      },
      image_data: "",
      face_detect : false
   }
  },
    methods: {
    async get_Department(){
      this.department_list = []
      await getDepartment().then((res)=>{
        this.department_list = Object.assign(res.data)
        this.department_list.forEach(department => {
          this.department_Map.set(parseInt(department.id), Object.assign(department))
        });
      }) 
    },
    async modifyStaff () {
      if(!this.check()){
        alert("輸入資料有誤")
        return
      }
      let StaffData = Object.assign(this.addStaffData)
      await modify_staff(this.staff_id,this.select_department, StaffData, this.status).then((res) => {
        this.hide()
        this.$emit('saveStaff')
        }).catch((err) => {
          let errorMessage = err.response.data.detail
          if (errorMessage == "Serveral_number already exist in this group"){
            this.id_repeate = true
            this.empty_serial_number_error = true
          }
        })
    },
    async deleteStaff() {
      await delete_staff(this.staff_id).then((res) => {
        this.hide()
        this.$emit('deleteStaff')
        }).catch((err) => {
        })
    },
    clear_data(){
      this.get_Department()
      this.serial_number = ""
      this.select_department = -1
      this.status = -1
      this.addStaffData= {
        name : "",
        gender : -1
      }
      this.empty_name_error= false
      this.empty_serial_number_error= false
      this.select_status_error= false
      this.select_department_error= false
      this.select_gender_error= false
      this.id_repeate= false
      this.face_img_exist = false
      this.image_data= ""
      this.face_detect = false
    },
    async input_data(){
      this.staff_id = this.selectStaffData.id
      this.serial_number = this.selectStaffData.serial_number
      this.select_department =this.selectStaffData.department_id
      this.status = this.selectStaffData.status
      this.face_detect = this.selectStaffData.facedetect
      this.addStaffData= {
        name : this.selectStaffData.staff,
        gender : this.selectStaffData.gender
      }
      if (this.face_detect){
        await get_staff_face(this.staff_id).then((res)=>{
          this.face_img_exist = true
          this.image_data = ('data:image/png;base64,' + btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte), ''
          )))
        })
      }
    },
    check(){
      if(this.addStaffData.gender ==-1)
        this.select_gender_error = true
      else
        this.select_gender_error = false

      if(this.select_department ==-1)
        this.select_department_error = true
      else
        this.select_department_error = false
      
      if(this.status ==-1)
        this.select_status_error = true
      else
        this.select_status_error = false
      
      if(this.serial_number=="")
        this.empty_serial_number_error = true
      else
        this.empty_serial_number_error = false
      

      if(this.addStaffData.name=="")
        this.empty_name_error = true
      else
        this.empty_name_error = false
      
      if(this.empty_serial_number_error || this.empty_name_error)
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
  width: 45%;
}
#right {
  width: 55%;
}
.modal {
    position: absolute;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 115%;
    background-color: rgba(0, 0, 0, 0.7);
}
.modal-content {
    background-color: #ffffff;
    margin: 15% auto; 
    padding: 20px;
    width: 750px;
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
.error_input{
  border-color:red;
  color: red;
}
</style>