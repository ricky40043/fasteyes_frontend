<template>
  <div class="modal" v-show="isOpen">
    <div class="modal-content">
      <span class="close" @click="hide">&times;</span>

      <div id="main" class="items-center justify-center">
        <div class="flex items-center justify-center">
          <p>使用者名稱</p>
        </div>
        <div class="flex items-center justify-center">
          <input type="text" v-model="name" :class="error_input?'error_input':''"/>
        </div>
        <p v-if="error_input" style="color: red;">{{error_description}}</p>

        <div class="flex items-center justify-center">
          <button class ="device_comfirm_button" @click="hide">取消</button>
          <button class ="device_set_button" @click="ModifyGroup">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { modify_user_info } from '../../untils/api.js'
const router = useRouter();

export default {
  props:[
    "NameData"
  ],
  data () {
    return {
        name:"",
        error_input:false,
        error_description:""
      }
  },
    methods: {
    async ModifyGroup () {
      await modify_user_info(this.name).then((res) => {
        // console.log(res.data)
        this.hide()
        }).catch((err) => {
          let errorMessage = err.response.data.detail
          if (errorMessage == "Name already exist in this group"){
            this.error_input = true
            this.error_description = errorMessage
          }
        })
    },
    clear_data(){
      this.error_input= false
      this.name= ""
    },
    async input_data(){
      this.name = this.NameData
    },
    check(){
      if(this.name == ""){
        this.error_description ="名稱不能是空的"
        this.error_input = true
      }
      else
        this.error_input = false
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
        isOpen.value = true;
        setTimeout(()=>{
          this.clear_data()
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
    width: 400px;
    height: 150px;

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
</style>