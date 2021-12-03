<template>
    <div class="flex  bg-gray-200 font-roboto" >
      <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200" style="background-color: #4F515E;">
        <div class="container mx-auto px-6 py-8">
            <time-show></time-show>
            <video-show></video-show>
        </div>
      </div>
      <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200"  style="background-color: #4F515E;">
        <div class="container mx-auto px-6 py-8">
            <temperature-humidity-show></temperature-humidity-show>
            <div id="bulletin">
              <img src="../../assets/SUMI_img/bulletin.png" alt="" style="display:block; margin:auto;" >
            </div>
        </div>
      </div>
    </div>
</template>
<script lang="ts">
import TimeShow from "../../components/TimeShow.vue";
import VideoShow from "../../components/VideoShow.vue";
import TemperatureHumidityShow from "../../components/TemperatureHumidityShow.vue";
import { getAllDevice ,getLatestDeviceObservation,getFasteyesDevice} from "../../untils/api.js"
import store from "../../store"

export default {
  components: {
    TimeShow,
    VideoShow,
    TemperatureHumidityShow
  },
  methods: {
    async getTHDevice(){
      let that = this
      let device_model = 1
      await getAllDevice(device_model).then((res)=>{
        // console.log(res.data)
        let devicelist = Object.assign(res.data)
        this.$store.dispatch('setDeviceList_TH',devicelist)
      }) 
    }, 
    async getIPCamdevice(){
      let device_model = 2
      await getAllDevice(device_model).then((res)=>{
        // console.log(res.data)
        let devicelist = Object.assign(res.data)
          this.$store.dispatch('setDeviceList_IPCam',devicelist)
      }) 
    },
    async getFasteyes_Device(){
      await getFasteyesDevice().then((res)=>{
        // console.log(res.data)
        let devicelist = Object.assign(res.data)
          this.$store.dispatch('setDeviceList_fasteyes',devicelist)
      }) 
    },
  },

  // watch:{
  //   current_time(oldvalue,newvalue){
  //     // alert(oldvalue)
  //     setInterval(()=>{
  //     this.getTHDevice();
  //     },60000)
  //   }
  // },
  beforeMount() {
    this.getTHDevice(),
    this.getIPCamdevice(),
    this.getFasteyes_Device()
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
};
</script>
<style scoped>
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
</style>