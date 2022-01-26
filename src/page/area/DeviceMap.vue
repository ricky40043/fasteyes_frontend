<template>
    <!-- <teleport to="#destination" :disabled="disableTeleport">
      <Addtemperaturehumidity ref="modal" 
      @addDevice="init"/>
    </teleport>
    <teleport to="#destination" :disabled="disableTeleport">
      <Settingtemperaturehumidity ref="settingmodal" 
      :selectDeviceData="select_device" 
      @saveDevice="init"
      @deleteDevice="init"
      />
    </teleport> -->


  <div id="upbutton">
      <div class="mt-4" >
        <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
          <span>區域：</span>
          <div v-if="changeImage==false" id="device" class="flex items-center justify-center">
            <select v-model="select_area" class="device_block_text" @change="init">
              <option value="-1">所有區域</option>
              <option v-for="area in area_list" :value="area" :key="area">{{area.name}}</option>
            </select>
          </div>
          <div v-if="select_area!=-1" class="flex items-center">
            <input class="device_comfirm_button" type="file" accept="image/gif, image/jpeg, image/png" @change="selectedImg">
            <button class ="device_set_button" @click="comfirm">修改圖片</button>
            <button v-if="changeImage==false" class ="device_delete_button" @click="remove">刪除圖片</button>
            <button v-else class ="device_delete_button" @click="cancel">取消</button>
            <a href="https://blog.xuite.net/vexed/tech/65591105-%E7%B7%9A%E4%B8%8A%E8%AA%BF%E6%95%B4%E5%9C%96%E7%89%87%E5%A4%A7%E5%B0%8F" class ="device_comfirm_button">改變圖片大小連結</a>
          </div>
        </div>

      </div>
      
  </div>
  <div>
    <div class="flex">
      <div id="left" v-if="changeImage == false">
        <div class=" overflow-x-auto sm:-mx-8 sm:px-8">
          <div
            class="inline-block min-w-full overflow-hidden rounded-lg shadow"
          >
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    裝置名稱
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    裝置編號
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    裝置類型
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="u in DeviceTableData" :key="u.id" @click="showResult($event, u)" class="report_list" :style="select_id==u.device_id? 'background-color:powderblue;':''" :disabled="changeImage">
                  <td class="px-5 py-5 text-sm border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.device_name }}</p>
                  </td>
                  <td class="px-5 py-5 text-sm border-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap">{{ u.device_serial_number }}</p>
                  </td>
                  <td class="px-5 py-5 text-smborder-b border-gray-200">
                    <p class="text-gray-900 whitespace-nowrap" v-if="u.device_model_id==1">溫濕度感應器</p>
                    <p class="text-gray-900 whitespace-nowrap" v-else-if ="u.device_model_id==2">IP Cam</p>
                    <p class="text-gray-900 whitespace-nowrap" v-else-if="u.device_model_id==3">靜電環</p>
                    <p class="text-gray-900 whitespace-nowrap" v-else-if="u.device_model_id==4">氮氣機</p>
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
      <div id="right" v-if="select_area!=-1">
        <div id="areaPosition" @mousemove="mouseMove" @mousedown="setposition">
          <img id="area_image" :src="image_data" alt="" v-if="have_picture" style="display:block;" />
          <div v-for="(u,index) in DeviceTableData" :key="u.id" :ref="'device_'+u.id" @click="showObservation(u)" style="position: relative;"
               :style="[select_id==u.device_id? 'color:red;':'color:blue;',{left: u.x+'px', top: (u.y-realHeight-15*index)+'px'}]" >
            <div v-if="u.device_model_id==1" class= "ti-dashboard" ></div>
            <div v-if="u.device_model_id==2" class= "ti-video-camera" ></div>
            <div v-if="u.device_model_id==3" class= "ti-comment" ></div>
            <div v-if="u.device_model_id==4" class= "ti-desktop" ></div>
          </div>

        </div>
        <div id="THData" v-show="select_device_model_id === 1">
          <div v-if="select_device_model_id === 1 && THObservation.info.name!=undefined" class="px-4 py-4">
            <div class="px-2 py-2 bg-gray-300 rounded hover:bg-gray-100">
              裝置種類：溫濕度感應器
              </div>
            <div class="px-2 py-2 bg-gray-300 rounded hover:bg-gray-100">
              裝置名稱:{{THObservation.info.name}}
            </div>
            <div class="px-2 py-2 bg-gray-300 rounded hover:bg-gray-100">
              裝置編號:{{THObservation.info.serial_number}}
            </div>
            <div class="px-2 py-2 bg-gray-300 rounded hover:bg-gray-100">
              裝置區域:{{THObservation.info.area}}
            </div>
            <div class="px-2 py-2 bg-gray-300 rounded hover:bg-gray-100">
              裝置溫度:{{THObservation.info.temperature}}
            </div>
            <div class="px-2 py-2 bg-gray-300 rounded hover:bg-gray-100">
              裝置濕度:{{THObservation.info.humidity}}
            </div>
            <div class="px-2 py-2 bg-gray-300 rounded hover:bg-gray-100">
              裝置電池電量:{{THObservation.info.battery}}
            </div>
          </div>
        </div>
        <div id="IpCam" v-show="select_device_model_id === 2">
          裝置種類：IP Cam
          <div id="bulletin" v-if="ip_cam_device_id!=-1">
            <img :src="rstpname" alt="" style="display:block; margin:auto;" class="w-auto h-auto"/>
          </div>
        </div>
        <div id="Electro" v-show="select_device_model_id === 3">Electro</div>
        <div id="Nitrogen" v-show="select_device_model_id === 4" >
          <div v-if="select_device_model_id === 4 && THObservation.info.name!=undefined" class="px-4 py-4">
            <div class="px-2 py-2 bg-gray-300 rounded hover:bg-gray-100">
              裝置種類: 氮氣機
              </div>
            <div class="px-2 py-2 bg-gray-300 rounded hover:bg-gray-100">
              裝置名稱:{{THObservation.info.name}}
            </div>
            <div class="px-2 py-2 bg-gray-300 rounded hover:bg-gray-100">
              裝置編號:{{THObservation.info.serial_number}}
            </div>
            <div class="px-2 py-2 bg-gray-300 rounded hover:bg-gray-100">
              裝置區域:{{THObservation.info.area}}
            </div>
            <div class="px-2 py-2 bg-gray-300 rounded hover:bg-gray-100">
              氧氣壓力:{{THObservation.info.air_press}}
            </div>
            <div class="px-2 py-2 bg-gray-300 rounded hover:bg-gray-100">
              氮氣壓力:{{THObservation.info.nitrogen_pressure}}
            </div>
            <div class="px-2 py-2 bg-gray-300 rounded hover:bg-gray-100">
              氮氣流量:{{THObservation.info.nitrogen_flowrate}}
            </div>
            <div class="px-2 py-2 bg-gray-300 rounded hover:bg-gray-100">
              氮氣含氧量:{{THObservation.info.oxygen_content}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
// import { ref, onMounted } from 'vue'
import {getAllDevice, get_area, getAreaImage, patchAreaImage, deleteAreaImage, modify_device_position, getLatestDeviceObservation} from "../../untils/api.js"
import global_ from "../../Global.vue"

// import store from "../../store"
// import Addtemperaturehumidity from "../../components/temperature_humidity/Addtemperaturehumidity.vue"
// import Settingtemperaturehumidity from "../../components/temperature_humidity/Settingtemperaturehumidity.vue"
// import { ref } from 'vue';

export default {
  // components:{
  //   Addtemperaturehumidity,
  //   Settingtemperaturehumidity
  // },
  data (){
    return{
      DeviceTableData:[],
      area_list:[],
      page:1,
      total:1,
      page_size:10,
      page_total:1,
      search_text:"",
      select_area:-1,
      showModal: false,
      image_data: "",
      have_picture: false,
      select_id: -1,
      select_device: "",
      position_x: -1,
      position_y: -1,
      changeImage: false,
      realWidth: 800,
      realHeight: 500,
      select_device_model_id: -1,
      select_device_id: -1,
      TH_Data_list: [],
      THObservation: {},
      ElectroObservation: {},
      NitrogenObservation: {},
      TH_observation_Map: new Map(),
      ip_cam_device_id: -1
    }
  },
  methods: {
    async getArea(){
      this.area_list = []
      await get_area().then((res)=>{
        let Arealist = Object.assign(res.data)
        Arealist.forEach(Data =>{
          let area = {}
          area.name = Data.name  
          area.send_mail = Data.send_mail  
          area.use_image = Data.use_image  
          area.id = Data.id
          this.area_list.push(area)
        });
      }) 
    },
    increment(){
      if(this.page<this.page_total)
      {
        this.page++
        this.getTHDevice()
      }
    },
    decrement(){
      if(this.page>1)
      {
        this.page--
        this.getTHDevice()
      }
    },
    search_event(){
      console.log(this.search_text) 
    },
    settingDevice(input){
      this.select_device = input
      this.showSettingModal()
    },

    async init(){
      this.select_device_model_id= -1
      this.select_device_id= -1
      this.TH_Data_list= []
      this.THObservation= {}
      this.ElectroObservation= {}
      this.NitrogenObservation= {}
      await this.getAreaImage()
      // create Device Map
      this.DeviceTableData=[]
      for (let index = 1; index < 5; index++) {
        let device_model = index
        let areaName
        if(this.select_area !=-1){
          areaName = this.select_area.name
        }
        else
          areaName = ""

        await getAllDevice(device_model, areaName).then((res)=>{
          this.devicelist = res.data
          this.devicelist.forEach(Data => {
            let device = {}
            device.device_id = Data.id
            device.device_name = Data.name
            device.device_serial_number = Data.serial_number
            device.device_model_id = Data.device_model_id
            device.x = Data.info.position_x
            device.y = Data.info.position_y
            this.DeviceTableData.push(device)
          });
        })
      }
    },
    async comfirm(){
      await patchAreaImage(this.select_area.id,this.image_data).then(async(res)=>{
        this.changeImage = false
        await this.init()
      })
    },
    async getAreaImage(){
      if(this.select_area==-1){
        this.have_picture = false
        return 
      }
      if(this.select_area.id===0){
        this.have_picture = false
        return 
      }

      if(this.select_area.use_image===false){
        this.have_picture = false
        return 
      }
   
      await getAreaImage(this.select_area.id).then((res)=>{
        this.have_picture = true
        this.image_data = ('data:image/png;base64,' + btoa(
        new Uint8Array(res.data).reduce(
          (data, byte) => data + String.fromCharCode(byte), ''
        )))
      })
      var myImg = document.querySelector("#area_image");
      // this.realWidth = myImg.naturalWidth;
      // this.realHeight = myImg.naturalHeight;
      
      // this.DeviceTableData.forEach((element,index) => {
      //   let id_name ="device_"+(element.device_id).toString()
      //   var tag = this.$refs.inputDom
      //   console.log(tag)
      //   let x = (element.x).toString()+"px"
      //   let y = (element.y -this.realHeight-index*15).toString()+"px"
      //   tag.style.position = "relative";
      //   tag.style.left = x;
      //   tag.style.top = y;
      // })
      // alert("Original width=" + realWidth + ", " + "Original height=" + realHeight);
      // draw device
      // this.DeviceTableData.forEach((element,index) => {
      //   let id_name ="device_"+(element.device_id).toString()
      //   var deletetag = document.getElementById(id_name);
      //   if(deletetag != null)
      //      deletetag.remove();
      //   var tag = document.createElement("div");
      //   var img = document.createElement('p');
      //   img.classList.add("ti-comment");
      //   let x = (element.x).toString()+"px"
      //   let y = (element.y -realHeight-index*15).toString()+"px"
      //   tag.appendChild(img);
      //   tag.style.color = "Blue";
      //   tag.style.position = "relative";
      //   tag.style.left = x;
      //   tag.style.top = y;
      //   console.log(tag)
      //   var element = document.getElementById("areaPosition");
      //   element.appendChild(tag);
      //   tag.setAttribute('id',id_name);
      // }); 

      this.select_id = -1
    },
    async remove(){
      await deleteAreaImage(this.select_area.id).then((res)=>{
        this.image_data = ''
        this.have_picture = false
      })
    },
    async showResult (event, select_device){
      if(this.select_id == select_device.device_id){
      this.select_id = -1
      this.select_device = ""
      }
      else{
       this.select_id = select_device.device_id
      this.select_device = select_device
      }

      await this.showObservation(select_device)

      // let select_id_name ="device_"+(this.select_device.device_id).toString()
      // this.DeviceTableData.forEach((element,index) => {
      //   let id_name ="device_"+(element.device_id).toString()
      //   if(select_id_name == id_name)
      //     document.getElementById(id_name).style.color = "red";
      //   else
      //     document.getElementById(id_name).style.color = "blue";
      //   document.getElementById(id_name).style.position = "relative";
      // })
    },
    async cancel(){
      this.changeImage = false
      await this.init()
    },
    selectedImg(evt){
      const file = evt.target.files.item(0)
      const reader = new FileReader();
      reader.addEventListener('load',this.imageLoaded);
      reader.readAsDataURL(file);
      this.changeImage = true
    },
    imageLoaded(evt){
      this.image_data = evt.target.result
      this.have_picture = true
      // this.upload_img_exist = true
      // this.use_setting = true
    },
    async showObservation(u){
      if(this.select_device_id === u.device_id){
        this.select_device_model_id = -1
        this.select_device_id = -1
        return
      }
      let x = u.x
      this.select_device_model_id = u.device_model_id
      this.select_device_id = u.device_id
      if(x>400){
        if (this.select_device_model_id ===1){
          let tag = document.getElementById("THData");
          document.getElementById("THData").style["left"] = "50px";
        }
        else if(this.select_device_model_id ===2){
          let tag = document.getElementById("IpCam");
          document.getElementById("IpCam").style["left"] = "50px";
        }
        else if(this.select_device_model_id ===3){
          let tag = document.getElementById("Electro");
          document.getElementById("Electro").style["left"] = "50px";
        }
        else if(this.select_device_model_id ===4){
          let tag = document.getElementById("Nitrogen");
          document.getElementById("Nitrogen").style["left"] = "50px";
        }
      }
      else{
        if (this.select_device_model_id ===1){
          let tag = document.getElementById("THData");
          document.getElementById("THData").style["left"] = "450px";
        }
        else if(this.select_device_model_id ===2){
          let tag = document.getElementById("IpCam");
          document.getElementById("IpCam").style["left"] = "450px";
        }
        else if(this.select_device_model_id ===3){
          let tag = document.getElementById("Electro");
          document.getElementById("Electro").style["left"] = "450px";
        }
        else if(this.select_device_model_id ===4){
          let tag = document.getElementById("Nitrogen");
          document.getElementById("Nitrogen").style["left"] = "450px";
        }
      }
      this.ip_cam_device_id = -1
      if (this.select_device_model_id ===1){
        await this.getTHObservation(1)
        this.THObservation = this.TH_observation_Map.get(u.device_id)
      }
      else if(this.select_device_model_id ===2){
        this.ip_cam_device_id = this.select_device_id
      }
      else if(this.select_device_model_id ===3){
      }
      else if(this.select_device_model_id ===4){
        await this.getTHObservation(4)
        this.THObservation = this.TH_observation_Map.get(u.device_id)
        console.log(this.THObservation)
      }
    },
    async getTHObservation(device_model_id){
      this.TH_Data_list = []
      await getLatestDeviceObservation(device_model_id).then((res)=>{
            let observation = Object.assign(res.data)
            this.TH_Data_list = observation
            this.TH_Data_list.forEach(Data => {
              this.TH_observation_Map.set(Data.device_id, Object.assign(Data))
            });
        })
    },
    doSome(res) {
      console.log(success)
    },
    mouseMove(event) {
          // var testDiv = document.getElementById("areaPosition");
          // console.log(testDiv.offsetLeft)
          // console.log(testDiv.offsetTop)
          // let x = event.pageX-testDiv.offsetLeft
          // let y = event.pageY-testDiv.offsetTop
          // this.position_x = x
          // this.position_y = y
          

          // console.log(x)
          // console.log(y)
          // clientX/Y gives the coordinates relative to the viewport in CSS pixels.
          // console.log("clientX:"+event.clientX-testDiv.offsetLeft);
          // console.log("clientY:"+event.clientY-testDiv.offsetTop);

          // pageX/Y gives the coordinates relative to the <html> element in CSS pixels.
          // console.log("pageX:"+event.pageX);
          // console.log("pageY:"+event.pageY);

          // // // screenX/Y gives the coordinates relative to the screen in device pixels.
          // console.log("screenX:"+event.screenX);
          // console.log("screenY:"+event.screenY);
    },
    async setposition(event){
      if(this.select_id == -1)
        return
      let testDiv = document.getElementById("areaPosition");
      this.position_x = event.pageX-testDiv.offsetLeft
      this.position_y = event.pageY-testDiv.offsetTop
      await modify_device_position(this.select_device.device_model_id,this.select_device.device_id, this.position_x, this.position_y).then(async(res)=>{
        await this.init()
      })
    }
  },
  computed:{
    rstpname(){
      if (this.ip_cam_device_id!=-1)
        return global_.url+"/ip_cam/device/"+this.ip_cam_device_id+"/video"
      else
        return "Null"

    },
    // realWidth() {
    //   // var myImg = document.querySelector("#area_image");
    //   var myImg = document.getElementById("area_image");
    //   alert(myImg)
    //   if (myImg ==null)
    //     return 0
    //   console.log(myImg)
    //   return myImg.naturalWidth;
    // },
    // realHeight() {
    //   // var myImg = document.querySelector("#area_image");
    //   var myImg = document.getElementById("area_image");
    //   if (myImg ==null)
    //     return 0
    //   console.log(myImg)

    //   return myImg.naturalHeight;
    // },
  },
  watch:{
    
  },
  async beforeMount() {
    await this.getArea()
    await this.init()
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
  // setup() {
  //   const disableTeleport = ref(false)   
    
  //   const modal = ref(null);
  //   const settingmodal = ref(null);
    
  //   function addDeviceClick(){
  //     modal.value.show()
  //     // this.showModal = true
  //   }
  //   function showSettingModal(){
  //     settingmodal.value.show()
  //     // this.showModal = true
  //   }

  //   return {
  //     disableTeleport,
  //     addDeviceClick ,
  //     showSettingModal,
  //     modal,
  //     settingmodal
  //   }
  // },
};
</script>




<style scoped>

#time{
  /* background-color: Red; */
  width: 88%;
}
#device{
  /* background-color: blue; */
  width: 16%;
}
#setbutton{
  /* background-color: green; */
  width: 40%;
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
#left{
  width: 30%;
}
#right{
  width: 70%;
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
.report_list{
  background-color: white;
}
.report_list:hover{
  background-color: powderblue;
}
#areaPosition{
  width: 800px;
  height: 500px;
  background-color:  rgb(154, 154, 245);
}
.select_device_tag{
  color: red;
  background-color: red;
}
#THData{
  width: 300px;
  height: 400px;
  top: -450px;
  left: 450px;
  position: relative;
  border-radius: 10px;
  background-color:  rgba(154, 154, 245,0.6);
}
#IpCam{
  width: 400px;
  height: 300px;
  top: -400px;
  left: 400px;
  position: relative;
  border-radius: 10px;
  background-color:  rgba(151, 161, 161,0.6);
}
#Electro{
  width: 300px;
  height: 400px;
  top: -450px;
  left: 450px;
  position: relative;
  border-radius: 10px;
  background-color:  rgba(194, 191, 32,0.6);
}
#Nitrogen{
  width: 300px;
  height: 400px;
  top: -450px;
  left: 450px;
  position: relative;
  border-radius: 10px;
  background-color:  rgba(221, 54, 199,0.6);
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
  top: -30px;
}
</style>



