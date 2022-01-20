<template>
  <p class="TH_div_inner_text" :class="devicelist.length!=TH_Data_list.length? 'mis_data':'' ">溫濕度感應器接收資料：{{TH_Data_list.length}}/{{devicelist.length}}</p>
  <div id="main">
    <div id="THLeftIcon" >
      <!-- <span class="ti-angle-left" style="align-items: center; align-content: center;"></span> -->
    </div>
    <div id="THDataLeft">
      <div class="TH_div" v-show="TH_Data_list.length>0">
        <div class="TH_div_inner" >
          <div class="TH_div_inner_area" >
            <p :class="check_error(0) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(0,1) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(0) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(0,2) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(0) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(0,3) }}</p>
          </div>
        </div>
      </div>
      <div class="TH_div" v-show="TH_Data_list.length>2">
        <div class="TH_div_inner">
          <div class="TH_div_inner_area" >
            <p :class="check_error(2) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(2,1) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(2) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(2,2) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(2) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(2,3) }}</p>
          </div>
        </div>
      </div>
      <div class="TH_div" v-show="TH_Data_list.length>4">
        <div class="TH_div_inner">
          <div class="TH_div_inner_area" >
            <p :class="check_error(4) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(4,1) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(4) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(4,2) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(4) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(4,3) }}</p>
          </div>
        </div>
      </div>
      <div class="TH_div" v-show="TH_Data_list.length>6">
        <div class="TH_div_inner">
          <div class="TH_div_inner_area" >
            <p :class="check_error(6) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(6,1) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(6) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(6,2) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(6) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(6,3) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="THDataRight">
      <div class="TH_div" v-show="TH_Data_list.length>1">
        <div class="TH_div_inner">
          <div class="TH_div_inner_area" >
            <p :class="check_error(1) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(1,1) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(1) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(1,2) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(1) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(1,3) }}</p>
          </div>
        </div>
      </div>
      <div class="TH_div" v-show="TH_Data_list.length>3">
        <div class="TH_div_inner">
          <div class="TH_div_inner_area" >
            <p :class="check_error(3) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(3,1) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(3) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(3,2) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(3) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(3,3) }}</p>
          </div>
        </div>
      </div>
      <div class="TH_div" v-show="TH_Data_list.length>5">
        <div class="TH_div_inner">
          <div class="TH_div_inner_area" >
            <p :class="check_error(5) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(5,1) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(5) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(5,2) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(5) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(5,3) }}</p>
          </div>
        </div>
      </div>
      <div class="TH_div" >
        <div class="TH_div_inner" v-show="TH_Data_list.length>7">
          <div class="TH_div_inner_area" >
            <!-- <p :class="TH_Data_list[7].data.info.status==0 ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ TH_Data_list[7].data.info.status }}</p> -->
            <p :class="check_error(7) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{  getTHDatafunc(7,1) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(7) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(7,2) }}</p>
          </div>
          <div class="TH_div_inner_data">
            <p :class="check_error(7) ?'TH_div_inner_text':'TH_div_inner_text_error'">{{ getTHDatafunc(7,3) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div d="THRightcon">
      <!-- <span class="ti-angle-right"></span> -->
    </div>
  </div>
</template>
<style scoped>
#main{
  width: 100%;
  min-width: 400px;
  height: 100%;
  min-height: 300px;
  position: relative;
  /* background-color: rgba(0, 0, 0, 0.2); */
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  padding: 20px 0px;
}
#THLeftIcon{
  width: 2%;
  height: auto;
  /* background-color: rgb(73, 69, 69); */
}
#THRightcon{
  width: 2%;
  height: auto;
  /* background-color: rgb(7, 30, 105); */
}
#THDataLeft{
  width: 48%;
  padding: 5px 5px;
  height: auto;
  /* background-color: purple; */
}
#THDataRight{
  width: 48%;
  padding: 5px 5px;
  height: auto;
  /* background-color: rgb(24, 221, 106); */
}
#date{
  width: 30%;
  height: auto;
  background-color: rgba(0, 0, 0, 0.658);
}
#time{
  width: 50%;
  height: auto;
  background-color: rgba(0, 0, 0, 0.247);
}

