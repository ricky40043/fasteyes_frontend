<template>
  <!-- <div id="main"> -->
      <div id="videoUp">
        <div id="videoLeft">
          <img :src="video1[1]+'video'" alt="" height=270 width=270 style="display:block; margin:auto;">
        </div>
        <div id="videoRight">
          <img :src="video1[2]+'video'" alt="" height=270 width=270 style="display:block; margin:auto;">
        </div>
      </div>
      <div id="videoDown">
          <img :src="video1[0]+'video'" alt="" height=650 width=650 style="display:block; margin:auto;">
      </div>
</template>
<script>
import { useRouter } from "vue-router";
import store from "../store"
const router = useRouter();
const base = {
  url: 'http://192.168.45.38:8000'
}
export default {
  data () {
    let video1 = []
    return {
      video1,
   }
  },
  methods: {
    // 登入
    getvideoIP () {
      this.video1 = []
      let list_IPCam = store.state.deviceList_IPCam
      let list_data = list_IPCam.map( D => D)
      // console.log(store.state.deviceList_IPCam)
      // console.log(list_data[0])
      list_data.forEach(data => {
        // console.log(data.id)
        this.video1.push(base.url+"/ip_cam/device/"+data.id+"/");
      });
      // console.log(this.video1.length)
      // console.log(this.video1)

    }
  },
  beforeMount() {
    setTimeout(()=>{
    this.getvideoIP()
    },500)

    // setInterval(() => {
    //   this.num1 = this.num1==this.video1.length ?this.num1+1:0 
    //   this.num2 = this.num2==this.video1.length ?this.num2+1:0 
    //   this.num3 = this.num3==this.video1.length ?this.num3+1:0 
    // }, 10000);
  }
}
</script>
<style scoped>
#main{
  position: relative;
  /* background-color: rgba(0, 0, 0, 0.2); */
  /* display: flex;
  align-content: center;
  padding: 0px 0px;*/
} 

#videoUp{
  width: 80%;
  min-width: 250px;
  /* max-width: 500px; */
  height: 10%;
  min-height: 200px;
  /* max-height: 500px; */
  position: relative;
  /* background-color: rgba(109, 36, 36, 0.4); */
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
}
#videoDown{
  width: 80%;
  min-width: 400px;
  /* max-width: 1000px; */
  height: 100%;
  min-height: 400px;
  /* max-height: 1000px; */
  position: relative;
  /* background-color: rgba(30, 43, 161, 0.4); */
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
}

#videoLeft{
  width: 50%;
  height: auto;
  align-content: center;
  display: flex;
  flex-wrap: nowrap;
  /* background-color: rgba(0, 0, 0, 0.658); */
}
#videoRight{
  width: 50%;
  height: auto;
  align-content: center;
  display: flex;
  flex-wrap: nowrap;
  /* background-color: rgba(40, 143, 54, 0.658); */
}

#icon{
  width: 20%;
  height: auto;
  background-color: black;
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
  background-color: gray;
  border-radius: 2px;
  padding: 0px 2px;
  margin-left: 2px;
  display: flex;
  align-content: center;
}
/* #left{
  width: 15%;
  height: auto;
  background-color: rgba(92, 22, 22, 0.247);
  
}
#right{
  width: 85%;
  height: auto;
  background-color: rgba(39, 182, 70, 0.247);
} */
</style>