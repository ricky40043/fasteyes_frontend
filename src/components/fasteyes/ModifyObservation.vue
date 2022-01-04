<template>
  <div class="modal" v-show="isOpen">
    <div class="modal-content rounded-lg">
      <span class="close" @click="hide">&times;</span>

      <div id="main" class="items-center justify-center">
        <div class="flex items-center justify-center">
          <p>請選擇正確的人員</p>
        </div>
        <div class="flex items-center justify-center">
            <input
              class="pl-10 pr-4 border-gray-200 rounded-md"
              style="width: 100%;"
              type="text"
              placeholder="以人員名稱或其ID搜尋"
              v-model="search"
            />
        </div>
          <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <span>人員列表：{{SearchTableData.length}}位</span>
            <div id="tableout" class="w-full max-h-96">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="px-2 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      部門
                    </th>
                    <th class="px-2 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      ID
                    </th>
                    <th class="px-2 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      人員
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr @click="select_staff=0" :style="select_staff==0? 'background-color:powderblue;':''" class="report_list">
                    <td class="px-2 py-2 text-sm  border-b border-gray-200">
                      <p class="text-gray-900 whitespace-nowrap">未知人員</p>
                    </td>
                    <td class="px-2 py-2 text-sm  border-b border-gray-200">
                      <p class="text-gray-900 whitespace-nowrap"> </p>
                    </td>
                    <td class="px-2 py-2 text-sm  border-b border-gray-200">
                      <p class="text-gray-900 whitespace-nowrap"> </p>
                    </td>
                  </tr>
                  <tr v-for="u in SearchTableData" :key="u.id" @click="select_staff=u.id" :style="select_staff==u.id? 'background-color:powderblue;':''" class="report_list">
                    <td class="px-2 py-2 text-sm border-b border-gray-200">
                      <p class="text-gray-900 whitespace-nowrap">{{ u.department }}</p>
                    </td>
                    <td class="px-2 py-2 text-sm  border-b border-gray-200">
                      <p class="text-gray-900 whitespace-nowrap">{{ u.serial_number }}</p>
                    </td>
                    <td class="px-2 py-2 text-sm  border-b border-gray-200">
                      <p class="text-gray-900 whitespace-nowrap">{{ u.name }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        <div class="flex items-center justify-center px-2 py-2">
          <button class ="device_comfirm_button" @click="hide">取消</button>
          <button class ="device_set_button" @click="modifyObservation">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {getStaff, getDepartment, modifyFasteyes_Observation } from '../../untils/api.js'
const router = useRouter();

export default {
  props:[
    "selectObservation_id"
  ],
  data () {
    return {
        StaffTableData :[],
        SearchTableData:[],
        department_list:[],
        department_Map: new Map(),
        select_staff : -1,
        staff_status: 1,
        select_department:-1,
        search:""
      }
  },
    methods: {
    async get_Staff(){
      this.StaffTableData = []
      await getStaff(this.staff_status, this.select_department).then((res)=>{
        let stafflist = Object.assign(res.data)
        stafflist.forEach(Data =>{
          let staff = {}
          staff.department = this.department_Map.get(Data.department_id).name
          staff.department_id = Data.department_id
          staff.serial_number = Data.serial_number
          staff.name = Data.info.name  
          staff.facedetect = Data.info.face_detect  
          staff.id = Data.id
          staff.gender = Data.info.gender
          staff.status = Data.status
          this.StaffTableData.push(staff)
        });
      }) 
      this.SearchTableData = this.StaffTableData
    },
    async get_Department(){
      this.department_list = []
      await getDepartment().then((res)=>{
        this.department_list = Object.assign(res.data)
        this.department_list.forEach(department => {
          this.department_Map.set(parseInt(department.id), Object.assign(department))
        });
      }) 
    },
    async modifyObservation(){
      if(this.check()){
        alert("請先選擇一個員工")
        return
      }
      await modifyFasteyes_Observation(this.selectObservation_id, this.select_staff).then((res)=>{
        alert("修改成功")
        this.hide()
        this.$emit('modifyObservation')
      })
    },
    clear_data(){
      this.select_staff = -1
    },
    check(){
      if(this.select_staff == -1)
        return true
      
      return false
    },
    filter(){
      let newlist = []
      this.StaffTableData.forEach(staff =>{
        if(this.search !==''){
          let search = this.search.toLowerCase()
          let hasName = staff.name.toLowerCase().search(search) !== -1
          let hasSerialNumber = staff.serial_number.toLowerCase().search(search) !== -1
          if(hasName || hasSerialNumber){
            newlist.push(staff)
          }
        }
        else{
          newlist.push(staff)
        }
      })
      this.SearchTableData = newlist
    }
  },
  beforeMount() {
    this.get_Department()
    this.get_Staff()
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
  watch: {
    search(){
      this.filter()
    }
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
    width: 600px;
    height: 550px;

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
  border-color:red;
  color: red;
}
#tableout{
  height: 400px;
  width: 100%;
  overflow-y: scroll;
}
.report_list{
  background-color: white;
}
.report_list:hover{
  background-color: powderblue;
}
</style>