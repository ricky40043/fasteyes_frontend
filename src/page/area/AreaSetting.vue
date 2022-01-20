<template>
  <teleport to="#destination" :disabled="disableTeleport">
    <AddArea ref="modal" 
    @addArea="getArea"
    />
  </teleport>
  <teleport to="#destination" :disabled="disableTeleport">
    <DeleteComfirm ref="deletemodal" 
    @deleteDevice="deleteArea"
    />
  </teleport>
  <!-- <teleport to="#destination" :disabled="disableTeleport">
    <Modifystaff ref="settingmodal" 
    :selectStaffData="select_staff" 
    @saveStaff="get_Staff"
    @deleteStaff="get_Staff"
    />
  </teleport>
  <teleport to="#destination" :disabled="disableTeleport">
    <DeleteComfirm ref="deletemodal" 
    @deleteDevice="deleteStaff"
    />
  </teleport> -->

  <div id="select">
          <button class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
          @click="addAreaClick">
            新增區域
          </button>
  </div>
  <div>
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
              placeholder="以區域搜尋"
              v-model="search_text"
            />
          </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
    <div id="left">
        <div class="mt-6">
        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div
            class="inline-block min-w-full overflow-hidden rounded-lg shadow tableout"
          >
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-2 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    編號
                  </th>
                  <th class="px-2 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    區域名稱
                  </th>
                  <th class="px-2 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    警報發信
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(u, index) in SearchTableData" :key="index" class="report_list" :style="select_area.id==u.id? 'background-color:powderblue;':''" @click="showArea_user(u)">
                  <td class="px-3 py-3 text-sm border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ index+1 }}</p>
                  </td>
                  <td class="px-3 py-3 text-sm border-b border-gray-200">
                    <div v-if="select_area.id==u.id" class="flex">
                      <input type="text" class="block mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" v-model="u.name" />
                      <button class="device_set_button" @click="ModifyArea(u.id,u.name,u.send_mail)">修改</button>
                    </div>
                    <div v-else class="flex">
                      <p class="text-gray-900 whitespace-nowrap">{{ u.name }}</p>
                    </div>
                  </td>
                  <td class="px-3 py-3 text-sm border-b border-gray-200">
                    <div class="flex">
                      <button :class ="u.send_mail ?'device_set_button':'device_comfirm_button'" @click="ModifyArea(u.id,u.name,true)">啟用</button>
                      <button :class ="u.send_mail ?'device_comfirm_button':'device_set_button'" @click="ModifyArea(u.id,u.name,false)">不啟用</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    <div id="right" v-if="JSON.stringify(select_area) != '{}'">
      <div class="flex">
        <span>區域名稱：{{select_area.name}}</span>
          <div style="width:60%; text-align:right">
            <button class="device_delete_button" style="align-content: center;" @click="delete_click">
              刪除區域
            </button>
          </div>
      </div>
        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div class="inline-block min-w-full overflow-hidden rounded-lg shadow tableout">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-2 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    負責人員
                  </th>
                  <th class="px-2 py-2 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    其他人員
                  </th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                  <td class="px-3 py-3 text-sm border-b border-gray-200">
                    <div style="border-width:0px;border-style:solid;border-color:Black;padding:3px 3px;">
                      <div v-for="item in user_list">
                        <div class="device_out_button" @click="deleteAreaUser(item)" @mouseover="mouseoverEvent" @mouseleave="mouseleaveEvent">
                          {{item.email}}
                        </div>
                      </div>
                    </div>  
                  </td>
                  <td class="px-3 py-3 text-sm border-b border-gray-200">
                    <div style="border-width:0px;border-style:solid;border-color:Black;padding:3px 3px;">
                      <div v-for="item in not_user_list">
                        <button class="device_out_button" @click="addAreaUser(item)" @mouseover="mouseoverEvent2" @mouseleave="mouseleaveEvent2">
                          {{item.email}}
                        </button>
                      </div>
                    </div>
                  </td>
                </tr> 
              </tbody>
            </table>
          </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import {get_area, modify_area, delete_area, get_area_user, getusers, create_area_user, delete_area_user} from "../../untils/api.js"
