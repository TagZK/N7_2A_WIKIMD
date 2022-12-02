<script setup>
import { VueShowdown } from "vue-showdown";
</script>

<script>

export default {
  props : {
    data: JSON,
    socket : Object
  },
  data(){
    return{
      dataState: this.data,
      socketState : this.socket.on("patched", (item) =>{
        if(this.dataState.id == item.id){
          this.dataState = item;
        }
      }).on("posted", (item) => {
        this.dataState = item;
      })
    }
  }
}
</script>

<template>
  <div v-if="this.dataState">
    <VueShowdown :markdown="this.dataState.content" :options="{ emoji: true }" />
    <p>Updated at : {{ this.dataState.updated_at }}</p>
    <p>Created at : {{ this.dataState.created_at }}</p>
  </div>
  <h2 v-if="!this.dataState">Loading</h2>
</template>

<style scoped>
h1 {
  color: red;
}
</style>
