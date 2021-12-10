<template>
    <teleport to="#destination" :disabled="disableTeleport">
      <Addstaff ref="modal">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi in dolorem, eligendi, voluptate ullam alias ut similique iusto voluptatum, ea nostrum dicta illo adipisci sapiente! Numquam maxime excepturi aspernatur dolore.
      </Addstaff>
    </teleport>

  <div id="select">
          <button class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
            ＋ 上傳人員列表
          </button>
          <button class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
            ＋ 新增人員
          </button>
  </div>
  <div id="data">
    <div id="upnormal">
      <div class="mt-4" >
        <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
          <div id="time">
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
              class="pl-10 pr-4 border-gray-200 rounded-md"
              style="width: 100%;"
              type="text"
              placeholder="以人員名稱或其ID搜尋"
            />
          </div>
          </div>
          <div id="device" class="flex items-center justify-center">
            <select v-model="select_department" class="device_block_text" @change="get_Staff">
              <option value="-1">所有部門</option>
              <option v-for="department in department_list" :value="department.id" :key="department.name">{{ department.name}}</option>
              <!-- <option value="">部門選擇</option>
              <option value="1">RD</option>
              <option value="2">PM</option>
              <option value="3">IT</option> -->
          </select>
          </div>
          <div id="setbutton" class="focus:outline-none focus:bg-indigo-500 flex items-center justify-center">
             <select v-model="staff_status" class="device_block_text" @change="get_Staff">
              <option value="-1">員工狀態</option>
              <option value="1">在職</option>
              <option value="2">留職停薪</option>
              <option value="3">離職</option>
          </select>
          </div>
        </div>
      </div>
    </div>
    <div id="downtable">
              <div class="mt-8">
      <div class="mt-6">
        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div
            class="inline-block min-w-full overflow-hidden rounded-lg shadow"
          >
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    部門
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    ID
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    人員
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    臉部辨識
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    編輯
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    歷史紀錄
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    刪除
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(u, index) in StaffTableData" :key="index">
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.department }}</p>
                  </td>
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.serial_number }}</p>
                  </td>
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.staff }}</p>
                  </td>
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap" v-if="u.facedetect">已開啟</p>
                    <p class="text-gray-900 whitespace-nowrap" v-else>未開啟</p>
                  </td>
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <a href="#">編輯</a>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <a href="#">歷史紀錄</a>
                  </td>
                  <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <img src="../../assets/SUMI_img/icon-2.png" alt="" height="25" width="25" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between"
            >
              <span class="text-xs text-gray-900 xs:text-sm">Showing {{page}} to {{page_total}} of {{page_size}} Entries</span>

              <div class="inline-flex mt-2 xs:mt-0">
                <button class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400" v-on:click="decrement">
                  Prev
                </button>
                <button class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400" v-on:click="increment">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getStaff, getDepartment } from "../../untils/api.js"
import Addstaff from '../../components/fasteyes/Addstaff.vue'

export default {
  components:{
    Addstaff
  },
  data (){
    let StaffTableData=[]
    let department_list
    let department_Map = new Map()
    let page = 1
    let total = 1
    let page_size = 50
    let page_total = 1
    let search_text = ""
    let select_department = -1
    let staff_status = -1
    return{
      StaffTableData,
      department_list,
      department_Map,
      page,
      total,
      page_size,
      page_total,
      search_text,
      select_department,
      staff_status,
      timer: window.setInterval(() => { this.get_Staff () }, 60000)
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
          staff.serial_number = Data.serial_number
          staff.staff = Data.info.name  
          staff.facedetect = Data.info.face_detect  
          staff.id = Data.id
          this.StaffTableData.push(staff)
        });
      }) 
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
    increment(){
      if(this.page<this.page_total)
      {
        this.page++
        this.get_Staff()
      }
    },
    decrement(){
      if(this.page>1)
      {
        this.page--
        this.get_Staff()
      }
    },
    search_event(){
      console.log(this.search_text) 
    },
    select_history(){
      alert("123")
    }
    // init(){
    //   // create Device Map 
    //   let devicelist = store.state.deviceList_Fasteyes
    //   devicelist.forEach(device => {
    //     this.device_Map.set(device.id, Object.assign(device))
    //   });
    // },
  },
  beforeMount() {
    this.get_Department()
    this.get_Staff()
  },
  beforeUnmount(){
    window.clearInterval(this.timer)
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

    function showModal(){
      console.log(modal)
      modal.value.show()
    }
    return {
      disableTeleport,
      showModal ,
      modal
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
  width: 30%;
}
.searchinput{
  width: 60%;
}
.outputbutton{
  width: 10%;
  align-content: left;
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
.device_normal_button{
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
.device_abnormal_button{
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
</style>

