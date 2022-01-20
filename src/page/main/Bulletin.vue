<template>
  <router-link to="/main">
    <p class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-"> &lt; 公告管理</p>
  </router-link>
  <hr>

  <div class="mt-4" >
    <div class=" py-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
      <p>上架中心</p>
      <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">

        <div class="flex-1 overflow-x-hidden overflow-y-auto">
          <div class="container mx-auto px-6 py-8">
            <div id="bulletin">
              <img src="../../assets/SUMI_img/bulletin.png" alt="" style="display:block; margin:auto;" >
            </div>
            <input type="radio" id="age1" name="age" value="30" :checked="!use_setting" @change="modifyBulletin(false)">
            <label for="age1">使用預設</label><br>

          </div>
        </div>
        <div class="flex-1 overflow-x-hidden overflow-y-auto">
          <div class="container mx-auto px-6 py-8">
            <div id="bulletin">
              <img :src="image_data" alt="" v-if="have_picture" style="display:block; margin:auto;" />
              <img src="../../assets/SUMI_img/noImg_tw.3307d94.png" alt="" v-else style="display:block; margin:auto;" />
            </div>
            <div class="flex">
              <input type="radio" id="age2" name="age" value="60" :checked="use_setting" @change="modifyBulletin(true)">
              <label for="age2">上架中</label><br> 
              <button class="device_comfirm_button" @click="remove" v-if="!upload_img_exist">
                移除
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <div  v-if="upload_img_exist !=''">
          <div class="flex items-center justify-center">
            <button class ="device_comfirm_button" @click="cancel">取消</button>
            <button class ="device_set_button" @click="comfirm">儲存</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-4" >
    <div class=" py-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
      <p>上架新公告</p>
      <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
            <p>上傳圖片公告</p>

        <div class="flex item-center justify-center overflow-x-hidden overflow-y-auto">
            <input class="device_comfirm_button" type="file" accept="image/gif, image/jpeg, image/png" @change="selectedImg">
            <div>
              <p>上傳格式說明：</p>
              <p>請上傳副檔名為 jpg. jpeg. png. 的檔案。若圖片比例不符合 16:9 將被自動裁切。</p>
            </div>
        </div>
      </div>
        <!-- <div  v-if="image !=''">
          <img class="bulletin" style="display:block; margin:auto;" :src="image" alt="" />
          <div class="flex items-center justify-center">
            <button class ="device_comfirm_button" @click="cancel">取消</button>
            <button class ="device_set_button" @click="comfirm">發送公告</button>
          </div>
        </div> -->
    </div>

  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { get_bulletin_image, post_bulletin_image, delete_bulletin_image, get_bulletin, modify_bulletin} from '../../untils/api.js'
import moment from 'moment';

const router = useRouter();
export default {
  data () {
    return {
      image_data: '',
      upload_img_exist :false,
      use_setting: false,
      have_picture: false
   }
  },
  methods: {
    async getBulletinImage(){
      await get_bulletin_image().then((res)=>{
        this.have_picture = true
        this.image_data = ('data:image/png;base64,' + btoa(
        new Uint8Array(res.data).reduce(
          (data, byte) => data + String.fromCharCode(byte), ''
        )))
      })
    },
    selectedImg(evt){
      const file = evt.target.files.item(0)
      const reader = new FileReader();
      reader.addEventListener('load',this.imageLoaded);
      reader.readAsDataURL(file);
    },
    imageLoaded(evt){
      this.image_data = evt.target.result
      this.upload_img_exist = true
      this.use_setting = true
    },
    async cancel(){
      await this.getBulletinImage()
      this.upload_img_exist = false
    },
    async comfirm(){
      await post_bulletin_image(this.image_data).then((res)=>{
        this.upload_img_exist = false
      })
    },
    async remove(){
      await delete_bulletin_image().then((res)=>{
        this.image_data = ''
        this.upload_img_exist = false
        this.use_setting = false
      })
    },
    async getBulletin(){
      await get_bulletin().then(async(res)=>{
          this.use_setting = res.data.is_used
      })
    },
    async modifyBulletin(is_used){
        await modify_bulletin(is_used).then(async(res)=>{
      })
    }
  },
  async beforeMount() {
    await this.getBulletin()
    await this.getBulletinImage()
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
  }
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
#bulletin{
  width: 100%;
  min-width: 200px;
  height: 100%;
  min-height: 250px;
  position: relative;
  /* background-color: rgba(216, 12, 12, 0.2); */
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  padding: 0px 0px;
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
