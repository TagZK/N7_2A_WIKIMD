<script setup>
import { VueShowdown } from "vue-showdown";
</script>

<script>
export default {
  props: {
    data: JSON,
    socket: Object,
  },
  data() {
    return {
      dataState: this.data,
      socketState: this.socket
        .on("patched", (item) => {
          if (this.dataState.id == item.id) {
            this.dataState = item;
          }
        })
        .on("posted", (item) => {
          this.dataState = item;
        }),
    };
  },
};
</script>

<template>
  <div v-if="this.dataState">
    <VueShowdown
      :markdown="this.dataState.content"
      :options="{ emoji: true }"
    />
    <div style="text-align: center; padding-top: 5vh">
      Updated at : {{ this.dataState.updated_at }} &nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp; Created at : {{ this.dataState.created_at }}
    </div>
    <div></div>
  </div>
  <h2 v-if="!this.dataState">Loading</h2>
</template>

<style scoped>
h1 {
  color: red;
}
</style>
