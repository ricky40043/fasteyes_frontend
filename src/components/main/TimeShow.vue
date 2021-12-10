<template>
  <div id="main">
    <div id="icon">
      <img src="src/assets/SUMI_img/SUMI logo/W.png" alt="" height=50 width=50 style="display:block; margin:auto;">
    </div>
    <div id="date">
      <div>
        <h5 id="date_year">
          {{ year }}
        </h5>
        </div>
      <div>
        <h5 id="date_date">
          {{ date }}
        </h5>
        </div>
    </div>
    <div id="time">
      <div id="currentTime" class="time_block_text" style="font-size: 40px;" @click="getTime()">{{ current_time }}</div>
      <!-- <div class="time_block_text">8</div>
      <div class="time_block_text">:</div>
      <div class="time_block_text">2</div>
      <div class="time_block_text">8</div>
      <div class="time_block_text">:</div>
      <div class="time_block_text">4</div>
      <div class="time_block_text">5</div>
      <div class="time_block_text">AM</div> -->
    </div>
    
  </div>
</template>
<script lang="ts">
import { watch } from '@vue/runtime-core';
export default {
  data () {
    var currentdate = new Date(); 

    // var time = "Last Sync: " + currentdate.getDate() + "/"
    //             + (currentdate.getMonth()+1)  + "/" 
    //             + currentdate.getFullYear() + " @ "  
    //             + currentdate.getHours() + ":"  
    //             + currentdate.getMinutes() + ":" 
    //             + currentdate.getSeconds();

    var year = currentdate.getFullYear();
    var date = (currentdate.getMonth()+1)+"月"+currentdate.getDate()+"日";
    var current_time = "00:00:00";
    return {
      year: year,
      date: date,
      current_time: current_time,
      timer: window.setInterval(() => { this.getTime () }, 1000)
   }
  },
  // watch:{
  //   current_time(oldvalue,newvalue){
  //     // alert(oldvalue)
  //     setInterval(()=>{
  //     this.getTime();
  //     },1000)
  //   }
    
  // },
  methods: {
     getTime: function() {
      var currentdate = new Date(); 
      let h = currentdate.getHours();
      let H = h>9?h:"0"+h;
      let m = currentdate.getMinutes();
      let M = m>9?m:"0"+m; 
      let s = currentdate.getSeconds();
      let S = s>9?s:"0"+s;
      this.current_time = H + ":" + M + ":" +S; 
     }
 },
  beforeMount() {

},
  beforeUnmount(){
    window.clearInterval(this.timer)
  }
}
</script>
<style scoped>
#main{
  width: 100%;
  min-width: 400px;
  height: 100%;
  min-height: 10px;
  position: relative;
  /* background-color: rgba(0, 0, 0, 0.2); */
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  padding: 0px 0px;
}

#icon{
  width: 20%;
  height: auto;
  /* background-color: purple; */
}

#date{
  width: 30%;
  height: auto;
  /* background-color: rgba(0, 0, 0, 0.658); */
}

#time{
  width: 50%;
  height: auto;
  /* background-color: rgba(0, 0, 0, 0.247); */
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
  align-items: center;
}
#date_year{
  font-size: 24px;
  color: white;
}
#date_date{
  font-size: 20px;
  color: white;
}
</style>