#time{
  display: flex;
  flex-wrap: nowrap;
}
.time_block_text{
  font-size: 20px;
  /* font-weight: bold; */
  color: white;
  /* background-color: gray; */
  border-radius: 2px;
  padding: 0px 2px;
  margin-left: 2px;
  display: flex;
  align-content: center;
}
.TH_div{
  width: 100%;
  height: 25%;
  position: relative;
  /* background-color: rgba(230, 217, 217, 0.2); */
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  padding: 5px 5px;
}
.TH_div_inner{
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #2F313E;
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  border-radius: 4px;
  padding: 2px 2px;
}
.TH_div_inner_area{
  width: 40%;
  height: 100%;
  position: relative;
  /* background-color: rgba(184, 23, 23, 0.2); */
  display: flex;
  flex-wrap: nowrap;
  padding: 2px 4px;

}
.TH_div_inner_data{
  width: 30%;
  height: 100%;
  position: relative;
  /* background-color: rgba(47, 23, 184, 0.2); */
  display: flex;
  flex-wrap: nowrap;
  padding: 2px 4px;

}
.TH_div_inner_text{
  font-size: 20px;
  /* font-weight: bold; */
  color: red;
  margin-left: 2px;
  display: flex;
  align-content: left;
  align-items: center;
}
.TH_div_inner_text_error{
  font-size: 20px;
  /* font-weight: bold; */
  color: white;
  margin-left: 2px;
  display: flex;
  align-content: left;
  align-items: center;
}
.mis_data{
  color: red;
}
</style>

<script>
// import { ref } from "vue";
// import { useRouter } from "vue-router";
import { getLatestDeviceObservation, getAllDevice} from "../../untils/api.js"
import store from "../../store"
// const router = useRouter();

export default {
  data () {
    return {
      device_Map: new Map(),
      TH_Data_list:[],
      devicelist:[],
      timer: window.setInterval(() => { this.getTHObservation ()  }, 10000),
   }
  },
    methods: {
    async init(){
      // create Device Map 
      let device_model = 1
      await getAllDevice(device_model).then((res)=>{
        this.devicelist = Object.assign(res.data)
        this.devicelist.forEach(device => {
          this.device_Map.set(device.id, Object.assign(device))
        });
      })
    },
      async getTHObservation(){
        this.TH_Data_list = []
        await getLatestDeviceObservation().then((res)=>{
              let observation = Object.assign(res.data)
              this.TH_Data_list = observation
          })
        // console.log(this.TH_Data_list)
        // // deivce_TH.forEach(async(e,index) => {
        // //     await getLatestDeviceObservation().then((res)=>{
        // //       let observation = Object.assign(res.data)
        // //       let TH_1 = observation
        // //       TH_1.area = e.name;
        // //       this.TH_Data_list.push(TH_1)
        // //   })
        // // })
        // // //排序
        // // // this.TH_Data_list.sort()
        // // await getLatestDeviceObservation().then((res)=>{
        // //               let observation = Object.assign(res.data)
        // //               let TH_1 = observation
        // //               TH_1.area = e.name;
        // //           })
        // this.TH_Data_list.sort(function (a, b) {
        //   return a.device_id - b.device_id;
        // });
        // console.log(this.TH_Data_list)
      },
      check_error(index){
        if (index >= this.TH_Data_list.length)
          return false
        let data = this.TH_Data_list[index]
        // console.log(index,type, data)
        if (data === undefined)
          return false
        if (data.info.status ==2)
          return true
      },
      getTHDatafunc(index,type) {
        if (index >= this.TH_Data_list.length)
          return ""
        let data = this.TH_Data_list[index]
        // console.log(index,type, data)
        if (data === undefined)
          return ""


        if(type == 1){
          return data.info.name
        }
        else if(type ==2){
          if (data.info.status ==2)
            return "無資料"
          return data.info.temperature+ "°C"
        }
        else if(type ==3){
          if (data.info.status ==2)
            return "無資料"
          return data.info.humidity+"%"
        }
        else 
          return data
      }
    },
    // computed:{
    //     getTHData() {
    //     let data = this.TH_Data_list[0]
    //     let type=1
    //     if (data == {})
    //       return ""
    //     console.log(data)
    //     if(type === 1)
    //       return data.area
    //     else if(type ===2)
    //       return data.temperature
    //     else if(type ===3)
    //       return data.humidity
    //     else 
    //       return data
    //   }
    // },
    beforeMount() {
    setTimeout(() => {
      this.getTHObservation()
      this.init()
    },500)
  },
  beforeUnmount(){
    window.clearInterval(this.timer)
  }
}
</script>
