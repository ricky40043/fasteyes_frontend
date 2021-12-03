<template>
  <div style="border: 1px solid">
    <h1>Teleport Example</h1>
    <teleport to="#destination" :disabled="disableTeleport">
      <!-- <VModal /> -->
    </teleport>
    
    <button @click="disableTeleport = !disableTeleport">Toggle Teleport</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import VModal from '../components/VModal.vue'
export default {
  components:{
    VModal
  },
  setup() {
    const disableTeleport = ref(false)   
    return {
      disableTeleport,
    }
  },
}
</script>

<style>
</style>
