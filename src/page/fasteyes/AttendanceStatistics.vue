<template>
  <div id="select">
      <div class="mt-4" >
        <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md" style="background-color: #F5F6F9;">
          <div id="time" class="flex items-center justify-center">
  
            <input id="start_date" type="date" class="time_block_text" v-model="start_date">
            <input id="start_time" type="time" class="time_block_text" v-model="start_time">
            <p> ~ </p>
            <input id="end_date" type="date" class="time_block_text" v-model="end_date">
            <input id="end_time" type="time" class="time_block_text" v-model="end_time">
          </div>
          <div id="device" class="flex items-center justify-center">
            <select v-model="select_device" class="device_block_text">
              <option value="-1">所有裝置</option>
              <option v-for="device in Fasteyes_DeviceList" :value="device.id" :key="device.name">{{device.name}}</option>
            </select>
          </div>
          <div id="setbutton" class="focus:outline-none focus:bg-indigo-500 flex items-center justify-center">
            <button class="device_set_button " v-on:click="enter">
                確認
            </button>
            <button class="device_comfirm_button" v-on:click="reset">
                重置
            </button>
          </div>
        </div>
      </div>
  </div>
  <div id="data">
  <div>
    <div class="flex item-center justfy-center ">
      <!--Stats cards-->
      <div class="row flex">
        <div class="col-md-6 col-xl-3 cardDiv" v-for="stats in statsCards" :key="stats.title">
          <StatsCard>
            <template v-slot:header>
              <div class="icon-big text-center" :class="`icon-${stats.type}`">
                <img :src="stats.img" />
              </div>
            </template>
            <template v-slot:content>
              <div class="numbers" >
                <p>{{stats.title}}</p>
                {{stats.value}}%
              </div>
            </template>
            <template v-slot:footer>
              <div class="stats">
                <i :class="stats.footerIcon"></i> {{stats.footerText}}人次
              </div>
            </template>
          </StatsCard>
        </div>
      </div>
    </div>

    <div>
     <!--Charts-->
    <div class="row">
      <!-- <div class="col-12">
        <StatsCard title="Users behavior"
                    sub-title="24 Hours performance"
                    :chart-data="usersChart.data"
                    :chart-options="usersChart.options">
          <template v-slot:footer>
            <i class="ti-reload"></i> Updated 3 minutes ago
          </template>
          <template v-slot:legend>
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Click
            <i class="fa fa-circle text-warning"></i> Click Second Time
          </template>
        </StatsCard>
      </div> -->
    </div>
    </div>
      <div class="container">
    <div class="icon_wrapper">
      <vue-echarts :option="option" style="height: 500px" ref="chart" />
    </div>
  </div>
  </div>
  </div>

</template>


<script>
// import { ref, onMounted } from 'vue'
import { getFasteyes_AttendancePie, getFasteyesDevice} from "../../untils/api.js"
import StatsCard from "../../components/Cards/StatsCard.vue"
import ChartCard from "../../components/Cards/ChartCard.vue"

