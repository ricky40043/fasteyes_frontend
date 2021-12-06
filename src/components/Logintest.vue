<template>
  <div class="modal" v-show="isOpen">
      <span class="close" @click="hide">&times;</span>
      <div class="modal-content">
        <div id="main" class="flex items-center justify-center">
          <div id="content" class="w-full max-w-sm p-6 bg-white rounded-md" style="">
              <label class="block">
                <span class="text-sm text-gray-700">帳號</span>
                <input
                  type="email"
                  class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  v-model="userData.email"
                />
              </label>

              <label class="block mt-3">
                <span class="text-sm text-gray-700">密碼</span>
                <input
                  type="password"
                  class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  v-model="userData.password"
                />
              </label>

              <div class="mt-6">
                <button
                  class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500"
                  @click="loginEvent()"
                >
                  登入
                </button>
              </div>
              <div class="flex items-center justify-between mt-4">

                <div class="flex items-center justify-center" >
                  <a
                    class="block text-sm text-indigo-700 fontme hover:underline"
                    href="#"
                    >忘記密碼?</a
                  >
                </div>
              </div>
          </div>
        </div>
      </div>
  </div>

 
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { checkEmail, login } from '../untils/api.js'

const router = useRouter();

export default {
  data () {
    return {
      userData: {
        email: "",
        password: ""
      },
   }
  },
    methods: {
    //IP Cam Login
    // async IP_camloginEvent () {
    //   console.log("IP_camloginEvent")
    //   await IP_cam_login().then((res) => {
    //       alert(res)

    //       console.log(res.data)
    //       if (res.data.success === false) {
    //         alert("Success")
    //       } else {
    //         alert("Fail")
    //       }
    //     }).then((res) => {
    //       // ========
    //     }).catch((status) => {
    //       // console.log(status)
    //       // alert(status.data) 
    //     })
    // },

    // 登入
    async loginEvent () {
      let that = this
      let userData = Object.assign(this.userData)
      await login(userData).then((res) => {
          console.log(res.data)
          if (res.data.Status === false) {
            let errorEvent = {
              target: 'email',
              text: (window.navigator.language === 'zh-TW') ? '帳號尚未驗證' : 'User is not validated'
            }
          } else {
            let UserData = Object.assign(res.data)
            that.loadDefaultData(UserData)
            that.$router.push({name: 'Main'})
            //this.IP_camloginEvent();//Ricky Test
          }
        }).then((res) => {
          // ========
        }).catch((err) => {
          console.log(err)
          alert(err.data) 
        })
    },

    // 存取預設資料
    loadDefaultData (userInfo) {
      this.$store.dispatch('setUserInfo', userInfo.User)
      this.$store.dispatch('setToken', userInfo.access_token)
      this.$store.dispatch('setRefreshToken', userInfo.refresh_token)
      this.$store.dispatch('setUserCharacter', userInfo.User.level)
    }
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
p{
  color:white
}
a{
  color:white
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
    width: 500px;
    border: 1px solid #888;
}
.close {
    padding: 45px 10px;
    cursor: pointer;
    color: #aaa;
    float:right;
    font-size:50px;
    font-weight: bold;
}
</style>