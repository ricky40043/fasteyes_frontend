<template>
  <teleport to="#destination" :disabled="disableTeleport">
    <AddDepartment ref="modal"
    @addDepartment="init"
    />
  </teleport>
  <teleport to="#destination" :disabled="disableTeleport">
    <ModifyDepartment ref="settingmodal" 
    :selectDepartmentData="select_department" 
    @saveDepartment="init"
    />
  </teleport>

    <div class="flex  bg-gray-200 font-roboto" >
      <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 px-1" >
        <div class="py-2">
        <button class="device_set_button" @click="addDemprtmentClick">
            + 新增部門
        </button>
        </div>
         <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">

          <!-- <div id="switchbutton">
            <div class=" flex items-center justify-center">
              <button :class="select_status? 'device_set_button':'device_comfirm_button' " v-on:click="select_all">
                  全部
              </button>
              <button :class="!select_status? 'device_set_button':'device_comfirm_button' " v-on:click="select_empty">
                  空部門
              </button>
            </div>
          </div> -->
          <div id="searchinput">
            <div class="relative mx-4 lg:mx-0" style="width= 100%">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>

              <input
                class="pl-10 pr-4 text-indigo-600 border-gray-200 rounded-md sm:w-96 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="text"
                placeholder="以部門名稱搜尋"
                v-model="search_department_text"
              />
            </div>
          </div>
          
        </div>
          <span>部門列表：{{searchFasteyes_DepartmentTableData.length}}筆</span>
          <div id="tableout">
            
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-3 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    部門
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="u in searchFasteyes_DepartmentTableData" :key="u.id" v-on:click="showResult(u)" class="report_list" :style="select_department.id==u.id? 'background-color:powderblue;':''">
                  <td class="px-3 py-3 text-sm border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.name }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
      <div class="flex-1 items-center px-3 py-3 overflow-x-auto bg-white rounded-md">
          <span></span>

          <div class="flex">
            <span>部門：{{select_department.name}}</span>
              <img src="../../assets/SUMI_img/Vector.png" hight=5 width=20 @click="showSettingModal" />
              <div style="width:60%; text-align:right">
                <button :class="StaffTableData.length==0 ? 'device_delete_button' : 'device_delete_button_disable' " @click="deleteDepartment" :disabled='StaffTableData.length!=0'>
                  刪除部門
                </button>
              </div>
         
          </div>
          <div id="searchinput">
            <div class="relative mx-4 lg:mx-0" style="width= 100%">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <input
                class="w-32 pl-10 pr-4 text-indigo-600 border-gray-200 rounded-md sm:w-96 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="text"
                placeholder="以人員名稱搜尋"
                v-model="search_staff_text"
              />
            </div>
          </div>
          <span>員工列表：{{searchStaffTableData.length}}筆</span>
          <div id="tableout" class="bg-white">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-3 py-3  text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    ID
                  </th>
                  <th class="px-3 py-3  text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    人員
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="u in searchStaffTableData" :key="u.id">
                  <td class="px-3 py-3  text-sm border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.serial_number }}</p>
                  </td>
                  <td class="px-3 py-3  text-sm border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.name }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getDepartment, getStaff, delete_department } from "../../untils/api.js"
