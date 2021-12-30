<template>
  <teleport to="#destination" :disabled="disableTeleport">
    <InviteUser ref="modal" />
  </teleport>

  <teleport to="#destination" :disabled="disableTeleport">
    <ModifyGroupName ref="settingmodal" :NameData="groupName" />
  </teleport>

  <router-link to="/main">
    <p class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-"> &lt; 群組管理</p>
  </router-link>
  <hr>
  <div class="mt-4">
    <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
      <p>群組名稱</p>
    </div>
    <div class="flex items-center px-4" style="background-color: #F5F6F9;">
      <div class = "block_text"> 
        <p>Group Name: {{groupName}}</p>
      </div>
      <div class = "block_blue_text" > 
        <button @click="showSettingModal">修改</button>
      </div>
    </div>
  </div>
  <div class="mt-4">
    <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
    <button class="device_set_button" @click="inviteUserClick">
      新增群組成員
    </button>
    </div>
  </div>
  <p style="display:none">{{tablelength}}</p>
  <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
    <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
      <p>群組成員列表</p>
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
            <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              刪除
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
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <button class="text-gray-900 whitespace-nowrap" v-if="u.level>2" @click="deleteUser(u.id)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getUerInfo, getgroup, getusers,delete_user} from '../../untils/api.js'
import ModifyGroupName from "../../components/main/ModifyGroupName.vue"
import InviteUser from "../../components/main/InviteUser.vue"

import moment from 'moment';

const router = useRouter();
export default {
  components:{
    ModifyGroupName,
    InviteUser
  },
  data () {
    return {
      UserTableData:[],
      userName:"",
      userCreate_at:"",
      level:-1,
      groupName:"",
      tablelength: -1,
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
          // console.log(res.data)
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
          // console.log(Data)
          let user = {}
          user.id = Data.id 
          user.name = Data.name 
          user.email = Data.email 
          user.level = Data.level 
          this.userTableData.push(user)
        });
      })
      // console.log(this.userTableData)
      this.tablelength = this.userTableData.length
    },
    async deleteUser(user_id) {
      await delete_user(user_id).then(async (res) => {
        alert("刪除成功")
        await this.getGroupUser()
        }).catch((err) => {
        })
    },
    btnEvent(){
      // if (this.showUser){
      //   this.getGroupUser()
      // }
    }
  },
  async beforeMount() {
    await this.getUser()
    await this.getGroup()
    await this.getGroupUser()
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
    
    function inviteUserClick(){
      modal.value.show()
      this.showModal = true
    }
    function showSettingModal(){
      settingmodal.value.show()
      this.showModal = true
    }
    return {
      disableTeleport,
      showSettingModal,
      inviteUserClick,
      settingmodal,
      modal,
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
</style>