import AddArea from "../../components/area/AddArea.vue"
import DeleteComfirm from "../../components/DeleteComfirm.vue"
export default {
  components:{
    AddArea,
    DeleteComfirm
  },
  data (){
    return{
      AreaTableData :[],
      SearchTableData: [],
      department_list:[],
      department_Map: new Map(),
      search_text: "",
      select_area : {},
      user_list : [],
      not_user_list : [],
    }
  },
  methods: {
    async getArea(){
      this.AreaTableData = []
      await get_area().then((res)=>{
        let Arealist = Object.assign(res.data)
        Arealist.forEach(Data =>{
          let area = {}
          area.name = Data.name  
          area.send_mail = Data.send_mail  
          area.id = Data.id
          this.AreaTableData.push(area)
        });
      }) 
      this.SearchTableData = this.AreaTableData
    },
    delete_click(area_id){
      this.delete_area_id = area_id
      this.showDeleteModal()
    },
    async deleteArea() {
      await delete_area(this.select_area.id).then((res) => {
        this.select_area = {}
        this.getArea()
        }).catch((err) => {
          alert(err.response.data.detail)
        })
    },
    search_event(){
      console.log(this.search_text) 
    },
    async ModifyArea(area_id,name,send_mail){
      await modify_area(area_id,name,send_mail).then((res) => {
        this.select_area={}
        this.getArea()
        }).catch((err) => {
          alert(err.response.data.detail)
        })
    },
    async showArea_user(area){
      this.getArea()
      this.select_area = area
      this.user_list = []
      this.not_user_list = []
      let all_list = []
      let temp_list = []
      await get_area_user(this.select_area.id).then((res) => {
          let Area_userlist = Object.assign(res.data)
            Area_userlist.forEach(user =>{
            let each_user = {}
            each_user.id = user.id
            each_user.name = user.name
            each_user.email = user.email
            temp_list.push(each_user)
          });
        }).catch((err) => {
          alert(err.response.data.detail)
        })
      await getusers().then((res) => {
          let Area_userlist = Object.assign(res.data)
            Area_userlist.forEach(user =>{
            let each_user = {}
            each_user.id = user.id
            each_user.name = user.name
            each_user.email = user.email
            let append = true
            temp_list.forEach(user =>{ 
              if(user.id == each_user.id)
                append = false
            })
            if(append)
              all_list.push(each_user)
          });
        }).catch((err) => {
          alert(err.response.data.detail)
        })
      // if (temp_list.length==0)
      //   this.not_user_list = all_list
      // else
      // {
      //   // console.log(all_list)
      //   // console.log(temp_list)
      //   // var sa = new Set(all_list);
      //   // var sb = new Set(temp_list);
      //   // let minus = all_list.filter(x => sb.has(x));
      //   // console.log(minus)
      // }
      this.user_list = temp_list
      this.not_user_list = all_list

    },
    filter(){
      let newlist = []
      this.AreaTableData.forEach(area =>{
        if(this.search_text !==''){
          let search_text = this.search_text.toLowerCase()
          let hasName = area.name.toLowerCase().search(search_text) !== -1
          if(hasName){
            newlist.push(area)
          }
        }
        else{
          newlist.push(area)
        }
      })
      this.SearchTableData = newlist
    },
    async addAreaUser(item){
      await create_area_user(this.select_area.id,item.id).then((res)=>{
      }).catch((err) =>{
        alert(err.response.data.detail)
      })
      this.showArea_user(this.select_area)
    },
    async deleteAreaUser(item){
      await delete_area_user(this.select_area.id,item.id).then((res)=>{
      }).catch((err) =>{
        alert(err.response.data.detail)
      })
      this.showArea_user(this.select_area)
    },
    mouseoverEvent(event){
      event.target.className = "device_cancel_button"
      var img = "✘"
      if(event.target.innerHTML.indexOf(img)<0)
         event.target.innerHTML += img 
    },
    mouseleaveEvent(event){
      event.target.className = "device_out_button"
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
      event.target.className = "device_out_button"
      var img = "✓"
      let innerdata = event.target.innerHTML
      innerdata = innerdata.substring(0,innerdata.length - img.length)
      event.target.innerHTML = innerdata 
    }
  },
  beforeMount() {
    this.getArea()
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
  watch: {
    search_text(){
      this.filter()
    }
  },
  setup() {
    const disableTeleport = ref(false)   
    
    const modal = ref(null);
    
    function addAreaClick(){
      modal.value.show()
      this.showModal = true
    }

    const deletemodal = ref(null);
    function showDeleteModal(){
      deletemodal.value.show()
    }

    return {
      disableTeleport,
      addAreaClick ,
      modal,
      deletemodal,
      showDeleteModal
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
  padding: 3px 10px;
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
  padding: 3px 10px;
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
.tableout{
  height: 400px;
  width: 100%;
  overflow-y: scroll;
}
#left{
  width: 60%;
}
#right{
  width: 40%;
}
.report_list{
  background-color: white;
}
.report_list:hover{
  background-color: powderblue;
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
.device_cancel_button{
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
.device_out_button{
  font-size: 14px;
  /* font-weight: bold; */
  color:rgba(79, 134, 202, 1);
  border-radius: 6px;
  padding: 3px 3px;
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

