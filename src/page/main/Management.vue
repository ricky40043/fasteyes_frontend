<template>
  <teleport to="#destination" :disabled="disableTeleport">
    <ModifyUserName ref="settingmodal" 
    :NameData="userName" 
    @saveChange="getUser"/>
  </teleport>

  <router-link to="/main">
    <p class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-"> &lt; 帳號管理</p>
  </router-link>
  <hr>
  <div class="mt-4" >
    <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
      <p>群組名稱</p>
    </div>
    <div class="flex items-center px-4" style="background-color: #F5F6F9;">
      <div class = "block_text"> 
        <p>Group Name: {{groupName}}</p>
      </div>
      <div class = "block_blue_text" > 
        <button @click="btnEvent">查看群組成員</button>
      </div>
    </div>
  </div>
  <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8" v-show="showUser">
    <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              使用者名稱
            </th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              Email
            </th>
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              層級
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(u, index) in userTableData" :key="index">
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <p class="text-gray-900 whitespace-nowrap">{{ u.name }}</p>
            </td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <p class="text-gray-900 whitespace-nowrap">{{ u.email }}</p>
            </td>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <p class="text-gray-900 whitespace-nowrap" v-if="u.level == 0">RD</p>
              <p class="text-gray-900 whitespace-nowrap" v-else-if="u.level == 1">Partner</p>
              <p class="text-gray-900 whitespace-nowrap" v-else-if="u.level == 2">Admin</p>
              <p class="text-gray-900 whitespace-nowrap" v-else-if="u.level == 3">HR</p>
              <p class="text-gray-900 whitespace-nowrap" v-else-if="u.level == 4">Normal</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div>
      <div class="mt-4" >
    <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
      <p>帳戶資訊</p>
    </div>
    <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
      <div class = "block_text"> 
        <p>使用者名稱:</p>
      </div>
      <div class = "block_text" > 
        <p>{{ userName }}</p>
      </div>
        <div class = "block_blue_text"> 
          <button @click="showSettingModal">修改</button>
        </div>
      </div>
    <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
      <div class = "block_text"> 
        <p>創立時間:</p>
      </div>
      <div class = "block_text" > 
        <p>{{ userCreate_at }}</p>
      </div>
    </div>
    <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
      <div class = "block_text"> 
        <p>層級:</p>
      </div>
      <div class = "block_text" > 
        <p v-if="level == 0">RD</p>
        <p v-else-if="level == 1">Partner</p>
        <p v-else-if="level == 2">Admin</p>
        <p v-else-if="level == 3">HR</p>
        <p v-else-if="level == 4">Normal</p>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getUerInfo, getgroup, getusers} from '../../untils/api.js'
import ModifyUserName from "../../components/main/ModifyUserName.vue"

import moment from 'moment';

const router = useRouter();
export default {
    components:{
    ModifyUserName
  },
  data () {
    let showUser = false
    let UserTableData = []
    let userName=""
    let userCreate_at=""
    let level = -1
    let groupName = ""

    return {
      showUser,
      UserTableData,
      userName,
      userCreate_at,
      level,
      groupName,
   }
  },
  methods: {
    async getUser () {
      await getUerInfo().then((res)=>{
          if (res.data.Status === false) {
            let errorEvent = {
              target: 'email',
              text: (window.navigator.language === 'zh-TW') ? '帳號尚未驗證' : 'User is not validated'
            }
          } else {
            let UserData = Object.assign(res.data)
            this.userName = UserData.name
            let datetime = moment(UserData.created_at, "YYYY-MM-DDThh:mm:ss:SSSSSS")
            this.userCreate_at = datetime.format('YYYY-MM-DD')
            this.level = UserData.level
          }
      })
    },
    async getGroup () {
      await getgroup().then((res)=>{
          let groupData = Object.assign(res.data)
          this.groupName = groupData.name
      })  
    },
    async getGroupUser () {
      this.userTableData = []
      await getusers().then((res)=>{
        // console.log(res.data)
        let userlist = Object.assign(res.data)
        userlist.forEach(Data =>{
          let user = {}
          user.name = Data.name 
          user.email = Data.email 
          user.level = Data.level 

          this.userTableData.push(user)
        });
      })
    },
    btnEvent(){
      this.showUser =!this.showUser
      // if (this.showUser){
      //   this.getGroupUser()
      // }
    }
  },
  beforeMount() {
    this.getUser()
    this.getGroup()
    this.getGroupUser()

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
</style>