import global_ from "../../Global.vue"
import AddDepartment from "../../components/fasteyes/AddDepartment.vue"
import ModifyDepartment from "../../components/fasteyes/ModifyDepartment.vue"
export default {
  components:{
    AddDepartment,
    ModifyDepartment
  },
  data (){
    return{
      fasteyes_DepartmentTableData: [],
      searchFasteyes_DepartmentTableData: [],
      StaffTableData:[],
      searchStaffTableData:[],
      search_department_text: "",
      search_staff_text: "",
      select_id: -1,
      select_status: true,
      select_department:{
        name:"",
        id: 1
      },
    }
  },
  methods: {
    async get_Deparment(){
      await getDepartment().then((res)=>{
        let Departmentlist = Object.assign(res.data)
        this.fasteyes_DepartmentTableData = []
        
        Departmentlist.forEach(department =>{
          let department_data = {}
          // console.log(department)
          department_data.name = department.name
          department_data.id = department.id
          this.fasteyes_DepartmentTableData.push(department_data)
        });
      }) 
      this.searchFasteyes_DepartmentTableData = this.fasteyes_DepartmentTableData
    },
    async get_Staff(){
      this.StaffTableData = []
      await getStaff(-1, this.select_department.id).then((res)=>{
        let stafflist = Object.assign(res.data)
        stafflist.forEach(Data =>{
          let staff = {}
          staff.serial_number = Data.serial_number
          staff.name = Data.info.name  
          staff.id = Data.id
          staff.status = Data.status
          this.StaffTableData.push(staff)
        });
      }) 
      this.searchStaffTableData = this.StaffTableData
    },
    async deleteDepartment(){
      await delete_department(this.select_department.id).then((res)=>{
          alert("delete done")
          this.get_Deparment()
          setTimeout(()=>{
            if(this.fasteyes_DepartmentTableData.length>0){
              this.showResult(this.fasteyes_DepartmentTableData[0])
            }
          },100)
      }) 
    },
    filterDepartment(){
      let newlist = []
      this.fasteyes_DepartmentTableData.forEach(department =>{
        if(this.search_department_text !==''){
          let search_department_text = this.search_department_text.toLowerCase()
          let hasName = department.name.toLowerCase().search(search_department_text) !== -1
          if(hasName){
            newlist.push(department)
          }
        }
        else{
          newlist.push(department)
        }
      })
      this.searchFasteyes_DepartmentTableData = newlist
    },
    filterStaff(){
      let newlist = []
      this.StaffTableData.forEach(staff =>{
        if(this.search_staff_text !==''){
          let search_staff_text = this.search_staff_text.toLowerCase()
          let hasSerialNumber = staff.serial_number.toLowerCase().search(search_staff_text) !== -1
          let hasName = staff.name.toLowerCase().search(search_staff_text) !== -1
          if(hasName || hasSerialNumber){
            newlist.push(staff)
          }
        }
        else{
          newlist.push(staff)
        }
      })
      this.searchStaffTableData = newlist
    },
    showResult (select_department){
      this.select_department.name = select_department.name
      this.select_department.id = select_department.id
      this.get_Staff()
    },
    select_all(){
      this.select_status = true
      this.get_Deparment()
    },
    select_empty(){
      this.select_status = false
      this.get_Deparment()
    },
    search_event(){
      console.log(this.search_text) 
    },
    async init(){
      await this.get_Deparment()
      if(this.fasteyes_DepartmentTableData.length>0)
        this.showResult(this.fasteyes_DepartmentTableData[0])
    },
  },
  watch: {
    search_department_text(){
      this.filterDepartment()
    },
    search_staff_text(){
      this.filterStaff()
    }
  },
  beforeMount() {
    // this.get_Deparment()
    // setTimeout(()=>{
    //   if(this.fasteyes_DepartmentTableData.length>0){
    //     this.showResult(this.fasteyes_DepartmentTableData[0])
    //   }
    // },100)
    this.init()
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
    
    const modal = ref(null);
    const settingmodal = ref(null);
    
    function addDemprtmentClick(){
      modal.value.show()
      this.showModal = true
    }
    function showSettingModal(){
      settingmodal.value.show()
      this.showModal = true
    }

    return {
      disableTeleport,
      addDemprtmentClick ,
      showSettingModal,
      modal,
      settingmodal
    }
  },
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
  width: 24%;
}
#switchbutton{
  width: 60%;
}
.searchinput{
  width: 40%;
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
.device_delete_button_disable{
  font-size: 14px;
  /* font-weight: bold; */
  color: white;
  border-radius: 6px;
  padding: 5px 30px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-content: center;
  right:30px;
  background-color: rgba(224,224,224,1);
  
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
  right:30px;
  background-color: rgba(79, 134, 202, 1);
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

.cardDiv {
    /* border: 1px solid black; */
    width: 25%;
    /* overflow: hidden; */
    /* white-space: nowrap; */
      border-radius: 10px;
  padding: 10px 5px;
}
.report_list{
  background-color: white;
}
.report_list:hover{
  background-color: powderblue;
}
#tableout{
  height: 500px;
  width: 100%;
  overflow-y: scroll;
}
</style>