import store from "../../store"
import moment from 'moment'
import { VueEcharts } from "vue3-echarts";
export default {
    components: {
    StatsCard,
    ChartCard,
    VueEcharts,
  },
  data (){
    let fasteyes_AttendanceTableData=[]
    let page = 1
    let total = 1
    let page_size = 1
    let page_total = 1
    let start_date = ""
    let start_time = "00:00:00"
    let end_date = ""
    let end_time = "23:59:59"
    return{
      fasteyes_AttendanceTableData,
      page,
      total,
      page_size,
      page_total,
      start_date,
      start_time,
      end_date,
      end_time,
      Fasteyes_DeviceList: [],
      select_device: -1,
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "出席率",
          value: "96",
          footerText: "過去10天資料",
          footerIcon: "ti-reload",
          img: "/src/assets/SUMI_img/ICON_出席率_01.png"
        },
        {
          type: "success",
          icon: "ti-wallet",
          title: "遲到",
          value: "3",
          footerText: "遲到人數18",
          footerIcon: "ti-calendar",
          img: "/src/assets/SUMI_img/ICON_遲到_01.png"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "早退",
          value: "1",
          footerText: "7",
          footerIcon: "ti-timer",
          img: "/src/assets/SUMI_img/ICON_早退_01.png"
        },
        {
          type: "info",
          icon: "ti-twitter-alt",
          title: "未到",
          value: "4",
          footerText: "27",
          footerIcon: "ti-reload",
          img: "/src/assets/SUMI_img/ICON_請假_01.png"
        }
      ],
    }
  },
  methods: {
    async getfasteyes_Attendance(){
      let start_time = this.start_date+"T"+this.start_time
      let end_time = this.end_date+"T"+this.end_time
      await getFasteyes_AttendancePie(start_time,end_time,this.select_device).then((res)=>{
        let AttendancePieData = Object.assign(res.data)
        console.log(AttendancePieData)
        this.statsCards[0].footerText = AttendancePieData.ontime
        this.statsCards[1].footerText = AttendancePieData.late
        this.statsCards[2].footerText = AttendancePieData.leaveEarly
        this.statsCards[3].footerText = AttendancePieData.notArrived
        let total = this.statsCards[0].footerText +this.statsCards[1].footerText +this.statsCards[2].footerText+this.statsCards[3].footerText
        total = total ==0? 1:total 
        this.statsCards[0].value = (AttendancePieData.ontime/total*100).toFixed(2)
        this.statsCards[1].value = (AttendancePieData.late/total*100).toFixed(2)
        this.statsCards[2].value = (AttendancePieData.leaveEarly/total*100).toFixed(2)
        this.statsCards[3].value = (AttendancePieData.notArrived/total*100).toFixed(2)
      }) 
    },
    async getDevice(){
      this.Fasteyes_DeviceTableData = []
      await getFasteyesDevice().then((res)=>{
        let devicelist = Object.assign(res.data)
        devicelist.forEach(Data =>{
          let device = {}
          device.name = Data.name 
          device.id = Data.id
          this.Fasteyes_DeviceList.push(device)
        });
      }) 
    },
    increment(){
      if(this.page<this.page_total)
      {
        this.page++
        this.getfasteyes_Attendance()
      }
    },
    decrement(){
      if(this.page>1)
      {
        this.page--
        this.getfasteyes_Attendance()
      }
    },
    enter(){
      this.getfasteyes_Attendance()
    },
    reset(){
      let nowTime = new Date()
      let date = nowTime.getDate()-10>=0?nowTime.getDate():"0"+nowTime.getDate()
      this.start_date = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+date
      this.start_time = "00:00:00"
      this.end_date = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+date
      this.end_time = "23:59:59"
      this.search_text=""
      this.select_status=-1
      this.getfasteyes_Attendance()
    },
    select_all(){
      this.select_status = -1
      this.getfasteyes_Attendance()
    },
    select_normal(){
      this.select_status = 0
      this.getfasteyes_Attendance()
    },
    select_abnormal(){
      this.select_status = 1
      this.getfasteyes_Attendance()
    },
    search_event(){
      console.log(this.search_text) 
    },
  },
  beforeMount() {
    this.reset()
    this.getDevice()
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
    computed: {
    option() {
      return {
        fontFamily: "Roboto Condensed",
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
          icon: "circle",
          // icon:
          //   "image://https://icons.iconarchive.com/icons/paomedia/small-n-flat/64/sign-check-icon.png",
        },
        series: [
          {
            color: [
              "#64B464",
              "#BE2828",
              "#46AAF0",
              "#FABE3C",
              "#b6517f",
              "#a63246",
              "#5f8943",
              "#c4ccd3",
              "#5f86f7",

            ],
            //  itemStyle : {
            //   normal : {
            //        label : {
            //           show: true, position: 'inner',
            //           formatter : function (params){
            //                 return  params.value + '%\n'
            //           },
            //       },
            //       labelLine : {
            //           show : true
            //       }
            //   }
            //  },
            name: "出勤紀錄",
            type: "pie",
            radius: ["0%", "70%"],
            avoidLabelOverlap: true,
            label: {
              show: false,
              position: "center",
              // icon:
              //   "image://https://icons.iconarchive.com/icons/paomedia/small-n-flat/64/sign-check-icon.png",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
            },

            data: [
              { value: this.statsCards[0].footerText,name: "準時"},
              { value: this.statsCards[1].footerText, name: "遲到" },
              { value: this.statsCards[2].footerText, name: "早退" },
              { value: this.statsCards[3].footerText, name: "未到" },
            ],
          },
        ],
      };
    },
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

.cardDiv {
    /* border: 1px solid black; */
    width: 250px;
    /* overflow: hidden; */
    /* white-space: nowrap; */
      border-radius: 10px;
  padding: 10px 5px;
}
</style>
