<template>
  <div style="border: 1px solid">
    <h1>Teleport Example</h1>
    <teleport to="#destination" :disabled="disableTeleport">
      <Logintest ref="modal">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi in dolorem, eligendi, voluptate ullam alias ut similique iusto voluptatum, ea nostrum dicta illo adipisci sapiente! Numquam maxime excepturi aspernatur dolore.
      </Logintest>
    </teleport>
    
    <button @click="disableTeleport = !disableTeleport">Toggle Teleport</button>


    <button @click="showModal">show Modal </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import VModal from '../components/VModal.vue'
import Logintest from '../components/Logintest.vue'
export default {
  components:{
    Logintest
  },
  setup() {
    const disableTeleport = ref(false)   
    
    const modal = ref(null);

    function showModal(){
      console.log(modal)
      modal.value.show()
    }
    return {
      disableTeleport,
      showModal ,
      modal
    }
  },
}
</script>

<style>
</style>
